import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#11311F] pt-16 pb-8 border-t-[8px] border-[#EABE4F]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          
          {/* Logo & Socials */}
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex flex-col shrink-0 inline-block">
              <div className="flex items-start">
                <span className="text-4xl font-black text-[#EABE4F] tracking-tighter leading-none">FA-X</span>
                <Leaf className="w-5 h-5 text-[#EABE4F] -ml-1 -mt-1 transform -rotate-12" />
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-[#EABE4F]/60 mt-1">FARMERS TO YOU</span>
            </Link>
            
            <p className="text-sm font-medium text-white/60 max-w-xs leading-relaxed">
              Connecting farmers and consumers for a healthier, better tomorrow.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#EABE4F] hover:text-[#11311F] transition-all font-bold text-[10px]">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#EABE4F] hover:text-[#11311F] transition-all font-bold text-[10px]">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#EABE4F] hover:text-[#11311F] transition-all font-bold text-[10px]">
                X
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#EABE4F] hover:text-[#11311F] transition-all font-bold text-[10px]">
                YT
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#EABE4F] hover:text-[#11311F] transition-all font-bold text-[10px]">
                IN
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Blog</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">For Farmers</h4>
            <ul className="space-y-3">
              <li><Link to="/register" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Become a Farmer</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Farmer Resources</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Loan Support</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">AI Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">For Customers</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Shop Now</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Track Order</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">FAQs</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Feedback</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Report Issue</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Terms of Use</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Refund Policy</Link></li>
              <li><Link to="#" className="text-xs font-semibold text-white/60 hover:text-[#EABE4F] transition-colors">Sitemap</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-white/40">
          <p>© 2026 FA-X. All rights reserved.</p>
          <p>Fresh Produce. Fair Prices. Better Tomorrow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
