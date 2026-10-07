import React, { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { showToast } from '../../components/ui/Toast';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const redirectPath = location.state?.from || '/';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (!turnstileToken) {
      showToast("Please complete the captcha verification", "error");
      return;
    }
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
  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      
      {/* Brand Icon Header */}
      <div className="text-center space-y-2">
        <img src={logoImg} alt="FA-X Logo" className="h-24 w-24 mx-auto rounded-full shadow-md mb-4 object-cover" />
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

          
          <div className="flex justify-center my-4">
            <Turnstile siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess={setTurnstileToken} />
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
