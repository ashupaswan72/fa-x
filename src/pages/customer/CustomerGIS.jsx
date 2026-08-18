import React from 'react';
import { MapPin, Search, Navigation, Filter } from 'lucide-react';
import GISMap from '../../components/ui/GISMap';

const CustomerGIS = () => {
  // Mock Customer Location (Junagadh, Gujarat)
  const customerLocation = [21.5300, 70.4600];
  
  // Mock Nearby Farms
  const nearbyFarms = [
    { pos: [21.5222, 70.4579], name: 'Green Harvest Farms', product: 'Organic Veggies', rating: '4.8', distance: '1.2 km' },
    { pos: [21.5450, 70.4800], name: 'Sunrise Orchards', product: 'Mangoes', rating: '4.9', distance: '3.5 km' },
    { pos: [21.5100, 70.4400], name: 'Patel Dairy', product: 'Fresh Milk & Eggs', rating: '4.5', distance: '4.0 km' },
    { pos: [21.5600, 70.4200], name: 'Gir Honey Collective', product: 'Raw Forest Honey', rating: '4.9', distance: '6.2 km' },
  ];

  const mapMarkers = [
    { 
      position: customerLocation, 
      type: 'customer', 
      popup: (
        <div className="text-center p-1">
          <p className="font-bold text-blue-700">Your Delivery Location</p>
          <p className="text-xs text-gray-500">M.G. Road, Junagadh</p>
        </div>
      ) 
    },
    ...nearbyFarms.map(farm => ({
      position: farm.pos,
      type: 'farm',
      popup: (
        <div className="p-1 min-w-[120px]">
          <p className="font-bold text-green-800">{farm.name}</p>
          <p className="text-xs font-semibold text-gray-600 border-b border-gray-100 pb-1 mb-1">{farm.product}</p>
          <div className="flex justify-between items-center text-[10px] text-gray-500 mt-1">
            <span>⭐ {farm.rating}</span>
            <span>📍 {farm.distance}</span>
          </div>
          <button className="w-full mt-2 bg-green-600 text-white text-[10px] font-bold py-1 rounded">View Store</button>
        </div>
      )
    }))
  ];

  const mapCircles = [
    { center: customerLocation, radius: 5000, color: '#3B82F6' } // 5km search radius
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Local Farm Explorer</h1>
          <p className="text-sm font-medium text-gray-500">Discover fresh produce directly from farms within your 5km radius.</p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search local farms..."
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary shadow-sm w-full md:w-64"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm relative flex flex-col lg:flex-row gap-4">
        
        {/* Map View */}
        <div className="flex-1 relative h-[500px]">
          <GISMap 
            center={customerLocation}
            zoom={12}
            height="100%"
            markers={mapMarkers}
            circles={mapCircles}
          />
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-gray-100 z-[1000] flex items-center gap-2 text-xs font-bold text-gray-700">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            Showing farms near <span className="text-blue-600">Junagadh</span>
          </div>
        </div>

        {/* Sidebar List */}
        <div className="w-full lg:w-80 flex flex-col gap-3 h-[500px] overflow-y-auto pr-1">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 pt-1">Nearby Farms ({nearbyFarms.length})</h3>
          
          {nearbyFarms.map((farm, idx) => (
            <div key={idx} className="bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl p-4 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 group-hover:text-green-800 transition-colors">{farm.name}</h4>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">⭐ {farm.rating}</span>
              </div>
              <p className="text-xs font-semibold text-gray-600 mt-1">{farm.product}</p>
              <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{farm.distance} away</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default CustomerGIS;
