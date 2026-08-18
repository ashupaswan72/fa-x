import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { showToast } from '../../components/ui/Toast';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await resetPassword(email);
      showToast("Password reset email sent! Please check your inbox. 🌾", "success");
      setEmail("");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to trigger password reset.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-4xl">🌾</span>
        <h1 className="text-3xl font-black text-dark">Reset Password</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Provide your email to regain portal access</p>
      </div>

      <Card className="p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@fax.com"
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                required
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            loading={loading}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <KeyRound className="w-4.5 h-4.5" />
            <span>Send Reset Instructions</span>
          </Button>
        </form>

        <div className="border-t border-gray-100 pt-4 text-center">
          <Link to="/login" className="inline-flex items-center space-x-1 text-xs font-bold text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
