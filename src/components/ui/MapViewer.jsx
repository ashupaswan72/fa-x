import React from 'react';
import { MapPin } from 'lucide-react';

const MapViewer = ({ lat, lng, address }) => {
  return (
    <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex flex-col space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Farmer Location</label>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
          Lat: {lat || "N/A"}, Lng: {lng || "N/A"}
        </span>
      </div>

      <div 
        className="h-44 w-full bg-emerald-200/50 border border-emerald-300 rounded-xl relative overflow-hidden flex flex-col items-center justify-center select-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(46, 125, 50, 0.1) 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px'
        }}
      >
        <div className="absolute top-4 left-6 bg-emerald-800/10 text-emerald-800 font-mono text-[9px] px-2 py-0.5 rounded-md">Farm Area</div>
        
        {lat && lng ? (
          <div className="absolute flex flex-col items-center" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <span className="text-3xl filter drop-shadow-md">📍</span>
            <div className="bg-emerald-900 text-white text-[10px] font-bold px-2 py-1 rounded-md mt-1 whitespace-nowrap shadow-lg">
              {address || "Farm Location"}
            </div>
          </div>
        ) : (
          <div className="text-center p-4 text-emerald-800/60 max-w-[200px]">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <span className="text-xs font-semibold">Location coordinates not provided</span>
          </div>
        )}
      </div>
      
      {address && (
        <p className="text-xs text-gray-500 font-medium">
          <strong>Address:</strong> {address}
        </p>
      )}
    </div>
  );
};

export default MapViewer;
