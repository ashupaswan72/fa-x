import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../../services/database';
import { formatPrice } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Trash2, ShoppingCart, HeartCrack } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const CustomerWishlist = () => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (currentUser) {
      try {
        const savedIds = await dbService.getUserWishlist(currentUser.uid);
        const prods = await dbService.getProducts();
        setWishlist(prods.filter(p => savedIds.includes(p.id)));
      } catch (e) {
        console.error("Error loading wishlist from Firestore:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [currentUser]);

  const handleRemove = async (id) => {
    if (!currentUser) return;
    try {
      const nextList = wishlist.filter(p => p.id !== id);
      setWishlist(nextList);
      await dbService.updateUserWishlist(currentUser.uid, nextList.map(p => p.id));
      showToast("Removed from wishlist.", "info");
    } catch (e) {
      console.error(e);
      showToast("Failed to remove item", "error");
    }
  };

  const handleMoveToCart = (product) => {
    addToCart(product, product.minOrderQty || 1, 'standard');
    showToast(`Added ${product.title} to cart! 🛒`, "success");
    handleRemove(product.id);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-dark">My Wishlist</h1>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading wishlist...</div>
      ) : wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map(product => (
            <Card key={product.id} className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <img src={product.images?.[0]} alt={product.title} className="w-full h-40 object-cover rounded-xl bg-emerald-50" />
                
                <div>
                  <h3 className="font-bold text-dark text-sm">{product.title}</h3>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Price: {formatPrice(product.price)} / kg</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2 border-t border-gray-50">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex-grow flex items-center justify-center space-x-1"
                  onClick={() => handleMoveToCart(product)}
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  <span>Move to Cart</span>
                </Button>
                
                <button 
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-50 p-6 max-w-md mx-auto space-y-4">
          <HeartCrack className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-dark text-sm">Your Wishlist is Empty</h3>
          <p className="text-[11px] text-gray-400 leading-normal">Save items to buy later. They will appear here for easy checkouts.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerWishlist;
