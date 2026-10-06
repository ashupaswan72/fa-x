import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { showToast } from '../../components/ui/Toast';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const { login, loginWithGoogle, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.from || '/';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      showToast("Successfully logged in! Welcome back. 🌾", "success");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to log in.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      showToast("Google Login failed.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      
      {/* Brand Icon Header */}
      <div className="text-center space-y-2">
        <span className="text-4xl">🌾</span>
        <h1 className="text-3xl font-black text-dark">Welcome to FA-X</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Farm Access Exchange Portal</p>
      </div>

      <Card className="space-y-6 p-8">
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
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

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" className="text-[10px] font-bold text-primary hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                required
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            loading={loading}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <LogIn className="w-4.5 h-4.5" />
            <span>Sign In</span>
          </Button>
        </form>

        <div className="relative flex items-center justify-center py-2">
          <div className="border-t border-gray-100 w-full" />
          <span className="bg-white px-3 text-[10px] text-gray-400 font-bold uppercase absolute">OR</span>
        </div>

        {/* Google sign-in */}
        <Button 
          type="button" 
          variant="outline" 
          fullWidth 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center space-x-2 border-gray-200 text-dark font-bold hover:bg-gray-50 py-3"
        >
          <img src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=48" alt="Google" className="w-4.5 h-4.5 rounded-full object-cover" />
          <span>Sign In with Google</span>
        </Button>

        {/* Register link */}
        <p className="text-xs text-gray-500 text-center font-semibold">
          New to the exchange?{' '}
          <Link to="/register" className="text-primary hover:underline font-bold">Register here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
