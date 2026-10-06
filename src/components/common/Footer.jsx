import React from 'react';
import logoImg from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-1.5 inline-block">
              <img src={logoImg} alt="FA-X Logo" className="h-14 w-14 rounded-full shadow-sm object-cover" />
            </Link>
            
            <p className="text-xs font-medium text-gray-500 leading-relaxed">
              India's premium direct-to-consumer agricultural marketplace. Fair prices for farmers, fresh food for you.
            </p>
            
            <div className="flex items-center gap-2 pt-2">
              <a href="#" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-[#4CAF50] hover:text-white transition-colors">FB</a>
              <a href="#" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-[#4CAF50] hover:text-white transition-colors">TW</a>
              <a href="#" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-[#4CAF50] hover:text-white transition-colors">IG</a>
              <a href="#" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-[#4CAF50] hover:text-white transition-colors">IN</a>
              <a href="#" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:bg-[#4CAF50] hover:text-white transition-colors">YT</a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-bold text-[#11311F] mb-6 text-sm">Explore FA-X</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">About FA-X</Link></li>
              <li><Link to="/shop" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Shop</Link></li>
              <li><Link to="/categories" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Categories</Link></li>
              <li><Link to="/farmers" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Farmers</Link></li>
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="font-bold text-[#11311F] mb-6 text-sm">Our Features</h4>
            <ul className="space-y-4">
              <li><Link to="/group-buying" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Group Buying</Link></li>
              <li><Link to="/ai-market" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">AI Market</Link></li>
              <li><Link to="/contact" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-bold text-[#11311F] mb-6 text-sm">Legal & Contact</h4>
            <ul className="space-y-4 mb-6">
              <li><Link to="/privacy" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">Terms & Conditions</Link></li>
            </ul>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-[#4CAF50]" />
                <span className="text-xs font-medium">1800-FAX-FARM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-[#4CAF50]" />
                <span className="text-xs font-medium">support@fax.com</span>
              </div>
            </div>
          </div>
          
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-gray-400">© {new Date().getFullYear()} Farm Access Exchange (FA-X). All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">SECURE PAYMENTS</span>
            <div className="flex gap-2 ml-2 opacity-50 grayscale">
              {/* Using generic placeholders for payment icons to avoid branding issues as per standard practice, but text is fine */}
              <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
              <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
              <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">UPI</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
