import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice, formatDate } from '../../utils/helpers';
import { payWithRazorpay } from '../../services/razorpay';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Wallet, Award, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

const CustomerWallet = () => {
  const { currentUser } = useAuth();
  const { balance, rewardPoints, transactions, depositFunds } = useWallet();
  const [topUpAmount, setTopUpAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(topUpAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      showToast("Please enter a valid amount to deposit.", "warning");
      return;
    }

    setLoading(true);
    // Trigger Razorpay Checkout for simulated top up
    payWithRazorpay({
      amount: amountNum,
      description: "FA-X Wallet Top-up Funds",
      name: currentUser?.name || "Customer",
      email: currentUser?.email || "customer@fax.com",
      phone: "9876543210",
      onSuccess: (resp) => {
        depositFunds(amountNum);
        showToast(`Successfully deposited ${formatPrice(amountNum)} into your digital wallet! 🌾`, "success");
        setTopUpAmount("");
        setLoading(false);
      },
      onCancel: () => {
        showToast("Top-up transaction cancelled.", "info");
        setLoading(false);
      }
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-dark">Digital Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Balance cards & Add Funds */}
        <div className="lg:col-span-1 space-y-6">
          
          <Card className="gradient-green text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
            
            <div className="flex items-center space-x-3 opacity-90">
              <Wallet className="w-6 h-6 text-secondary" />
              <span className="text-xs font-bold uppercase tracking-widest leading-none">Wallet balance</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-4xl font-black">{formatPrice(balance)}</h2>
              <p className="text-[10px] text-emerald-200 font-semibold flex items-center space-x-1">
                <span>🛡️</span> <span>Secured Escrow Account</span>
              </p>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center space-x-2 text-dark font-black">
              <Award className="w-5 h-5 text-primary" />
              <h3>Loyalty Rewards</h3>
            </div>
            
            <div className="flex justify-between items-center text-xs font-semibold text-dark">
              <span>Points Balance:</span>
              <span className="text-primary font-black text-sm">{rewardPoints} pts</span>
            </div>
            <p className="text-[9.5px] text-gray-400 font-medium leading-relaxed">
              Earn 1 reward point for every ₹20 spent on purchases. Every 100 points can be applied at checkout as a flat ₹100 discount deduction.
            </p>
          </Card>

          <Card className="space-y-4">
            <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2">Deposit Funds</h3>
            
            <form onSubmit={handleTopUpSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Top-up Amount (INR)</label>
                <input 
                  type="number" 
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="e.g. 1000"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                loading={loading}
                className="flex items-center justify-center space-x-2 text-xs py-2.5"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Add Wallet Funds</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Side: Ledger Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6">
            <h2 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Transaction History Ledger</h2>
            
            {transactions.length > 0 ? (
              <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto pr-2 space-y-4">
                {transactions.map(tx => {
                  const isCredit = tx.type.includes('credit');
                  const isPoints = tx.type.includes('points');

                  return (
                    <div key={tx.id} className="flex justify-between items-center text-xs font-semibold text-dark pt-3 first:pt-0">
                      <div className="space-y-0.5">
                        <p className="font-bold text-dark">{tx.description}</p>
                        <p className="text-[9.5px] text-gray-400 font-medium">{formatDate(tx.date)}</p>
                      </div>

                      <div className="flex items-center space-x-2 text-right">
                        <span className={`font-black text-sm flex items-center space-x-1 ${
                          isCredit ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          <span>{isCredit ? '+' : '-'}</span>
                          <span>{isPoints ? `${tx.amount} pts` : formatPrice(tx.amount)}</span>
                        </span>
                        <span>
                          {isCredit ? (
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400 font-semibold text-xs">
                No ledger transactions found. Your transactions will populate here.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerWallet;
