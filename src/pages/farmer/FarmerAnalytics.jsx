import React from 'react';
import Card from '../../components/ui/Card';
import { LineChart, BarChart, DoughnutChart } from '../../components/ui/ChartView';

const FarmerAnalytics = () => {
  // Chart Mock Data
  const monthlyRevenue = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Gross Profit (₹)',
        data: [15000, 24000, 18000, 31000, 42000, 56000],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.05)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const cropVolume = {
    labels: ['Tomatoes', 'Mangoes', 'Basmati Rice', 'Honey', 'Eggs'],
    datasets: [
      {
        label: 'Volume Sold (kg)',
        data: [420, 280, 500, 120, 350],
        backgroundColor: '#66BB6A',
        borderRadius: 8
      }
    ]
  };

  const channelDistribution = {
    labels: ['Standard Checkout', 'Group Buy Pools', 'Preorder Reserve'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#2E7D32', '#FFB300', '#66BB6A'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-dark">Sales Analytics</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Review your financial curves, volume allocations, and customer checkouts.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center space-y-1">
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">Net Sales (Q3)</span>
          <p className="text-3xl font-black text-primary">₹1.32L</p>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-2">▲ 14.5% month-on-month</span>
        </Card>

        <Card className="text-center space-y-1">
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">Average Order Value</span>
          <p className="text-3xl font-black text-dark">₹1,840</p>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-2">▲ 4.2% since preorders launched</span>
        </Card>

        <Card className="text-center space-y-1">
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">Top-selling Category</span>
          <p className="text-3xl font-black text-dark">Fruits</p>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">Alphonso campaign successful</span>
        </Card>
      </div>

      {/* Visual layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="space-y-4">
          <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2">Escrow Earnings Growth</h3>
          <LineChart data={monthlyRevenue} />
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2">Sales Allocation Share</h3>
          <DoughnutChart data={channelDistribution} />
        </Card>

        <Card className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-dark text-sm border-b border-gray-50 pb-2">Harvest Volume Distribution (kg)</h3>
          <BarChart data={cropVolume} />
        </Card>
      </div>
    </div>
  );
};

export default FarmerAnalytics;
