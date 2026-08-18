import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
});

export default mongoose.model('Review', reviewSchema);
