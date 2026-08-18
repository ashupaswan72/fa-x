// Razorpay Script and Simulation Loader

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const payWithRazorpay = async ({
  amount, // In INR (actual rupee value, not paise)
  description,
  name,
  email,
  phone,
  onSuccess,
  onCancel
}) => {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const isDemo = !keyId || keyId === "YOUR_RAZORPAY_KEY" || (typeof keyId === 'string' && (keyId.includes("dummy") || keyId.includes("test") || keyId === "rzp_test_dummykey"));

  if (!isDemo) {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load payment gateway script. Check your internet connection.");
      onCancel && onCancel("Script load error");
      return;
    }

    const options = {
      key: keyId,
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      name: "FA-X (Farm Access Exchange)",
      description: description || "Marketplace checkout",
      image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=120", // Product thumb or logo
      handler: function (response) {
        onSuccess && onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id || "mock_order_id",
          razorpay_signature: response.razorpay_signature || "mock_signature"
        });
      },
      prefill: {
        name: name || "Customer",
        email: email || "customer@fax.com",
        contact: phone || "9999999999"
      },
      theme: {
        color: "#2E7D32" // Primary Forest Green
      },
      modal: {
        ondismiss: function () {
          onCancel && onCancel("User closed checkout modal");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } else {
    // Render Simulated Payment Dialog in Demo Mode
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in";
    
    const modalContent = `
      <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col transform transition-all scale-100">
        <!-- Header -->
        <div class="bg-emerald-800 text-white p-6 relative">
          <div class="flex items-center space-x-3">
            <span class="text-3xl">🌾</span>
            <div>
              <h3 class="font-bold text-lg leading-tight">FA-X Payment Gateway</h3>
              <p class="text-xs text-emerald-200">Sandbox Simulation Mode</p>
            </div>
          </div>
          <button id="demo-close-btn" class="absolute top-4 right-4 text-emerald-200 hover:text-white transition-colors text-xl font-bold">&times;</button>
        </div>
        
        <!-- Details -->
        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center pb-3 border-b border-gray-100">
            <span class="text-gray-500 text-sm font-medium">Merchant:</span>
            <span class="text-gray-800 text-sm font-bold">Farm Access Exchange (FA-X)</span>
          </div>
          <div class="flex justify-between items-center pb-3 border-b border-gray-100">
            <span class="text-gray-500 text-sm font-medium">Description:</span>
            <span class="text-gray-800 text-sm max-w-[200px] truncate text-right">${description || 'Marketplace Order'}</span>
          </div>
          <div class="flex justify-between items-center py-2 bg-emerald-50/50 rounded-xl px-4">
            <span class="text-emerald-800 text-sm font-semibold">Total Amount:</span>
            <span class="text-emerald-800 text-xl font-black">₹${amount.toFixed(2)}</span>
          </div>

          <div class="space-y-2 mt-4">
            <p class="text-xs text-gray-400 text-center font-medium">Select a Payment Option to continue testing:</p>
            <button id="demo-pay-success" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-md shadow-emerald-600/10 hover:shadow-emerald-700/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
              <span>💳</span> <span>Simulate Successful Payment</span>
            </button>
            <button id="demo-pay-fail" class="w-full bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-xl font-semibold border border-red-200 active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
              <span>⚠️</span> <span>Simulate Declined Payment</span>
            </button>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 p-4 text-center">
          <p class="text-[10px] text-gray-400 font-medium">FA-X Payment Sandbox - For demonstration and UI walkthrough purposes only.</p>
        </div>
      </div>
    `;
    
    overlay.innerHTML = modalContent;
    document.body.appendChild(overlay);

    const cleanup = () => {
      document.body.removeChild(overlay);
    };

    document.getElementById("demo-close-btn").onclick = () => {
      cleanup();
      onCancel && onCancel("Modal closed");
    };

    document.getElementById("demo-pay-success").onclick = () => {
      cleanup();
      onSuccess && onSuccess({
        razorpay_payment_id: "pay_demo_" + Math.random().toString(36).substr(2, 9),
        razorpay_order_id: "order_demo_" + Math.random().toString(36).substr(2, 9),
        razorpay_signature: "sig_demo_" + Math.random().toString(36).substr(2, 12),
        isDemo: true
      });
    };

    document.getElementById("demo-pay-fail").onclick = () => {
      cleanup();
      alert("Payment declined. Please check your card balance or try again.");
      onCancel && onCancel("Payment authorization failed");
    };
  }
};
