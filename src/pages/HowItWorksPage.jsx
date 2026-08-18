import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, PlusCircle, Search, HelpCircle, 
  CreditCard, Sprout, Truck, Heart, ArrowRight, 
  ShieldCheck, Percent, ShoppingBag, Landmark, Users, Layers,
  TrendingUp, CloudRain, Star, ChevronDown, Check, CheckCircle,
  Mail, Phone, MapPin, Award, ShieldAlert, Sparkles, DollarSign
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

// Animations Config
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const HowItWorksPage = () => {

  const handleStartShopping = () => {
    const el = document.getElementById('buying-options');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    showToast("Browse our active pre-harvest crops below! 🌾", "info");
  };

  const handleBecomeFarmer = () => {
    window.location.href = '/register';
  };

  return (
    <div className="bg-[#F8FFF8] min-h-screen text-[#1B1B1B] font-sans selection:bg-[#2E7D32] selection:text-white overflow-x-hidden">
      
      {/* -------------------------------------------------- */}
      {/* HERO SECTION                                       */}
      {/* -------------------------------------------------- */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#4CAF50]/10 blur-3xl" />
          <div className="absolute top-[40%] -left-[15%] w-[50%] h-[50%] rounded-full bg-[#2E7D32]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Farmer Image */}
          <motion.div 
            variants={slideRight}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-sm md:max-w-md">
              {/* Decorative Card Shapes */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#2E7D32] to-[#FFB300] rounded-[2.5rem] opacity-20 blur-xl animate-pulse" />
              
              <div className="relative bg-white p-4 rounded-[2.5rem] border border-emerald-500/10 shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600" 
                  alt="FA-X Organic Farmer" 
                  className="w-full h-[400px] object-cover rounded-[2rem] bg-emerald-50"
                />
                
                {/* Float Card Overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-xl flex items-center space-x-3">
                  <div className="bg-emerald-500 text-white p-2.5 rounded-xl">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rahul G. • Verified Farmer</p>
                    <p className="text-xs font-black text-dark">Junagadh Organic Crops</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Pitch */}
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2"
          >
            <span className="inline-flex items-center space-x-2 bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/15 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FFB300] fill-[#FFB300]" />
              <span>Direct Farm Access Ecosystem</span>
            </span>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1B1B1B] leading-none">
              How <span className="text-[#2E7D32] relative">FA-X<span className="absolute bottom-1 left-0 w-full h-1 bg-[#FFB300]" /></span> Works
            </h1>

            <p className="text-sm md:text-lg font-medium text-gray-500 leading-relaxed max-w-xl">
              FA-X connects farmers directly with customers through preorders, group buying, and bulk purchasing to reduce wastage and increase farmer income.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                onClick={handleStartShopping}
                variant="primary" 
                className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#2E7D32]/95 hover:to-[#4CAF50]/95 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/10 cursor-pointer flex items-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button 
                onClick={handleBecomeFarmer}
                variant="outline" 
                className="border-gray-200 text-[#1B1B1B] font-bold px-8 py-4 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Become a Farmer
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Mouse animation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STEP BY STEP TIMELINE                              */}
      {/* -------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 border-t border-emerald-500/5 relative">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-20">
          <span className="text-[#FFB300] text-xs font-black uppercase tracking-widest">Platform Timeline</span>
          <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">The 8-Step Lifecycle</h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            Witness how our demand-driven mechanics bridge the gap between rural farms and urban dining tables.
          </p>
        </div>

        {/* Connecting Lines & Cards Grid */}
        <div className="relative">
          {/* Central Connecting Trail Line (Desktop only) */}
          <div className="absolute top-[180px] left-[5%] right-[5%] h-1 bg-gradient-to-r from-emerald-100 via-[#4CAF50] to-emerald-100 hidden xl:block z-0" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 z-10 relative"
          >
            {/* Step 1 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">1</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><UserCheck className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-2 border-emerald-500/5 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-sm text-dark">Step 1: Farmer Registers</h4>
                <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                  Farmers create accounts, upload document folders (KYC verified by Admin), and link their bank account and UPI details.
                </p>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">2</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><PlusCircle className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-4 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 2: Listing Products</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Farmer lists crops before harvest with expected dates, weights, and base prices.
                  </p>
                </div>
                {/* Crop Mock Subcard */}
                <div className="bg-[#F8FFF8] border border-emerald-500/10 rounded-xl p-3 text-[10px] space-y-1 font-semibold">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-dark text-xs">Organic Tomato</span>
                    <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[8px] font-black uppercase">Organic</span>
                  </div>
                  <p className="text-gray-400">Harvest: <span className="text-dark font-bold">15 August</span></p>
                  <p className="text-gray-400">Qty: <span className="text-dark font-bold">500 kg</span></p>
                  <p className="text-primary font-black text-xs">₹40/kg</p>
                </div>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">3</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><Search className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-4 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 3: Buyers Browse</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Customers search, filter parameters, and inspect listings.
                  </p>
                </div>
                {/* Product Mock Card */}
                <div className="bg-[#F8FFF8] border border-emerald-500/10 rounded-xl p-3 space-y-2 text-[10px] font-semibold">
                  <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=200" alt="Alphonso Mango" className="w-full h-16 object-cover rounded-lg" />
                  <div>
                    <h5 className="font-bold text-dark text-[11px]">Alphonso Mango</h5>
                    <p className="text-primary font-bold text-[11px]">₹80/kg</p>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-100">
                    <span>★ 4.9 (42)</span>
                    <span className="text-amber-600">Stock: 1000kg</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Step 4 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">4</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><HelpCircle className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-3 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 4: Customer Chooses</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Select a procurement path that matches your volume and budget:
                  </p>
                </div>
                <div className="space-y-1.5 text-[9.5px] font-bold">
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-1 rounded-lg">Buy Now (Standard Spot)</div>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded-lg">Preorder (20% Deposit)</div>
                  <div className="bg-purple-50 border border-purple-200 text-purple-800 px-2 py-1 rounded-lg">Group Buy (Community Pools)</div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Spacer for next row (Desktop only) */}
          <div className="h-16 hidden xl:block" />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 z-10 relative mt-8 xl:mt-0"
          >
            {/* Step 5 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">5</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><CreditCard className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-4 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 5: Secure Payment</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Check out securely. For preorders, pay 20% advance now and the remaining balance after harvest.
                  </p>
                </div>
                {/* Payment Subcard */}
                <div className="bg-[#F8FFF8] border border-emerald-500/10 rounded-xl p-3 text-[10px] space-y-2 font-bold text-dark">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                    <span className="text-[9px] uppercase text-gray-400 font-black">Escrow Wallet</span>
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] px-1.5 py-0.5 rounded text-[8px]">Shield Certified</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[8.5px] text-center">
                    <span className="bg-white border border-gray-100 py-1 rounded">UPI</span>
                    <span className="bg-white border border-gray-100 py-1 rounded">Cards</span>
                    <span className="bg-white border border-gray-100 py-1 rounded">Net</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Step 6 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">6</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><Sprout className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-4 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 6: Farmer Harvests</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Farmer pulls crops matching pre-booked demand, preventing warehouse storage waste.
                  </p>
                </div>
                {/* Harvest Meter */}
                <div className="bg-[#F8FFF8] border border-emerald-500/10 rounded-xl p-3 text-[10px] space-y-1.5 font-bold">
                  <div className="flex justify-between items-center text-dark">
                    <span>Rahul's Harvest</span>
                    <span className="text-primary">84%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] h-full rounded-full w-[84%]" />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Step 7 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">7</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><Truck className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-4 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 7: Packaging & Delivery</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Fresh orders are packed and dispatched via cold logistics partners.
                  </p>
                </div>
                {/* Logistics status */}
                <div className="bg-[#F8FFF8] border border-emerald-500/10 rounded-xl p-3 text-[10px] space-y-1.5 font-bold">
                  <div className="flex justify-between items-center text-dark">
                    <span className="text-[#FFB300] uppercase tracking-widest text-[8px] font-black">In Transit</span>
                    <span>1.4 hrs remaining</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#4CAF50] to-[#FFB300] h-full rounded-full w-[65%]" />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Step 8 */}
            <motion.div variants={fadeUp} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 xl:flex-col xl:space-x-0 xl:space-y-4">
                <div className="bg-[#2E7D32] border-4 border-white text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">8</div>
                <div className="bg-emerald-500/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-full"><CheckCircle className="w-6 h-6" /></div>
              </div>
              <Card className="flex-grow p-6 space-y-4 border-emerald-500/5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-dark">Step 8: Customer Receives</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Customers receive fresh farm-to-table goods, sign invoice, and post reviews.
                  </p>
                </div>
                {/* Feedback mock */}
                <div className="bg-[#F8FFF8] border border-emerald-500/10 rounded-xl p-2.5 text-[9.5px] leading-relaxed text-gray-500 font-bold space-y-1">
                  <div className="flex text-amber-500 space-x-0.5">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500" />
                  </div>
                  <p>"Extremely fresh, locked price weeks ago!"</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* THREE BUYING OPTIONS                               */}
      {/* -------------------------------------------------- */}
      <section id="buying-options" className="py-24 bg-white/50 border-y border-emerald-500/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#FFB300] text-xs font-black uppercase tracking-widest">Procurement Channels</span>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Three Purchasing Paths</h2>
            <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
              Explore how our unique checkout workflows match standard commercial and community buying models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Option 1: Buy Now */}
            <Card className="flex flex-col justify-between p-8 border border-emerald-500/5 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
              
              <div className="space-y-6">
                <div className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-dark">Order Now</h3>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Buy harvested fresh crops immediately. Perfect for everyday retail needs. Products are dispatched from the farm fields directly within hours of transaction clearing.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 mt-6">
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="primary" 
                  className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold py-3 rounded-xl cursor-pointer"
                >
                  Shop Now
                </Button>
              </div>
            </Card>

            {/* Option 2: Preorder */}
            <Card className="flex flex-col justify-between p-8 border border-amber-500/10 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
              
              <div className="space-y-6">
                <div className="bg-[#FFB300]/10 text-[#FFB300] border border-[#FFB300]/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-dark">Preorder</h3>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Reserve seasonal yields weeks before they are harvested. Lock in current market rates and pay a small 20-30% deposit today, clearing the balance only when the crop is plucked.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 mt-6">
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="primary" 
                  className="w-full bg-[#FFB300] hover:bg-[#FFB300]/95 text-dark font-bold py-3 rounded-xl cursor-pointer"
                >
                  Reserve Now
                </Button>
              </div>
            </Card>

            {/* Option 3: Group Buy */}
            <Card className="flex flex-col justify-between p-8 border border-purple-500/10 relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
              
              <div className="space-y-6">
                <div className="bg-purple-500/10 text-purple-800 border border-purple-500/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-dark">Group Buy</h3>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Team up with other neighborhood buyers to purchase crops in bulk. Once the target buyer threshold is reached, group discounts (up to 20-25% off) are unlocked.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 mt-6">
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="primary" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl cursor-pointer"
                >
                  Join Group Buy
                </Button>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WHY CHOOSE FA-X                                    */}
      {/* -------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-20">
          <span className="text-[#FFB300] text-xs font-black uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Direct, Traceable, Fair</h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            Eliminate commission cuts from intermediaries and gain direct access to rural farms.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={zoomIn}>
            <Card className="p-6 border border-emerald-500/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 space-y-4">
              <div className="bg-[#2E7D32]/10 text-[#2E7D32] p-3 rounded-xl inline-block"><UserCheck className="w-5 h-5" /></div>
              <h4 className="font-bold text-sm text-dark">Direct from Farmers</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                Buy direct, bypassing traditional mandi brokers and middle agents to ensure maximum payout returns to farmers.
              </p>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={zoomIn}>
            <Card className="p-6 border border-emerald-500/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 space-y-4">
              <div className="bg-[#2E7D32]/10 text-[#2E7D32] p-3 rounded-xl inline-block"><Sprout className="w-5 h-5" /></div>
              <h4 className="font-bold text-sm text-dark">Fresh Produce</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                Crops are dispatched straight from field plots post-harvest, avoiding prolonged storage cycles.
              </p>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={zoomIn}>
            <Card className="p-6 border border-emerald-500/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 space-y-4">
              <div className="bg-[#2E7D32]/10 text-[#2E7D32] p-3 rounded-xl inline-block"><Percent className="w-5 h-5" /></div>
              <h4 className="font-bold text-sm text-dark">Lower Prices</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                Eliminate markup commissions to pass pricing discounts down to urban households and retail brands.
              </p>
            </Card>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={zoomIn}>
            <Card className="p-6 border border-emerald-500/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 space-y-4">
              <div className="bg-[#2E7D32]/10 text-[#2E7D32] p-3 rounded-xl inline-block"><Layers className="w-5 h-5" /></div>
              <h4 className="font-bold text-sm text-dark">Bulk Discounts</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                Scale your discounts dynamically (up to 15% off) by purchasing wholesale quantities for hotels, hostesses, and grocery chains.
              </p>
            </Card>
          </motion.div>

          {/* Card 5 */}
          <motion.div variants={zoomIn}>
            <Card className="p-6 border border-emerald-500/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 space-y-4">
              <div className="bg-[#2E7D32]/10 text-[#2E7D32] p-3 rounded-xl inline-block"><ShieldCheck className="w-5 h-5" /></div>
              <h4 className="font-bold text-sm text-dark">Safe Payments</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                Hold transactions securely in virtual escrow containers. Disburse funds to farmers only when quality is confirmed at delivery.
              </p>
            </Card>
          </motion.div>

          {/* Card 6 */}
          <motion.div variants={zoomIn}>
            <Card className="p-6 border border-emerald-500/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 space-y-4">
              <div className="bg-[#2E7D32]/10 text-[#2E7D32] p-3 rounded-xl inline-block"><Heart className="w-5 h-5" /></div>
              <h4 className="font-bold text-sm text-dark">Support Farmers</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                Provide rural families with reliable pricing, upfront deposits to finance seeds, and guaranteed sales before harvesting.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURE SECTION                                    */}
      {/* -------------------------------------------------- */}
      <section className="py-24 bg-white/50 border-t border-emerald-500/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#FFB300] text-xs font-black uppercase tracking-widest">Platform Core Features</span>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight leading-tight">Empowering Rural Agrotech</h2>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              We leverage cloud architecture, logistics channels, and billing engines to build a secure framework for agricultural commerce.
            </p>
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center space-x-3">
                <div className="bg-[#2E7D32]/10 p-2 rounded-xl text-primary"><Award className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-bold text-dark">Verified & Certified</p>
                  <p className="text-[10px] text-gray-400 font-bold">100% KYC checked farmer database profiles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Checklist Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "No Middlemen Broker Cuts", icon: UserCheck },
              { title: "Fresh Post-Harvest Dispatches", icon: Sprout },
              { title: "AI Crop Price Predictions", icon: TrendingUp },
              { title: "Live Real-time Weather Alerts", icon: CloudRain },
              { title: "100% Certified Organic Badges", icon: Award },
              { title: "Wholesale Bulk Order Schedules", icon: Layers },
              { title: "Live Cold-Chain Courier Tracking", icon: Truck },
              { title: "Virtual Escrow Protected Wallets", icon: ShieldCheck }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white border border-emerald-500/5 p-4 rounded-2xl flex items-center space-x-3 shadow-sm hover:shadow transition-shadow">
                  <div className="bg-[#2E7D32] text-white p-1.5 rounded-lg"><Check className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-dark">{feat.title}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* HOW FA-X MAKES MONEY                               */}
      {/* -------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-20">
          <span className="text-[#FFB300] text-xs font-black uppercase tracking-widest">Revenue Model</span>
          <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Our Pricing & Revenue Channels</h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            We only succeed when our farmers succeed. We charge small commissions to cover gateway and logistics costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Card: Commission */}
          <Card className="lg:col-span-1 border border-emerald-500/10 bg-[#2E7D32]/5 p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="bg-[#2E7D32]/10 text-primary border border-emerald-500/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">Primary Channel</span>
              <h3 className="text-xl font-black text-dark">Platform Commission</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                We charge a small 5% flat fee on successfully completed transactions. This covers development, billing, and customer support services.
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Charge Rate</p>
              <p className="text-4xl font-black text-primary">5% <span className="text-xs text-gray-400 font-bold uppercase">per completed sale</span></p>
            </div>
          </Card>

          {/* Delivery Fee Card */}
          <Card className="border border-emerald-500/5 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="bg-[#4CAF50]/10 text-primary border border-emerald-500/5 p-3.5 rounded-2xl inline-block"><Truck className="w-6 h-6" /></div>
              <h3 className="text-lg font-black text-dark">Logistics Delivery Fee</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                A localized transit charge is billed to customers to offset logistics cold-chain transport expenses.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Pricing</p>
              <p className="text-lg font-bold text-dark">Calculated on distance</p>
            </div>
          </Card>

          {/* Premium Membership Card */}
          <Card className="border border-emerald-500/5 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="bg-[#4CAF50]/10 text-primary border border-emerald-500/5 p-3.5 rounded-2xl inline-block"><Award className="w-6 h-6" /></div>
              <h3 className="text-lg font-black text-dark">Premium Farmer Suite</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Farmers can subscribe to access advanced crop forecasting, local soil weather analysis, and custom farm reports.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Subscription</p>
              <p className="text-lg font-bold text-dark">Optional monthly plans</p>
            </div>
          </Card>

          {/* Featured Listings Card */}
          <Card className="border border-emerald-500/5 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="bg-[#4CAF50]/10 text-primary border border-emerald-500/5 p-3.5 rounded-2xl inline-block"><PlusCircle className="w-6 h-6" /></div>
              <h3 className="text-lg font-black text-dark">Featured Crop Placements</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Farmers can promote their crop listings to appear on the landing page's top search results.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Placement Fee</p>
              <p className="text-lg font-bold text-dark">Pay-per-listing options</p>
            </div>
          </Card>

          {/* B2B Services Card */}
          <Card className="border border-emerald-500/5 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="bg-[#4CAF50]/10 text-primary border border-emerald-500/5 p-3.5 rounded-2xl inline-block"><Layers className="w-6 h-6" /></div>
              <h3 className="text-lg font-black text-dark">B2B Wholesaler Management</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Custom invoice management, weight ledger syncing, and escrow setups for grocery chains and restaurant brands.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Service Fee</p>
              <p className="text-lg font-bold text-dark">Enterprise tier models</p>
            </div>
          </Card>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER                                             */}
      {/* -------------------------------------------------- */}
      <footer className="bg-dark text-white border-t border-emerald-950 pt-16 pb-8 px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900">
          
          {/* Logo Summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-secondary">
              <Sprout className="w-7 h-7" />
              <span className="text-xl font-black tracking-tight text-white">FA<span className="text-secondary">-X</span></span>
            </div>
            <p className="text-xs text-emerald-200/70 font-medium leading-relaxed">
              Farm Access Exchange (FA-X) empowers local farmers by connecting them directly with consumers, restaurants, and wholesalers through preorder and group buying systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-secondary">Products & Channels</h4>
            <ul className="space-y-2 text-xs font-semibold text-emerald-100/80">
              <li><a href="/" className="hover:text-white transition-colors">Marketplace Catalog</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Pre-Harvest Preorders</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Group Buy Campaigns</a></li>
              <li><a href="/how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-secondary">Support</h4>
            <ul className="space-y-2 text-xs font-semibold text-emerald-100/80">
              <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/profile" className="hover:text-white transition-colors">My Profile</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Secure Sign In</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-secondary">Get In Touch</h4>
            <ul className="space-y-3 text-xs font-semibold text-emerald-100/80">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>support@fax.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Gujarat Agrotech Hub, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-200/50 font-medium">
          <p>© {new Date().getFullYear()} Farm Access Exchange (FA-X). All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#4CAF50] transition-colors" title="Facebook">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="#" className="hover:text-[#4CAF50] transition-colors" title="Twitter">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="hover:text-[#4CAF50] transition-colors" title="Instagram">
              <svg className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-[#4CAF50] transition-colors" title="LinkedIn">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HowItWorksPage;
