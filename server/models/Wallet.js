import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  balance: { type: Number, default: 2000 },
  rewardPoints: { type: Number, default: 150 },
  transactions: [{ type: mongoose.Schema.Types.Mixed }],
});

export default mongoose.model('Wallet', walletSchema);
