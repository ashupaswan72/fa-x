export const MOCK_USERS = [
  { uid: 'cust123', email: 'customer@fax.com', name: 'Aman Verma', role: 'customer', status: 'verified', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
  { uid: 'farm123', email: 'farmer@fax.com', name: 'Ramesh Kumar', role: 'farmer', status: 'verified', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', farmName: 'Green Harvest Farms', phone: '9876543210', address: 'Village Keshod, Junagadh, Gujarat', verified: true },
  { uid: 'adm123', email: 'admin@fax.com', name: 'FA-X Admin', role: 'admin', status: 'verified', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
];

export const MOCK_PRODUCTS = [
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Organic Red Tomatoes', description: 'Plump, juicy, naturally grown red tomatoes.', price: 40, images: ['https://images.unsplash.com/photo-1595855759920-86582396756a?w=600'], category: 'vegetables', harvestDate: '2026-07-20', isOrganic: true, stock: 500, minOrderQty: 5, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Premium Alphonso Mangoes', description: 'King of Mangoes. Pre-order for fresh harvest.', price: 180, images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=600'], category: 'fruits', harvestDate: '2026-08-15', isOrganic: true, stock: 1200, minOrderQty: 10, isPreorder: true, advancePct: 25 },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Premium Basmati Rice (1121)', description: 'Extra long grain aged Basmati Rice.', price: 110, images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'], category: 'grains', harvestDate: '2026-07-10', isOrganic: false, stock: 2500, minOrderQty: 25, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Fresh Farm Eggs (Brown)', description: 'Free-range brown chicken eggs.', price: 8, images: ['https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600'], category: 'dairy', harvestDate: '2026-07-15', isOrganic: false, stock: 800, minOrderQty: 30, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Pure Raw Forest Honey', description: 'Unfiltered raw honey from Gir forest.', price: 320, images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600'], category: 'spices', harvestDate: '2026-07-18', isOrganic: true, stock: 200, minOrderQty: 2, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Premium Sharbati Wheat', description: 'Golden-grained Sharbati wheat from MP.', price: 52, images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600'], category: 'grains', harvestDate: '2026-07-28', isOrganic: true, stock: 2000, minOrderQty: 50, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Cold-Pressed Mustard Oil', description: 'Authentic Kachi Ghani Mustard Oil.', price: 185, images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600'], category: 'spices', harvestDate: '2026-07-22', isOrganic: true, stock: 600, minOrderQty: 5, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Fresh Himalayan Red Apples', description: 'Sweet crunchy red apples from Shimla.', price: 140, images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600'], category: 'fruits', harvestDate: '2026-07-29', isOrganic: true, stock: 850, minOrderQty: 5, isPreorder: false },
  { farmerId: 'farm123', farmerName: 'Ramesh Kumar', title: 'Premium Green Cardamom', description: 'Kerala green cardamom pods.', price: 1450, images: ['https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600'], category: 'spices', harvestDate: '2026-07-25', isOrganic: true, stock: 120, minOrderQty: 1, isPreorder: false },
];

export const MOCK_GROUP_BUYS = [
  { productId: 'will-be-set', productTitle: 'Organic Red Tomatoes', farmerId: 'farm123', targetMembers: 15, currentMembers: 8, discountPct: 20, deadline: '2026-07-25T18:00:00Z', buyerIds: ['cust1','cust2','cust3','cust4','cust5','cust6','cust7','cust8'], status: 'active' },
  { productId: 'will-be-set', productTitle: 'Premium Basmati Rice (1121)', farmerId: 'farm123', targetMembers: 8, currentMembers: 8, discountPct: 15, deadline: '2026-07-12T12:00:00Z', buyerIds: ['cust1','cust2','cust3','cust4','cust5','cust6','cust7','cust8'], status: 'completed' },
];

export const MOCK_REVIEWS = [
  { productId: 'will-be-set', userName: 'Aditya Sen', rating: 5, comment: 'Super fresh tomatoes. Best organic!', createdAt: '2026-07-12' },
  { productId: 'will-be-set', userName: 'Sneha Patel', rating: 4, comment: 'Good quality, fast delivery.', createdAt: '2026-07-14' },
];
