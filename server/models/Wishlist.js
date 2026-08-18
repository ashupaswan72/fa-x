import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  items: [{ type: String }],
});

export default mongoose.model('Wishlist', wishlistSchema);
