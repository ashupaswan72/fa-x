import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/database';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ShoppingCart, ShoppingBag, Users, ClipboardList, Wallet, 
  ChevronDown, ArrowUpRight, Megaphone, Package, ShieldCheck, 
  Eye, Star, Clock, Truck 
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

const Sparkline = ({ color }) => (
  <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-4">
    <path 
      d="M0 25 L10 22 L20 28 L30 15 L40 18 L50 10 L60 15 L70 5 L80 12 L90 8 L100 20" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      vectorEffect="non-scaling-stroke"
    />
    <circle cx="0" cy="25" r="2" fill={color} />
    <circle cx="10" cy="22" r="2" fill={color} />
    <circle cx="20" cy="28" r="2" fill={color} />
    <circle cx="30" cy="15" r="2" fill={color} />
    <circle cx="40" cy="18" r="2" fill={color} />
    <circle cx="50" cy="10" r="2" fill={color} />
    <circle cx="60" cy="15" r="2" fill={color} />
    <circle cx="70" cy="5" r="2" fill={color} />
    <circle cx="80" cy="12" r="2" fill={color} />
    <circle cx="90" cy="8" r="2" fill={color} />
    <circle cx="100" cy="20" r="2" fill={color} />
  </svg>
);

const FarmerDashboard = () => {
  const { currentUser } = useAuth();
  
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const ords = await dbService.getOrders(currentUser.uid, 'farmer');
          const prods = await dbService.getProducts();
          setOrders(ords || []);
          setProducts((prods || []).filter(p => p.farmerId === currentUser.uid));
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.deliveryStatus === 'pending').length;
  const totalCustomers = new Set(orders.map(o => o.customerId)).size;

  // Derive recent orders dynamically
  const recentOrdersDynamic = orders.slice(0, 5).map(o => ({
    id: o.id ? o.id.substring(0,8).toUpperCase() : 'N/A',
    customer: o.customerName || 'Unknown',
    product: o.items && o.items.length > 0 ? o.items[0].productTitle : 'Items',
    amount: '₹' + (o.totalAmount || 0).toLocaleString(),
    status: o.deliveryStatus || 'Pending',
    sc: o.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
  }));

  // Derive top selling dynamically
  const topSellingDynamic = products.slice(0, 4).map(p => ({
    name: p.title,
    img: (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=100',
    sold: Math.floor(Math.random() * 50) + 10,
    rev: '₹' + (Math.floor(Math.random() * 5000) + 1000).toLocaleString()
  }));

  
  // Chart Data
  const lineChartData = {
    labels: ['01 May', '02 May', '03 May', '04 May', '05 May', '06 May', '07 May'],
    datasets: [
      {
        label: 'Sales (₹)',
        data: [12000, 9500, 19500, 11000, 16000, 13000, 18500],
        borderColor: '#0A6C35',
        backgroundColor: 'rgba(10, 108, 53, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        fill: true,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 12, usePointStyle: true, font: { size: 10 } }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 20000,
        ticks: { callback: (value) => `₹${value/1000}K`, font: { size: 10 } },
        grid: { color: '#f3f4f6', drawBorder: false }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { font: { size: 10 } }
      }
    }
  };

  const donutData = {
    labels: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [{
      data: [12, 18, 20, 32, 40, 2],
      backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#0A6C35', '#EF4444'],
      borderWidth: 0,
      cutout: '65%'
    }]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const donutLegend = [
    { color: 'bg-amber-500', label: 'Pending', value: 12 },
    { color: 'bg-emerald-500', label: 'Confirmed', value: 18 },
    { color: 'bg-blue-500', label: 'Packed', value: 20 },
    { color: 'bg-purple-500', label: 'Shipped', value: 32 },
    { color: 'bg-[#0A6C35]', label: 'Delivered', value: 40 },
    { color: 'bg-red-500', label: 'Cancelled', value: 2 },
  ];

  

  

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto pb-10">
      
      {/* 5 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A6C35] text-white flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Sales</p>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">{`₹${totalSales.toLocaleString()}`}</h3>
                <div className="flex items-center gap-1 text-[9px] font-bold mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">18.6%</span>
                  <span className="text-gray-400">vs last 7 days</span>
                </div>
              </div>
            </div>
          </div>
          <Sparkline color="#10B981" />
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A6C35] text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Orders</p>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">{totalOrders}</h3>
                <div className="flex items-center gap-1 text-[9px] font-bold mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">15.3%</span>
                  <span className="text-gray-400">vs last 7 days</span>
                </div>
              </div>
            </div>
          </div>
          <Sparkline color="#10B981" />
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A6C35] text-white flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">Total Customers</p>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">{totalCustomers}</h3>
                <div className="flex items-center gap-1 text-[9px] font-bold mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">12.7%</span>
                  <span className="text-gray-400">vs last 7 days</span>
                </div>
              </div>
            </div>
          </div>
          <Sparkline color="#10B981" />
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500">Pending Orders</p>
              <h3 className="text-lg font-black text-gray-900 mt-0.5">{pendingOrders}</h3>
              <p className="text-[10px] text-gray-500 mt-1">View and fulfill orders</p>
            </div>
          </div>
          <Sparkline color="#F59E0B" />
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0A6C35] text-white flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-500">Available Balance</p>
              <h3 className="text-lg font-black text-gray-900 mt-0.5">{`₹${(totalSales * 0.9).toLocaleString()}`}</h3>
              <p className="text-[10px] text-gray-500 mt-1">View Payouts</p>
            </div>
          </div>
          <Sparkline color="#10B981" />
        </div>

      </div>

      {/* Middle Row: Sales Chart, Order Status, Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Sales Overview */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Sales Overview</h3>
              <div className="flex items-end gap-3 mt-1">
                <h2 className="text-2xl font-black text-gray-900">{`₹${totalSales.toLocaleString()}`}</h2>
                <div className="flex items-center gap-1 text-[10px] font-bold mb-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">18.6%</span>
                  <span className="text-gray-400">vs last week</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 border border-gray-200 px-2 py-1 rounded">
              This Week <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="h-48 mt-4">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-900">Order Status</h3>
            <button className="text-[10px] font-bold text-green-600 hover:underline">View All Orders</button>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-32 relative mb-4">
               <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="space-y-1">
              {donutLegend.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2">
               <span className="text-[11px] font-bold text-gray-500">Total Orders</span>
               <span className="text-sm font-black text-[#0A6C35]">{totalOrders}</span>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-3">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <h3 className="text-sm font-bold text-gray-900">Announcements</h3>
            <button className="text-[10px] font-bold text-green-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            
            <div className="flex gap-3">
              <Megaphone className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">New Update</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">FA-X is now charging 2% commission from 15 May 2024.</p>
                <p className="text-[9px] text-gray-400 mt-1">10 May 2024</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Package className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">Inventory Reminder</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Keep your inventory updated to avoid order cancellations.</p>
                <p className="text-[9px] text-gray-400 mt-1">08 May 2024</p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-gray-900">Quality Check</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Ensure best quality packaging for faster deliveries.</p>
                <p className="text-[9px] text-gray-400 mt-1">05 May 2024</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-8 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
            <button className="text-[10px] font-bold text-green-600 hover:underline">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="text-[10px] text-gray-500 border-b border-gray-100">
                  <th className="font-semibold pb-2 px-2">Order ID</th>
                  <th className="font-semibold pb-2 px-2">Customer</th>
                  <th className="font-semibold pb-2 px-2">Product</th>
                  <th className="font-semibold pb-2 px-2">Amount</th>
                  <th className="font-semibold pb-2 px-2 text-center">Status</th>
                  <th className="font-semibold pb-2 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrdersDynamic.map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-2.5 px-2 text-[11px] font-bold text-green-700">{order.id}</td>
                    <td className="py-2.5 px-2 text-[11px] font-semibold text-gray-800">{order.customer}</td>
                    <td className="py-2.5 px-2 text-[11px] text-gray-600">{order.product}</td>
                    <td className="py-2.5 px-2 text-[11px] font-bold text-gray-900">{order.amount}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${order.sc}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button className="text-green-600 hover:bg-green-50 p-1 rounded transition-colors">
                        <Eye className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products Table */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm lg:col-span-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900">Top Selling Products</h3>
            <button className="text-[10px] font-bold text-green-600 hover:underline">View All Products</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-gray-500 border-b border-gray-100">
                  <th className="font-semibold pb-2 px-2">Product</th>
                  <th className="font-semibold pb-2 px-2 text-right">Units Sold</th>
                  <th className="font-semibold pb-2 px-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSellingDynamic.map((prod, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-2.5 px-2 flex items-center gap-2">
                      <img src={prod.img} alt={prod.name} className="w-6 h-6 rounded border border-gray-200 object-cover" />
                      <span className="text-[10px] font-bold text-gray-800 line-clamp-1">{prod.name}</span>
                    </td>
                    <td className="py-2.5 px-2 text-[11px] font-semibold text-gray-600 text-right">{prod.sold}</td>
                    <td className="py-2.5 px-2 text-[11px] font-bold text-gray-900 text-right">{prod.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Bottom KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3 w-full">
            <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-500">Profile Completion</p>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-black text-gray-900">80% <span className="text-[9px] font-medium text-gray-400">Completed</span></h3>
                <span className="text-[9px] font-bold text-green-600">Complete</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 w-[80%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3 w-full">
            <Star className="w-6 h-6 text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-500">Average Rating</p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900">4.6 <span className="text-[9px] font-medium text-gray-400">/ 5</span></h3>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className={`w-2.5 h-2.5 ${star <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-[9px] font-bold text-green-600">View Reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3 w-full">
            <Clock className="w-6 h-6 text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-500">Response Time</p>
              <h3 className="text-sm font-black text-gray-900 mb-0.5">2.4 hrs</h3>
              <p className="text-[9px] font-bold text-green-600">Good Response</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3 w-full">
            <Truck className="w-6 h-6 text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-500">On-time Delivery</p>
              <h3 className="text-sm font-black text-gray-900 mb-0.5">96%</h3>
              <p className="text-[9px] font-bold text-green-600">Excellent</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FarmerDashboard;
