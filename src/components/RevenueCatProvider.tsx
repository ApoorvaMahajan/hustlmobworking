import React, { createContext, useContext, useEffect, useState } from 'react';
import { revenueCatService } from '../lib/revenueCatService';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';

interface RevenueCatContextType {
  isPremium: boolean;
  taskCredits: number;
  loading: boolean;
  refreshSubscriptionStatus: () => Promise<void>;
  refreshTaskCredits: () => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType>({
  isPremium: false,
  taskCredits: 0,
  loading: true,
  refreshSubscriptionStatus: async () => {},
  refreshTaskCredits: async () => {}
});

export const useRevenueCat = () => useContext(RevenueCatContext);

interface RevenueCatProviderProps {
  children: React.ReactNode;
}

export const RevenueCatProvider: React.FC<RevenueCatProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [taskCredits, setTaskCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize RevenueCat
    revenueCatService.initialize();
    
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Identify user with RevenueCat
        await revenueCatService.identifyUser(user.uid);
        
        // Load subscription status and credits
        await refreshSubscriptionStatus();
        await refreshTaskCredits();
      } else {
        setIsPremium(false);
        setTaskCredits(0);
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const refreshSubscriptionStatus = async () => {
    if (!currentUser) return;
    
    try {
      const hasSubscription = await revenueCatService.hasActiveSubscription();
      setIsPremium(hasSubscription);
    } catch (error) {
      console.error('Error refreshing subscription status:', error);
    }
  };

  const refreshTaskCredits = async () => {
    if (!currentUser) return;
    
    try {
      const credits = await revenueCatService.getTaskCredits();
      setTaskCredits(credits);
    } catch (error) {
      console.error('Error refreshing task credits:', error);
    }
  };

  const value = {
    isPremium,
    taskCredits,
    loading,
    refreshSubscriptionStatus,
    refreshTaskCredits
  };

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  );
};