import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String },
  harvestDate: { type: String },
  isOrganic: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  minOrderQty: { type: Number, default: 1 },
  isPreorder: { type: Boolean, default: false },
  advancePct: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
