import mongoose from 'mongoose';

const groupBuySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productTitle: { type: String },
  farmerId: { type: String },
  targetMembers: { type: Number, required: true },
  currentMembers: { type: Number, default: 0 },
  discountPct: { type: Number, default: 0 },
  deadline: { type: String },
  buyerIds: [{ type: String }],
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('GroupBuy', groupBuySchema);
