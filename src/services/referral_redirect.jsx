// MainWebsite/HomeComponents/ReferralRedirect.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";


const ReferralRedirect = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (referralCode) {
      // ✅ Redirect to register page with referral code
      navigate(`/register?ref=${referralCode}`, { replace: true });
    } else {
      // ✅ Agar code nahi hai toh home page
      navigate(ROUTES.HomeScreenWebsite, { replace: true });
    }
  }, [referralCode, navigate]);

  // ✅ Loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto"></div>
        <p className="text-gray-500 mt-4">Redirecting...</p>
      </div>
    </div>
  );
};

export default ReferralRedirect;