import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { showToast } from '../ui/Toast';

const BulkOrderSection = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    cropType: "Vegetables",
    estimatedQty: ""
  });

  const handleRequestQuote = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Quote request submitted! Our corporate sales team will contact you. 🌾", "success");
      setFormData({ businessName: "", contactPerson: "", email: "", cropType: "Vegetables", estimatedQty: "" });
    }, 1000);
  };

  return (
    <section className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl border border-emerald-500/5 p-8 shadow-sm mb-12">
      
      {/* Left side info */}
      <div className="lg:col-span-6 space-y-6">
        <span className="bg-[#FF9800]/10 text-[#FF9800] border border-[#FF9800]/10 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block">
          For Businesses
        </span>
        
        <h2 className="text-3xl font-black tracking-tight text-dark leading-none">
          Special Bulk Pricing & Sourcing <br />
          For Commercial Buyers
        </h2>

        <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-md">
          Sourcing for restaurants, hotels, hostels, retailers, and wholesalers. FA-X arranges cold chains and escrow-backed freight logistics with up to 15% discount.
        </p>

        <div className="space-y-3 pt-2 text-xs font-bold text-dark">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>Dedicated Freight Logistics & Cold Storages</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>Corporate Billing, GST invoices, and Escrow protected contracts</span>
          </div>
        </div>

        <div className="flex space-x-4 pt-2">
          <a href="mailto:sales@fax.com" className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100/70 text-[#2E7D32] px-5 py-3 rounded-xl text-xs font-black transition-colors">
            <Mail className="w-4 h-4" />
            <span>sales@fax.com</span>
          </a>
          <a href="tel:+919876543210" className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100/70 text-[#2E7D32] px-5 py-3 rounded-xl text-xs font-black transition-colors">
            <Phone className="w-4 h-4" />
            <span>+91 98765 43210</span>
          </a>
        </div>
      </div>

      {/* Right side form */}
      <div className="lg:col-span-6">
        <Card className="border border-emerald-500/10 p-6 space-y-4 bg-white">
          <h3 className="font-black text-sm text-dark border-b border-gray-50 pb-2 uppercase tracking-wide">
            Request Commercial Quote
          </h3>

          <form onSubmit={handleRequestQuote} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Business / Company Name</label>
                <input 
                  type="text" 
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Radisson Hotels"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Contact Representative</label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g. Amit Kumar"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Work Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="representative@hotel.com"
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary text-dark"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Crop category</label>
                <select 
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains / Rice</option>
                  <option value="Spices">Spices / Honey</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Estimated Batch Volume</label>
                <input 
                  type="text" 
                  value={formData.estimatedQty}
                  onChange={(e) => setFormData({ ...formData, estimatedQty: e.target.value })}
                  placeholder="e.g. 500 kg"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary text-dark"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
              className="w-full py-3 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold rounded-xl cursor-pointer flex items-center justify-center space-x-1 border-none"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>

    </section>
  );
};

export default BulkOrderSection;
