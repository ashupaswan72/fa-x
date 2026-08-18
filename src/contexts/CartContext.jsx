import React, { createContext, useContext, useState, useEffect } from 'react';
import { BULK_DISCOUNT_TIERS } from '../constants';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('fax_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useRewards, setUseRewards] = useState(false);

  useEffect(() => {
    localStorage.setItem('fax_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, purchaseType = 'standard', campaignId = null) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && item.purchaseType === purchaseType && item.campaignId === campaignId
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += Number(quantity);
        return updated;
      }

      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || "",
        minOrderQty: product.minOrderQty || 1,
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        isOrganic: product.isOrganic,
        isPreorder: product.isPreorder,
        advancePct: product.advancePct || 0,
        purchaseType, // 'standard', 'preorder', 'groupbuy'
        campaignId,
        quantity: Number(quantity)
      }];
    });
  };

  const removeFromCart = (id, purchaseType, campaignId) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.purchaseType === purchaseType && item.campaignId === campaignId)
    ));
  };

  const updateQuantity = (id, purchaseType, campaignId, quantity) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.purchaseType === purchaseType && item.campaignId === campaignId) {
        return { ...item, quantity: Math.max(item.minOrderQty, Number(quantity)) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setUseRewards(false);
  };

  // Dynamic calculations
  const calculateBulkDiscount = (quantity) => {
    const tier = BULK_DISCOUNT_TIERS.find(t => quantity >= t.minQty);
    return tier ? tier.discountPct : 0;
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discountPct = item.purchaseType === 'standard' ? calculateBulkDiscount(item.quantity) : 0;
      const unitPrice = item.price * (1 - discountPct / 100);
      return total + (unitPrice * item.quantity);
    }, 0);
  };

  const getAdvanceTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.purchaseType === 'preorder') {
        const itemTotal = item.price * item.quantity;
        const advance = itemTotal * (item.advancePct / 100);
        return total + advance;
      }
      return total;
    }, 0);
  };

  const getDiscountValue = () => {
    const subtotal = getSubtotal();
    let discount = 0;
    
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount += subtotal * (appliedCoupon.value / 100);
      } else if (appliedCoupon.type === 'flat') {
        discount += appliedCoupon.value;
      }
    }
    
    return Math.min(discount, subtotal);
  };

  const applyCoupon = (code) => {
    const codeUpper = code.toUpperCase();
    if (codeUpper === 'FRESH10') {
      setAppliedCoupon({ code: 'FRESH10', type: 'percentage', value: 10 });
      return { success: true, message: "Coupon FRESH10 applied! 10% discount." };
    } else if (codeUpper === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', type: 'flat', value: 50 });
      return { success: true, message: "Coupon WELCOME50 applied! ₹50 discount." };
    }
    return { success: false, message: "Invalid coupon code." };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      calculateBulkDiscount,
      getSubtotal,
      getAdvanceTotal,
      getDiscountValue,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      useRewards,
      setUseRewards
    }}>
      {children}
    </CartContext.Provider>
  );
};
