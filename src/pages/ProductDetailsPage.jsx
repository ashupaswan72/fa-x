import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/database';
import { formatPrice, formatDate, getPreorderInfo, getStatusBadgeStyle } from '../utils/helpers';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { showToast } from '../components/ui/Toast';
import { Star, ShieldCheck, ShoppingCart, User, ArrowLeft, MapPin } from 'lucide-react';
import MapViewer from '../components/ui/MapViewer';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('groupbuy');
  const navigate = useNavigate();

  const { addToCart, calculateBulkDiscount } = useCart();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [farmerReviews, setFarmerReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery and Form states
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prod = await dbService.getProduct(id);
        if (prod) {
          setProduct(prod);
          setSelectedImage(prod.images?.[0] || "");
          setQuantity(prod.minOrderQty || 5);
          
          // Get farmer details
          if (prod.farmerId) {
            const f = await dbService.getUser(prod.farmerId);
            setFarmer(f);
            
            const fReviews = await dbService.getFarmerReviews(prod.farmerId);
            setFarmerReviews(fReviews);
          }

          // Get reviews
          const revs = await dbService.getReviews(id);
          setReviews(revs);

          // Get related products
          const allProds = await dbService.getProducts();
          setRelatedProducts(allProds.filter(p => p.category === prod.category && p.id !== id).slice(0, 4));
        } else {
          showToast("Product not found", "error");
          navigate('/');
        }
      } catch (e) {
        console.error("Error fetching product details:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-sm font-semibold text-gray-500 mt-4">Loading product harvest details...</p>
      </div>
    );
  }

  if (!product) return null;

  const handleQtyChange = (val) => {
    const num = Math.max(product.minOrderQty || 1, Number(val));
    setQuantity(num);
  };

  const handlePurchase = (purchaseType = 'standard') => {
    if (currentUser?.role === 'farmer' || currentUser?.role === 'admin') {
      showToast("Farmers and Admins cannot purchase products.", "error");
      return;
    }
    
    addToCart(product, quantity, purchaseType, campaignId);
    showToast(`Added ${quantity}kg of ${product.title} to your cart! 🛒`, "success");
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast("Please login to submit a review.", "error");
      return;
    }
    if (!reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const newRev = await dbService.addReview({
        productId: product.id,
        userName: currentUser.name,
        rating: reviewRating,
        comment: reviewComment
      });

      setReviews(prev => [newRev, ...prev]);
      setReviewComment("");
      setReviewRating(5);
      showToast("Thank you for your feedback! 🌾", "success");
    } catch (e) {
      console.error(e);
      showToast("Failed to post review", "error");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Pricing calculations
  const bulkDiscount = product?.isPreorder ? 0 : calculateBulkDiscount(quantity);
  const discountedPrice = product ? product.price * (1 - bulkDiscount / 100) : 0;
  const totalAmount = discountedPrice * quantity;
  const preorderAdvance = totalAmount * ((product?.advancePct || 0) / 100);
  const preorderBalance = totalAmount - preorderAdvance;
  
  const farmerRatingAvg = farmerReviews.length 
    ? (farmerReviews.reduce((a, b) => a + b.rating, 0) / farmerReviews.length).toFixed(1)
    : "New";

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-sm font-semibold text-gray-500 mt-4">Loading product harvest details...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
      
      {/* Back link */}
      <Link to="/" className="inline-flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-emerald-500/5 shadow-md relative group">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {product.images?.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-20 aspect-video rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                  selectedImage === img ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {product.isOrganic && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                  🌱 Certified Organic
                </span>
              )}
              {product.isPreorder && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                  ⏳ Pre-Harvest Preorder
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-dark tracking-tight leading-tight">{product.title}</h1>
            
            {/* Farmer Tag */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
              <span>Grown by</span>
              <span className="text-dark font-bold underline flex items-center space-x-0.5 cursor-pointer">
                <span>{product.farmerName}</span>
                <ShieldCheck className="w-4 h-4 text-primary fill-emerald-100" />
              </span>
              {farmerReviews.length > 0 && (
                <span className="flex items-center space-x-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 font-bold">
                  <span>★</span>
                  <span>{farmerRatingAvg} ({farmerReviews.length})</span>
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
            {product.description}
          </p>

          {/* Logistics specs */}
          <div className="grid grid-cols-2 gap-4 bg-white border border-emerald-500/5 shadow-sm p-4 rounded-2xl text-xs font-semibold text-dark">
            <div className="space-y-1">
              <span className="text-gray-400">Harvest Date:</span>
              <p className="text-primary font-bold text-sm">{formatDate(product.harvestDate)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400">Available Stock:</span>
              <p className="text-sm font-bold">{product.stock} kg</p>
            </div>
          </div>

          {/* Farmer Location Map */}
          {farmer && (farmer.coords || farmer.address) && (
            <MapViewer 
              lat={farmer.coords?.lat} 
              lng={farmer.coords?.lng} 
              address={farmer.address} 
            />
          )}

          {/* Pricing Calculator */}
          <div className="bg-emerald-50/50 border border-emerald-500/10 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Standard Price / kg</span>
                <p className="text-3xl font-black text-dark mt-0.5">{formatPrice(product.price)}</p>
              </div>
              
              {!product.isPreorder && bulkDiscount > 0 && (
                <span className="bg-accent text-dark text-xs font-black px-3 py-1.5 rounded-full border border-amber-300">
                  Bulk Sale: -{bulkDiscount}%
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 border-t border-emerald-500/10 pt-4">
              <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Quantity (kg)</label>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => handleQtyChange(quantity - 5)}
                  className="bg-white border border-emerald-200 text-dark font-black w-10 h-10 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => handleQtyChange(e.target.value)}
                  className="bg-white border border-emerald-200 text-center font-bold text-dark w-20 h-10 rounded-xl focus:outline-none focus:border-primary"
                />
                <button 
                  onClick={() => handleQtyChange(quantity + 5)}
                  className="bg-white border border-emerald-200 text-dark font-black w-10 h-10 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
                <span className="text-xs text-gray-400 font-semibold">(Min: {product.minOrderQty || 1}kg)</span>
              </div>
            </div>

            {/* Final Breakdowns */}
            <div className="border-t border-emerald-500/10 pt-4 space-y-2 text-xs font-semibold text-dark">
              {product.isPreorder ? (
                <>
                  <div className="flex justify-between">
                    <span>Total Estimated Value:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between bg-white/70 p-2 rounded-xl border border-dashed border-amber-300 text-amber-950 font-bold">
                    <span>Advance Payment Required ({product.advancePct}%):</span>
                    <span>{formatPrice(preorderAdvance)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Balance Due Post-Harvest:</span>
                    <span>{formatPrice(preorderBalance)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm font-black">
                  <span>Subtotal Value:</span>
                  <span className="text-primary">{formatPrice(totalAmount)}</span>
                </div>
              )}
            </div>

            {/* Primary CTA Buttons */}
            {product.isPreorder ? (
              <Button 
                variant="accent" 
                fullWidth 
                onClick={() => handlePurchase('preorder')}
                className="flex items-center justify-center space-x-2 py-3.5"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Preorder Now (Pay Advance)</span>
              </Button>
            ) : campaignId ? (
              <Button 
                variant="accent" 
                fullWidth 
                onClick={() => handlePurchase('groupbuy')}
                className="flex items-center justify-center space-x-2 py-3.5"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Join Group Buy (Apply Discount)</span>
              </Button>
            ) : (
              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => handlePurchase('standard')}
                className="flex items-center justify-center space-x-2 py-3.5"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Shopping Cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-emerald-500/10 pt-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-dark">Ratings & Reviews</h2>
          
          <form onSubmit={handleReviewSubmit} className="bg-white border border-emerald-500/5 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-dark text-sm">Write a Customer Review</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Rating</label>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(star => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="cursor-pointer focus:outline-none"
                  >
                    <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Your Comment</label>
              <textarea 
                rows="3"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this produce..."
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                required
              />
            </div>

            <Button 
              type="submit" 
              variant="outline" 
              size="sm" 
              fullWidth 
              loading={submittingReview}
            >
              Post Review
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-dark text-base border-b border-gray-50 pb-2">Recent Customer Feedback ({reviews.length})</h3>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map(rev => (
                <div key={rev.id} className="bg-white border border-emerald-500/5 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-dark font-bold flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{rev.userName}</span>
                    </span>
                    <span className="text-gray-400">{rev.createdAt}</span>
                  </div>
                  
                  <div className="flex space-x-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-emerald-50/20 rounded-2xl border border-dashed border-emerald-100 text-gray-400 text-xs font-semibold">
              No reviews yet for this product. Be the first to buy and review!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
