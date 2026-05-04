// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../HomeComponents/nav_bar";
// import Footer from "../HomeComponents/footer";
// import { submitKYC, updateKYC, getKYC, verifyIFSC } from "../../services/kyc_services";
// import { API } from "../services/api_url"

// const KYC = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("tab1");
//   const [completedTabs, setCompletedTabs] = useState({
//     tab1: false,
//     tab2: false,
//     tab3: false,
//   });
//   const [existingKYC, setExistingKYC] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [fetchingIFSC, setFetchingIFSC] = useState(false);

//   // Form Data
//   const [formData, setFormData] = useState({
//     // Tab 1: Personal Info
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     // Tab 2: ID Proof
//     panNumber: "",
//     aadhaarNumber: "",
//     panFile: null,
//     aadhaarFront: null,
//     aadhaarBack: null,
//     // Tab 3: Bank Details
//     accountHolder: "",
//     bankName: "",
//     accountNumber: "",
//     confirmAccountNumber: "",
//     ifscCode: "",
//     frontImage: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [isSaved, setIsSaved] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const tabs = [
//     { id: "tab1", label: "Personal Info", icon: "👤" },
//     { id: "tab2", label: "ID Proof", icon: "🆔" },
//     { id: "tab3", label: "Bank Details", icon: "🏦" },
//   ];

//   // Helper function to format date for input field
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";
//     if (dateString.includes('T')) {
//       return dateString.split('T')[0];
//     }
//     return dateString;
//   };

//   // Helper function to convert file to base64
//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // Fetch user profile for personal info
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await fetch(`${API.PROFILE_URL}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const result = await response.json();
//       if (result.status === 200 && result.success) {
//         const profileData = result.data;
//         setFormData(prev => ({
//           ...prev,
//           firstName: profileData.first_name || "",
//           lastName: profileData.last_name || "",
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   // Fetch existing KYC data
//   const fetchExistingKYC = async () => {
//     try {
//       const response = await getKYC();
//       console.log("Existing KYC:", response);
      
//       if (response.success && response.data) {
//         setExistingKYC(response.data);
        
//         // Format date for input field
//         const formattedDob = formatDateForInput(response.data.dob);
        
//         // Populate form with existing data
//         setFormData(prev => ({
//           ...prev,
//           firstName: response.data.first_name || prev.firstName,
//           lastName: response.data.last_name || prev.lastName,
//           dateOfBirth: formattedDob,
//           // ID Proof (using PAN for id_number if available)
//           panNumber: response.data.id_number || "",
//           aadhaarNumber: response.data.id_number || "",
//           // Bank Details
//           accountHolder: response.data.account_holder_name || "",
//           bankName: response.data.bank_name || "",
//           accountNumber: response.data.account_number || "",
//           confirmAccountNumber: response.data.account_number || "",
//           ifscCode: response.data.ifsc_code || "",
//         }));
        
//         // Mark tabs as completed if data exists
//         setCompletedTabs({
//           tab1: !!(response.data.first_name && response.data.dob),
//           tab2: !!(response.data.id_number),
//           tab3: !!(response.data.account_number && response.data.ifsc_code),
//         });
        
//         if (response.data.status === "pending") {
//           setIsEditing(true);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching KYC:", error);
//     }
//   };

//   // Fetch IFSC details
//   const handleIFSCBlur = async () => {
//     const ifscCode = formData.ifscCode.toUpperCase();
//     if (!ifscCode || ifscCode.length !== 11) {
//       setErrors({ ...errors, ifscCode: "Please enter valid IFSC code" });
//       return;
//     }

//     setFetchingIFSC(true);
//     try {
//       const response = await verifyIFSC(ifscCode);
//       console.log("IFSC Response:", response);
      
//       if (response.success && response.data) {
//         setFormData(prev => ({
//           ...prev,
//           bankName: response.data.bank,
//         }));
//         setErrors({ ...errors, ifscCode: "" });
//       } else {
//         setErrors({ ...errors, ifscCode: "Invalid IFSC code" });
//       }
//     } catch (error) {
//       console.error("IFSC verification error:", error);
//       setErrors({ ...errors, ifscCode: "Failed to verify IFSC code" });
//     } finally {
//       setFetchingIFSC(false);
//     }
//   };

//   useEffect(() => {
//     fetchExistingKYC();
//     fetchUserProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateTab1 = () => {
//     const newErrors = {};
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateTab2 = () => {
//     const newErrors = {};
//     if (!formData.panNumber) newErrors.panNumber = "PAN number is required";
//     else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
//       newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
//     }
//     if (!formData.aadhaarNumber) newErrors.aadhaarNumber = "Aadhaar number is required";
//     else if (formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = "Aadhaar must be 12 digits";
//     if (!formData.panFile) newErrors.panFile = "PAN card image is required";
//     if (!formData.aadhaarFront) newErrors.aadhaarFront = "Aadhaar front image is required";
//     if (!formData.aadhaarBack) newErrors.aadhaarBack = "Aadhaar back image is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateTab3 = () => {
//     const newErrors = {};
//     if (!formData.accountHolder) newErrors.accountHolder = "Account holder name is required";
//     if (!formData.bankName) newErrors.bankName = "Bank name is required";
//     if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
//     if (!formData.confirmAccountNumber) newErrors.confirmAccountNumber = "Please confirm account number";
//     if (formData.accountNumber !== formData.confirmAccountNumber) {
//       newErrors.confirmAccountNumber = "Account numbers do not match";
//     }
//     if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
//     else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
//       newErrors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)";
//     }
//      if (!formData.frontImage) newErrors.frontImage = "Image is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleTabClick = (tabId) => {
//     if (tabId === "tab2" && !completedTabs.tab1) {
//       alert("Please complete Personal Info first");
//       return;
//     }
//     if (tabId === "tab3" && (!completedTabs.tab1 || !completedTabs.tab2)) {
//       alert("Please complete all previous steps first");
//       return;
//     }
//     setActiveTab(tabId);
//   };

//   const handleSaveTab1 = () => {
//     if (validateTab1()) {
//       setCompletedTabs({ ...completedTabs, tab1: true });
//       setIsSaved(true);
//       alert("Personal information saved successfully!");
//       setTimeout(() => {
//         setActiveTab("tab2");
//         setIsSaved(false);
//       }, 500);
//     }
//   };

//   const handleSaveTab2 = () => {
//     if (validateTab2()) {
//       setCompletedTabs({ ...completedTabs, tab2: true });
//       setIsSaved(true);
//       alert("ID Proof details saved successfully!");
//       setTimeout(() => {
//         setActiveTab("tab3");
//         setIsSaved(false);
//       }, 500);
//     }
//   };

//   const handleSaveTab3 = () => {
//     if (validateTab3()) {
//       setCompletedTabs({ ...completedTabs, tab3: true });
//       setIsSaved(true);
//       alert("Bank details saved successfully!");
//     }
//   };

//   const handleFinalSubmit = async () => {
//     if (!completedTabs.tab1 || !completedTabs.tab2 || !completedTabs.tab3) {
//       alert("Please complete all sections before submitting");
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Convert files to base64
//       const panFileBase64 = formData.panFile ? await fileToBase64(formData.panFile) : null;
//       const aadhaarFrontBase64 = formData.aadhaarFront ? await fileToBase64(formData.aadhaarFront) : null;
//       const aadhaarBackBase64 = formData.aadhaarBack ? await fileToBase64(formData.aadhaarBack) : null;
//       const frontImageBase64 = formData.frontImage ? await fileToBase64(formData.frontImage) : null;

//       // Format date for API
//       const formattedDob = formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null;

//       const submitData = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         dob: formattedDob,
//         id_type: "aadhaar",
//         id_number: formData.aadhaarNumber,
//         id_name: formData.firstName + " " + formData.lastName,
//         id_front_image: aadhaarFrontBase64,
//         id_back_image: aadhaarBackBase64,
//         account_number: formData.accountNumber,
//         ifsc_code: formData.ifscCode,
//         bank_name: formData.bankName,
//         account_holder_name: formData.accountHolder,
//       };
      
//       let response;
//       if (existingKYC && isEditing) {
//         response = await updateKYC(submitData);
//       } else {
//         response = await submitKYC(submitData);
//       }
      
//       console.log("KYC Submit Response:", response);
      
//       if (response.success) {
//         alert("KYC submitted successfully! Your documents are under verification.");
//         navigate("/profile");
//       } else {
//         throw new Error(response.message || "KYC submission failed");
//       }
//     } catch (error) {
//       console.error("KYC Submit Error:", error);
//       alert(error.message || "Failed to submit KYC. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />

//       <main className="grow pt-24 md:pt-28 pb-12 px-4">
//         <div className="max-w-7xl mx-auto">

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">
//               {existingKYC && existingKYC.status === "pending" ? "Update KYC" : "Complete Your KYC"}
//             </h1>
//             <p className="text-gray-500 text-sm md:text-base">
//               Verify your identity to unlock all features and withdrawals
//             </p>
//             {existingKYC && existingKYC.status === "pending" && (
//               <p className="text-orange-500 text-sm mt-2">
//                 ⚠️ Your KYC is pending verification. You can update your details.
//               </p>
//             )}
//             {existingKYC && existingKYC.status === "verified" && (
//               <p className="text-green-500 text-sm mt-2">
//                 ✅ Your KYC is already verified!
//               </p>
//             )}
//           </div>

//           {/* Tab Buttons */}
//           <div className="w-full max-w-6xl mx-auto">
//             <div className="w-full max-w-2xl mx-auto flex bg-blue-50 rounded-xl p-2 gap-2">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => handleTabClick(tab.id)}
//                   className={`flex-1 py-3 text-sm md:text-base font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
//                     activeTab === tab.id
//                       ? "bg-white shadow text-[#004296]"
//                       : "text-gray-600 hover:text-[#004296]"
//                   } ${completedTabs[tab.id] ? "border-2 border-bs-indigo-950-500" : ""}`}
//                 >
//                   <span>{tab.icon}</span>
//                   <span className="hidden sm:inline">{tab.label}</span>
//                   {completedTabs[tab.id] && <span className="text-green-500 text-xs">✓</span>}
//                 </button>
//               ))}
//             </div>

//             {/* Progress Indicator */}
//             <div className="mt-4 mb-6">
//               <div className="flex items-center justify-between">
//                 <span className="text-xs text-gray-500">
//                   {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 
//                     ? "✅ All sections completed" 
//                     : `📋 ${Object.values(completedTabs).filter(Boolean).length}/3 completed`}
//                 </span>
//               </div>
//             </div>

//             {/* Tab Content */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">

//               {/* ========== TAB 1: Personal Info ========== */}
//               {activeTab === "tab1" && (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                     <span className="text-xl">👤</span>
//                     <h3 className="text-xl font-bold text-[#004296]">Personal Information</h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         First Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         placeholder="Enter first name"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Last Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         placeholder="Enter last name"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Date of Birth <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={formData.dateOfBirth}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
//                     </div>

//                   </div>

//                   <div className="pt-4 border-t border-gray-200">
//                     <p className="text-gray-500 text-xs mb-4">
//                       ⚠️ Please ensure all information matches your official ID documents.
//                     </p>
//                     <button
//                       onClick={handleSaveTab1}
//                       disabled={isSaved}
//                       className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
//                         isSaved 
//                           ? "bg-green-500" 
//                           : "bg-[#004296] hover:bg-[#003380]"
//                       }`}
//                     >
//                       {isSaved ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <span>✓</span> Saved! Moving to next step...
//                         </span>
//                       ) : (
//                         "Save & Continue →"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* ========== TAB 2: ID Proof ========== */}
//               {activeTab === "tab2" && (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                     <span className="text-2xl">🆔</span>
//                     <h3 className="text-xl font-bold text-[#004296]">ID Proof Details</h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         PAN Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="panNumber"
//                         value={formData.panNumber}
//                         onChange={handleChange}
//                         placeholder="ABCDE1234F"
//                         className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.panNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Aadhaar Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="aadhaarNumber"
//                         value={formData.aadhaarNumber}
//                         onChange={handleChange}
//                         placeholder="1234 5678 9012"
//                         maxLength="12"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.aadhaarNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.aadhaarNumber && <p className="text-red-500 text-xs mt-1">{errors.aadhaarNumber}</p>}
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         PAN Card Image <span className="text-red-500">*</span>
//                       </label>
//                       <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.panFile ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                         <input
//                           type="file"
//                           name="panFile"
//                           onChange={handleFileChange}
//                           accept="image/*"
//                           className="hidden"
//                           id="panFile"
//                         />
//                         <label htmlFor="panFile" className="cursor-pointer">
//                           <span className="text-3xl mb-2 block">📄</span>
//                           <p className="text-gray-600 text-sm">{formData.panFile ? formData.panFile.name : "Click to upload PAN card"}</p>
//                         </label>
//                       </div>
//                       {errors.panFile && <p className="text-red-500 text-xs mt-1">{errors.panFile}</p>}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           Aadhaar Front <span className="text-red-500">*</span>
//                         </label>
//                         <div className={`border-2 border-dashed rounded-lg p-3 text-center ${errors.aadhaarFront ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                           <input
//                             type="file"
//                             name="aadhaarFront"
//                             onChange={handleFileChange}
//                             accept="image/*"
//                             className="hidden"
//                             id="aadhaarFront"
//                           />
//                           <label htmlFor="aadhaarFront" className="cursor-pointer">
//                             <span className="text-2xl mb-1 block">🆔</span>
//                             <p className="text-gray-600 text-xs">{formData.aadhaarFront ? formData.aadhaarFront.name : "Front side"}</p>
//                           </label>
//                         </div>
//                         {errors.aadhaarFront && <p className="text-red-500 text-xs mt-1">{errors.aadhaarFront}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           Aadhaar Back <span className="text-red-500">*</span>
//                         </label>
//                         <div className={`border-2 border-dashed rounded-lg p-3 text-center ${errors.aadhaarBack ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                           <input
//                             type="file"
//                             name="aadhaarBack"
//                             onChange={handleFileChange}
//                             accept="image/*"
//                             className="hidden"
//                             id="aadhaarBack"
//                           />
//                           <label htmlFor="aadhaarBack" className="cursor-pointer">
//                             <span className="text-2xl mb-1 block">🆔</span>
//                             <p className="text-gray-600 text-xs">{formData.aadhaarBack ? formData.aadhaarBack.name : "Back side"}</p>
//                           </label>
//                         </div>
//                         {errors.aadhaarBack && <p className="text-red-500 text-xs mt-1">{errors.aadhaarBack}</p>}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t border-gray-200">
//                     <button
//                       onClick={handleSaveTab2}
//                       disabled={isSaved}
//                       className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
//                         isSaved 
//                           ? "bg-green-500" 
//                           : "bg-[#004296] hover:bg-[#003380]"
//                       }`}
//                     >
//                       {isSaved ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <span>✓</span> Saved! Moving to next step...
//                         </span>
//                       ) : (
//                         "Save & Continue →"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* ========== TAB 3: Bank Details ========== */}
//               {activeTab === "tab3" && (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                     <span className="text-2xl">🏦</span>
//                     <h3 className="text-xl font-bold text-[#004296]">Bank Account Details</h3>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Account Holder Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="accountHolder"
//                         value={formData.accountHolder}
//                         onChange={handleChange}
//                         placeholder="As per bank records"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.accountHolder ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Bank Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="bankName"
//                         value={formData.bankName}
//                         onChange={handleChange}
//                         placeholder="Bank name will auto-fill from IFSC"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.bankName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all bg-gray-50`}
//                         readOnly
//                       />
//                       {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Account Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="accountNumber"
//                         value={formData.accountNumber}
//                         onChange={handleChange}
//                         placeholder="Enter account number"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.accountNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Confirm Account Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="confirmAccountNumber"
//                         value={formData.confirmAccountNumber}
//                         onChange={handleChange}
//                         placeholder="Re-enter account number"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.confirmAccountNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                       />
//                       {errors.confirmAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.confirmAccountNumber}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         IFSC Code <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           name="ifscCode"
//                           value={formData.ifscCode}
//                           onChange={handleChange}
//                           onBlur={handleIFSCBlur}
//                           placeholder="e.g., SBIN0001234"
//                           className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.ifscCode ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
//                         />
//                         {fetchingIFSC && (
//                           <div className="absolute right-3 top-3">
//                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#004296]"></div>
//                           </div>
//                         )}
//                       </div>
//                       {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Front Image <span className="text-red-500">*</span>
//                       </label>
//                       <div className={`border-2 border-dashed rounded-lg p-3 text-center ${errors.frontImage ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                         <input
//                           type="file"
//                           name="frontImage"
//                           onChange={handleFileChange}
//                           accept="image/*"
//                           className="hidden"
//                           id="frontImage"
//                         />
//                         <label htmlFor="frontImage" className="cursor-pointer">
//                           <span className="text-2xl mb-1 block">📄</span>
//                           <p className="text-gray-600 text-xs">{formData.frontImage ? formData.frontImage.name : "Choose an Image"}</p>
//                         </label>
//                       </div>
//                       {errors.frontImage && <p className="text-red-500 text-xs mt-1">{errors.frontImage}</p>}
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t border-gray-200 space-y-3">
//                     <button
//                       onClick={handleSaveTab3}
//                       disabled={isSaved}
//                       className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
//                         isSaved 
//                           ? "bg-green-500" 
//                           : "bg-[#004296] hover:bg-[#003380]"
//                       }`}
//                     >
//                       {isSaved ? "✓ Bank Details Saved!" : "Save Bank Details"}
//                     </button>

//                     {/* Final Submit Button - Only show when all tabs completed */}
//                     {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 && (
//                       <button
//                         onClick={handleFinalSubmit}
//                         disabled={isSubmitting}
//                         className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
//                           isSubmitting
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-green-600 hover:bg-green-700"
//                         }`}
//                       >
//                         {isSubmitting ? (
//                           <span className="flex items-center justify-center gap-2">
//                             <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
//                             </svg>
//                             Submitting...
//                           </span>
//                         ) : (
//                           "🚀 Submit KYC for Verification"
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default KYC;