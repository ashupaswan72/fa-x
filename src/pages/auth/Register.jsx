import React, { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import MapPicker from '../../components/ui/MapPicker';
import { showToast } from '../../components/ui/Toast';
import { Mail, Lock, User, Phone, CheckSquare, Truck } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Registration form states
  const [role, setRole] = useState("customer"); // 'customer', 'farmer'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Farmer specific states
  const [farmName, setFarmName] = useState("");
  const [phone, setPhone] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [aadhaarDoc, setAadhaarDoc] = useState("");
  const [residentDoc, setResidentDoc] = useState("");
  
  // Delivery Partner specific states
  const [vehicleType, setVehicleType] = useState("bike");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseDoc, setLicenseDoc] = useState("");

  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleLocationSelected = (loc) => {
    setLocationCoords(loc);
    setFarmAddress(loc.address);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      showToast("Please complete the captcha verification", "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    if (role === 'farmer' && (!farmName || !phone || !farmAddress)) {
      showToast("Farmers must provide farm name, contact, and address details.", "warning");
      return;
    }

    if (role === 'delivery' && (!phone || !vehicleType || !vehicleNumber)) {
      showToast("Delivery partners must provide phone and vehicle details.", "warning");
      return;
    }

    setLoading(true);
    try {
      let additionalData = {};
      if (role === 'farmer') {
        additionalData = {
          farm_name: farmName,
          phone,
          address: farmAddress,
          coords: locationCoords,
          aadhaar_card: aadhaarDoc,
          resident_certificate: residentDoc,
          verified: false
        };
      } else if (role === 'delivery') {
        additionalData = {
          phone,
          vehicle_type: vehicleType,
          vehicle_number: vehicleNumber,
          driving_license: licenseDoc,
          verified: false
        };
      }

      await register(email, password, name, role, additionalData);
      showToast("Account successfully registered! 🌾", "success");
      
      if (role === 'farmer') {
        navigate('/farmer/kyc');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      showToast(err.message || "Registration failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      
      <div className="text-center space-y-2">
        <img src={logoImg} alt="FA-X Logo" className="h-24 w-24 mx-auto rounded-full shadow-md mb-4 object-cover" />
        <h1 className="text-3xl font-black text-dark">Create Your FA-X Account</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Join the Farm Access Exchange Network</p>
      </div>

      <Card className="p-8 space-y-6">
        
        {/* Role Toggle Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center">I want to register as a:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              type="button" 
              onClick={() => setRole('customer')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                role === 'customer' 
                  ? 'border-primary bg-emerald-50/20 text-primary shadow-sm' 
                  : 'border-gray-100 hover:border-emerald-100 text-dark'
              }`}
            >
              <span className="text-2xl">🛒</span>
              Customer
            </button>
            <button 
              type="button" 
              onClick={() => setRole('farmer')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                role === 'farmer' 
                  ? 'border-primary bg-emerald-50/20 text-primary shadow-sm' 
                  : 'border-gray-100 hover:border-emerald-100 text-dark'
              }`}
            >
              <span className="text-2xl">👨‍🌾</span>
              Farmer
            </button>
            <button 
              type="button" 
              onClick={() => setRole('delivery')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                role === 'delivery' 
                  ? 'border-primary bg-emerald-50/20 text-primary shadow-sm' 
                  : 'border-gray-100 hover:border-emerald-100 text-dark'
              }`}
            >
              <span className="text-2xl">🚚</span>
              Driver
            </button>
          </div>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Core credentials */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aman Verma"
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@email.com"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
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

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Farmer Specific Fields */}
          {role === 'farmer' && (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="font-bold text-dark text-sm">Farm Registration Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Farm / Business Name</label>
                  <input 
                    type="text" 
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. Golden Crops Farms"
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Phone</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                      required
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aadhaar Card</label>
                  <input 
                    type="file" 
                    onChange={(e) => setAadhaarDoc(e.target.files?.[0]?.name || "")}
                    className="w-full bg-emerald-50/30 border border-dashed border-emerald-200 rounded-xl px-4 py-3 text-xs text-gray-500"
                  />
                  {aadhaarDoc && <p className="text-[10px] text-primary font-bold">Selected: {aadhaarDoc}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resident Certificate</label>
                  <input 
                    type="file" 
                    onChange={(e) => setResidentDoc(e.target.files?.[0]?.name || "")}
                    className="w-full bg-emerald-50/30 border border-dashed border-emerald-200 rounded-xl px-4 py-3 text-xs text-gray-500"
                  />
                  {residentDoc && <p className="text-[10px] text-primary font-bold">Selected: {residentDoc}</p>}
                </div>
              </div>

              {/* Farmer location coordinate selector */}
              <MapPicker onLocationSelected={handleLocationSelected} />
            </div>
          )}

          {/* Delivery Partner Specific Fields */}
          {role === 'delivery' && (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="font-bold text-dark text-sm">Delivery Fleet Registration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle Type</label>
                  <select 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark font-semibold"
                    required
                  >
                    <option value="bike">Two Wheeler (Bike/Scooter)</option>
                    <option value="auto">Three Wheeler (Auto)</option>
                    <option value="mini_truck">Mini Truck</option>
                    <option value="large_truck">Heavy Truck</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle Number (RC)</label>
                  <input 
                    type="text" 
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="e.g. MH 12 AB 1234"
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Phone</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-primary text-dark"
                      required
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driving License</label>
                  <input 
                    type="file" 
                    onChange={(e) => setLicenseDoc(e.target.files?.[0]?.name || "")}
                    className="w-full bg-emerald-50/30 border border-dashed border-emerald-200 rounded-xl px-4 py-3 text-xs text-gray-500"
                  />
                  {licenseDoc && <p className="text-[10px] text-primary font-bold">Selected: {licenseDoc}</p>}
                </div>
              </div>
            </div>
          )}

          
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
            <CheckSquare className="w-4.5 h-4.5" />
            <span>Create Account & Register</span>
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center font-semibold">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-bold">Sign In here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
