import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, X, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { showToast } from '../ui/Toast';

const QRPaymentModal = ({ isOpen, onClose, amount, onSuccess }) => {
  const [utr, setUtr] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes

  useEffect(() => {
    if (!isOpen) return;
    setTimer(300);
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const handleVerify = (e) => {
    e?.preventDefault();
    if (utr.length !== 12 || !/^\d+$/.test(utr)) {
      showToast("Please enter a valid 12-digit UPI UTR / Transaction Ref No.", "error");
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      showToast("UPI Transaction verified successfully! 🌾", "success");
      onSuccess({ method: 'upi_qr', transactionId: `utr_${utr}` });
    }, 1500);
  };

  const handleAutoFill = () => {
    const randomUtr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
    setUtr(randomUtr);
    showToast("Demo UTR filled! Click 'Verify' to test.", "info");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col relative"
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 relative flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <QrCode className="w-6 h-6 text-emerald-300" />
            <div>
              <h3 className="font-bold text-sm leading-tight">FA-X UPI QR Terminal</h3>
              <p className="text-[10px] text-emerald-200 font-semibold">Scan with GPay, PhonePe, Paytm, BHIM</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-5 text-center flex flex-col items-center">
          
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl text-[10px] font-bold text-emerald-800 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Payable Amount: <strong>₹{amount.toFixed(2)}</strong></span>
          </div>

          {/* QR Canvas frame */}
          <div className="relative w-40 h-40 bg-white border border-emerald-500/10 rounded-2xl p-3 shadow-md flex items-center justify-center overflow-hidden">
            {/* Mock QR SVG */}
            <svg className="w-full h-full text-dark" viewBox="0 0 100 100" fill="currentColor">
              <rect x="0" y="0" width="25" height="25" />
              <rect x="5" y="5" width="15" height="15" fill="white" />
              <rect x="9" y="9" width="7" height="7" />
              
              <rect x="75" y="0" width="25" height="25" />
              <rect x="80" y="5" width="15" height="15" fill="white" />
              <rect x="84" y="9" width="7" height="7" />
              
              <rect x="0" y="75" width="25" height="25" />
              <rect x="5" y="80" width="15" height="15" fill="white" />
              <rect x="9" y="84" width="7" height="7" />

              {/* Random tiny blocks */}
              <rect x="35" y="10" width="10" height="5" />
              <rect x="55" y="10" width="5" height="15" />
              <rect x="40" y="25" width="15" height="5" />
              <rect x="10" y="40" width="5" height="15" />
              <rect x="25" y="45" width="15" height="10" />
              <rect x="45" y="45" width="5" height="5" />
              <rect x="65" y="35" width="10" height="20" />
              <rect x="80" y="45" width="15" height="5" />
              <rect x="15" y="65" width="20" height="5" />
              <rect x="40" y="60" width="10" height="10" />
              <rect x="60" y="60" width="5" height="15" />
              <rect x="75" y="65" width="15" height="5" />
              <rect x="45" y="80" width="15" height="10" />
              <rect x="65" y="80" width="5" height="5" />
              <rect x="80" y="80" width="10" height="5" />
              <rect x="35" y="90" width="5" height="5" />
              <rect x="70" y="90" width="15" height="10" />
              
              {/* FA-X Centered Logo Badge */}
              <rect x="40" y="40" width="20" height="20" rx="4" fill="#2E7D32" />
              <text x="50" y="52" fill="white" fontSize="8" fontWeight="black" textAnchor="middle">FA-X</text>
            </svg>

            {/* Laser scanning line overlay */}
            <motion.div 
              animate={{ y: [0, 130, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-emerald-500/80 shadow-md shadow-emerald-500/50"
            />
          </div>

          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 font-bold">UPI ID: fax@paytm</p>
            <p className="text-[9px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-black">
              ⏱️ QR expires in: {formatTimer(timer)}
            </p>
          </div>

          {/* Form verification */}
          <form onSubmit={handleVerify} className="w-full space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block text-left">
                Enter UPI UTR (12-Digit Ref No.)
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  maxLength={12}
                  value={utr}
                  onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 214578963214"
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-3.5 py-2.5 text-xs text-center focus:outline-none focus:border-primary text-dark font-mono font-bold"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                type="button"
                onClick={handleAutoFill}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-[10px] font-bold cursor-pointer transition-colors active:scale-95"
              >
                Auto-fill Ref
              </button>
              
              <Button 
                type="submit" 
                variant="primary" 
                loading={verifying}
                className="flex-grow py-2.5 bg-[#2E7D32] hover:bg-[#2E7D32]/95 text-white font-bold rounded-xl cursor-pointer border-none flex items-center justify-center space-x-1"
              >
                <span>Verify Payment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-[9px] text-gray-400 font-semibold flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Escrow secure UPI transaction</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QRPaymentModal;
export { QRPaymentModal };
