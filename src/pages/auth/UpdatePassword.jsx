import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';
import { Lock } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      showToast("Password updated successfully!", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to update password.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <img src={logoImg} alt="FA-X Logo" className="h-24 w-24 mx-auto rounded-full shadow-md mb-4 object-cover" />
        <h1 className="text-3xl font-black text-dark">Set New Password</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Please enter your new password</p>
      </div>

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">New Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          disabled={loading}
          className="bg-[#4CAF50] hover:bg-[#3d8c40] text-white py-3 rounded-xl shadow-lg shadow-green-500/30"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
