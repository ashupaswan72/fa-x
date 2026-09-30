import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

// Contexts & Providers
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WalletProvider } from './contexts/WalletContext';

// Toast Container
import { ToastContainer, BannerContainer } from './components/ui/Toast';

// Common Components
import TopBar from './components/common/TopBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import SellerLayout from './layouts/SellerLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import AboutUsPage from './pages/AboutUsPage';
import ShopPage from './pages/ShopPage';
import CategoriesPage from './pages/CategoriesPage';
import FarmersPage from './pages/FarmersPage';
import GroupBuyingPage from './pages/GroupBuyingPage';
import AIMarketPage from './pages/AIMarketPage';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Customer Dashboards
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerWallet from './pages/customer/CustomerWallet';
import CustomerWishlist from './pages/customer/CustomerWishlist';
import CustomerSupport from './pages/customer/CustomerSupport';
import CustomerGIS from './pages/customer/CustomerGIS';

// Delivery Dashboards
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryRoutes from './pages/delivery/DeliveryRoutes';
import DeliveryEarnings from './pages/delivery/DeliveryEarnings';
import DeliverySupport from './pages/delivery/DeliverySupport';

// Farmer Dashboards
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerNotifications from './pages/farmer/FarmerNotifications';
import FarmerInventory from './pages/farmer/FarmerInventory';
import FarmerOrders from './pages/farmer/FarmerOrders';
import FarmerGroupBuys from './pages/farmer/FarmerGroupBuys';
import FarmerKYC from './pages/farmer/FarmerKYC';
import FarmerAnalytics from './pages/farmer/FarmerAnalytics';
import FarmerMarketInsights from './pages/farmer/FarmerMarketInsights';
import FarmerSupport from './pages/farmer/FarmerSupport';
import FarmerReviews from './pages/farmer/FarmerReviews';
import FarmerPayments from './pages/farmer/FarmerPayments';
import FarmerPayouts from './pages/farmer/FarmerPayouts';
import FarmerMarketing from './pages/farmer/FarmerMarketing';
import FarmerGIS from './pages/farmer/FarmerGIS';

// Admin Dashboards
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserVerification from './pages/admin/AdminUserVerification';
import AdminProductManagement from './pages/admin/AdminProductManagement';
import AdminOrderManagement from './pages/admin/AdminOrderManagement';
import AdminLogistics from './pages/admin/AdminLogistics';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSupport from './pages/admin/AdminSupport';
import AdminSales from './pages/admin/AdminSales';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReports from './pages/admin/AdminReports';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminSystemUsers from './pages/admin/AdminSystemUsers';
import AdminReturns from './pages/admin/AdminReturns';

// Sleek 404 Page Component
const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <span className="text-6xl block">🌾</span>
      <h1 className="text-4xl font-black text-dark">404 - Lost in Fields</h1>
      <p className="text-xs text-gray-500 font-semibold max-w-xs mx-auto">
        The farm path you are trying to access doesn't exist. Return to the main gate to explore fresh crops.
      </p>
      <Link to="/" className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
        Return to Gate
      </Link>
    </div>
  );
};

// Maintenance Guard
const MaintenanceGuard = ({ children }) => {
  const { currentUser } = useAuth();
  
  // Listen to storage events to immediately update across tabs in demo
  const [isMaintenance, setIsMaintenance] = React.useState(false);

  React.useEffect(() => {
    const checkMaintenance = () => {
      const storedConfig = localStorage.getItem('fax_system_config');
      if (storedConfig) {
        try {
          const config = JSON.parse(storedConfig);
          setIsMaintenance(config.maintenanceMode === true);
        } catch (e) {}
      }
    };
    
    checkMaintenance();
    window.addEventListener('storage', checkMaintenance);
    // Custom event for same-window updates
    window.addEventListener('config-updated', checkMaintenance);
    return () => {
      window.removeEventListener('storage', checkMaintenance);
      window.removeEventListener('config-updated', checkMaintenance);
    };
  }, []);

  if (isMaintenance && (!currentUser || currentUser.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-4 border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h1 className="text-2xl font-black text-dark tracking-tight">Down for Maintenance</h1>
          <p className="text-sm font-semibold text-gray-500 leading-relaxed">
            FA-X is currently undergoing scheduled platform upgrades to serve you better. We'll be back shortly!
          </p>
        </div>
      </div>
    );
  }

  return children;
};

// Wrap component inside dashboard layout
const DashboardWrapper = ({ Component }) => {
  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
};

// Wrap component inside admin layout
const AdminWrapper = ({ Component }) => {
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
};

// Wrap component inside seller layout
const SellerWrapper = ({ Component }) => {
  return (
    <SellerLayout>
      <Component />
    </SellerLayout>
  );
};

// Public Route layout wrapper
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />
      <div className="flex-grow py-8 max-w-7xl mx-auto w-full px-4 md:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MaintenanceGuard>
          <CartProvider>
            <WalletProvider>
              
              {/* Globals Toast container */}
              <ToastContainer />
            <BannerContainer />

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
              <Route path="/shop" element={<PublicLayout><ShopPage /></PublicLayout>} />
              <Route path="/categories" element={<PublicLayout><CategoriesPage /></PublicLayout>} />
              <Route path="/farmers" element={<PublicLayout><FarmersPage /></PublicLayout>} />
              <Route path="/group-buying" element={<PublicLayout><GroupBuyingPage /></PublicLayout>} />
              <Route path="/ai-market" element={<PublicLayout><AIMarketPage /></PublicLayout>} />
              <Route path="/product/:id" element={<PublicLayout><ProductDetailsPage /></PublicLayout>} />
              <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
              <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
              <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><AboutUsPage /></PublicLayout>} />
              
              {/* Secure Checkout Guard (Customer only) */}
              <Route path="/checkout" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <PublicLayout><CheckoutPage /></PublicLayout>
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <PublicLayout><ProfilePage /></PublicLayout>
                </ProtectedRoute>
              } />

              {/* Auth Routes */}
              <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
              <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
              <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />

              {/* Secure Customer Dashboard Nested Area */}
              <Route path="/customer" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DashboardWrapper Component={CustomerDashboard} />
                </ProtectedRoute>
              } />
              <Route path="/customer/orders" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DashboardWrapper Component={CustomerOrders} />
                </ProtectedRoute>
              } />
              <Route path="/customer/wallet" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DashboardWrapper Component={CustomerWallet} />
                </ProtectedRoute>
              } />
              <Route path="/customer/wishlist" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DashboardWrapper Component={CustomerWishlist} />
                </ProtectedRoute>
              } />
              <Route path="/customer/support" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DashboardWrapper Component={CustomerSupport} />
                </ProtectedRoute>
              } />
              <Route path="/customer/gis" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DashboardWrapper Component={CustomerGIS} />
                </ProtectedRoute>
              } />

              {/* Secure Farmer Dashboard Nested Area */}
              <Route path="/farmer" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerDashboard} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/notifications" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerNotifications} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/inventory" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerInventory} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/orders" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerOrders} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/group-buys" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerGroupBuys} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/kyc" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerKYC} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/analytics" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerAnalytics} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/market-insights" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerMarketInsights} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/reviews" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerReviews} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/support" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerSupport} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/products" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerInventory} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/add-product" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerInventory} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/payments" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerPayments} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/marketing" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerMarketing} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/gis" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerGIS} />
                </ProtectedRoute>
              } />
              <Route path="/farmer/payouts" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <SellerWrapper Component={FarmerPayouts} />
                </ProtectedRoute>
              } />

              {/* Secure Admin Dashboard Nested Area */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminDashboard} />
                </ProtectedRoute>
              } />
              <Route path="/admin/verification" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminUserVerification} />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminProductManagement} />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminOrderManagement} />
                </ProtectedRoute>
              } />
              <Route path="/admin/logistics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminLogistics} />
                </ProtectedRoute>
              } />
              <Route path="/admin/campaigns" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminCampaigns} />
                </ProtectedRoute>
              } />
              <Route path="/admin/payments" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminPayments} />
                </ProtectedRoute>
              } />
              <Route path="/admin/reviews" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminReviews} />
                </ProtectedRoute>
              } />
              <Route path="/admin/support" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminSupport} />
                </ProtectedRoute>
              } />
              <Route path="/admin/sales" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminSales} />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminCustomers} />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminReports} />
                </ProtectedRoute>
              } />
              <Route path="/admin/audit" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminAuditLogs} />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminSystemUsers} />
                </ProtectedRoute>
              } />
              <Route path="/admin/returns" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminReturns} />
                </ProtectedRoute>
              } />

              {/* Secure Delivery Dashboard Nested Area */}
              <Route path="/delivery" element={
                <ProtectedRoute allowedRoles={['delivery']}>
                  <DashboardWrapper Component={DeliveryDashboard} />
                </ProtectedRoute>
              } />
              <Route path="/delivery/routes" element={
                <ProtectedRoute allowedRoles={['delivery']}>
                  <DashboardWrapper Component={DeliveryRoutes} />
                </ProtectedRoute>
              } />
              <Route path="/delivery/earnings" element={
                <ProtectedRoute allowedRoles={['delivery']}>
                  <DashboardWrapper Component={DeliveryEarnings} />
                </ProtectedRoute>
              } />
              <Route path="/delivery/support" element={
                <ProtectedRoute allowedRoles={['delivery']}>
                  <DashboardWrapper Component={DeliverySupport} />
                </ProtectedRoute>
              } />

              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminWrapper Component={AdminSettings} />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
            </Routes>

            </WalletProvider>
          </CartProvider>
        </MaintenanceGuard>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
