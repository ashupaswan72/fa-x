import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MessageSquare, Mail, Phone, HeartHandshake } from 'lucide-react';
import { showToast } from '../ui/Toast';

const SupportCard = () => {
  const handleChat = () => showToast("Launching live chat support session... 💬", "info");
  const handleEmail = () => window.location.href = "mailto:support@fax.com";
  const handleCall = () => window.location.href = "tel:+919876543210";

  return (
    <Card className="border border-emerald-500/10 p-8 text-center max-w-2xl mx-auto space-y-6 shadow-sm hover:shadow transition-shadow relative overflow-hidden bg-white mt-12">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
      
      <div className="space-y-2">
        <div className="bg-[#2E7D32]/10 text-primary p-3.5 rounded-2xl inline-block">
          <HeartHandshake className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-black text-dark">Still Have Questions?</h3>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold max-w-sm mx-auto">
          Our support desk is online 24/7 to assist farmers with KYC verification and help customers resolve order checkouts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto pt-2">
        <Button 
          onClick={handleChat}
          variant="primary" 
          size="sm"
          className="bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Live Chat</span>
        </Button>
        
        <Button 
          onClick={handleEmail}
          variant="outline" 
          size="sm"
          className="border-gray-250 text-dark font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-primary" />
          <span>Email Us</span>
        </Button>
        
        <Button 
          onClick={handleCall}
          variant="outline" 
          size="sm"
          className="border-gray-250 text-dark font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-primary" />
          <span>Call Us</span>
        </Button>
      </div>

    </Card>
  );
};

export default SupportCard;
