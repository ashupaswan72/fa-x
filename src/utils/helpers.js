// Utility Helper Functions

export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

export const getDaysRemaining = (dateString) => {
  if (!dateString) return 0;
  const target = new Date(dateString);
  const now = new Date();
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export const getPreorderInfo = (price, quantity, advancePct) => {
  const total = price * quantity;
  const advance = total * (advancePct / 100);
  const balance = total - advance;
  return { total, advance, balance };
};

export const getStatusBadgeStyle = (status) => {
  const normalized = status ? status.toLowerCase() : "";
  switch (normalized) {
    case 'verified':
    case 'completed':
    case 'delivered':
    case 'fully_paid':
    case 'active':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    case 'pending_kyc':
    case 'pending':
    case 'pending_harvest':
    case 'deposit_paid':
    case 'pending_deposit':
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'failed':
    case 'cancelled':
    case 'expired':
    case 'refunded':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'shipped':
    case 'harvested':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};
