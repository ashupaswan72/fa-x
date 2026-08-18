import { Router } from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import GroupBuy from '../models/GroupBuy.js';
import Review from '../models/Review.js';
import Wishlist from '../models/Wishlist.js';
import Wallet from '../models/Wallet.js';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_GROUP_BUYS, MOCK_REVIEWS } from '../seed-data.js';

const router = Router();

// ─── Helper: map _id → id ───────────────────────────────────────────────────
const mapId = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════════

// GET all products (sorted by harvestDate ascending)
router.get('/products', async (_req, res) => {
  try {
    const products = await Product.find().sort({ harvestDate: 1 });
    res.json({ success: true, data: products.map(mapId) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: mapId(product) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create product
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: mapId(product) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: mapId(product) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════════════════════════════

// GET all users
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users.map((u) => { const o = u.toObject(); delete o._id; delete o.__v; return o; }) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET user by uid
router.get('/users/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    const obj = user.toObject();
    delete obj._id;
    delete obj.__v;
    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create user
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const obj = user.toObject();
    delete obj._id;
    delete obj.__v;
    res.status(201).json({ success: true, data: obj });
  } catch (err) {
    // Duplicate uid → return existing user
    if (err.code === 11000) {
      const existing = await User.findOne({ uid: req.body.uid });
      const obj = existing.toObject();
      delete obj._id;
      delete obj.__v;
      return res.json({ success: true, data: obj });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update user
router.put('/users/:uid', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    const obj = user.toObject();
    delete obj._id;
    delete obj.__v;
    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT verify KYC
router.put('/users/:uid/kyc', async (req, res) => {
  try {
    const update = { status: 'verified', ...req.body };
    const user = await User.findOneAndUpdate({ uid: req.params.uid }, update, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    const obj = user.toObject();
    delete obj._id;
    delete obj.__v;
    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE user
router.delete('/users/:uid', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ uid: req.params.uid });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════════════════════════

// GET orders (filter by userId + role)
router.get('/orders', async (req, res) => {
  try {
    const { userId, role } = req.query;
    let filter = {};
    if (userId) {
      if (role === 'farmer') {
        filter.farmerId = userId;
      } else {
        filter.customerId = userId;
      }
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: orders.map(mapId) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create order
router.post('/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: mapId(order) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status, isDeliveryStatus } = req.body;
    const update = isDeliveryStatus ? { deliveryStatus: status } : { paymentStatus: status };
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, data: mapId(order) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// GROUP BUYS
// ═══════════════════════════════════════════════════════════════════════════════

// GET all group buys
router.get('/groupbuys', async (_req, res) => {
  try {
    const groupBuys = await GroupBuy.find().sort({ createdAt: -1 });
    res.json({ success: true, data: groupBuys.map(mapId) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create group buy
router.post('/groupbuys', async (req, res) => {
  try {
    const groupBuy = await GroupBuy.create(req.body);
    res.status(201).json({ success: true, data: mapId(groupBuy) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT join group buy
router.put('/groupbuys/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const groupBuy = await GroupBuy.findById(req.params.id);
    if (!groupBuy) return res.status(404).json({ success: false, error: 'Group buy not found' });

    // Check if already joined
    if (groupBuy.buyerIds.includes(userId)) {
      return res.status(400).json({ success: false, error: 'User already joined this group buy' });
    }

    groupBuy.buyerIds.push(userId);
    groupBuy.currentMembers += 1;

    // Check if target met
    if (groupBuy.currentMembers >= groupBuy.targetMembers) {
      groupBuy.status = 'completed';
    }

    await groupBuy.save();
    res.json({ success: true, data: mapId(groupBuy) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════════════════════

// GET reviews (filter by productId)
router.get('/reviews', async (req, res) => {
  try {
    const filter = req.query.productId ? { productId: req.query.productId } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews.map(mapId) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create review
router.post('/reviews', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: mapId(review) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// WISHLISTS
// ═══════════════════════════════════════════════════════════════════════════════

// GET wishlist items
router.get('/wishlists/:uid', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ uid: req.params.uid });
    res.json({ success: true, data: wishlist ? wishlist.items : [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update wishlist (upsert)
router.put('/wishlists/:uid', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { uid: req.params.uid },
      { uid: req.params.uid, items: req.body.items },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: wishlist.items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// WALLETS
// ═══════════════════════════════════════════════════════════════════════════════

// GET wallet (return default if not found)
router.get('/wallets/:uid', async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ uid: req.params.uid });
    if (!wallet) {
      return res.json({
        success: true,
        data: {
          uid: req.params.uid,
          balance: 2000,
          rewardPoints: 150,
          transactions: [
            {
              id: 'tx_welcome',
              amount: 2000,
              type: 'credit',
              description: 'Welcome Escrow Bonus',
              date: new Date().toISOString(),
            },
          ],
        },
      });
    }
    const obj = wallet.toObject();
    delete obj._id;
    delete obj.__v;
    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update wallet (upsert)
router.put('/wallets/:uid', async (req, res) => {
  try {
    const wallet = await Wallet.findOneAndUpdate(
      { uid: req.params.uid },
      { uid: req.params.uid, ...req.body },
      { new: true, upsert: true }
    );
    const obj = wallet.toObject();
    delete obj._id;
    delete obj.__v;
    res.json({ success: true, data: obj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// SEED
// ═══════════════════════════════════════════════════════════════════════════════

router.post('/seed', async (_req, res) => {
  try {
    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      GroupBuy.deleteMany({}),
      Review.deleteMany({}),
      Wishlist.deleteMany({}),
      Wallet.deleteMany({}),
    ]);

    // Insert users
    const users = await User.insertMany(MOCK_USERS);

    // Insert products
    const products = await Product.insertMany(MOCK_PRODUCTS);

    // Map product IDs for group buys and reviews
    const tomatoId = products[0]._id.toString();  // Organic Red Tomatoes
    const riceId = products[2]._id.toString();     // Premium Basmati Rice

    // Prepare and insert group buys
    const groupBuysData = MOCK_GROUP_BUYS.map((gb, i) => ({
      ...gb,
      productId: i === 0 ? tomatoId : riceId,
    }));
    const groupBuys = await GroupBuy.insertMany(groupBuysData);

    // Prepare and insert reviews (both for tomatoes)
    const reviewsData = MOCK_REVIEWS.map((r) => ({
      ...r,
      productId: tomatoId,
    }));
    const reviews = await Review.insertMany(reviewsData);

    res.json({
      success: true,
      data: {
        users: users.length,
        products: products.length,
        groupBuys: groupBuys.length,
        reviews: reviews.length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
