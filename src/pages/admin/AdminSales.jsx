import React from 'react';

// I will stick to Chart.js since I already used it in AdminDashboard.jsx
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip as ChartTooltip, Legend as ChartLegend
} from 'chart.js';
import { Line as ChartLine } from 'react-chartjs-2';
import { IndianRupee, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight, Calendar, ChevronDown, Download } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, ChartTooltip, ChartLegend);

const AdminSales = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Gross Sales (Lakhs)',
        data: [45, 52, 48, 70, 85, 112],
        borderColor: '#11311F',
        backgroundColor: '#11311F',
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Net Revenue (Lakhs)',
        data: [38, 45, 42, 60, 75, 98],
        borderColor: '#f59e0b',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true } }
    },
    scales: {
      y: { min: 0, max: 150, grid: { color: '#f3f4f6', drawBorder: false } },
      x: { grid: { display: false, drawBorder: false } }
    }
  };

  const topRegions = [
    { name: 'Maharashtra', sales: '₹ 45.2 Cr', orders: 12450, growth: '+15%' },
    { name: 'Karnataka', sales: '₹ 38.5 Cr', orders: 9800, growth: '+22%' },
    { name: 'Gujarat', sales: '₹ 25.4 Cr', orders: 7200, growth: '+8%' },
    { name: 'Tamil Nadu', sales: '₹ 18.9 Cr', orders: 5400, growth: '-2%' },
    { name: 'Uttar Pradesh', sales: '₹ 12.1 Cr', orders: 3800, growth: '+35%' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Sales Overview</h1>
          <p className="text-sm font-medium text-gray-500">Detailed sales analytics and geographical trends</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-green-600" />
            <span>Last 6 Months</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 bg-[#11311F] text-amber-500 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold hover:bg-[#064e3b] transition-colors">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Gross Sales</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">₹ 140.1 Cr</h3>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-500">24.5%</span>
            <span className="text-gray-400 ml-1">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Average Order Value (AOV)</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">₹ 2,450</h3>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-500">12.3%</span>
            <span className="text-gray-400 ml-1">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Sales Conversion Rate</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">4.8%</h3>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] font-bold">
            <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
            <span className="text-red-500">1.2%</span>
            <span className="text-gray-400 ml-1">vs previous period</span>
          </div>
        </div>
      </div>

      {/* Chart & Regions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 mb-6">Revenue Trends</h3>
          <div className="h-72">
            <ChartLine data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Top Regions Table */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Top Performing Regions</h3>
          <div className="space-y-4">
            {topRegions.map((region, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                <div>
                  <p className="text-xs font-bold text-gray-800">{region.name}</p>
                  <p className="text-[10px] font-medium text-gray-500">{region.orders.toLocaleString()} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900">{region.sales}</p>
                  <p className={`text-[10px] font-bold ${region.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {region.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminSales;
