export const CATEGORIES = [
  { id: 'vegetables', name: 'Vegetables', icon: 'Leaf', count: 12 },
  { id: 'fruits', name: 'Fruits', icon: 'Apple', count: 8 },
  { id: 'grains', name: 'Grains & Pulses', icon: 'Wheat', count: 6 },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'Egg', count: 5 },
  { id: 'spices', name: 'Spices & Honey', icon: 'Flame', count: 9 }
];

export const BULK_DISCOUNT_TIERS = [
  { minQty: 100, discountPct: 15, label: '100+ kg (Wholesale)' },
  { minQty: 50, discountPct: 10, label: '50+ kg (Bulk)' },
  { minQty: 25, discountPct: 5, label: '25+ kg (Medium)' },
  { minQty: 10, discountPct: 2, label: '10+ kg (Small)' }
];

export const FAQS = [
  {
    question: "How does the Preorder system work?",
    answer: "Farmers list their crops before the actual harvest, specifying the expected harvest date. Customers can reserve these crops by paying a small advance amount (e.g. 20-30%). Once the crop is harvested, customers pay the remaining balance, and the fresh produce is shipped directly to their address."
  },
  {
    question: "What is Group Buying?",
    answer: "Group Buying allows multiple customers to team up and buy products in bulk at discounted prices. Each campaign has a target member count and a deadline. If the target is met before the deadline, everyone gets the discounted rate. If not, the campaign closes and all participants are refunded."
  },
  {
    question: "How do I get bulk order discounts?",
    answer: "Bulk discounts are automatically calculated at checkout based on the quantity of an item you purchase. For example, buying 10kg gives 2% off, up to 15% off for 100kg or more. Business buyers (hotels, restaurants, wholesalers) can also submit custom quotation requests."
  },
  {
    question: "How does the Wallet and Rewards system work?",
    answer: "Your FA-X wallet allows you to deposit money, receive refunds instantly, and earn cashback reward points on purchases. Every 100 reward points equal ₹100, which can be applied directly at checkout."
  },
  {
    question: "Is payment on FA-X secure?",
    answer: "Yes, we use Razorpay for secure payments. All transactions are fully encrypted, and funds are held securely. For preorders or group buys, payments are managed safely according to verified status changes."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Patel",
    role: "Farmer, Gujarat",
    quote: "FA-X changed how I sell my onions. I got preorders for 80% of my harvest two months before pulling them out of the ground! I got the capital early and did not have to deal with middlemen.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1595273670150-db0a3e3922f5?w=150"
  },
  {
    id: 2,
    name: "Sunita Sharma",
    role: "Customer, New Delhi",
    quote: "I joined a group buy for fresh organic apples. We got them at a 25% discount, and they were delivered fresh from the farm in Shimla. Incredible concept!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  },
  {
    id: 3,
    name: "Organic Foods Ltd.",
    role: "Wholesale Buyer, Mumbai",
    quote: "Using the bulk quotation feature, we sourced 500kg of organic basmati rice directly. The automated discounts and invoicing saved us hours of paperwork.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
  }
];

export const STATISTICS = [
  { label: "Active Farmers", value: "1,200+" },
  { label: "Tons of Produce Sold", value: "8,500+" },
  { label: "Customer Savings", value: "₹24L+" },
  { label: "Successful Group Buys", value: "450+" }
];

// Initial mock data fixtures
export const MOCK_USERS = [
  {
    uid: "cust123",
    email: "customer@fax.com",
    name: "Aman Verma",
    role: "customer",
    status: "verified",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  },
  {
    uid: "deliv123",
    email: "driver@fax.com",
    name: "Rajesh Delivery",
    role: "delivery",
    status: "verified",
    phone: "9876500000",
    avatar: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=150"
  },
  {
    uid: "farm123",
    email: "farmer@fax.com",
    name: "Ramesh Kumar",
    role: "farmer",
    status: "verified",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    farmName: "Green Harvest Farms",
    phone: "9876543210",
    address: "Village Keshod, Junagadh, Gujarat",
    verified: true
  },
  {
    uid: "adm123",
    email: "admin@fax.com",
    name: "FA-X Admin",
    role: "admin",
    status: "verified",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  }
];

export const MOCK_PRODUCTS = [
  {
    id: "p1",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Organic Red Tomatoes",
    description: "Plump, juicy, naturally grown red tomatoes. No synthetic pesticides used. Perfect for salads, purees, and daily cooking.",
    price: 40, // per kg
    images: [
      "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600"
    ],
    category: "vegetables",
    harvestDate: "2026-07-20",
    isOrganic: true,
    stock: 500, // kg
    minOrderQty: 5,
    isPreorder: false
  },
  {
    id: "p2",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Premium Alphonso Mangoes",
    description: "King of Mangoes, Alphonso. Pre-order now to secure fresh, sweet-smelling, and pulp-rich mangoes. Harvest starts next month.",
    price: 180, // per kg
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600"
    ],
    category: "fruits",
    harvestDate: "2026-08-15",
    isOrganic: true,
    stock: 1200,
    minOrderQty: 10,
    isPreorder: true,
    advancePct: 25 // 25% deposit required
  },
  {
    id: "p3",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Premium Basmati Rice (1121)",
    description: "Extra long grain aged Basmati Rice. Premium quality and highly aromatic. Ideal for biryanis and special occasions.",
    price: 110,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600"
    ],
    category: "grains",
    harvestDate: "2026-07-10",
    isOrganic: false,
    stock: 2500,
    minOrderQty: 25,
    isPreorder: false
  },
  {
    id: "p4",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Fresh Farm Eggs (Brown)",
    description: "Free-range brown chicken eggs. Farm fresh, packed with nutrients, and cleaned safely before distribution.",
    price: 8, // per piece
    images: [
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600"
    ],
    category: "dairy",
    harvestDate: "2026-07-15",
    isOrganic: false,
    stock: 800,
    minOrderQty: 30,
    isPreorder: false
  },
  {
    id: "p5",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Pure Raw Forest Honey",
    description: "Unfiltered and unpasteurized raw honey extracted directly from wild hives in Gir forest. Pure golden sweetness.",
    price: 320, // per 500g
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600"
    ],
    category: "spices",
    harvestDate: "2026-07-18",
    isOrganic: true,
    stock: 200,
    minOrderQty: 2,
    isPreorder: false
  },
  {
    id: "p6",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Premium Sharbati Wheat",
    description: "Golden-grained Sharbati wheat from Madhya Pradesh. High nutritional value, makes exceptionally soft rotis.",
    price: 52, // per kg
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600"
    ],
    category: "grains",
    harvestDate: "2026-07-28",
    isOrganic: true,
    stock: 2000,
    minOrderQty: 50,
    isPreorder: false
  },
  {
    id: "p7",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Cold-Pressed Mustard Oil",
    description: "Authentic Kachi Ghani Mustard Oil. Wood-pressed from premium black mustard seeds, chemical-free and healthy.",
    price: 185, // per liter
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"
    ],
    category: "spices",
    harvestDate: "2026-07-22",
    isOrganic: true,
    stock: 600,
    minOrderQty: 5,
    isPreorder: false
  },
  {
    id: "p8",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Fresh Himalayan Red Apples",
    description: "Sweet, crunchy red apples harvested from organic orchards in Shimla. Freshly packed and graded.",
    price: 140, // per kg
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600"
    ],
    category: "fruits",
    harvestDate: "2026-07-29",
    isOrganic: true,
    stock: 850,
    minOrderQty: 5,
    isPreorder: false
  },
  {
    id: "p9",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    title: "Premium Green Cardamom",
    description: "Kerala green cardamom pods. Highly aromatic spice for traditional sweets, tea, and fine dining.",
    price: 1450, // per kg
    images: [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600"
    ],
    category: "spices",
    harvestDate: "2026-07-25",
    isOrganic: true,
    stock: 120,
    minOrderQty: 1,
    isPreorder: false
  }
];

export const MOCK_GROUP_BUYS = [
  {
    id: "gb1",
    productId: "p1",
    productTitle: "Organic Red Tomatoes",
    farmerId: "farm123",
    targetMembers: 15,
    currentMembers: 8,
    discountPct: 20, // 20% off
    deadline: "2026-07-25T18:00:00Z",
    buyerIds: ["cust1", "cust2", "cust3", "cust4", "cust5", "cust6", "cust7", "cust8"],
    status: "active"
  },
  {
    id: "gb2",
    productId: "p3",
    productTitle: "Premium Basmati Rice (1121)",
    farmerId: "farm123",
    targetMembers: 8,
    currentMembers: 8,
    discountPct: 15,
    deadline: "2026-07-12T12:00:00Z",
    buyerIds: ["cust1", "cust2", "cust3", "cust4", "cust5", "cust6", "cust7", "cust8"],
    status: "completed"
  }
];

export const MOCK_ORDERS = [
  {
    id: "o1001",
    customerId: "cust123",
    customerName: "Aman Verma",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    type: "standard",
    items: [
      {
        productId: "p1",
        title: "Organic Red Tomatoes",
        price: 40,
        quantity: 15,
        discountedPrice: 39.2 // bulk discount applied
      }
    ],
    totalAmount: 588,
    paymentStatus: "fully_paid",
    deliveryStatus: "shipped",
    shippingAddress: {
      name: "Aman Verma",
      street: "A-404, Shanti Heights, MG Road",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380001"
    },
    createdAt: "2026-07-14T10:30:00Z"
  },
  {
    id: "o1002",
    customerId: "cust123",
    customerName: "Aman Verma",
    farmerId: "farm123",
    farmerName: "Ramesh Kumar",
    type: "preorder",
    items: [
      {
        productId: "p2",
        title: "Premium Alphonso Mangoes",
        price: 180,
        quantity: 10,
        advancePaid: 450, // 25% of 1800
        balanceDue: 1350
      }
    ],
    totalAmount: 1800,
    paymentStatus: "deposit_paid",
    deliveryStatus: "pending_harvest",
    shippingAddress: {
      name: "Aman Verma",
      street: "A-404, Shanti Heights, MG Road",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380001"
    },
    createdAt: "2026-07-15T14:20:00Z"
  }
];

export const MOCK_REVIEWS = [
  {
    id: "r1",
    productId: "p1",
    userName: "Aditya Sen",
    rating: 5,
    comment: "Super fresh tomatoes. Best organic ones I have had in a long time. Highly recommend this farmer!",
    createdAt: "2026-07-12"
  },
  {
    id: "r2",
    productId: "p1",
    userName: "Sneha Patel",
    rating: 4,
    comment: "Good quality, delivery was fast. Safe packaging.",
    createdAt: "2026-07-14"
  }
];
