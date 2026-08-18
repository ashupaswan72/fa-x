import React from 'react';
import { 
  ShoppingCart, ShoppingBag, Users, IndianRupee, Calendar, 
  ChevronDown, ArrowUpRight, CheckCircle2, AlertTriangle, 
  RefreshCcw, HeadphonesIcon, Server, Star, Package
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Sparkline = () => (
  <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-4">
    <path 
      d="M0 25 L10 22 L20 28 L30 15 L40 18 L50 10 L60 15 L70 5 L80 12 L90 8 L100 20" 
      fill="none" 
      stroke="#f59e0b" 
      strokeWidth="2" 
      vectorEffect="non-scaling-stroke"
    />
    <circle cx="0" cy="25" r="2" fill="#f59e0b" />
    <circle cx="10" cy="22" r="2" fill="#f59e0b" />
    <circle cx="20" cy="28" r="2" fill="#f59e0b" />
    <circle cx="30" cy="15" r="2" fill="#f59e0b" />
    <circle cx="40" cy="18" r="2" fill="#f59e0b" />
    <circle cx="50" cy="10" r="2" fill="#f59e0b" />
    <circle cx="60" cy="15" r="2" fill="#f59e0b" />
    <circle cx="70" cy="5" r="2" fill="#f59e0b" />
    <circle cx="80" cy="12" r="2" fill="#f59e0b" />
    <circle cx="90" cy="8" r="2" fill="#f59e0b" />
    <circle cx="100" cy="20" r="2" fill="#f59e0b" />
  </svg>
);

const AdminDashboard = () => {
  // Chart Data
  const lineChartData = {
    labels: ['01 May', '02 May', '03 May', '04 May', '05 May', '06 May', '07 May'],
    datasets: [
      {
        label: 'This Week',
        data: [10, 5, 12, 6, 14, 11, 13],
        borderColor: '#11311F',
        backgroundColor: '#11311F',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: 'Last Week',
        data: [4, 7, 5, 8, 4, 6, 7],
        borderColor: '#f59e0b',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: { boxWidth: 12, usePointStyle: true, font: { size: 10 } }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 20,
        ticks: { callback: (value) => `₹${value} Cr`, font: { size: 10 } },
        grid: { color: '#f3f4f6', drawBorder: false }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { font: { size: 10 } }
      }
    }
  };

  const donutData = {
    labels: ['Fruits & Vegetables', 'Grains & Cereals', 'Dairy & Eggs', 'Pulses & Oils', 'Organic Products', 'Others'],
    datasets: [{
      data: [25, 20, 18, 14, 9, 14],
      backgroundColor: ['#11311F', '#064e3b', '#f59e0b', '#fbbf24', '#fcd34d', '#e5e7eb'],
      borderWidth: 0,
      cutout: '60%'
    }]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const legendItems = [
    { color: 'bg-[#11311F]', label: 'Fruits & Vegetables', value: '₹ 28.6 Cr', pct: '25%' },
    { color: 'bg-[#064e3b]', label: 'Grains & Cereals', value: '₹ 22.4 Cr', pct: '20%' },
    { color: 'bg-amber-500', label: 'Dairy & Eggs', value: '₹ 19.8 Cr', pct: '18%' },
    { color: 'bg-amber-400', label: 'Pulses & Oils', value: '₹ 15.3 Cr', pct: '14%' },
    { color: 'bg-amber-300', label: 'Organic Products', value: '₹ 10.2 Cr', pct: '9%' },
    { color: 'bg-gray-200', label: 'Others', value: '₹ 16.3 Cr', pct: '14%' },
  ];

  const recentOrders = [
    { id: 'OD428746538726', date: '07 May, 2024 • 11:30 AM', amt: '₹ 1,299', status: 'Delivered', sc: 'bg-green-100 text-green-700' },
    { id: 'OD428746538725', date: '07 May, 2024 • 11:25 AM', amt: '₹ 2,499', status: 'Shipped', sc: 'bg-green-100 text-green-700' },
    { id: 'OD428746538724', date: '07 May, 2024 • 11:20 AM', amt: '₹ 899', status: 'Processing', sc: 'bg-green-100 text-green-700' },
    { id: 'OD428746538723', date: '07 May, 2024 • 11:15 AM', amt: '₹ 1,599', status: 'Cancelled', sc: 'bg-gray-100 text-gray-600' },
    { id: 'OD428746538722', date: '07 May, 2024 • 11:10 AM', amt: '₹ 2,999', status: 'Delivered', sc: 'bg-green-100 text-green-700' },
  ];

  const topProducts = [
    { img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100', name: 'Basmati Rice 5kg', sales: '5,243', price: '₹ 1,299' },
    { img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100', name: 'Organic Toor Dal 1kg', sales: '3,987', price: '₹ 10,499' },
    { img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100', name: 'A2 Cow Ghee 1L', sales: '3,456', price: '₹ 19,999' },
    { img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100', name: 'Fresh Organic Apples 1kg', sales: '2,934', price: '₹ 46,990' },
    { img: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=100', name: 'Farm Fresh Eggs (12 pcs)', sales: '2,345', price: '₹ 1,899' },
  ];

  const topSellers = [
    { name: 'Green Harvest Farms', orders: '12,543', rating: '4.6' },
    { name: 'Pure Organic Hub', orders: '9,876', rating: '4.5' },
    { name: 'Kisan Connect', orders: '8,765', rating: '4.4' },
    { name: 'Desi Farm Supply', orders: '7,654', rating: '4.3' },
    { name: 'Fresh & Natural', orders: '6,543', rating: '4.2' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Dashboard</h1>
          <p className="text-sm font-medium text-gray-500">Overview of FAX operations</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-amber-50 hover:text-[#11311F] transition-colors">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>01 May 2024 - 07 May 2024</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#11311F] text-amber-500 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Sales</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">₹ 112.6 Cr</h3>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <span className="text-green-500">18.6%</span>
            <span className="text-gray-400">vs last week</span>
          </div>
          <Sparkline />
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#11311F] text-amber-500 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Orders</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">1.25 Lakh</h3>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <span className="text-green-500">15.3%</span>
            <span className="text-gray-400">vs last week</span>
          </div>
          <Sparkline />
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#11311F] text-amber-500 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Customers</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">85,245</h3>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <span className="text-green-500">12.7%</span>
            <span className="text-gray-400">vs last week</span>
          </div>
          <Sparkline />
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#11311F] text-amber-500 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Revenue</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">₹ 125.8 Cr</h3>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <span className="text-green-500">17.5%</span>
            <span className="text-gray-400">vs last week</span>
          </div>
          <Sparkline />
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Sales Overview Line Chart */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900">Sales Overview</h3>
            <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 border border-gray-200 px-2 py-1 rounded">
              This Week <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="h-64">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Top Categories Donut Chart */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900">Top Categories by Sales</h3>
            <button className="text-xs font-bold text-amber-600 hover:underline">View All</button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 h-64">
            <div className="w-40 h-40 shrink-0 relative">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="flex-1 w-full space-y-3">
              {legendItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    <span className="text-[11px] font-bold text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="text-gray-900">{item.value}</span>
                    <span className="text-gray-400">({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
            <button className="text-xs font-bold text-amber-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-green-700">{order.id}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{order.date}</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="text-xs font-bold text-gray-900">{order.amt}</p>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded w-20 text-center ${order.sc}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Top Selling Products</h3>
            <button className="text-xs font-bold text-amber-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {topProducts.map((prod, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={prod.img} alt="" className="w-8 h-8 rounded object-cover border border-gray-200 bg-gray-50" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">{prod.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">Sales: {prod.sales}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-900">{prod.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Performance */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Seller Performance (Top 5)</h3>
            <button className="text-xs font-bold text-amber-600 hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-500 border-b border-gray-100">
                <th className="font-semibold pb-2">Seller Name</th>
                <th className="font-semibold pb-2 text-right">Orders</th>
                <th className="font-semibold pb-2 text-right">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((seller, i) => (
                <tr key={i}>
                  <td className="py-3 text-xs font-bold text-gray-700">{seller.name}</td>
                  <td className="py-3 text-xs font-medium text-gray-600 text-right">{seller.orders}</td>
                  <td className="py-3 text-xs font-bold text-gray-900 text-right flex items-center justify-end gap-1">
                    {seller.rating} <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 border border-gray-200 rounded-lg"><Package className="w-5 h-5 text-[#11311F]" /></div>
             <div>
               <p className="text-[11px] font-bold text-gray-500">Low Stock Alerts</p>
               <h3 className="text-lg font-black text-gray-900 leading-tight">24</h3>
               <p className="text-[9px] text-gray-400">Products running low on stock</p>
             </div>
           </div>
           <button className="text-xs font-bold text-amber-600 self-end">View All</button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 border border-gray-200 rounded-lg"><RefreshCcw className="w-5 h-5 text-[#11311F]" /></div>
             <div>
               <p className="text-[11px] font-bold text-gray-500">Pending Returns</p>
               <h3 className="text-lg font-black text-gray-900 leading-tight">36</h3>
               <p className="text-[9px] text-gray-400">Returns awaiting action</p>
             </div>
           </div>
           <button className="text-xs font-bold text-amber-600 self-end">View All</button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 border border-gray-200 rounded-lg"><HeadphonesIcon className="w-5 h-5 text-[#11311F]" /></div>
             <div>
               <p className="text-[11px] font-bold text-gray-500">Open Support Tickets</p>
               <h3 className="text-lg font-black text-gray-900 leading-tight">18</h3>
               <p className="text-[9px] text-gray-400">Tickets awaiting response</p>
             </div>
           </div>
           <button className="text-xs font-bold text-amber-600 self-end">View All</button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 border border-gray-200 rounded-lg"><Server className="w-5 h-5 text-[#11311F]" /></div>
             <div>
               <p className="text-[11px] font-bold text-gray-500">System Health</p>
               <h3 className="text-sm font-black text-gray-900 leading-tight mt-1 mb-1">All Systems Operational</h3>
             </div>
           </div>
           <div className="flex flex-col items-end gap-1 self-end">
              <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
              <button className="text-xs font-bold text-amber-600">View Details</button>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
