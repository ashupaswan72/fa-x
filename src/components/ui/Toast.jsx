import React, { useState, useEffect } from 'react';

let toastCallback = null;
let bannerCallback = null;

export const showBanner = (message, type = 'info') => {
  if (bannerCallback) {
    bannerCallback(message, type);
  } else {
    console.log(`[Banner Fallback] ${type.toUpperCase()}: ${message}`);
  }
};

export const showToast = (message, type = 'success') => {
  if (toastCallback) {
    toastCallback(message, type);
  } else {
    console.log(`[Toast Fallback] ${type.toUpperCase()}: ${message}`);
  }
};

export const ToastContainer = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    toastCallback = (message, type) => {
      setToast({ message, type, id: Date.now() });
    };
    return () => {
      toastCallback = null;
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const icons = {
    success: '🌾',
    error: '⚠️',
    info: '💡',
    warning: '🔸'
  };

  const bgStyles = {
    success: 'bg-emerald-900 border-emerald-700 text-emerald-50',
    error: 'bg-red-950 border-red-800 text-red-100',
    info: 'bg-emerald-950 border-emerald-800 text-emerald-100',
    warning: 'bg-amber-950 border-amber-800 text-amber-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 md:p-0">
      <div 
        className={`flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-semibold backdrop-blur-xl transition-all duration-300 animate-slide-in ${bgStyles[toast.type]}`}
        style={{
          boxShadow: '0 20px 40px -15px rgba(27, 67, 50, 0.4)'
        }}
      >
        <span className="text-xl flex-shrink-0">{icons[toast.type]}</span>
        <span className="flex-grow">{toast.message}</span>
        <button 
          onClick={() => setToast(null)}
          className="text-current opacity-60 hover:opacity-100 text-base font-bold pl-2 cursor-pointer focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export const BannerContainer = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    bannerCallback = (message, type) => {
      setBanner({ message, type, id: Date.now() });
    };
    return () => {
      bannerCallback = null;
    };
  }, []);

  useEffect(() => {
    if (banner) {
      const timer = setTimeout(() => {
        setBanner(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [banner]);

  if (!banner) return null;

  const bgStyles = {
    success: 'bg-emerald-500 text-white shadow-emerald-500/20',
    error: 'bg-red-500 text-white shadow-red-500/20',
    info: 'bg-blue-500 text-white shadow-blue-500/20',
    warning: 'bg-amber-500 text-white shadow-amber-500/20'
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none p-4">
      <div 
        className={`pointer-events-auto flex items-center justify-between space-x-4 px-6 py-3 rounded-full shadow-2xl text-sm font-bold backdrop-blur-xl transition-all duration-500 animate-fade-in-down ${bgStyles[banner.type]}`}
        style={{
          boxShadow: '0 20px 40px -15px rgba(0,0,0, 0.3)'
        }}
      >
        <span className="flex-grow text-center">{banner.message}</span>
        <button 
          onClick={() => setBanner(null)}
          className="text-white opacity-70 hover:opacity-100 transition-opacity ml-4 focus:outline-none flex-shrink-0"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
