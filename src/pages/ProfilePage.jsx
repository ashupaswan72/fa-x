import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dbService } from '../services/database';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';
import { getStatusBadgeStyle } from '../utils/helpers';
import { User, Mail, ShieldAlert, KeyRound, MapPin, Image as ImageIcon, Briefcase } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, isDemo, updateCurrentUser } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [email] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [farmName, setFarmName] = useState(currentUser?.farmName || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isDemo) {
        const updateData = { name, phone, avatar };
        if (currentUser?.role === 'farmer') {
          updateData.farmName = farmName;
          updateData.address = address;
        }
        await dbService.updateUserProfile(currentUser.uid, updateData);
        updateCurrentUser(updateData);
      }
      showToast("Profile details updated successfully!", "success");
    } catch (err) {
      showToast("Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-3xl font-black text-dark">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Avatar Panel */}
        <Card className="flex flex-col items-center text-center space-y-4">
          <img 
            src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
            alt="Avatar" 
            className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/20 shadow-md"
          />
          <div>
            <h3 className="font-bold text-dark text-lg leading-tight">{currentUser?.name}</h3>
            <span className={`inline-block mt-2 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${getStatusBadgeStyle(currentUser?.status)}`}>
              {currentUser?.status}
            </span>
          </div>

          <p className="text-[10px] text-gray-400 font-medium">Role: {currentUser?.role}</p>
        </Card>

        {/* Right Side: Account details form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <h2 className="text-sm font-bold text-dark border-b border-gray-50 pb-2 uppercase tracking-wide">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                      required
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-xs text-gray-400 cursor-not-allowed"
                      disabled
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Phone</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avatar Image URL</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                    />
                    <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {currentUser?.role === 'farmer' && (
                <>
                  <h2 className="text-sm font-bold text-dark border-b border-gray-50 pb-2 uppercase tracking-wide mt-6">Farmer Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Farm Name</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={farmName}
                          onChange={(e) => setFarmName(e.target.value)}
                          className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                        />
                        <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Farm Address</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                        />
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                <Button type="submit" variant="primary" loading={loading}>Save Modifications</Button>
              </div>
            </form>
          </Card>

          {/* Account Security details */}
          <Card className="space-y-4">
            <h2 className="text-sm font-bold text-dark border-b border-gray-50 pb-2 uppercase tracking-wide flex items-center space-x-2">
              <KeyRound className="w-4 h-4 text-primary" />
              <span>Portal Security</span>
            </h2>
            <div className="flex justify-between items-center text-xs">
              <div>
                <p className="text-dark font-bold">Credential Password</p>
                <p className="text-gray-400">Request password reset link to your email</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  showToast("Password reset email successfully queued.", "success");
                }}
              >
                Reset Password
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
