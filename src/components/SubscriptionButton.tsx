import React from 'react';
import { Star, Zap } from 'lucide-react';
import { useRevenueCat } from './RevenueCatProvider';

interface SubscriptionButtonProps {
  onClick: () => void;
  type: 'premium' | 'credits';
  className?: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ 
  onClick, 
  type, 
  className = '' 
}) => {
  const { isPremium, taskCredits, loading } = useRevenueCat();

  if (loading) {
    return null;
  }

  if (type === 'premium') {
    return (
      <button
        onClick={onClick}
        className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
          isPremium 
            ? 'bg-gradient-to-r from-[#0038FF] to-[#0021A5] text-white' 
            : 'bg-blue-100 text-[#0038FF] hover:bg-blue-200'
        } transition-colors ${className}`}
      >
        <Star className="w-4 h-4 mr-1" />
        {isPremium ? 'Premium' : 'Upgrade'}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-orange-100 text-[#FF5A1F] hover:bg-orange-200 transition-colors ${className}`}
    >
      <Zap className="w-4 h-4 mr-1" />
      <span>{taskCredits} Credits</span>
    </button>
  );
};

export default SubscriptionButton;