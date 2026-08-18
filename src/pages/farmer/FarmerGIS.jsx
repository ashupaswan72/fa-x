import React, { useState } from 'react';
import { Map, Truck, Navigation, Users, MapPin } from 'lucide-react';
import GISMap from '../../components/ui/GISMap';

const FarmerGIS = () => {
  // Mock Farm Location (Junagadh, Gujarat)
  const farmLocation = [21.5222, 70.4579];
  
  // Mock Customer Order Locations around Junagadh
  const customerLocations = [
    { pos: [21.5300, 70.4600], name: 'Amit Sharma', order: 'Organic Toor Dal' },
    { pos: [21.5150, 70.4500], name: 'Neha Verma', order: 'Basmati Rice' },
    { pos: [21.5400, 70.4700], name: 'Rohit Singh', order: 'Mustard Oil' },
    { pos: [21.5100, 70.4400], name: 'Priya Patel', order: 'Organic Wheat' },
  ];

  // Mock Active Delivery Route
  const deliveryRoute = [
    farmLocation,
    [21.5250, 70.4550], // Road point
    [21.5300, 70.4600], // Delivery 1 (Amit)
    [21.5350, 70.4650], // Road point
    [21.5400, 70.4700], // Delivery 2 (Rohit)
  ];

  const mapMarkers = [
    { 
      position: farmLocation, 
      type: 'farm', 
      popup: (
        <div className="text-center p-1">
          <p className="font-bold text-green-700">Green Harvest Farms</p>
          <p className="text-xs text-gray-500">Your Base Location</p>
        </div>
      ) 
    },
    ...customerLocations.map(cust => ({
      position: cust.pos,
      type: 'customer',
      popup: (
        <div className="p-1">
          <p className="font-bold text-gray-800">{cust.name}</p>
          <p className="text-xs text-blue-600 font-semibold">{cust.order}</p>
          <p className="text-[10px] text-gray-400 mt-1">Pending Delivery</p>
        </div>
      )
    }))
  ];

  const mapCircles = [
    { center: farmLocation, radius: 3000, color: '#10B981' } // 3km delivery zone
  ];

  const mapRoutes = [
    { positions: deliveryRoute, color: '#3B82F6', dashed: true }
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">Farm Logistics & GIS</h1>
        <p className="text-sm font-medium text-gray-500">Visualize your customer distribution and track outbound deliveries.</p>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm relative">
        <GISMap 
          center={farmLocation}
          zoom={13}
          height="500px"
          markers={mapMarkers}
          circles={mapCircles}
          routes={mapRoutes}
        />
        
        {/* Map Legend Overlay */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-gray-100 z-[1000]">
          <h4 className="text-[11px] font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Map Legend</h4>
          <div className="space-y-2 text-[10px] font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 fill-green-100" /> <span>My Farm Base</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 fill-blue-100" /> <span>Customer Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 border-t-2 border-dashed border-blue-500"></div> <span>Active Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500"></div> <span>3km Local Zone</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Active Outbound Routes</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">2</h3>
            <p className="text-[10px] font-bold text-blue-600 mt-2">Truck MH-04-1234 on road</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Local Customers</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">124</h3>
            <p className="text-[10px] font-bold text-green-600 mt-2">Within 3km radius</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">Total Distance Saved</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">45 km</h3>
            <p className="text-[10px] font-bold text-amber-600 mt-2">Through route optimization</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
            <Navigation className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default FarmerGIS;
