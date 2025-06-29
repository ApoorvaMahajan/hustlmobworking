import React, { useState, useEffect } from 'react';
import { X, Zap, Check, Loader, CreditCard, RefreshCw, Plus } from 'lucide-react';
import { revenueCatService, PRODUCTS } from '../lib/revenueCatService';
import toast from 'react-hot-toast';
import { StarBorder } from './ui/star-border';

interface TaskCreditsModalProps {
  onClose: () => void;
}

const TaskCreditsModal: React.FC<TaskCreditsModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [offerings, setOfferings] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [currentCredits, setCurrentCredits] = useState(0);

  useEffect(() => {
    loadOfferings();
    loadCurrentCredits();
  }, []);

  const loadOfferings = async () => {
    try {
      setLoading(true);
      const offeringsData = await revenueCatService.getOfferings();
      setOfferings(offeringsData);
      
      // Select default package
      if (offeringsData.current?.availablePackages?.length > 0) {
        // Find the 10 credits package
        const creditsPackage = offeringsData.current.availablePackages.find(
          (pkg: any) => pkg.product.identifier === PRODUCTS.TASK_CREDITS_10
        );
        
        if (creditsPackage) {
          setSelectedPackage(creditsPackage);
        } else {
          setSelectedPackage(offeringsData.current.availablePackages[0]);
        }
      }
    } catch (error) {
      console.error('Error loading offerings:', error);
      toast.error('Failed to load credit packages');
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentCredits = async () => {
    try {
      const credits = await revenueCatService.getTaskCredits();
      setCurrentCredits(credits);
    } catch (error) {
      console.error('Error loading current credits:', error);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error('Please select a credit package');
      return;
    }

    try {
      setIsPurchasing(true);
      await revenueCatService.purchasePackage(selectedPackage);
      toast.success('Credits purchased successfully!');
      
      // Refresh credits
      await loadCurrentCredits();
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
      await loadCurrentCredits();
      toast.success('Purchases restored successfully');
    } catch (error) {
      console.error('Error restoring purchases:', error);
      toast.error('Failed to restore purchases');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceString: string) => {
    const price = parseFloat(priceString);
    return `$${price.toFixed(2)}`;
  };

  const getCreditPackages = () => {
    if (!offerings?.current?.availablePackages) return [];
    
    return offerings.current.availablePackages.filter(
      (pkg: any) => pkg.product.identifier.includes('task_credits')
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-[#FF5A1F] to-[#E63A0B] text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Task Credits
            </h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 text-orange-100">Purchase credits to post and accept more tasks</p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader className="w-8 h-8 text-[#FF5A1F] animate-spin mb-4" />
              <p className="text-gray-600">Loading credit packages...</p>
            </div>
          ) : (
            <>
              {/* Current Credits */}
              <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Your Credits</h3>
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-[#FF5A1F] mr-1" />
                    <span className="text-xl font-bold">{currentCredits}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Use credits to post tasks or accept premium tasks
                </p>
              </div>

              {/* Credit Packages */}
              <h3 className="font-bold text-lg mb-4">Select a Package</h3>
              <div className="space-y-3 mb-6">
                {getCreditPackages().map((pkg: any) => (
                  <div
                    key={pkg.identifier}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                      selectedPackage?.identifier === pkg.identifier
                        ? 'border-[#FF5A1F] bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <Zap className="w-5 h-5 text-[#FF5A1F]" />
                        </div>
                        <div>
                          <p className="font-medium">{pkg.product.title}</p>
                          <p className="text-sm text-gray-600">{pkg.product.description}</p>
                        </div>
                      </div>
                      <span className="font-bold">{formatPrice(pkg.product.price)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Purchase Button */}
              <StarBorder color="#FF5A1F">
                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing || !selectedPackage}
                  className="w-full bg-gradient-to-r from-[#FF5A1F] to-[#E63A0B] text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
                >
                  {isPurchasing ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Buy Credits
                    </>
                  )}
                </button>
              </StarBorder>

              {/* Restore Purchases */}
              <button
                onClick={handleRestorePurchases}
                className="w-full mt-4 text-[#FF5A1F] hover:text-[#E63A0B] flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Restore Purchased Credits
              </button>

              {/* Terms */}
              <div className="mt-6 text-xs text-center text-gray-500">
                <p>
                  Credits are non-refundable and will be available immediately after purchase.
                  Credits do not expire and can be used for any eligible task on the platform.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCreditsModal;