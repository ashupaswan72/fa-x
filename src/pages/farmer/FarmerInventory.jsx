import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice, formatDate } from '../../utils/helpers';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Plus, Pencil, Trash2, ShieldCheck, Leaf } from 'lucide-react';

const FarmerInventory = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minOrderQty, setMinOrderQty] = useState("");
  const [category, setCategory] = useState("vegetables");
  const [harvestDate, setHarvestDate] = useState("");
  const [isOrganic, setIsOrganic] = useState(false);
  const [isPreorder, setIsPreorder] = useState(false);
  const [advancePct, setAdvancePct] = useState(25);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchInventory = async () => {
    if (currentUser) {
      try {
        const allProds = await dbService.getProducts();
        setProducts(allProds.filter(p => p.farmerId === currentUser.uid));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [currentUser]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setStock("");
    setMinOrderQty("");
    setCategory("vegetables");
    setHarvestDate("");
    setIsOrganic(false);
    setIsPreorder(false);
    setAdvancePct(25);
    setImageUrl("");
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setMinOrderQty(product.minOrderQty);
    setCategory(product.category);
    setHarvestDate(product.harvestDate);
    setIsOrganic(product.isOrganic);
    setIsPreorder(product.isPreorder);
    setAdvancePct(product.advancePct || 25);
    setImageUrl(product.images?.[0] || "");
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this crop listing?")) {
      try {
        await dbService.deleteProduct(id);
        showToast("Crop listing deleted.", "info");
        fetchInventory();
      } catch (e) {
        console.error(e);
        showToast("Failed to delete product.", "error");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !stock || !minOrderQty || !harvestDate) {
      showToast("Please fill out all required fields.", "warning");
      return;
    }

    setSubmitting(true);
    let finalImageUrl = imageUrl;
    
    try {
      if (imageFile) {
        finalImageUrl = await dbService.uploadProductImage(imageFile, currentUser.uid);
      }

      const prodPayload = {
        farmerId: currentUser.uid,
        farmerName: currentUser.name,
        title,
        description,
        price: Number(price),
        stock: Number(stock),
        minOrderQty: Number(minOrderQty),
        category,
        harvestDate,
        isOrganic,
        isPreorder,
        advancePct: isPreorder ? Number(advancePct) : 0,
        images: [finalImageUrl || "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600"]
      };

      if (editingProduct) {
        await dbService.updateProduct(editingProduct.id, prodPayload);
        showToast("Crop specifications updated! 🌾", "success");
      } else {
        await dbService.addProduct(prodPayload);
        showToast("New crop added to inventory successfully! 🌾", "success");
      }
      setIsModalOpen(false);
      fetchInventory();
    } catch (err) {
      console.error(err);
      showToast("Operation failed.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
        <div>
          <h1 className="text-3xl font-black text-dark">My Crop Inventory</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Directly regulate listings, pricing thresholds, and preorders.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleOpenAddModal}
          className="flex items-center space-x-1"
        >
          <Plus className="w-5.5 h-5.5" />
          <span>Add New Crop</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs font-semibold text-gray-400">Loading catalog...</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <Card key={prod.id} className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-emerald-50">
                  <img src={prod.images?.[0]} alt={prod.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1">
                    {prod.isOrganic && (
                      <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        🌱 Organic
                      </span>
                    )}
                    {prod.isPreorder && (
                      <span className="bg-amber-500 text-dark text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        ⏳ Preorder
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-dark text-sm leading-snug">{prod.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">{prod.category} • stock: {prod.stock}kg</p>
                    {prod.stock <= prod.minOrderQty * 2 && prod.stock > 0 && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-100">
                        Low Stock
                      </span>
                    )}
                    {prod.stock === 0 && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full border border-red-200">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold text-dark bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-500/5">
                  <span>Price: {formatPrice(prod.price)}/kg</span>
                  <span>Min Qty: {prod.minOrderQty}kg</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2 border-t border-gray-50">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleOpenEditModal(prod)}
                  className="flex-grow flex items-center justify-center space-x-1"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Specs</span>
                </Button>
                <button 
                  onClick={() => handleDelete(prod.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-colors cursor-pointer"
                  title="Delete Crop"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-50 max-w-md mx-auto space-y-4">
          <Leaf className="w-12 h-12 text-emerald-600/30 mx-auto" />
          <h3 className="font-bold text-dark text-sm">No crops in your inventory</h3>
          <p className="text-[11px] text-gray-400">Click the button above to add your first crop listing to the FA-X marketplace.</p>
        </div>
      )}

      {/* Form Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <Card className="max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="font-bold text-dark text-lg">{editingProduct ? 'Edit Crop specifications' : 'Register New Crop'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-dark text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold text-dark">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Crop / Product Title *</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Organic Alphonsos"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Product Description</label>
                <textarea 
                  rows="2"
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details about seed quality, farming process..."
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Price per kg (₹) *</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total Quantity Available (kg) *</label>
                  <input 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Min Order Threshold (kg) *</label>
                  <input 
                    type="number" 
                    value={minOrderQty} 
                    onChange={(e) => setMinOrderQty(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Harvest Date *</label>
                  <input 
                    type="date" 
                    value={harvestDate} 
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Crop Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains & Pulses</option>
                    <option value="dairy">Dairy & Eggs</option>
                    <option value="spices">Spices & Honey</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Product Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                        setImageUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-dark text-xs"
                  />
                  {imageUrl && (
                    <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-emerald-100 bg-emerald-50">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex space-x-6 border-t border-gray-50 pt-4">
                <label className="flex items-center space-x-2 text-dark cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isOrganic} 
                    onChange={(e) => setIsOrganic(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-emerald-300 text-primary"
                  />
                  <span>🌱 Certify Organic</span>
                </label>

                <label className="flex items-center space-x-2 text-dark cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isPreorder} 
                    onChange={(e) => setIsPreorder(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-emerald-300 text-primary"
                  />
                  <span>⏳ Pre-harvest Preorder</span>
                </label>
              </div>

              {isPreorder && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-1 animate-fade-in">
                  <label className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">Preorder Advance Deposit (%)</label>
                  <input 
                    type="number" 
                    value={advancePct} 
                    onChange={(e) => setAdvancePct(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500 text-dark"
                  />
                  <p className="text-[9px] text-amber-600">Percentage the customer pays upfront to secure allocation.</p>
                </div>
              )}

              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                loading={submitting}
                className="py-3"
              >
                {editingProduct ? 'Save Crop spec updates' : 'Register Crop'}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FarmerInventory;
