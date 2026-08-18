import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Mail, Sparkles } from 'lucide-react';
import { showToast } from '../ui/Toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Subscription successful! You will receive preorder and harvest alerts. 🌾", "success");
      setEmail("");
    }, 1000);
  };

  return (
    <Card className="border border-emerald-500/10 p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden bg-white mt-12 mb-12">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="space-y-2">
        <div className="bg-[#2E7D32]/10 text-primary p-3 rounded-2xl inline-block">
          <Sparkles className="w-5.5 h-5.5" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-dark tracking-tight">Stay Connected with FA-X</h3>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-sm mx-auto">
          Receive fresh harvest alerts, preorder notifications and exclusive offers directly in your inbox.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
        <div className="relative flex-grow">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..." 
            className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 pl-11 text-xs focus:outline-none focus:border-primary text-dark"
            required
          />
          <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          loading={loading}
          className="bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold px-6 py-3 rounded-xl text-xs flex justify-center items-center cursor-pointer shadow border-none"
        >
          Subscribe
        </Button>
      </form>

    </Card>
  );
};

export default NewsletterSection;
