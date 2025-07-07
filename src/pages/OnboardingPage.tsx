
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingStepper } from '@/components/onboarding/OnboardingStepper';

const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.isOnboarded) {
    return <Navigate to="/" replace />;
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem('fame_onboarded', 'true');
    // In a real app, you would also update the user's onboarded status via API
    window.location.reload(); // Simple way to trigger auth context update
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-food-green-light to-food-orange-light">
      <OnboardingStepper onComplete={handleOnboardingComplete} />
    </div>
  );
};

export default OnboardingPage;
