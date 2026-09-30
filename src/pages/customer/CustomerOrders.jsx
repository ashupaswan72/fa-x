import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { formatPrice, formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import { payWithRazorpay } from '../../services/razorpay';
import { generateInvoice } from '../../utils/generateInvoice';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import OrderTracking from '../../components/ui/OrderTracking';
import { CreditCard, Wallet, HelpCircle, Map, Star, Download } from 'lucide-react';

const CustomerOrders = () => {
  const { currentUser } = useAuth();
  const { balance, payWithWallet } = useWallet();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Remaining payment details states
  const [activeOrderToPay, setActiveOrderToPay] = useState(null);
  const [payMethod, setPayMethod] = useState("gateway"); // 'wallet', 'gateway'
  const [paying, setPaying] = useState(false);

  // Review states
  const [activeOrderToReview, setActiveOrderToReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchOrders = async () => {
    if (currentUser) {
      try {
        const ords = await dbService.getOrders(currentUser.uid, 'customer');
        setOrders(ords);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  const handlePayRemainingBalance = (order) => {
    setActiveOrderToPay(order);
  };

  const handleCompleteBalancePayment = async (orderId, totalAmount, advancePaid) => {
    const balanceDue = totalAmount - advancePaid;
    setPaying(true);

    try {
      if (payMethod === 'wallet') {
        if (balance < balanceDue) {
          showToast("Insufficient wallet funds. Please add money first.", "error");
          setPaying(false);
          return;
        }
        payWithWallet(balanceDue, `Paid remaining 75% balance for order ${orderId}`);
      }

      // Update Order Status in Database
      await dbService.updateOrderStatus(orderId, 'fully_paid');
      await dbService.updateOrderStatus(orderId, 'ready_for_delivery', true);

      showToast(`Second-stage payment of ${formatPrice(balanceDue)} completed! Order status updated. 🌾`, "success");
      setActiveOrderToPay(null);
      fetchOrders();
    } catch (e) {
      console.error(e);
      showToast("Payment failed", "error");
    } finally {
      setPaying(false);
    }
  };

  const triggerRazorpayBalance = (orderId, balanceDue) => {
    payWithRazorpay({
      amount: balanceDue,
      description: `FA-X Remaining Balance for ${orderId}`,
      name: currentUser.name,
      email: currentUser.email,
      phone: orderId, // Prefill with orderId reference
      onSuccess: () => {
        handleCompleteBalancePayment(orderId, balanceDue, 0); // Simulated paid completely
      },
      onCancel: () => {
        showToast("Gateway checkout dismissed.", "info");
      }
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      await dbService.addFarmerReview({
        farmerId: activeOrderToReview.farmerId,
        customerId: currentUser.uid,
        customerName: currentUser.name,
        rating: reviewRating,
        comment: reviewComment
      });

      showToast("Thank you for reviewing your farmer! 🌾", "success");
      setActiveOrderToReview(null);
      setReviewComment("");
      setReviewRating(5);
    } catch (e) {
      console.error(e);
      showToast("Failed to post review", "error");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDownloadInvoice = (order) => {
    try {
      generateInvoice(order);
      showToast("Invoice downloaded successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to generate invoice", "error");
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-dark">My Orders</h1>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Fetching order ledger...</div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => {
            const hasDepositPaidOnly = order.type === 'preorder' && order.paymentStatus === 'deposit_paid';
            const advancePaid = order.items?.[0]?.advancePaid || 0;
            const balanceDue = order.totalAmount - advancePaid;

            return (
              <Card key={order.id} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-50 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-bold text-dark text-sm">Order ID: {order.id}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                        order.type === 'preorder' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {order.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold">Ordered on {formatDate(order.createdAt)} • Farmer: {order.farmerName}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
                    <button 
                      onClick={() => handleDownloadInvoice(order)}
                      className="text-[10px] font-bold bg-white text-[#4CAF50] border border-[#4CAF50]/30 hover:bg-[#E8F3EA] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Download className="w-3 h-3" /> Invoice
                    </button>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBadgeStyle(order.paymentStatus)}`}>
                      Payment: {order.paymentStatus}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBadgeStyle(order.deliveryStatus)}`}>
                      Delivery: {order.deliveryStatus}
                    </span>
                  </div>
                </div>

                {/* Items detail list */}
                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-xs font-semibold text-dark">
                      <div>
                        <p className="font-bold text-dark">{item.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Quantity: {item.quantity} kg • Unit Price: {formatPrice(item.price)}</p>
                      </div>
                      <p className="font-black">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                {/* Pricing / CTA row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-50 pt-4 gap-4 mt-2">
                  <div className="text-xs font-semibold text-dark">
                    {order.type === 'preorder' && (
                      <div className="space-y-0.5">
                        <p className="text-gray-400">Total Price: <strong>{formatPrice(order.totalAmount)}</strong></p>
                        <p className="text-primary font-bold">Advance Paid: {formatPrice(advancePaid)}</p>
                        <p className="text-red-500 font-bold">Balance Due: {formatPrice(balanceDue)}</p>
                      </div>
                    )}
                    {order.type !== 'preorder' && (
                      <p className="text-sm font-black">Total Paid: <span className="text-primary">{formatPrice(order.totalAmount)}</span></p>
                    )}
                  </div>

                  {/* Payment button if harvested and balance unpaid */}
                  {hasDepositPaidOnly && order.deliveryStatus === 'harvested' && (
                    <Button 
                      variant="accent" 
                      size="sm"
                      onClick={() => handlePayRemainingBalance(order)}
                    >
                      Pay Remaining Balance ({formatPrice(balanceDue)})
                    </Button>
                  )}
                  {hasDepositPaidOnly && order.deliveryStatus === 'pending_harvest' && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                      ⌛ Awaiting harvest to pay final balance
                    </span>
                  )}

                  {/* Review Farmer Button */}
                  {order.deliveryStatus === 'delivered' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveOrderToReview(order)}
                    >
                      ⭐️ Review Farmer
                    </Button>
                  )}
                  
                </div>
                
                {/* Visual Tracking Timeline */}
                <div className="pt-2 border-t border-gray-50 mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Map className="w-4 h-4 text-primary" />
                    <h4 className="text-xs font-bold text-dark">Live Tracking</h4>
                  </div>
                  <OrderTracking deliveryStatus={order.deliveryStatus} orderType={order.type} />
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-emerald-50 p-6">
          <span className="text-4xl block mb-2">📦</span>
          <p className="text-xs text-gray-500 font-semibold">No order logs found.</p>
        </div>
      )}

      {/* Complete Balance modal popup */}
      {activeOrderToPay && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="font-bold text-dark text-lg">Pay Remaining Balance</h3>
              <button 
                onClick={() => setActiveOrderToPay(null)} 
                className="text-gray-400 hover:text-dark text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2 text-xs font-semibold text-dark bg-emerald-50/50 p-4 rounded-2xl">
              <p className="flex justify-between">
                <span>Order Reference:</span>
                <span>{activeOrderToPay.id}</span>
              </p>
              <p className="flex justify-between">
                <span>Preorder Advance Paid:</span>
                <span>{formatPrice(activeOrderToPay.items?.[0]?.advancePaid || 0)}</span>
              </p>
              <p className="flex justify-between border-t border-emerald-500/10 pt-2 text-sm font-black">
                <span>Balance Payable:</span>
                <span className="text-red-500">{formatPrice(activeOrderToPay.totalAmount - (activeOrderToPay.items?.[0]?.advancePaid || 0))}</span>
              </p>
            </div>

            {/* Select Method */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Choose Payment Method</label>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPayMethod('gateway')}
                  className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center space-y-1 transition-all cursor-pointer ${
                    payMethod === 'gateway' ? 'border-primary bg-emerald-50/20 text-primary' : 'border-gray-100 hover:border-emerald-100 text-dark'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Razorpay</span>
                </button>
                <button 
                  onClick={() => setPayMethod('wallet')}
                  className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center space-y-1 transition-all cursor-pointer ${
                    payMethod === 'wallet' ? 'border-primary bg-emerald-50/20 text-primary' : 'border-gray-100 hover:border-emerald-100 text-dark'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Wallet ({formatPrice(balance)})</span>
                </button>
              </div>
            </div>

            {payMethod === 'gateway' ? (
              <Button 
                variant="accent" 
                fullWidth 
                loading={paying}
                onClick={() => triggerRazorpayBalance(
                  activeOrderToPay.id, 
                  activeOrderToPay.totalAmount - (activeOrderToPay.items?.[0]?.advancePaid || 0)
                )}
              >
                Launch Razorpay Sandbox
              </Button>
            ) : (
              <Button 
                variant="primary" 
                fullWidth 
                loading={paying}
                onClick={() => handleCompleteBalancePayment(
                  activeOrderToPay.id, 
                  activeOrderToPay.totalAmount, 
                  activeOrderToPay.items?.[0]?.advancePaid || 0
                )}
              >
                Confirm Wallet Deduction
              </Button>
            )}
          </Card>
        </div>
      )}

      {/* Review Farmer Modal */}
      {activeOrderToReview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="font-bold text-dark text-lg">Review Farmer</h3>
              <button 
                onClick={() => setActiveOrderToReview(null)} 
                className="text-gray-400 hover:text-dark text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-2 text-center border-b border-emerald-500/10 pb-4">
                <p className="text-xs font-bold text-gray-500">How was your experience with</p>
                <p className="text-lg font-black text-dark">{activeOrderToReview.farmerName}?</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Rating</label>
                <div className="flex space-x-1 justify-center py-2">
                  {[1,2,3,4,5].map(star => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${star <= reviewRating ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Review Comment</label>
                <textarea 
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience about the produce quality and delivery..."
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary text-dark resize-none h-24"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                loading={submittingReview}
              >
                Submit Review
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
