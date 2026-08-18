import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { dbService } from '../services/database';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync wallet state from Firestore whenever user changes
  useEffect(() => {
    const loadWallet = async () => {
      // Prevent execution if user is not initialized
      if (currentUser) {
        setLoading(true);
        try {
          const walletData = await dbService.getUserWallet(currentUser.uid);
          setBalance(walletData.balance);
          setRewardPoints(walletData.rewardPoints);
          setTransactions(walletData.transactions || []);
        } catch (e) {
          console.error("Error loading wallet from Firestore:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setBalance(0);
        setRewardPoints(0);
        setTransactions([]);
        setLoading(false);
      }
    };
    loadWallet();
  }, [currentUser]);

  const saveWalletState = async (newBalance, newPoints, newTxs) => {
    if (currentUser) {
      try {
        await dbService.updateUserWallet(currentUser.uid, {
          balance: newBalance,
          rewardPoints: newPoints,
          transactions: newTxs
        });
      } catch (e) {
        console.error("Failed to sync wallet to Firestore:", e);
      }
    }
  };

  const depositFunds = async (amount) => {
    const numAmount = Number(amount);
    const newBalance = balance + numAmount;
    const newTx = {
      id: 'tx_' + Date.now(),
      amount: numAmount,
      type: 'credit',
      description: 'Funds Deposited (Gateway)',
      date: new Date().toISOString()
    };
    const nextTxs = [newTx, ...transactions];
    
    setBalance(newBalance);
    setTransactions(nextTxs);
    await saveWalletState(newBalance, rewardPoints, nextTxs);
  };

  const payWithWallet = async (amount, description) => {
    const numAmount = Number(amount);
    if (balance < numAmount) {
      throw new Error("Insufficient wallet balance.");
    }
    const newBalance = balance - numAmount;
    const newTx = {
      id: 'tx_' + Date.now(),
      amount: numAmount,
      type: 'debit',
      description,
      date: new Date().toISOString()
    };
    const nextTxs = [newTx, ...transactions];
    
    // Earn reward points on purchase: 1 point for every ₹20 spent
    const earnedPoints = Math.floor(numAmount / 20);
    const nextPoints = rewardPoints + earnedPoints;
    
    if (earnedPoints > 0) {
      nextTxs.unshift({
        id: 'tx_pts_' + Date.now(),
        amount: earnedPoints,
        type: 'points_credit',
        description: `Reward points earned for purchase`,
        date: new Date().toISOString()
      });
    }

    setBalance(newBalance);
    setRewardPoints(nextPoints);
    setTransactions(nextTxs);
    await saveWalletState(newBalance, nextPoints, nextTxs);
  };

  const refundToWallet = async (amount, description) => {
    const numAmount = Number(amount);
    const newBalance = balance + numAmount;
    const newTx = {
      id: 'tx_' + Date.now(),
      amount: numAmount,
      type: 'credit',
      description: `Refund: ${description}`,
      date: new Date().toISOString()
    };
    const nextTxs = [newTx, ...transactions];
    
    setBalance(newBalance);
    setTransactions(nextTxs);
    await saveWalletState(newBalance, rewardPoints, nextTxs);
  };

  const redeemPoints = async (pointsToRedeem) => {
    const pts = Math.min(rewardPoints, Number(pointsToRedeem));
    if (pts <= 0) return 0;
    
    const discountAmount = pts; // 1 point = ₹1
    const nextPoints = rewardPoints - pts;
    
    const newTx = {
      id: 'tx_' + Date.now(),
      amount: pts,
      type: 'points_debit',
      description: 'Redeemed points for checkout discount',
      date: new Date().toISOString()
    };
    const nextTxs = [newTx, ...transactions];
    
    setRewardPoints(nextPoints);
    setTransactions(nextTxs);
    await saveWalletState(balance, nextPoints, nextTxs);
    return discountAmount;
  };

  return (
    <WalletContext.Provider value={{
      balance,
      rewardPoints,
      transactions,
      depositFunds,
      payWithWallet,
      refundToWallet,
      redeemPoints,
      loading
    }}>
      {children}
    </WalletContext.Provider>
  );
};
