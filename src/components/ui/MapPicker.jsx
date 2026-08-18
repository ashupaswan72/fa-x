import React, { useState } from 'react';

const MapPicker = ({ onLocationSelected, initialAddress = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState(initialAddress);
  const [coords, setCoords] = useState({ lat: 21.5222, lng: 70.4579 }); // Junagadh, Gujarat area default
  const [isPinPlaced, setIsPinPlaced] = useState(!!initialAddress);

  const locations = [
    { name: "Village Keshod, Gujarat", lat: 21.3005, lng: 70.2505 },
    { name: "Nashik Farms, Maharashtra", lat: 19.9975, lng: 73.7898 },
    { name: "Shimla Apple Orchards, HP", lat: 31.1048, lng: 77.1734 },
    { name: "Mandya Paddy Lands, Karnataka", lat: 12.5218, lng: 76.8973 }
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const found = locations.find(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (found) {
      setCoords({ lat: found.lat, lng: found.lng });
      setAddress(found.name);
      setIsPinPlaced(true);
      onLocationSelected({ address: found.name, ...found });
    } else {
      // Mock new coordinate
      const mockLat = (20 + Math.random() * 5).toFixed(4);
      const mockLng = (72 + Math.random() * 5).toFixed(4);
      const newAddr = searchQuery || "Custom Farm Coordinate";
      setCoords({ lat: parseFloat(mockLat), lng: parseFloat(mockLng) });
      setAddress(newAddr);
      setIsPinPlaced(true);
      onLocationSelected({ address: newAddr, lat: parseFloat(mockLat), lng: parseFloat(mockLng) });
    }
  };

  const handleGridClick = (e) => {
    // Click on simulated map grid
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click coordinates to simulated lat/lng
    const mockLat = (21.0000 + (y / rect.height) * 0.99).toFixed(4);
    const mockLng = (70.0000 + (x / rect.width) * 0.99).toFixed(4);
    const newAddr = searchQuery || "Farm Field Pin, Section " + Math.floor(x/10);

    setCoords({ lat: parseFloat(mockLat), lng: parseFloat(mockLng) });
    setAddress(newAddr);
    setIsPinPlaced(true);
    onLocationSelected({ address: newAddr, lat: parseFloat(mockLat), lng: parseFloat(mockLng) });
  };

  return (
    <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Select Delivery / Farm Location</label>
        {isPinPlaced && (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            📍 Lat: {coords.lat}, Lng: {coords.lng}
          </span>
        )}
      </div>

      {/* Search bar div */}
      <div className="flex space-x-2">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Village Keshod, Gujarat"
          className="flex-grow bg-white border border-emerald-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary text-dark"
        />
        <button 
          type="button"
          onClick={handleSearch}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer"
        >
          Pin Location
        </button>
      </div>

      {/* Simulated map canvas */}
      <div 
        onClick={handleGridClick}
        className="h-44 w-full bg-emerald-200/50 border border-emerald-300 rounded-xl relative overflow-hidden cursor-crosshair hover:border-primary transition-all flex flex-col items-center justify-center select-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(46, 125, 50, 0.1) 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px'
        }}
      >
        {/* Custom visual features */}
        <div className="absolute top-4 left-6 bg-emerald-800/10 text-emerald-800 font-mono text-[9px] px-2 py-0.5 rounded-md">Field Plot A-2</div>
        <div className="absolute bottom-6 right-8 bg-emerald-800/10 text-emerald-800 font-mono text-[9px] px-2 py-0.5 rounded-md">Harvest Ridge</div>
        <div className="absolute top-1/2 left-1/3 h-12 w-20 border border-dashed border-emerald-400 rounded-lg bg-emerald-500/5 flex items-center justify-center">
          <span className="text-[9px] text-emerald-600 font-bold">Greenhouses</span>
        </div>

        {isPinPlaced ? (
          <div className="absolute flex flex-col items-center animate-bounce" style={{ top: '40%', left: '50%' }}>
            <span className="text-3xl filter drop-shadow-md">📍</span>
            <div className="bg-emerald-900 text-white text-[10px] font-bold px-2 py-1 rounded-md mt-1 whitespace-nowrap shadow-lg">
              {address}
            </div>
          </div>
        ) : (
          <div className="text-center p-4 text-emerald-800/60 max-w-[200px]">
            <span className="text-2xl block mb-1">🗺️</span>
            <span className="text-xs font-semibold">Click on the grid to pin your location coordinates</span>
          </div>
        )}
      </div>

      {isPinPlaced && (
        <p className="text-xs text-gray-500 font-medium">
          <strong>Selected Location:</strong> {address}
        </p>
      )}
    </div>
  );
};

export default MapPicker;
