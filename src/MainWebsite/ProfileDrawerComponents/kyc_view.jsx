// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../HomeComponents/nav_bar";
// import Footer from "../HomeComponents/footer";
// import { getKYC } from "../../services/kyc_services";
// import { ROUTES } from "../../routes/routes";


// const KYCView = () => {
//   const navigate = useNavigate();
//   const [kycData, setKycData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchKYCData();
//   }, []);

//   const fetchKYCData = async () => {
//     setLoading(true);
//     try {
//       const response = await getKYC();
//       console.log("KYC Data:", response);
      
//       if (response.success && response.data) {
//         setKycData(response.data);
//       } else {
//         setError("No KYC data found");
//       }
//     } catch (error) {
//       console.error("Error fetching KYC:", error);
//       setError("Failed to fetch KYC details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'verified':
//         return <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">✅ Verified</span>;
//       case 'pending':
//         return <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">⏳ Pending</span>;
//       case 'rejected':
//         return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">❌ Rejected</span>;
//       default:
//         return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">Not Submitted</span>;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Navbar />
//         <main className="grow flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto"></div>
//             <p className="mt-4 text-gray-500">Loading KYC details...</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />

//       <main className="grow pt-24 md:pt-28 pb-12 px-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">KYC Details</h1>
//             <p className="text-gray-500 text-sm md:text-base">View your KYC verification status and details</p>
//           </div>

//           {error && !kycData ? (
//             <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//               <div className="text-6xl mb-4">📋</div>
//               <p className="text-gray-500 mb-4">{error}</p>
//               <div className="flex gap-3 justify-center">
//                 <button onClick={() => navigate("/kyc-add")} className="px-6 py-2 bg-[#004296] text-white rounded-lg font-medium hover:bg-[#003380] transition-all">
//                   Add KYC Now
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all">
//                   Go Back
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Status Card */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">KYC Status</h3>
//                     <p className="text-gray-500 text-sm mt-1">Your verification status</p>
//                   </div>
//                   {getStatusBadge(kycData?.status)}
//                 </div>
//               </div>

//               {/* Personal Information */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                   <span className="text-2xl">👤</span>
//                   <h3 className="text-xl font-bold text-[#004296]">Personal Information</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">First Name</p>
//                     <p className="font-medium text-gray-800">{kycData?.first_name || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Last Name</p>
//                     <p className="font-medium text-gray-800">{kycData?.last_name || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Date of Birth</p>
//                     <p className="font-medium text-gray-800">{kycData?.dob ? new Date(kycData.dob).toLocaleDateString() : "-"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* ID Proof */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                   <span className="text-2xl">🆔</span>
//                   <h3 className="text-xl font-bold text-[#004296]">ID Proof Details</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">ID Type</p>
//                     <p className="font-medium text-gray-800 capitalize">{kycData?.id_type || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">ID Number</p>
//                     <p className="font-medium text-gray-800">{kycData?.id_number || "-"}</p>
//                   </div>
//                   <div className="md:col-span-2">
//                     <p className="text-gray-500 text-sm">Name as on ID</p>
//                     <p className="font-medium text-gray-800">{kycData?.id_name || "-"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Bank Details */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                   <span className="text-2xl">🏦</span>
//                   <h3 className="text-xl font-bold text-[#004296]">Bank Account Details</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">Account Holder Name</p>
//                     <p className="font-medium text-gray-800">{kycData?.account_holder_name || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Bank Name</p>
//                     <p className="font-medium text-gray-800">{kycData?.bank_name || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Account Number</p>
//                     <p className="font-medium text-gray-800">{kycData?.account_number ? `XXXX${kycData.account_number.slice(-4)}` : "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">IFSC Code</p>
//                     <p className="font-medium text-gray-800 uppercase">{kycData?.ifsc_code || "-"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4 justify-center pt-4">
//                 {/* {kycData?.status !== "verified" && (
//                   <button onClick={() => navigate(ROUTES.KYC_EDIT)} className="px-6 py-3 bg-[#004296] text-white rounded-xl font-medium hover:bg-[#003380] transition-all">
//                     ✏️ Edit KYC
//                   </button>
//                 )} */}
//                 <button onClick={() => navigate("/profile")} className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all">
//                   ← Back to Profile
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default KYCView;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { getKYC } from "../../services/kyc_services";
import { ROUTES } from "../../routes/routes";
import { API } from "../../services/api_url";

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
        // If data is an array, get the first item, otherwise use data directly
        const kycInfo = Array.isArray(response.data) ? response.data[0] : response.data;
        setKycData(kycInfo);
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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      // If date is in YYYY-MM-DD format
      if (dateString.includes('-') && dateString.length === 10) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      }
      // If date is ISO format
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "-";
    if (accountNumber.length <= 4) return accountNumber;
    return `XXXX${accountNumber.slice(-4)}`;
  };

  const maskAadhaarNumber = (aadhaarNumber) => {
    if (!aadhaarNumber) return "-";
    if (aadhaarNumber.length <= 4) return aadhaarNumber;
    return `XXXX XXXX ${aadhaarNumber.slice(-4)}`;
  };

  const maskPANNumber = (panNumber) => {
    if (!panNumber) return "-";
    if (panNumber.length <= 4) return panNumber;
    return `XXXX${panNumber.slice(-4)}`;
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

  if (error && !kycData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="grow pt-24 md:pt-28 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">KYC Details</h1>
              <p className="text-gray-500 text-sm md:text-base">View your KYC verification status and details</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => navigate("/kyc-add")} 
                  className="px-6 py-3 bg-[#004296] text-white rounded-xl font-medium hover:bg-[#003380] transition-all"
                >
                  Add KYC Now
                </button>
                <button 
                  onClick={() => navigate("/profile")} 
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Go Back
                </button>
              </div>
            </div>
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

          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">KYC Status</h3>
                  <p className="text-gray-500 text-sm mt-1">Your verification status</p>
                </div>
                <div>
                  {getStatusBadge(kycData?.status)}
                </div>
              </div>
              
              {/* Rejection Reason if any */}
              {kycData?.status === 'rejected' && kycData?.rejection_reason && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm font-medium">Rejection Reason:</p>
                  <p className="text-red-600 text-sm mt-1">{kycData.rejection_reason}</p>
                </div>
              )}
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
                  <p className="font-medium text-gray-800 text-lg">{kycData?.first_name || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Last Name</p>
                  <p className="font-medium text-gray-800 text-lg">{kycData?.last_name || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm">Date of Birth</p>
                  <p className="font-medium text-gray-800 text-lg">{formatDate(kycData?.dob)}</p>
                </div>
              </div>
            </div>

            {/* Aadhaar Card Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <span className="text-2xl">🆔</span>
                <h3 className="text-xl font-bold text-[#004296]">Aadhaar Card Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">Aadhaar Number</p>
                    <p className="font-medium text-gray-800 text-lg">{maskAadhaarNumber(kycData?.id_number)}</p>
                  </div>
                  
                  {/* Front Image */}
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Aadhaar Front Image</p>
                    {kycData?.id_front_image ? (
                      <div className="border border-gray-200 rounded-lg p-2">
                        <img 
                          src={kycData.id_front_image} 
                          alt="Aadhaar Front" 
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(kycData.id_front_image, '_blank')}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <span className="text-gray-400">No image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Back Image */}
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Aadhaar Back Image</p>
                    {kycData?.id_back_image ? (
                      <div className="border border-gray-200 rounded-lg p-2">
                        <img 
                          src={kycData.id_back_image} 
                          alt="Aadhaar Back" 
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(kycData.id_back_image, '_blank')}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <span className="text-gray-400">No image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PAN Card Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <span className="text-2xl">🪪</span>
                <h3 className="text-xl font-bold text-[#004296]">PAN Card Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">PAN Card Number</p>
                    <p className="font-medium text-gray-800 text-lg uppercase">{maskPANNumber(kycData?.pancard_number)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">PAN Card Image</p>
                  {kycData?.pancard_image ? (
                    <div className="border border-gray-200 rounded-lg p-2">
                      <img 
                        src={kycData.pancard_image} 
                        alt="PAN Card" 
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(kycData.pancard_image, '_blank')}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <span className="text-gray-400">No image uploaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <span className="text-2xl">🏦</span>
                <h3 className="text-xl font-bold text-[#004296]">Bank Account Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Account Holder Name</p>
                  <p className="font-medium text-gray-800 text-lg">{kycData?.account_holder_name || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Bank Name</p>
                  <p className="font-medium text-gray-800 text-lg">{kycData?.bank_name || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Account Number</p>
                  <p className="font-medium text-gray-800 text-lg">{maskAccountNumber(kycData?.account_number)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">IFSC Code</p>
                  <p className="font-medium text-gray-800 text-lg uppercase">{kycData?.ifsc_code || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">UPI ID</p>
                  <p className="font-medium text-gray-800 text-lg uppercase">{kycData?.upi_id  || "-"}</p>
                </div>
              </div>
            </div>

            {/* Verified/Submitted Date */}
            {kycData?.created_at && (
              <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
                <p className="text-gray-500 text-sm">
                  Submitted on: <span className="font-medium text-gray-700">{formatDate(kycData.created_at)}</span>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              {kycData?.status !== "verified" && (
                <button 
                  onClick={() => navigate("/kyc-edit")} 
                  className="px-6 py-3 bg-[#004296] text-white rounded-xl font-medium hover:bg-[#003380] transition-all"
                >
                  ✏️ Edit KYC
                </button>
              )}
              <button 
                onClick={() => navigate("/profile")} 
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                ← Back to Profile
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KYCView;