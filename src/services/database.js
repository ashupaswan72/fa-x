import { supabase, supabaseError } from './supabase';

// Helper: extract data from Supabase response
const extract = (res) => {
  if (res.error) {
    console.error("Supabase Query Error:", res.error);
    throw res.error;
  }
  return res.data;
};


// Map snake_case to camelCase for users
const mapUserToCamelCase = (u) => {
  if (!u) return u;
  return {
    ...u,
    farmName: u.farm_name,
    kycDetails: u.kyc_details,
    createdAt: u.created_at
  };
};

// Map snake_case to camelCase for orders
const mapOrderToCamelCase = (o) => {
  if (!o) return o;
  return {
    ...o,
    customerId: o.customer_id,
    customerName: o.customer_name,
    farmerId: o.farmer_id,
    farmerName: o.farmer_name,
    totalAmount: o.total_amount,
    payableToday: o.payable_today,
    paymentStatus: o.payment_status,
    deliveryStatus: o.delivery_status,
    payoutStatus: o.payout_status || 'pending',
    deliveryPartnerId: o.delivery_partner_id,
    shippingAddress: o.shipping_address,
    paymentDetails: o.payment_details,
    createdAt: o.created_at,
  };
};

// Map camelCase to snake_case for orders
const mapOrderToSnakeCase = (o) => {
  if (!o) return o;
  return {
    customer_id: o.customerId,
    customer_name: o.customerName,
    farmer_id: o.farmerId,
    farmer_name: o.farmerName,
    type: o.type,
    items: o.items,
    total_amount: o.totalAmount,
    payable_today: o.payableToday,
    payment_status: o.paymentStatus,
    delivery_status: o.deliveryStatus,
    shipping_address: o.shippingAddress,
    payment_details: o.paymentDetails
  };
};

// Map snake_case to camelCase for products
const mapProductToCamelCase = (p) => {
  if (!p) return p;
  return {
    ...p,
    farmerId: p.farmer_id,
    farmerName: p.farmer_name,
    harvestDate: p.harvest_date,
    isOrganic: p.is_organic,
    minOrderQty: p.min_order_qty,
    isPreorder: p.is_preorder,
    advancePct: p.advance_pct,
    createdAt: p.created_at
  };
};

// Map camelCase to snake_case for products
const mapProductToSnakeCase = (p) => {
  if (!p) return p;
  return {
    farmer_id: p.farmerId,
    farmer_name: p.farmerName,
    title: p.title,
    description: p.description,
    price: p.price,
    images: p.images,
    category: p.category,
    harvest_date: p.harvestDate,
    is_organic: p.isOrganic,
    stock: p.stock,
    min_order_qty: p.minOrderQty,
    is_preorder: p.isPreorder,
    advance_pct: p.advancePct
  };
};

// Map snake_case to camelCase for Group Buys
const mapGroupBuyToCamelCase = (gb) => {
  if (!gb) return gb;
  return {
    ...gb,
    productId: gb.product_id,
    productTitle: gb.product_title,
    farmerId: gb.farmer_id,
    targetMembers: gb.target_members,
    currentMembers: gb.current_members,
    discountPct: gb.discount_pct,
    buyerIds: gb.buyer_ids,
    createdAt: gb.created_at
  };
};

// Map camelCase to snake_case for Group Buys
const mapGroupBuyToSnakeCase = (gb) => {
  if (!gb) return gb;
  return {
    product_id: gb.productId,
    product_title: gb.productTitle,
    farmer_id: gb.farmerId,
    target_members: gb.targetMembers,
    current_members: gb.currentMembers,
    discount_pct: gb.discountPct,
    deadline: gb.deadline,
    buyer_ids: gb.buyerIds,
    status: gb.status
  };
};

// Map snake_case to camelCase for Reviews
const mapReviewToCamelCase = (r) => {
  if (!r) return r;
  return {
    ...r,
    productId: r.product_id,
    userName: r.user_name,
    createdAt: r.created_at
  };
};

// Map camelCase to snake_case for Reviews
const mapReviewToSnakeCase = (r) => {
  if (!r) return r;
  return {
    product_id: r.productId,
    user_name: r.userName,
    rating: r.rating,
    comment: r.comment
  };
};

// Map snake_case to camelCase for Farmer Reviews
const mapFarmerReviewToCamelCase = (r) => {
  if (!r) return r;
  return {
    ...r,
    farmerId: r.farmer_id,
    customerId: r.customer_id,
    customerName: r.customer_name,
    createdAt: r.created_at
  };
};

// Map camelCase to snake_case for Farmer Reviews
const mapFarmerReviewToSnakeCase = (r) => {
  if (!r) return r;
  return {
    farmer_id: r.farmerId,
    customer_id: r.customerId,
    customer_name: r.customerName,
    rating: r.rating,
    comment: r.comment
  };
};

// Map snake_case to camelCase for Support Tickets
const mapSupportTicketToCamelCase = (t) => {
  if (!t) return t;
  return {
    ...t,
    userId: t.user_id,
    userName: t.user_name,
    adminReply: t.admin_reply,
    createdAt: t.created_at
  };
};

// Map camelCase to snake_case for Support Tickets
const mapSupportTicketToSnakeCase = (t) => {
  if (!t) return t;
  return {
    user_id: t.userId,
    user_name: t.userName,
    role: t.role,
    subject: t.subject,
    message: t.message,
    admin_reply: t.adminReply,
    status: t.status || 'open'
  };
};

export const dbService = {
  // ─── PRODUCTS ──────────────────────────────────────────
  getUsers: async () => {
        const res = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    const data = extract(res);
    return data && data.length > 0 ? data.map() : [];
  },

  getDeliveryPartners: async () => {
        const res = await supabase.from('profiles').select('*').eq('role', 'delivery');
    const data = extract(res);
    return data && data.length > 0 ? data.map() : [];
  },

  addDeliveryPartner: async (partnerData) => {
        const res = await supabase.rpc('admin_create_delivery_partner', { 
      p_name: partnerData.name, 
      p_email: partnerData.email, 
      p_phone: partnerData.phone 
    });
    if (res.error) throw res.error;
    return mapUserToCamelCase(res.data);
  },

  updateDeliveryPartner: async (partnerId, partnerData) => {
        const res = await supabase.rpc('admin_update_delivery_partner', { 
      p_partner_id: partnerId,
      p_name: partnerData.name, 
      p_email: partnerData.email, 
      p_phone: partnerData.phone 
    });
    if (res.error) throw res.error;
    return mapUserToCamelCase(res.data);
  },

  deleteDeliveryPartner: async (partnerId) => {
        const res = await supabase.rpc('admin_delete_delivery_partner', { p_partner_id: partnerId });
    if (res.error) throw res.error;
    return true;
  },

  updateDeliveryPartnerStatus: async (uid, status) => {
        // status could be 'online' or 'offline', we can store this in the profiles 'status' column or just return true for now
    const res = await supabase.from('profiles').update({ status: status }).eq('id', uid);
    if (res.error) throw res.error;
    return true;
  },

  assignDeliveryPartner: async (orderId, partnerId) => {
        const res = await supabase.rpc('assign_delivery_partner', { target_order_id: orderId, partner_id: partnerId });
    if (res.error) throw res.error;
    return true;
  },

  getProducts: async () => {
        const res = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const data = extract(res);
    return data && data.length > 0 ? data.map() : [];
  },

  getProduct: async (id) => {
        
    // Intercept mock product IDs (they are not valid UUIDs)
    if (!id.includes('-')) {
      return null;
    }
    
    const res = await supabase.from('products').select('*').eq('id', id).single();
    if (res.error && (res.error.code === 'PGRST116' || res.error.code === '406')) return null;
    return mapProductToCamelCase(extract(res));
  },

  addProduct: async (productData) => {
        const payload = mapProductToSnakeCase(productData);
    const res = await supabase.from('products').insert([payload]).select().single();
    return mapProductToCamelCase(extract(res));
  },

  uploadProductImage: async (file, userId) => {
        const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  updateProduct: async (id, productData) => {
        
    // Do not update mock products in Supabase
    if (!id.includes('-')) return { ...productData, id };

    const payload = mapProductToSnakeCase(productData);
    const res = await supabase.from('products').update(payload).eq('id', id).select().single();
    return mapProductToCamelCase(extract(res));
  },

  deleteProduct: async (id) => {
        await supabase.from('products').delete().eq('id', id);
    return id;
  },

  updateProductStatus: async (id, status) => {
        const res = await supabase.rpc('update_product_status', { target_product_id: id, new_status: status });
    if (res.error) throw res.error;
    return true;
  },

  toggleProductFeatured: async (id, isFeatured) => {
        const res = await supabase.rpc('toggle_product_featured', { target_product_id: id, featured_status: isFeatured });
    if (res.error) throw res.error;
    return true;
  },

  deleteProductAdmin: async (id) => {
        const res = await supabase.rpc('delete_product_by_admin', { target_product_id: id });
    if (res.error) throw res.error;
    return id;
  },

  updateProductFullAdmin: async (id, data) => {
        if (!id.includes('-')) return true; // mock bypass
    const res = await supabase.rpc('update_product_full_admin', {
      target_product_id: id,
      p_title: data.title,
      p_description: data.description,
      p_price: Number(data.price),
      p_stock: Number(data.stock),
      p_category: data.category,
      p_image_url: data.imageUrl
    });
    if (res.error) throw res.error;
    return true;
  },

  // ─── GROUP BUYS ────────────────────────────────────────
  getGroupBuys: async () => {
        // Assuming group_buys table exists
    const res = await supabase.from('group_buys').select('*').order('created_at', { ascending: false });
    const data = extract(res);
    return (data || []).map(mapGroupBuyToCamelCase);
  },

  createGroupBuy: async (campaignData) => {
        const payload = mapGroupBuyToSnakeCase(campaignData);
    const res = await supabase.from('group_buys').insert([payload]).select().single();
    return mapGroupBuyToCamelCase(extract(res));
  },

  joinGroupBuy: async (campaignId, userId) => {
    // Requires a relational table or an array column update.
    return { success: true };
  },

  // ─── ORDERS ────────────────────────────────────────────
  getOrders: async (userId, role) => {
        let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    
    if (role === 'farmer') {
      query = query.eq('farmer_id', userId);
    } else if (role === 'delivery') {
      query = query.eq('delivery_partner_id', userId);
    } else if (userId && role !== 'admin') {
      query = query.eq('customer_id', userId);
    }
    
    const res = await query;
    const data = extract(res);
    return (data || []).map(mapOrderToCamelCase);
  },

  createOrder: async (orderData) => {
        
    // Fix for mock data products being purchased
    if (orderData.farmerId === 'farm123') {
      orderData.farmerId = orderData.customerId; // Bypasses UUID crash for mock data
    }
    
    const payload = mapOrderToSnakeCase(orderData);
    const res = await supabase.from('orders').insert([payload]).select().single();
    
    // Automatically deduct stock and generate notifications
    if (!res.error && orderData.items && orderData.items.length > 0) {
      for (const item of orderData.items) {
        if (item.productId && !item.productId.startsWith('will-be-set')) {
          try {
            await supabase.rpc('deduct_product_stock', { target_product_id: item.productId, qty: item.quantity });
            
            // Check remaining stock to generate inventory notification if needed
            // Since we can't easily fetch updated stock in the same customer transaction easily,
            // we will fetch the current product state first, then do the math.
            const pRes = await supabase.from('products').select('stock, min_order_qty, title').eq('id', item.productId).single();
            if (pRes.data) {
              if (pRes.data.stock <= pRes.data.min_order_qty * 2) {
                await dbService.addFarmerNotification(
                  orderData.farmerId,
                  "Low Stock Alert",
                  `Your crop "${pRes.data.title}" is running low on stock (${pRes.data.stock}kg remaining). Consider updating your inventory.`,
                  "inventory"
                );
              }
            }
          } catch (e) {
            console.error("Failed to process stock logic for", item.productId, e);
          }
        }
      }
      
      // Notify the farmer about the new order
      try {
        await dbService.addFarmerNotification(
          orderData.farmerId,
          "New Order Received!",
          `You have a new order from ${orderData.customerName} for ${formatPrice(orderData.totalAmount)}.`,
          "order"
        );
      } catch(e) {
        console.error("Failed to notify farmer", e);
      }
    }
    
    return mapOrderToCamelCase(extract(res));
  },

  farmerAcceptOrder: async (orderId) => {
        const res = await supabase.rpc('farmer_update_order_status', { target_order_id: orderId, new_delivery_status: 'processing' });
    if (res.error) throw res.error;
    return true;
  },

  farmerRejectOrder: async (orderId, orderItems) => {
        
    // 1. Mark as cancelled
    const res = await supabase.rpc('farmer_update_order_status', { target_order_id: orderId, new_delivery_status: 'cancelled' });
    if (res.error) throw res.error;
    
    // 2. Restore stock for each item
    if (orderItems && orderItems.length > 0) {
      for (const item of orderItems) {
        if (item.productId && !item.productId.startsWith('will-be-set')) {
          try {
            await supabase.rpc('restore_product_stock', { target_product_id: item.productId, qty: item.quantity });
          } catch (e) {
            console.error("Failed to restore stock for", item.productId, e);
          }
        }
      }
    }
    
    return true;
  },

  deliveryPartnerUpdateOrderStatus: async (orderId, newDeliveryStatus) => {
        const res = await supabase.from('orders').update({ delivery_status: newDeliveryStatus }).eq('id', orderId).select().single();
    if (res.error) throw res.error;
    return mapOrderToCamelCase(extract(res));
  },

  driverRejectAssignment: async (orderId) => {
        const res = await supabase.rpc('unassign_delivery_partner', { target_order_id: orderId });
    if (res.error) throw res.error;
    return true;
  },

  updateOrderStatus: async (id, status, isDeliveryStatus = false) => {
        const updatePayload = isDeliveryStatus ? { delivery_status: status } : { payment_status: status };
    const res = await supabase.from('orders').update(updatePayload).eq('id', id).select().single();
    return mapOrderToCamelCase(extract(res));
  },

  updateOrderStatusAdmin: async (id, deliveryStatus, paymentStatus) => {
        const res = await supabase.rpc('update_order_status_admin', { 
      target_order_id: id, 
      new_delivery_status: deliveryStatus,
      new_payment_status: paymentStatus
    });
    if (res.error) throw res.error;
    return true;
  },

  processFarmerPayout: async (farmerId) => {
        const res = await supabase.rpc('mark_farmer_payout_complete', { target_farmer_id: farmerId });
    if (res.error) throw res.error;
    return true;
  },

  // ─── USERS PROFILE ────────────────────────────────────
  getUser: async (uid) => {
    if (!checkConfig()) {
      return null;
    }
    const res = await supabase.from('profiles').select('*').eq('id', uid).single();
    return extract(res);
  },

  updateUserProfile: async (uid, updateData) => {
    if (!checkConfig()) return updateData;
    
    const payload = {};
    if (updateData.name !== undefined) payload.name = updateData.name;
    if (updateData.phone !== undefined) payload.phone = updateData.phone;
    if (updateData.avatar !== undefined) payload.avatar = updateData.avatar;
    if (updateData.farmName !== undefined) payload.farm_name = updateData.farmName;
    if (updateData.address !== undefined) payload.address = updateData.address;

    const res = await supabase.from('profiles').update(payload).eq('id', uid).select().single();
    if (res.error) throw res.error;
    return extract(res);
  },

  verifyUserKYC: async (uid) => {
        const res = await supabase.rpc('approve_farmer_kyc', { target_uid: uid });
    if (res.error) throw res.error;
    return true;
  },

  rejectFarmerKYC: async (uid) => {
        const res = await supabase.rpc('update_user_status', { target_uid: uid, new_status: 'rejected' });
    if (res.error) throw res.error;
    return true;
  },

  suspendUser: async (uid) => {
        const res = await supabase.rpc('update_user_status', { target_uid: uid, new_status: 'suspended' });
    if (res.error) throw res.error;
    return true;
  },

  unblockUser: async (uid) => {
        const res = await supabase.rpc('update_user_status', { target_uid: uid, new_status: 'verified' });
    if (res.error) throw res.error;
    return true;
  },

  updateUserRole: async (uid, newRole) => {
        const res = await supabase.rpc('update_user_role', { target_uid: uid, new_role: newRole });
    if (res.error) throw res.error;
    return true;
  },

  getFarmerStats: async (uid) => {
    if (!checkConfig()) return { totalSales: 0, rating: 0, activeOrders: 0 };
    
    // Fetch orders where this user is the farmer
    const ordersRes = await supabase.from('orders').select('total_amount').eq('farmer_id', uid);
    const orders = extract(ordersRes) || [];
    const totalSales = orders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);
    const activeOrders = orders.length; // Simplified for mockup

    // Fetch reviews
    const reviewsRes = await supabase.from('farmer_reviews').select('rating').eq('farmer_id', uid);
    const reviews = extract(reviewsRes) || [];
    const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

    return {
      totalSales,
      rating: avgRating.toFixed(1),
      activeOrders
    };
  },

  deleteUser: async (uid) => {
        const { error } = await supabase.rpc('remove_user_by_admin', { target_uid: uid });
    if (error) throw error;
    return uid;
  },

  // ─── SUPPORT TICKETS ───────────────────────────────────
  createSupportTicket: async (ticketData) => {
        const payload = mapSupportTicketToSnakeCase(ticketData);
    const res = await supabase.from('support_tickets').insert([payload]).select().single();
    return mapSupportTicketToCamelCase(extract(res));
  },

  getUserSupportTickets: async (userId) => {
        const res = await supabase.from('support_tickets').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    const data = extract(res);
    return (data || []).map(mapSupportTicketToCamelCase);
  },

  getAllSupportTickets: async () => {
        const res = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false });
    const data = extract(res);
    return (data || []).map(mapSupportTicketToCamelCase);
  },

  replySupportTicket: async (ticketId, replyText) => {
        const res = await supabase
      .from('support_tickets')
      .update({ admin_reply: replyText, status: 'resolved' })
      .eq('id', ticketId)
      .select()
      .single();
    return mapSupportTicketToCamelCase(extract(res));
  },

  // ─── REVIEWS ───────────────────────────────────────────
  getReviews: async (productId) => {
        const res = await supabase.from('reviews').select('*').eq('product_id', productId);
    const data = extract(res);
    return (data || []).map(mapReviewToCamelCase);
  },

  getAllReviews: async () => {
        const res = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    const data = extract(res);
    return (data || []).map(mapReviewToCamelCase);
  },

  addReview: async (reviewData) => {
        const payload = mapReviewToSnakeCase(reviewData);
    const res = await supabase.from('reviews').insert([payload]).select().single();
    return mapReviewToCamelCase(extract(res));
  },

  // ─── FARMER REVIEWS ────────────────────────────────────
  getFarmerReviews: async (farmerId) => {
        const res = await supabase.from('farmer_reviews').select('*').eq('farmer_id', farmerId);
    const data = extract(res);
    return (data || []).map(mapFarmerReviewToCamelCase);
  },

  getAllFarmerReviews: async () => {
        const res = await supabase.from('farmer_reviews').select('*').order('created_at', { ascending: false });
    const data = extract(res);
    return (data || []).map(mapFarmerReviewToCamelCase);
  },

  addFarmerReview: async (reviewData) => {
        const payload = mapFarmerReviewToSnakeCase(reviewData);
    const res = await supabase.from('farmer_reviews').insert([payload]).select().single();
    return mapFarmerReviewToCamelCase(extract(res));
  },

  // ─── WISHLIST ──────────────────────────────────────────
  getUserWishlist: async (userId) => {
    return []; // Mock for now
  },

  toggleWishlist: async (userId, productId) => {
    return { added: true };
  },

  // ─── WALLET ────────────────────────────────────────────
  getUserWallet: async (userId) => {
    if (!checkConfig()) return { balance: 0, rewardPoints: 0, transactions: [] };
    const res = await supabase.from('wallets').select('*').eq('uid', userId).single();
    
    // PGRST116 is 406 Not Acceptable (Not Found for single)
    if (res.error && (res.error.code === 'PGRST116' || res.error.code === '406' || res.status === 406)) {
      return { balance: 0, rewardPoints: 0, transactions: [] };
    }
    
    if (res.error) throw res.error; 
    
    // Map snake_case to camelCase
    if (res.data) {
      return {
        balance: Number(res.data.balance) || 0,
        rewardPoints: Number(res.data.reward_points) || 0,
        transactions: res.data.transactions || []
      };
    }
    return { balance: 0, rewardPoints: 0, transactions: [] };
  },

  updateUserWallet: async (userId, walletData) => {
    if (!checkConfig()) return;
    
    const payload = {
      balance: walletData.balance,
      reward_points: walletData.rewardPoints,
      transactions: walletData.transactions
    };
    
    const res = await supabase.from('wallets').update(payload).eq('uid', userId);
    if (res.error) throw res.error;
  },

  // ─── MARKETING & CONTENT ────────────────────────────────
  getBanners: async () => {
        const res = await supabase.from('promotional_banners').select('*').order('created_at', { ascending: false });
    return extract(res) || [];
  },
  createBanner: async (data) => {
        const res = await supabase.from('promotional_banners').insert([data]).select().single();
    return extract(res);
  },
  deleteBanner: async (id) => {
        await supabase.from('promotional_banners').delete().eq('id', id);
    return id;
  },

  getCoupons: async () => {
        const res = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    return extract(res) || [];
  },
  createCoupon: async (data) => {
        const res = await supabase.from('coupons').insert([data]).select().single();
    return extract(res);
  },
  deleteCoupon: async (id) => {
        await supabase.from('coupons').delete().eq('id', id);
    return id;
  },

  getNotifications: async () => {
        const res = await supabase.from('system_notifications').select('*').order('created_at', { ascending: false });
    return extract(res) || [];
  },
  createNotification: async (data) => {
        const res = await supabase.from('system_notifications').insert([data]).select().single();
    return extract(res);
  },
  deleteNotification: async (id) => {
        await supabase.from('system_notifications').delete().eq('id', id);
    return id;
  },

  // 🔔 FARMER NOTIFICATIONS
  getFarmerNotifications: async (farmerId) => {
        const res = await supabase.from('farmer_notifications').select('*').eq('farmer_id', farmerId).order('created_at', { ascending: false });
    const data = extract(res);
    return (data || []).map(n => ({
      id: n.id,
      farmerId: n.farmer_id,
      title: n.title,
      message: n.message,
      type: n.type,
      isRead: n.is_read,
      createdAt: n.created_at
    }));
  },

  markNotificationRead: async (notificationId) => {
    if (!checkConfig()) return true;
    const res = await supabase.from('farmer_notifications').update({ is_read: true }).eq('id', notificationId);
    if (res.error) throw res.error;
    return true;
  },

  addFarmerNotification: async (farmerId, title, message, type = 'system') => {
    if (!checkConfig()) return true;
    // Bypassing for mock data
    if (farmerId === 'farm123' || !farmerId.includes('-')) return true;
    const res = await supabase.from('farmer_notifications').insert([{
      farmer_id: farmerId,
      title,
      message,
      type
    }]);
    if (res.error) throw res.error;
    return true;
  }
};
