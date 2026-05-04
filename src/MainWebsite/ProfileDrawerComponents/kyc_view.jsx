import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { getKYC } from "../../services/kyc_services";
import { ROUTES } from "../../routes/routes";


const KYCView = () => {
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchKYCData();
  }, []);

  const fetchKYCData = async () => {
    setLoading(true);
    try {
      const response = await getKYC();
      console.log("KYC Data:", response);
      
      if (response.success && response.data) {
        setKycData(response.data);
      } else {
        setError("No KYC data found");
      }
    } catch (error) {
      console.error("Error fetching KYC:", error);
      setError("Failed to fetch KYC details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'verified':
        return <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">✅ Verified</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">⏳ Pending</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">❌ Rejected</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">Not Submitted</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading KYC details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-24 md:pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">KYC Details</h1>
            <p className="text-gray-500 text-sm md:text-base">View your KYC verification status and details</p>
          </div>

          {error && !kycData ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => navigate("/kyc-add")} className="px-6 py-2 bg-[#004296] text-white rounded-lg font-medium hover:bg-[#003380] transition-all">
                  Add KYC Now
                </button>
                <button onClick={() => navigate("/profile")} className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all">
                  Go Back
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">KYC Status</h3>
                    <p className="text-gray-500 text-sm mt-1">Your verification status</p>
                  </div>
                  {getStatusBadge(kycData?.status)}
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-2xl">👤</span>
                  <h3 className="text-xl font-bold text-[#004296]">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">First Name</p>
                    <p className="font-medium text-gray-800">{kycData?.first_name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Name</p>
                    <p className="font-medium text-gray-800">{kycData?.last_name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Date of Birth</p>
                    <p className="font-medium text-gray-800">{kycData?.dob ? new Date(kycData.dob).toLocaleDateString() : "-"}</p>
                  </div>
                </div>
              </div>

              {/* ID Proof */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-2xl">🆔</span>
                  <h3 className="text-xl font-bold text-[#004296]">ID Proof Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">ID Type</p>
                    <p className="font-medium text-gray-800 capitalize">{kycData?.id_type || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ID Number</p>
                    <p className="font-medium text-gray-800">{kycData?.id_number || "-"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-500 text-sm">Name as on ID</p>
                    <p className="font-medium text-gray-800">{kycData?.id_name || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-2xl">🏦</span>
                  <h3 className="text-xl font-bold text-[#004296]">Bank Account Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Account Holder Name</p>
                    <p className="font-medium text-gray-800">{kycData?.account_holder_name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Bank Name</p>
                    <p className="font-medium text-gray-800">{kycData?.bank_name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Number</p>
                    <p className="font-medium text-gray-800">{kycData?.account_number ? `XXXX${kycData.account_number.slice(-4)}` : "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">IFSC Code</p>
                    <p className="font-medium text-gray-800 uppercase">{kycData?.ifsc_code || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center pt-4">
                {/* {kycData?.status !== "verified" && (
                  <button onClick={() => navigate(ROUTES.KYC_EDIT)} className="px-6 py-3 bg-[#004296] text-white rounded-xl font-medium hover:bg-[#003380] transition-all">
                    ✏️ Edit KYC
                  </button>
                )} */}
                <button onClick={() => navigate("/profile")} className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all">
                  ← Back to Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KYCView;