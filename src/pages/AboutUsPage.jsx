import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import Card from '../components/ui/Card';
import founderImg from '../assets/founder.jpeg';

const AboutUsPage = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-emerald-950 text-white px-8 py-20 text-center shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 text-emerald-300 font-bold text-sm"
          >
            <Leaf className="w-4 h-4" />
            <span>Farm Access Exchange</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            Bridging the Gap Between <span className="text-primary-light">Farms and Tables</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-emerald-50/80 font-medium leading-relaxed"
          >
            FA-X is transforming the agricultural supply chain by empowering local farmers and providing consumers with unparalleled access to fresh, organic produce at fair prices.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-4">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-dark">Our Mission</h2>
          <p className="text-gray-600 font-medium leading-relaxed text-lg">
            We believe that the people who grow our food deserve a fair share of its value. For too long, middlemen have suppressed farmer profits while artificially inflating prices for consumers. 
          </p>
          <p className="text-gray-600 font-medium leading-relaxed text-lg">
            FA-X eliminates the friction of the traditional supply chain. By leveraging technology, we create a direct pipeline where farmers can pre-sell their harvests, secure working capital early, and deliver farm-fresh goods directly to communities.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=600" alt="Farmer holding produce" className="rounded-2xl h-64 object-cover w-full shadow-lg" />
          <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" alt="Fresh vegetables" className="rounded-2xl h-64 object-cover w-full shadow-lg mt-8" />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-dark">Our Core Values</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">The principles that drive every decision we make on the platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-8 space-y-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-primary">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-dark">Community First</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              We foster strong relationships between growers and buyers through our Group Buying and direct pre-order systems.
            </p>
          </Card>

          <Card className="text-center p-8 space-y-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-dark">Radical Transparency</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Every farmer is verified, and every product is tracked. Know exactly who grew your food and when it was harvested.
            </p>
          </Card>

          <Card className="text-center p-8 space-y-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-600">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-dark">Fair Economics</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Farmers keep up to 95% of the sale price. Consumers save up to 30% compared to supermarket prices. A true win-win.
            </p>
          </Card>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="max-w-5xl mx-auto px-4 space-y-10 pt-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-dark">Meet the Founders</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">The visionaries behind FA-X who are passionate about redefining the agricultural economy.</p>
        </div>
        
        <div className="flex justify-center max-w-4xl mx-auto">
          {/* Founder */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-100 shadow-xl">
              <img 
                src={founderImg} 
                alt="Founder" 
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="text-2xl font-black text-dark">Ashutosh Kumar</h3>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Founder & CEO</p>
            </div>
            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-xs">
              A former agriculture supply chain executive who saw the inefficiencies firsthand and decided to build a fairer ecosystem for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 rounded-3xl p-12 text-center max-w-4xl mx-auto border border-primary/10">
        <h2 className="text-3xl font-black text-dark mb-4">Join the Agricultural Revolution</h2>
        <p className="text-gray-600 font-medium mb-8 max-w-2xl mx-auto">
          Whether you're a farmer looking to expand your reach or a consumer seeking the freshest produce, there's a place for you at FA-X.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/register" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">Get Started Today</a>
          <a href="/#features" className="bg-white hover:bg-gray-50 text-dark px-8 py-3 rounded-xl font-bold transition-all shadow-sm border border-gray-200">View Marketplace</a>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
