import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { CheckCircle, ShieldAlert, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmerKYC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser?.status === 'verified') {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-primary mx-auto" />
        <h2 className="text-2xl font-black text-dark">Account Verified!</h2>
        <p className="text-xs text-gray-500 font-medium leading-relaxed">
          Your farmer profile has been approved by the Admin. You now have unrestricted access to catalog listings and group buy features.
        </p>
        <Button variant="primary" onClick={() => navigate('/farmer')}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 space-y-6 text-center">
      
      <div className="space-y-4">
        <Clock className="w-20 h-20 text-amber-500 mx-auto animate-pulse" />
        <h1 className="text-3xl font-black text-dark">Under Admin Review</h1>
        <p className="text-sm text-gray-500 font-medium max-w-md mx-auto">
          Your registration details, Aadhaar Card, and Resident Certificate have been submitted and are currently being verified.
        </p>
      </div>

      <Card className="p-8 mt-8 bg-amber-50/50 border border-amber-200">
        <div className="flex flex-col items-center space-y-3">
          <ShieldAlert className="w-8 h-8 text-amber-500" />
          <h3 className="font-bold text-amber-900 text-lg">Verification Pending</h3>
          <p className="text-xs text-amber-800 font-semibold max-w-sm">
            An administrator must manually review your documents before you can access the Farmer Dashboard and list your crops. Please check back later.
          </p>
        </div>
      </Card>
      
      <div className="pt-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Check Status Again
        </Button>
      </div>

    </div>
  );
};

export default FarmerKYC;
