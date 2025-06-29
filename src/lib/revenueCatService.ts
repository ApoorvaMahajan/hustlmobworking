import Purchases from '@revenuecat/purchases-js';
import { auth } from './firebase';
import { captureException, captureMessage } from './sentryUtils';

// RevenueCat API key
const REVENUECAT_API_KEY = 'sk_iZrIVTCfcFBTIEmGyuHxKUJXcTJdc';

// Product IDs
export const PRODUCTS = {
  PREMIUM_MONTHLY: 'hustl_premium_monthly',
  PREMIUM_YEARLY: 'hustl_premium_yearly',
  TASK_CREDITS_10: 'hustl_task_credits_10',
  TASK_CREDITS_50: 'hustl_task_credits_50',
  TASK_CREDITS_100: 'hustl_task_credits_100'
};

// Entitlement IDs
export const ENTITLEMENTS = {
  PREMIUM: 'premium',
  TASK_CREDITS: 'task_credits'
};

class RevenueCatService {
  private initialized = false;

  /**
   * Initialize RevenueCat SDK
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await Purchases.configure({
        apiKey: REVENUECAT_API_KEY,
        appUserID: null // RevenueCat will generate an ID if null
      });
      
      this.initialized = true;
      
      // Log successful initialization
      captureMessage('RevenueCat initialized successfully', 'info');
      
      // Set up user identification when auth state changes
      auth.onAuthStateChanged(user => {
        if (user) {
          this.identifyUser(user.uid);
        }
      });
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'initialize' }
      });
    }
  }

  /**
   * Identify user with RevenueCat
   */
  async identifyUser(userId: string): Promise<void> {
    if (!this.initialized) await this.initialize();

    try {
      await Purchases.logIn(userId);
      captureMessage(`User identified with RevenueCat: ${userId}`, 'info');
    } catch (error) {
      console.error('Failed to identify user with RevenueCat:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'identifyUser' },
        extra: { userId }
      });
    }
  }

  /**
   * Get available packages
   */
  async getOfferings(): Promise<any> {
    if (!this.initialized) await this.initialize();

    try {
      const offerings = await Purchases.getOfferings();
      return offerings;
    } catch (error) {
      console.error('Failed to get offerings:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'getOfferings' }
      });
      throw error;
    }
  }

  /**
   * Purchase a package
   */
  async purchasePackage(packageToPurchase: any): Promise<any> {
    if (!this.initialized) await this.initialize();

    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      return customerInfo;
    } catch (error) {
      console.error('Failed to purchase package:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'purchasePackage' }
      });
      throw error;
    }
  }

  /**
   * Get customer info
   */
  async getCustomerInfo(): Promise<any> {
    if (!this.initialized) await this.initialize();

    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo;
    } catch (error) {
      console.error('Failed to get customer info:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'getCustomerInfo' }
      });
      throw error;
    }
  }

  /**
   * Check if user has active subscription
   */
  async hasActiveSubscription(): Promise<boolean> {
    try {
      const customerInfo = await this.getCustomerInfo();
      return customerInfo.entitlements[ENTITLEMENTS.PREMIUM]?.isActive || false;
    } catch (error) {
      console.error('Failed to check subscription status:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'hasActiveSubscription' }
      });
      return false;
    }
  }

  /**
   * Get user's task credits
   */
  async getTaskCredits(): Promise<number> {
    try {
      const customerInfo = await this.getCustomerInfo();
      return customerInfo.entitlements[ENTITLEMENTS.TASK_CREDITS]?.value || 0;
    } catch (error) {
      console.error('Failed to get task credits:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'getTaskCredits' }
      });
      return 0;
    }
  }

  /**
   * Restore purchases
   */
  async restorePurchases(): Promise<any> {
    if (!this.initialized) await this.initialize();

    try {
      const customerInfo = await Purchases.restorePurchases();
      return customerInfo;
    } catch (error) {
      console.error('Failed to restore purchases:', error);
      captureException(error, {
        tags: { component: 'RevenueCatService', action: 'restorePurchases' }
      });
      throw error;
    }
  }
}

export const revenueCatService = new RevenueCatService();