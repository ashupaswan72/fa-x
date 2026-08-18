import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerName: { type: String },
  farmerId: { type: String },
  farmerName: { type: String },
  type: { type: String, enum: ['standard', 'preorder', 'groupbuy'] },
  items: [{ type: mongoose.Schema.Types.Mixed }],
  totalAmount: { type: Number },
  payableToday: { type: Number },
  paymentStatus: { type: String, default: 'pending' },
  deliveryStatus: { type: String, default: 'pending' },
  shippingAddress: { type: mongoose.Schema.Types.Mixed },
  paymentDetails: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
