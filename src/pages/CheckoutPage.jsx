import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { dbService } from '../services/database';
import { formatPrice } from '../utils/helpers';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import MapPicker from '../components/ui/MapPicker';
import { payWithRazorpay } from '../services/razorpay';
import { showToast } from '../components/ui/Toast';
import { CreditCard, Wallet, ShieldCheck, ArrowLeft, QrCode } from 'lucide-react';
import QRPaymentModal from '../components/marketplace/QRPaymentModal';

const CheckoutPage = () => {
  const { 
    cartItems, getSubtotal, getDiscountValue, getAdvanceTotal, useRewards, clearCart 
  } = useCart();
  const { currentUser } = useAuth();
  const { balance, payWithWallet } = useWallet();
  const navigate = useNavigate();

  // Address and payment states
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paymentMode, setPaymentMode] = useState("gateway"); // 'wallet', 'gateway', 'qr'
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountValue();
  const finalAmount = Math.max(0, subtotal - discount - (useRewards ? 100 : 0));
  const advanceToday = getAdvanceTotal();
  const payableAmount = advanceToday > 0 ? advanceToday : finalAmount;

  const handleLocationSelected = (loc) => {
    setSelectedLocation(loc);
    if (loc.address) {
      setStreet(loc.address);
    }
  };

  const handleCompleteOrder = async (paymentDetails = {}) => {
    if (!cartItems || cartItems.length === 0) {
      showToast("Your cart is empty. Please add products first.", "warning");
      navigate('/');
      return;
    }
    setLoading(true);
    try {
      // 1. Construct Order details
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        purchaseType: item.purchaseType,
        campaignId: item.campaignId,
        advancePaid: item.purchaseType === 'preorder' ? (item.price * item.quantity * (item.advancePct / 100)) : 0
      }));

      const newOrder = {
        customerId: currentUser.uid,
        customerName: currentUser.name,
        farmerId: cartItems[0].farmerId, // Simplification: assume single farmer per checkout
        farmerName: cartItems[0].farmerName,
        type: cartItems[0].purchaseType, // 'standard', 'preorder', 'groupbuy'
        items: orderItems,
        totalAmount: finalAmount,
        payableToday: payableAmount,
        paymentStatus: cartItems[0].purchaseType === 'preorder' ? 'deposit_paid' : 'fully_paid',
        deliveryStatus: cartItems[0].purchaseType === 'preorder' ? 'pending_harvest' : 'pending',
        shippingAddress: {
          name: currentUser.name,
          phone,
          street: street || selectedLocation?.address || "",
          city,
          state: stateName,
          zip,
          lat: selectedLocation?.lat || null,
          lng: selectedLocation?.lng || null
        },
        paymentDetails
      };

      // 2. Insert order into DB
      await dbService.createOrder(newOrder);

      // 3. Join Group Buy if cart contains a group-buy item
      for (const item of cartItems) {
        if (item.purchaseType === 'groupbuy' && item.campaignId) {
          await dbService.joinGroupBuy(item.campaignId, currentUser.uid);
        }
        
        // Update product stock counts
        try {
          const product = await dbService.getProduct(item.id);
          if (product) {
            await dbService.updateProduct(item.id, {
              stock: Math.max(0, product.stock - item.quantity)
            });
          }
        } catch (stockErr) {
          console.warn("Could not decrement stock (RLS constraint). Skipping stock update for now.");
        }
      }

      showToast("Order placed successfully! 🌾", "success");
      clearCart();
      navigate('/customer/orders');
    } catch (e) {
      console.error(e);
      showToast("Failed to compile order. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!phone || !street || !city || !stateName || !zip) {
      showToast("Please fill out all address details first.", "warning");
      return;
    }

    if (paymentMode === 'wallet') {
      if (balance < payableAmount) {
        showToast("Insufficient Wallet Balance. Please use Razorpay or deposit funds.", "error");
        return;
      }
      try {
        payWithWallet(payableAmount, `Purchase checkout for FA-X order`);
        handleCompleteOrder({ method: 'wallet', transactionId: 'wal_tx_' + Date.now() });
      } catch (err) {
        showToast(err.message, "error");
      }
    } else if (paymentMode === 'qr') {
      setIsQRModalOpen(true);
    } else {
      // Razorpay payment flow
      payWithRazorpay({
        amount: payableAmount,
        description: `FA-X Marketplace checkout`,
        name: currentUser.name,
        email: currentUser.email,
        phone,
        onSuccess: (response) => {
          handleCompleteOrder(response);
        },
        onCancel: (err) => {
          showToast("Checkout transaction was cancelled.", "info");
        }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      <h1 className="text-3xl font-black text-dark">Secure Checkout</h1>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Side: Address Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6">
            <h2 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Delivery & Contact Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Phone</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ZIP / Pin Code</label>
                <input 
                  type="text" 
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="e.g. 380001"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Street Address / Field Plot</label>
                <input 
                  type="text" 
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="House/Apartment/Street details"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City / Town</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Ahmedabad"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State</label>
                <input 
                  type="text" 
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="e.g. Gujarat"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>
            </div>

            {/* Simulated Map coordinates selection */}
            <MapPicker onLocationSelected={handleLocationSelected} />
          </Card>

          {/* Payment Methods */}
          <Card className="space-y-6">
            <h2 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Select Payment Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label 
                className={`flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMode === 'gateway' ? 'border-primary bg-emerald-50/20' : 'border-gray-100 hover:border-emerald-100'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="gateway" 
                  checked={paymentMode === 'gateway'} 
                  onChange={() => setPaymentMode('gateway')}
                  className="mt-1 text-primary focus:ring-primary w-4 h-4"
                />
                <div>
                  <span className="font-bold text-xs sm:text-sm text-dark flex items-center space-x-1">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Razorpay Checkout</span>
                  </span>
                  <p className="text-[9px] text-gray-400 mt-1">UPI, Credit/Debit Cards, Net Banking, and wallets. Verified instantly.</p>
                </div>
              </label>

              <label 
                className={`flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMode === 'qr' ? 'border-primary bg-emerald-50/20' : 'border-gray-100 hover:border-emerald-100'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="qr" 
                  checked={paymentMode === 'qr'} 
                  onChange={() => setPaymentMode('qr')}
                  className="mt-1 text-primary focus:ring-primary w-4 h-4"
                />
                <div>
                  <span className="font-bold text-xs sm:text-sm text-dark flex items-center space-x-1">
                    <QrCode className="w-4 h-4 text-primary" />
                    <span>Direct UPI / QR Code</span>
                  </span>
                  <p className="text-[9px] text-gray-400 mt-1">Scan GPay/PhonePe QR code directly on your screen and verify UTR.</p>
                </div>
              </label>

              <label 
                className={`flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMode === 'wallet' ? 'border-primary bg-emerald-50/20' : 'border-gray-100 hover:border-emerald-100'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="wallet" 
                  checked={paymentMode === 'wallet'} 
                  onChange={() => setPaymentMode('wallet')}
                  className="mt-1 text-primary focus:ring-primary w-4 h-4"
                />
                <div>
                  <span className="font-bold text-xs sm:text-sm text-dark flex items-center space-x-1">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span>FA-X Wallet</span>
                  </span>
                  <p className="text-[9px] text-gray-400 mt-1">Pay using your digital balance. Current wallet funds: <strong>{formatPrice(balance)}</strong></p>
                </div>
              </label>
            </div>
          </Card>
        </div>

        {/* Right Side: Order summary & payment action */}
        <div className="space-y-6">
          <Card className="space-y-6 sticky top-24">
            <h2 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Checkout Summary</h2>
            
            <div className="space-y-2 text-xs font-semibold text-dark">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-gray-500">
                  <span className="max-w-[150px] truncate">{item.title} (x{item.quantity}kg)</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              
              <div className="flex justify-between border-t border-gray-100 pt-3 text-xs">
                <span>Total Cart Value:</span>
                <span>{formatPrice(finalAmount)}</span>
              </div>

              <div className="flex justify-between font-black text-sm text-dark border-b border-gray-100 pb-3 mt-1">
                <span>Amount Due Today:</span>
                <span className="text-primary">{formatPrice(payableAmount)}</span>
              </div>
              
              {advanceToday > 0 && (
                <p className="text-[10px] text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2">
                  ℹ️ This order includes pre-harvest crops. Paying the advance today reserves your items. Remaining 75% balance will be requested after harvest.
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="accent" 
              fullWidth 
              loading={loading}
              className="py-3.5 flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Complete Payment & Checkout</span>
            </Button>
          </Card>
        </div>
      </form>

      <QRPaymentModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
        amount={payableAmount} 
        onSuccess={(details) => {
          setIsQRModalOpen(false);
          handleCompleteOrder(details);
        }}
      />
    </div>
  );
};

export default CheckoutPage;
