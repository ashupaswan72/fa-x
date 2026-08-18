import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import { LineChart, BarChart } from '../../components/ui/ChartView';
import { TrendingUp, TrendingDown, Sparkles, AlertTriangle, Calendar, ArrowUpRight, Search, Activity, PackageOpen } from 'lucide-react';

const FarmerMarketInsights = () => {
  const [selectedCrop, setSelectedCrop] = useState('Tomatoes');

  // MOCK DATA: Market Price Dashboard
  const marketPrices = [
    { name: 'Tomatoes', current: 45, average: 38, trend: '+18.4%', up: true },
    { name: 'Alphonso Mangoes', current: 850, average: 920, trend: '-7.6%', up: false },
    { name: 'Basmati Rice', current: 110, average: 105, trend: '+4.7%', up: true },
    { name: 'Sharbati Wheat', current: 52, average: 50, trend: '+4.0%', up: true },
  ];

  // MOCK DATA: AI Price Prediction (Next 4 weeks)
  const aiPricePrediction = {
    labels: ['Current Week', 'Week +1', 'Week +2', 'Week +3', 'Week +4'],
    datasets: [
      {
        label: `Projected Price (₹/kg) - ${selectedCrop}`,
        data: selectedCrop === 'Tomatoes' ? [45, 48, 55, 52, 49] : [110, 112, 115, 118, 120],
        borderColor: '#8b5cf6', // Indigo/Purple for AI
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderDash: [5, 5],
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // MOCK DATA: Demand Forecasting (Volume over next months)
  const demandForecast = {
    labels: ['August', 'September', 'October (Diwali)', 'November', 'December'],
    datasets: [
      {
        label: `Expected Market Demand (Tons) - ${selectedCrop}`,
        data: selectedCrop === 'Tomatoes' ? [250, 280, 450, 310, 290] : [800, 850, 1200, 950, 900],
        backgroundColor: '#f59e0b', // Amber
        borderRadius: 6
      }
    ]
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-dark">AI Market Insights</h1>
        </div>
        <p className="text-sm text-gray-500 font-medium max-w-2xl">
          Leverage FA-X's machine learning models to forecast crop demand, predict wholesale prices, and optimize your harvest schedule for maximum profit.
        </p>
      </div>

      {/* Market Price Dashboard */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
          <h2 className="text-lg font-black text-dark flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Live Market Dashboard
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search crops..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48 transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketPrices.map(crop => (
            <Card 
              key={crop.name} 
              onClick={() => setSelectedCrop(crop.name)}
              className={`p-5 cursor-pointer transition-all ${
                selectedCrop === crop.name 
                  ? 'border-indigo-500 shadow-md shadow-indigo-500/10 bg-indigo-50/20' 
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <h3 className="font-bold text-dark text-sm mb-1">{crop.name}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">State Avg: ₹{crop.average}/kg</p>
              
              <div className="flex justify-between items-end">
                <span className="text-2xl font-black text-dark">₹{crop.current}</span>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                  crop.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {crop.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {crop.trend}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* AI Price Prediction */}
        <Card className="flex flex-col border border-indigo-100/50 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 bg-gradient-to-r from-indigo-50/50 to-white flex justify-between items-center">
            <div>
              <h3 className="font-black text-dark flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> AI Price Prediction
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">30-day forecast for {selectedCrop}</p>
            </div>
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Activity className="w-3 h-3" /> High Confidence
            </span>
          </div>
          <div className="p-6 flex-1">
            <LineChart data={aiPricePrediction} />
          </div>
          <div className="p-4 bg-indigo-50/30 border-t border-indigo-50 flex items-start gap-3">
            <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg shrink-0 mt-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-indigo-900 leading-relaxed">
              <strong>AI Recommendation:</strong> Prices for {selectedCrop} are expected to peak in Week +2 due to anticipated supply chain constraints. Consider delaying harvest slightly for a ~15% higher margin.
            </p>
          </div>
        </Card>

        {/* Demand Forecasting */}
        <Card className="flex flex-col border border-amber-100/50 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 bg-gradient-to-r from-amber-50/30 to-white flex justify-between items-center">
            <div>
              <h3 className="font-black text-dark flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" /> Market Demand Forecast
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Quarterly projection for {selectedCrop}</p>
            </div>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Seasonal
            </span>
          </div>
          <div className="p-6 flex-1">
            <BarChart data={demandForecast} />
          </div>
          <div className="p-4 bg-amber-50/30 border-t border-amber-50 flex items-start gap-3">
            <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-amber-900 leading-relaxed">
              <strong>Seasonal Insight:</strong> Market demand is projected to spike by 78% in October due to Diwali festivities. Preparing Group Buys targeting urban customers by late September is highly recommended.
            </p>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default FarmerMarketInsights;
