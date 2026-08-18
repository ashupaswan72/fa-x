import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { formatPrice } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Check, X, Star, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'approved', 'rejected'
  
  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await dbService.getProducts();
      // Initialize missing statuses for legacy products
      const normalizedData = data.map(p => ({
        ...p,
        status: p.status || 'approved',
        is_featured: p.is_featured || false
      }));
      setProducts(normalizedData);
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await dbService.updateProductStatus(id, newStatus);
      showToast(`Product ${newStatus} successfully!`, "success");
      fetchProducts();
    } catch (e) {
      console.error(e);
      showToast(`Failed to update status`, "error");
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await dbService.toggleProductFeatured(id, !currentStatus);
      showToast(`Product ${!currentStatus ? 'featured' : 'unfeatured'}!`, "success");
      fetchProducts();
    } catch (e) {
      console.error(e);
      showToast(`Failed to update feature status`, "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this product? This action cannot be undone.")) {
      try {
        await dbService.deleteProductAdmin(id);
        showToast("Product deleted successfully.", "warning");
        fetchProducts();
      } catch (e) {
        console.error(e);
        showToast("Delete failed", "error");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, title, description, price, stock, category, imageUrl } = editingProduct;
      await dbService.updateProductFullAdmin(id, { 
        title, 
        description, 
        price: Number(price), 
        stock: Number(stock), 
        category,
        imageUrl: imageUrl || (editingProduct.images?.[0] || '')
      });
      showToast("Product updated successfully!", "success");
      setEditingProduct(null);
      fetchProducts();
    } catch (e) {
      console.error(e);
      showToast("Update failed", "error");
    }
  };

  const filteredProducts = products.filter(p => p.status === activeTab);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-dark">Product Management</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Review listings, manage catalog quality, and curate featured products.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-100 pb-2">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${activeTab === 'pending' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-dark'}`}
        >
          Pending Review ({products.filter(p => p.status === 'pending').length})
        </button>
        <button 
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${activeTab === 'approved' ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-500' : 'text-gray-400 hover:text-dark'}`}
        >
          Active Catalog ({products.filter(p => p.status === 'approved').length})
        </button>
        <button 
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${activeTab === 'rejected' ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500' : 'text-gray-400 hover:text-dark'}`}
        >
          Rejected ({products.filter(p => p.status === 'rejected').length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading catalog...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="flex flex-col overflow-hidden p-0 group">
              {/* Product Image */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black uppercase text-dark tracking-wider shadow-sm">
                    {product.category}
                  </span>
                  {product.is_featured && (
                    <span className="bg-amber-400/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black uppercase text-white tracking-wider shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-grow space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-dark text-sm leading-tight">{product.title}</h3>
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">By {product.farmerName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-primary text-sm">{formatPrice(product.price)}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{product.stock} in stock</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 border-t border-gray-50 bg-gray-50/30 flex flex-wrap gap-2">
                
                {activeTab === 'pending' && (
                  <>
                    <Button variant="primary" size="sm" onClick={() => handleUpdateStatus(product.id, 'approved')} className="flex-1 flex justify-center space-x-1 py-1.5">
                      <Check className="w-3.5 h-3.5" /> <span className="text-[10px]">Approve</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(product.id, 'rejected')} className="flex-1 flex justify-center space-x-1 py-1.5 text-rose-500 border-rose-200">
                      <X className="w-3.5 h-3.5" /> <span className="text-[10px]">Reject</span>
                    </Button>
                  </>
                )}

                {activeTab === 'approved' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleToggleFeatured(product.id, product.is_featured)} 
                      className={`flex-1 flex justify-center space-x-1 py-1.5 ${product.is_featured ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-gray-500 hover:text-amber-500'}`}
                    >
                      <Star className={`w-3.5 h-3.5 ${product.is_featured ? 'fill-amber-500' : ''}`} /> 
                      <span className="text-[10px]">{product.is_featured ? 'Unfeature' : 'Feature'}</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)} className="flex-1 flex justify-center space-x-1 py-1.5 text-blue-500 border-blue-200">
                      <Edit3 className="w-3.5 h-3.5" /> <span className="text-[10px]">Edit</span>
                    </Button>
                  </>
                )}

                {(activeTab === 'rejected' || activeTab === 'approved') && (
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors shrink-0"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-emerald-50">
          <p className="text-xs text-gray-500 font-semibold">No {activeTab} products found in the catalog.</p>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-sm font-black text-dark">Edit Product Details</h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Product Title</label>
                <input 
                  type="text" 
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                  className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Description</label>
                <textarea 
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Price (,1)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Stock Inventory</label>
                  <input 
                    type="number" 
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                    className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Category</label>
                <select 
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none bg-white"
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="dairy">Dairy</option>
                  <option value="spices">Spices & Herbs</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Image URL</label>
                <input 
                  type="text" 
                  value={editingProduct.imageUrl !== undefined ? editingProduct.imageUrl : (editingProduct.images?.[0] || '')}
                  onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                  placeholder="https://unsplash.com/crop.jpg"
                  className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-gray-200 focus:border-primary outline-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
