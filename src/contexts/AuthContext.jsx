import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, supabaseError } from '../services/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (supabaseError) {
      setLoading(false);
      return;
    }

    // Get initial session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfile(session.user.id, session.user);
      } else {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id, session.user);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId, userAuthData) => {
    // Determine fallback role and name from auth metadata if profile query fails
    const fallbackRole = userAuthData?.user_metadata?.role || 'customer';
    const fallbackName = userAuthData?.user_metadata?.name || userAuthData?.email?.split('@')[0] || 'User';

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profile) {
        setCurrentUser({ ...userAuthData, ...profile, uid: userAuthData.id });
      } else {
        setCurrentUser({ ...userAuthData, uid: userAuthData.id, role: fallbackRole, name: fallbackName });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setCurrentUser({ ...userAuthData, uid: userAuthData.id, role: fallbackRole, name: fallbackName });
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentUser = (newData) => {
    setCurrentUser(prev => ({ ...prev, ...newData }));
  };

  const login = async (email, password) => {
    if (supabaseError) throw new Error("Supabase is not configured. Check your .env file.");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const loginWithGoogle = async () => {
    if (supabaseError) throw new Error("Supabase is not configured.");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
    return data;
  };

  const register = async (email, password, name, role, additionalData = {}) => {
    if (supabaseError) throw new Error("Supabase is not configured.");
    
    const finalRole = email.toLowerCase() === 'admin@fax.com' ? 'admin' : role;
    
    // 1. Sign up user and pass all metadata so the database trigger can set it up instantly
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: finalRole,
          status: finalRole === 'farmer' ? 'pending_kyc' : 'verified',
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
          ...additionalData
        }
      }
    });
    
    if (authError) throw authError;
    
    return authData;
  };

  const logout = async () => {
    if (supabaseError) return;
    await supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    if (supabaseError) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/update-password` });
    if (error) throw error;
  };

  const updateKYC = async (kycData) => {
    if (!currentUser) return;
    const { data, error } = await supabase
      .from('profiles')
      .update({ status: 'verified', ...kycData })
      .eq('id', currentUser.id)
      .select()
      .single();
      
    if (!error && data) {
      setCurrentUser(prev => ({ ...prev, ...data }));
    }
  };

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    register,
    logout,
    resetPassword,
    updateKYC,
    loading,
    isDemo: false,
    updateCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
