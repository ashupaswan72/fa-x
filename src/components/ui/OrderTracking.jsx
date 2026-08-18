import React from 'react';
import { Package, Truck, CheckCircle, Clock, Sprout, ShoppingBag, MapPin } from 'lucide-react';

const OrderTracking = ({ deliveryStatus, orderType }) => {
  // Define standard and preorder pipelines
  const standardStages = [
    { id: 'pending', label: 'Order Placed', icon: ShoppingBag },
    { id: 'processing', label: 'Processing', icon: Package, aliases: ['ready_for_delivery'] },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const preorderStages = [
    { id: 'pending_harvest', label: 'Growing', icon: Sprout, aliases: ['pending'] },
    { id: 'harvested', label: 'Harvested', icon: Package },
    { id: 'ready_for_delivery', label: 'Processing', icon: Clock },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const stages = orderType === 'preorder' ? preorderStages : standardStages;

  // Determine current active step index
  let currentIndex = 0;
  
  const statusToMatch = (deliveryStatus || 'pending').toLowerCase();
  
  stages.forEach((stage, index) => {
    if (stage.id === statusToMatch || stage.aliases?.includes(statusToMatch)) {
      currentIndex = index;
    }
  });

  // Edge case: if status isn't found exactly, default to 0 (pending)
  // But if it's explicitly 'delivered', set to last
  if (statusToMatch === 'delivered') currentIndex = stages.length - 1;

  return (
    <div className="w-full py-4 mt-4 bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
      <div className="flex justify-between items-center relative">
        {/* Connecting Line (Background) */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0"></div>
        
        {/* Connecting Line (Active) */}
        <div 
          className="absolute left-[10%] top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 80 + 10}%` }}
        ></div>

        {/* Stages */}
        {stages.map((stage, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center justify-center w-1/5">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-sm ${
                  isActive 
                    ? 'bg-emerald-500 border-white text-white' 
                    : 'bg-white border-gray-100 text-gray-300'
                } ${isCurrent ? 'scale-110 shadow-emerald-500/30' : ''}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <p className={`text-[9px] mt-2 font-bold uppercase tracking-wider text-center ${
                isActive ? 'text-emerald-800' : 'text-gray-400'
              }`}>
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
