import React, { useState, useEffect } from 'react';
import { X, Check, Zap, Star, Award, Shield, Loader, CreditCard, RefreshCw } from 'lucide-react';
import { revenueCatService, ENTITLEMENTS } from '../lib/revenueCatService';
import toast from 'react-hot-toast';
import { StarBorder } from './ui/star-border';

interface PremiumSubscriptionModalProps {
  onClose: () => void;
}

const PremiumSubscriptionModal: React.FC<PremiumSubscriptionModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [offerings, setOfferings] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    loadOfferings();
    checkSubscriptionStatus();
  }, []);

  const loadOfferings = async () => {
    try {
      setLoading(true);
      const offeringsData = await revenueCatService.getOfferings();
      setOfferings(offeringsData);
      
      // Select default package (monthly)
      if (offeringsData.current?.availablePackages?.length > 0) {
        const monthlyPackage = offeringsData.current.availablePackages.find(
          (pkg: any) => pkg.product.subscriptionPeriod === 'P1M'
        );
        
        if (monthlyPackage) {
          setSelectedPackage(monthlyPackage);
        } else {
          setSelectedPackage(offeringsData.current.availablePackages[0]);
        }
      }
    } catch (error) {
      console.error('Error loading offerings:', error);
      toast.error('Failed to load subscription options');
    } finally {
      setLoading(false);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const hasSubscription = await revenueCatService.hasActiveSubscription();
      setIsSubscribed(hasSubscription);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error('Please select a subscription plan');
      return;
    }

    try {
      setIsPurchasing(true);
      await revenueCatService.purchasePackage(selectedPackage);
      toast.success('Subscription successful!');
      setIsSubscribed(true);
    } catch (error: any) {
      console.error('Purchase error:', error);
      
      // Check if user canceled the purchase
      if (error.code === 'cancelled') {
        toast.error('Purchase was cancelled');
      } else {
        toast.error('Failed to complete purchase');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setLoading(true);
      await revenueCatService.restorePurchases();
      const hasSubscription = await revenueCatService.hasActiveSubscription();
      setIsSubscribed(hasSubscription);
      
      if (hasSubscription) {
        toast.success('Your subscription has been restored!');
      } else {
        toast.info('No previous subscriptions found');
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
      toast.error('Failed to restore purchases');
    } finally {
      setLoading(false);
    }
  };

  const selectBillingPeriod = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period);
    
    if (!offerings?.current?.availablePackages) return;
    
    const packageToSelect = offerings.current.availablePackages.find(
      (pkg: any) => pkg.product.subscriptionPeriod === (period === 'monthly' ? 'P1M' : 'P1Y')
    );
    
    if (packageToSelect) {
      setSelectedPackage(packageToSelect);
    }
  };

  const formatPrice = (priceString: string) => {
    const price = parseFloat(priceString);
    return `$${price.toFixed(2)}`;
  };

  const calculateSavings = () => {
    if (!offerings?.current?.availablePackages) return null;
    
    const monthlyPackage = offerings.current.availablePackages.find(
      (pkg: any) => pkg.product.subscriptionPeriod === 'P1M'
    );
    
    const yearlyPackage = offerings.current.availablePackages.find(
      (pkg: any) => pkg.product.subscriptionPeriod === 'P1Y'
    );
    
    if (!monthlyPackage || !yearlyPackage) return null;
    
    const monthlyPrice = parseFloat(monthlyPackage.product.price);
    const yearlyPrice = parseFloat(yearlyPackage.product.price);
    const yearlyMonthlyEquivalent = yearlyPrice / 12;
    
    const savingsPercent = Math.round((1 - (yearlyMonthlyEquivalent / monthlyPrice)) * 100);
    return savingsPercent;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-[#0038FF] to-[#0021A5] text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Hustl Premium
            </h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 text-blue-100">Upgrade to unlock premium features and benefits</p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader className="w-8 h-8 text-[#0038FF] animate-spin mb-4" />
              <p className="text-gray-600">Loading subscription options...</p>
            </div>
          ) : isSubscribed ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">You're a Premium Member!</h3>
              <p className="text-gray-600 mb-6">
                You already have an active Hustl Premium subscription. Enjoy all the premium benefits!
              </p>
              <button
                onClick={onClose}
                className="bg-[#0038FF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0021A5] transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              {/* Subscription Benefits */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Premium Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Zap className="w-5 h-5 text-[#0038FF]" />
                    </div>
                    <div>
                      <p className="font-medium">Priority Task Matching</p>
                      <p className="text-sm text-gray-600">Get matched with helpers faster</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Award className="w-5 h-5 text-[#0038FF]" />
                    </div>
                    <div>
                      <p className="font-medium">Exclusive Task Categories</p>
                      <p className="text-sm text-gray-600">Access premium task categories</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Shield className="w-5 h-5 text-[#0038FF]" />
                    </div>
                    <div>
                      <p className="font-medium">Enhanced Safety Features</p>
                      <p className="text-sm text-gray-600">Additional verification and safety options</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Period Selector */}
              <div className="mb-6">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                  <button
                    onClick={() => selectBillingPeriod('monthly')}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      billingPeriod === 'monthly'
                        ? 'bg-white shadow-sm font-semibold'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => selectBillingPeriod('yearly')}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      billingPeriod === 'yearly'
                        ? 'bg-white shadow-sm font-semibold'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Yearly
                    {calculateSavings() && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        Save {calculateSavings()}%
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Subscription Plan */}
              {selectedPackage && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{selectedPackage.product.title}</h4>
                    <span className="text-xl font-bold">{formatPrice(selectedPackage.product.price)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedPackage.product.description}</p>
                  <div className="text-xs text-gray-500">
                    {billingPeriod === 'monthly' ? 'Billed monthly' : 'Billed annually'}
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              <StarBorder color="#0038FF">
                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing || !selectedPackage}
                  className="w-full bg-gradient-to-r from-[#0038FF] to-[#0021A5] text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
                >
                  {isPurchasing ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Subscribe Now
                    </>
                  )}
                </button>
              </StarBorder>

              {/* Restore Purchases */}
              <button
                onClick={handleRestorePurchases}
                className="w-full mt-4 text-[#0038FF] hover:text-[#0021A5] flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Restore Purchases
              </button>

              {/* Terms */}
              <div className="mt-6 text-xs text-center text-gray-500">
                <p>
                  By subscribing, you agree to our Terms of Service and Privacy Policy. 
                  Subscription automatically renews unless auto-renew is turned off at least 24 hours 
                  before the end of the current period.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionModal;