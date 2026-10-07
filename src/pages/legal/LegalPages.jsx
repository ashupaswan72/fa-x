import React from 'react';
import { motion } from 'framer-motion';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-black text-dark mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">We're here to help! If you have any questions, feedback, or issues with your FA-X account, please reach out to our support team.</p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-dark text-lg mb-2">Customer Support</h3>
              <p className="text-gray-600">Email: support@fax.com</p>
              <p className="text-gray-600">Phone: 1-800-FAX-FARM</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-dark text-lg mb-2">Headquarters</h3>
              <p className="text-gray-600">FA-X Technologies Pvt. Ltd.<br/>123 Agri-Tech Park<br/>Bangalore, India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-8 prose prose-emerald max-w-none">
          <h1 className="text-3xl font-black text-dark mb-6">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <h3 className="font-bold text-dark mt-6 mb-2">1. Information We Collect</h3>
          <p className="text-gray-600 mb-4">We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>
          <h3 className="font-bold text-dark mt-6 mb-2">2. Use of Information</h3>
          <p className="text-gray-600 mb-4">We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, and send related information.</p>
          <p className="text-sm text-gray-400 mt-12">This is a placeholder for the full privacy policy.</p>
        </motion.div>
      </div>
    </div>
  );
};

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-8 prose prose-emerald max-w-none">
          <h1 className="text-3xl font-black text-dark mb-6">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <h3 className="font-bold text-dark mt-6 mb-2">1. Acceptance of Terms</h3>
          <p className="text-gray-600 mb-4">By accessing and using the FA-X marketplace, you agree to be bound by these Terms and Conditions.</p>
          <h3 className="font-bold text-dark mt-6 mb-2">2. User Accounts</h3>
          <p className="text-gray-600 mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
          <p className="text-sm text-gray-400 mt-12">This is a placeholder for the full terms and conditions.</p>
        </motion.div>
      </div>
    </div>
  );
};
