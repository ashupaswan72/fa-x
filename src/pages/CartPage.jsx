import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { showToast } from '../components/ui/Toast';
import { Trash2, ShoppingBag, ArrowRight, Percent, Award } from 'lucide-react';

const CartPage = () => {
  const { 
    cartItems, removeFromCart, updateQuantity, getSubtotal, 
    getAdvanceTotal, getDiscountValue, appliedCoupon, applyCoupon, 
    removeCoupon, useRewards, setUseRewards, calculateBulkDiscount 
  } = useCart();
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, "success");
      setCouponCode("");
    } else {
      showToast(res.message, "error");
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      showToast("Please log in to proceed with checkout.", "warning");
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-black text-dark">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto">
          Explore the fresh farm harvests available in the marketplace to add standard crops, preorders, or join group buy campaigns.
        </p>
        <Link to="/" className="inline-block">
          <Button variant="primary">Browse Marketplace</Button>
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discount = getDiscountValue();
  const rewardPointsDiscount = useRewards ? 100 : 0; // Simulate redeeming 100 pts for ₹100
  const finalAmount = Math.max(0, subtotal - discount - rewardPointsDiscount);
  const advanceToday = getAdvanceTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      <h1 className="text-3xl font-black text-dark">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => {
            const bulkDiscount = item.purchaseType === 'standard' ? calculateBulkDiscount(item.quantity) : 0;
            const unitPrice = item.price * (1 - bulkDiscount / 100);
            const total = unitPrice * item.quantity;

            return (
              <Card key={`${item.id}_${item.purchaseType}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-emerald-50" />
                  <div>
                    <h3 className="font-bold text-dark text-sm">{item.title}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold">Grown by {item.farmerName}</p>
                    
                    {/* Badge type */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.purchaseType === 'preorder' && (
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          ⏳ Preorder ({item.advancePct}% Deposit)
                        </span>
                      )}
                      {item.purchaseType === 'groupbuy' && (
                        <span className="bg-accent/20 text-emerald-800 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          👥 Group Buy Club
                        </span>
                      )}
                      {item.purchaseType === 'standard' && (
                        <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          📦 Spot Market
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing / Qty */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.purchaseType, item.campaignId, item.quantity - 5)}
                      className="bg-gray-100 font-bold hover:bg-gray-200 text-dark w-7 h-7 rounded-lg flex items-center justify-center text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-dark w-8 text-center">{item.quantity} kg</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.purchaseType, item.campaignId, item.quantity + 5)}
                      className="bg-gray-100 font-bold hover:bg-gray-200 text-dark w-7 h-7 rounded-lg flex items-center justify-center text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <span className="text-[10px] text-gray-400 block font-semibold leading-none">Subtotal</span>
                    <span className="text-sm font-black text-dark">{formatPrice(total)}</span>
                    {bulkDiscount > 0 && (
                      <span className="text-[8px] font-bold text-primary block">({bulkDiscount}% Bulk Off)</span>
                    )}
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.purchaseType, item.campaignId)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Order Summary</h2>

            {/* Coupons */}
            <form onSubmit={handleCouponSubmit} className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Promo Coupon</label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-100 text-xs font-bold">
                  <span className="flex items-center space-x-1.5"><Percent className="w-4 h-4" /> <span>{appliedCoupon.code} Applied</span></span>
                  <button type="button" onClick={removeCoupon} className="text-emerald-800 hover:underline cursor-pointer">&times;</button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="e.g. FRESH10" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-emerald-50/50 border border-emerald-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-dark flex-grow"
                  />
                  <Button type="submit" variant="outline" size="sm" className="px-4 py-2">Apply</Button>
                </div>
              )}
            </form>

            {/* Loyalty points */}
            <div className="flex items-center justify-between bg-emerald-50/30 p-3 rounded-2xl border border-emerald-500/5 text-xs font-semibold">
              <div className="flex items-center space-x-2 text-dark">
                <Award className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-bold text-[11px] leading-tight">Redeem Rewards</p>
                  <p className="text-[9px] text-gray-400">Apply 100 points to save ₹100</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={useRewards} 
                onChange={(e) => setUseRewards(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-primary border-emerald-300 rounded cursor-pointer"
              />
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2.5 text-xs font-semibold text-dark">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-bold">
                  <span>Coupon Deduction:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              {useRewards && (
                <div className="flex justify-between text-primary font-bold">
                  <span>Loyalty Discount:</span>
                  <span>-{formatPrice(rewardPointsDiscount)}</span>
                </div>
              )}
              
              <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-black text-dark">
                <span>Final Order Value:</span>
                <span>{formatPrice(finalAmount)}</span>
              </div>

              {advanceToday > 0 && (
                <div className="flex justify-between py-2 px-3 bg-amber-50 rounded-xl border border-dashed border-amber-300 text-amber-950 font-bold mt-2">
                  <span>Due Today (Preorder Advance):</span>
                  <span>{formatPrice(advanceToday)}</span>
                </div>
              )}
            </div>

            <Button 
              variant="primary" 
              fullWidth 
              onClick={handleCheckout}
              className="flex items-center justify-center space-x-2 py-3.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
