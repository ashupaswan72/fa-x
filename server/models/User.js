import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['customer', 'farmer', 'admin'], default: 'customer' },
  status: { type: String, default: 'verified' },
  avatar: { type: String },
  farmName: { type: String },
  phone: { type: String },
  address: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
