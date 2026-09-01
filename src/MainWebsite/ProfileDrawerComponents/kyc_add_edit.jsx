// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../HomeComponents/nav_bar";
// import Footer from "../HomeComponents/footer";
// import { submitKYC, updateKYC, getKYC, verifyIFSC } from "../../services/kyc_services";
// import { API } from "../../services/api_url";

// const KYCAddEdit = ({ isEditMode = false, existingData = null }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("tab1");
//   const [completedTabs, setCompletedTabs] = useState({
//     tab1: false,
//     tab2: false,
//     tab3: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetchingIFSC, setFetchingIFSC] = useState(false);
//   const [kycId, setKycId] = useState(null);
//   const [ifscVerified, setIfscVerified] = useState(false);
  
//   // Payment method selections - independent
//   const [enableBank, setEnableBank] = useState(false);
//   const [enableUPI, setEnableUPI] = useState(false);

//   // Form Data - Only API parameters
//   const [formData, setFormData] = useState({
//     // Tab 1: Personal Info
//     first_name: "",
//     last_name: "",
//     dob: "",
//     // Tab 2: ID Proof
//     id_type: "aadhaar",
//     id_number: "",
//     id_front_image: null,
//     id_back_image: null,
//     pancard_number: "",
//     pancard_image: null,
//     // Tab 3: Bank Details
//     account_holder_name: "",
//     bank_name: "",
//     account_number: "",
//     confirm_account_number: "",
//     ifsc_code: "",
//     upi_id: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSaved, setIsSaved] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const tabs = [
//     { id: "tab1", label: "Personal Info", icon: "👤", hint: "Enter your personal details" },
//     { id: "tab2", label: "ID Proof", icon: "🆔", hint: "Upload your ID documents" },
//     { id: "tab3", label: "Payment Details", icon: "💳", hint: "Add Bank Account and/or UPI ID" },
//   ];

//   // Helper functions
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";
//     if (dateString.includes('T')) {
//       return dateString.split('T')[0];
//     }
//     return dateString;
//   };

//   // UPI ID validation function
//   const validateUPI = (upiId) => {
//     if (!upiId || upiId.trim() === "") {
//       return "UPI ID is required";
//     }
    
//     const trimmedUpi = upiId.trim();
    
//     // UPI ID pattern: username@bankname
//     const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    
//     if (!upiRegex.test(trimmedUpi)) {
//       return "Invalid UPI ID format. Use format: username@bankname";
//     }
    
//     if (trimmedUpi.length < 5) {
//       return "UPI ID is too short (minimum 5 characters)";
//     }
    
//     if (trimmedUpi.length > 50) {
//       return "UPI ID is too long (maximum 50 characters)";
//     }
    
//     const atCount = (trimmedUpi.match(/@/g) || []).length;
//     if (atCount !== 1) {
//       return "UPI ID must contain exactly one @ symbol";
//     }
    
//     const [username, domain] = trimmedUpi.split('@');
//     if (!username || username.trim().length < 2) {
//       return "Username part of UPI ID is too short (minimum 2 characters)";
//     }
    
//     if (!domain || domain.trim().length < 3) {
//       return "Domain part of UPI ID is invalid (minimum 3 characters)";
//     }
    
//     const validDomains = ['okhdfcbank', 'okicici', 'oksbi', 'okaxis', 'ybl', 'ibl', 'paytm', 'upi', 'icici', 'hdfc', 'sbi', 'axis', 'kotak', 'yesbank', 'idfc', 'rbl', 'au', 'federal'];
//     if (!validDomains.includes(domain.toLowerCase()) && !domain.includes('.')) {
//       if (domain.length < 3) {
//         return "Invalid UPI domain";
//       }
//     }
    
//     return "";
//   };

//   // Bank validation function with account number length validation
//   const validateBankDetails = () => {
//     const newErrors = {};
    
//     if (enableBank) {
//       // Account Holder Name
//       if (!formData.account_holder_name || formData.account_holder_name.trim() === "") {
//         newErrors.account_holder_name = "Account holder name is required";
//       } else if (formData.account_holder_name.trim().length < 2) {
//         newErrors.account_holder_name = "Account holder name must be at least 2 characters";
//       }
      
//       // Bank Name
//       if (!formData.bank_name || formData.bank_name.trim() === "") {
//         newErrors.bank_name = "Bank name is required";
//       }
      
//       // Account Number Validation with length check
//       if (!formData.account_number || formData.account_number.trim() === "") {
//         newErrors.account_number = "Account number is required";
//       } else {
//         const accNumber = formData.account_number.trim().replace(/\s/g, '');
        
//         if (!/^\d+$/.test(accNumber)) {
//           newErrors.account_number = "Account number must contain only digits";
//         } else if (accNumber.length < 9) {
//           newErrors.account_number = "Account number must be at least 9 digits";
//         } else if (accNumber.length > 18) {
//           newErrors.account_number = "Account number must not exceed 18 digits";
//         }
//       }
      
//       // Confirm Account Number
//       if (!formData.confirm_account_number || formData.confirm_account_number.trim() === "") {
//         newErrors.confirm_account_number = "Please confirm account number";
//       } else if (formData.account_number !== formData.confirm_account_number) {
//         newErrors.confirm_account_number = "Account numbers do not match";
//       }
      
//       // IFSC Code
//       if (!formData.ifsc_code || formData.ifsc_code.trim() === "") {
//         newErrors.ifsc_code = "IFSC code is required";
//       } else if (formData.ifsc_code.trim().length !== 11) {
//         newErrors.ifsc_code = "IFSC code must be exactly 11 characters";
//       } else if (!ifscVerified) {
//         newErrors.ifsc_code = "IFSC code is not verified. Please wait for verification or enter a valid IFSC code";
//       }
//     }
    
//     return newErrors;
//   };

//   // Fetch user profile
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
//           first_name: profileData.first_name || "",
//           last_name: profileData.last_name || "",
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   // Load existing data for edit mode
//   useEffect(() => {
//     fetchUserProfile();
//     if (isEditMode && existingData) {
//       loadExistingData(existingData);
//     } else if (isEditMode && !existingData) {
//       fetchExistingKYC();
//     }
//   }, [isEditMode, existingData]);

//   const fetchExistingKYC = async () => {
//     try {
//       const response = await getKYC();
//       if (response.success && response.data) {
//         loadExistingData(response.data);
//         setKycId(response.data.id);
//       }
//     } catch (error) {
//       console.error("Error fetching KYC:", error);
//     }
//   };

//   const loadExistingData = (data) => {
//     const formattedDob = formatDateForInput(data.dob);
    
//     const hasBank = !!(data.account_number && data.ifsc_code && data.bank_name && data.account_holder_name);
//     const hasUPI = !!(data.upi_id && data.upi_id.trim() !== "");
    
//     setEnableBank(hasBank);
//     setEnableUPI(hasUPI);
    
//     setFormData({
//       first_name: data.first_name || "",
//       last_name: data.last_name || "",
//       dob: formattedDob,
//       id_type: "aadhaar",
//       id_number: data.id_number || "",
//       id_front_image: data.id_front_image || null,
//       id_back_image: data.id_back_image || null,
//       pancard_number: data.pancard_number || "",
//       pancard_image: data.pancard_image || null,
//       account_holder_name: data.account_holder_name || "",
//       bank_name: data.bank_name || "",
//       account_number: data.account_number || "",
//       confirm_account_number: data.account_number || "",
//       ifsc_code: data.ifsc_code || "",
//       upi_id: data.upi_id || "",
//     });

//     if (data.ifsc_code) {
//       setIfscVerified(true);
//     }

//     const isTab3Completed = (hasBank || hasUPI);
    
//     setCompletedTabs({
//       tab1: !!(data.first_name && data.dob),
//       tab2: !!(data.id_number && data.pancard_number),
//       tab3: isTab3Completed,
//     });
//   };

//   // IFSC verification
//   const handleIFSCChange = async (e) => {
//     const { value } = e.target;
//     const upperValue = value.toUpperCase();
    
//     setFormData(prev => ({
//       ...prev,
//       ifsc_code: upperValue,
//       bank_name: ifscVerified && upperValue.length === 11 ? prev.bank_name : "",
//     }));
    
//     if (errors.ifsc_code) {
//       setErrors(prev => ({ ...prev, ifsc_code: "" }));
//     }

//     setIfscVerified(false);
    
//     if (upperValue.length === 11 && enableBank) {
//       setFetchingIFSC(true);
      
//       try {
//         const response = await verifyIFSC(upperValue);
        
//         if (response.success && response.data && response.data.bank) {
//           setFormData(prev => ({
//             ...prev,
//             bank_name: response.data.bank,
//           }));
//           setIfscVerified(true);
//           setErrors(prev => ({ ...prev, ifsc_code: "" }));
//         } else {
//           setFormData(prev => ({
//             ...prev,
//             bank_name: "",
//           }));
//           setIfscVerified(false);
//           setErrors(prev => ({ ...prev, ifsc_code: "Invalid IFSC code. Please check and try again." }));
//         }
//       } catch (error) {
//         console.error("IFSC verification error:", error);
//         setFormData(prev => ({
//           ...prev,
//           bank_name: "",
//         }));
//         setIfscVerified(false);
//         setErrors(prev => ({ ...prev, ifsc_code: "Failed to verify IFSC code. Please try again." }));
//       } finally {
//         setFetchingIFSC(false);
//       }
//     }
//   };

//   const handleIFSCBlur = async () => {
//     const ifscCode = formData.ifsc_code;
    
//     if (!ifscCode || ifscCode.trim() === "" || !enableBank) {
//       return;
//     }
    
//     if (ifscCode.trim().length < 11) {
//       setErrors(prev => ({ ...prev, ifsc_code: "IFSC code must be exactly 11 characters" }));
//       return;
//     }
    
//     if (ifscVerified) return;
    
//     setFetchingIFSC(true);
//     try {
//       const response = await verifyIFSC(ifscCode);
      
//       if (response.success && response.data && response.data.bank) {
//         setFormData(prev => ({
//           ...prev,
//           bank_name: response.data.bank,
//         }));
//         setIfscVerified(true);
//         setErrors(prev => ({ ...prev, ifsc_code: "" }));
//       } else {
//         setFormData(prev => ({
//           ...prev,
//           bank_name: "",
//         }));
//         setIfscVerified(false);
//         setErrors(prev => ({ ...prev, ifsc_code: "Invalid IFSC code. Please check and try again." }));
//       }
//     } catch (error) {
//       console.error("IFSC verification error:", error);
//       setIfscVerified(false);
//       setErrors(prev => ({ ...prev, ifsc_code: "Failed to verify IFSC code" }));
//     } finally {
//       setFetchingIFSC(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === "upi_id") {
//       setFormData(prev => ({ ...prev, upi_id: value }));
      
//       if (value.length > 0 && enableUPI) {
//         const upiError = validateUPI(value);
//         if (upiError) {
//           setErrors(prev => ({ ...prev, upi_id: upiError }));
//         } else {
//           setErrors(prev => {
//             const newErrors = { ...prev };
//             delete newErrors.upi_id;
//             return newErrors;
//           });
//         }
//       } else {
//         setErrors(prev => {
//           const newErrors = { ...prev };
//           delete newErrors.upi_id;
//           return newErrors;
//         });
//       }
//     } else if (name === "account_number" || name === "confirm_account_number") {
//       // Only allow digits and remove spaces
//       const cleanValue = value.replace(/\s/g, '');
//       if (cleanValue === '' || /^\d+$/.test(cleanValue)) {
//         setFormData(prev => ({ ...prev, [name]: cleanValue }));
//         if (errors[name]) {
//           setErrors(prev => ({ ...prev, [name]: "" }));
//         }
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//       if (errors[name]) {
//         setErrors(prev => ({ ...prev, [name]: "" }));
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Validations
//   const validateTab1 = () => {
//     const newErrors = {};
//     if (!formData.first_name || formData.first_name.trim() === "") {
//       newErrors.first_name = "First name is required";
//     } else if (formData.first_name.trim().length < 2) {
//       newErrors.first_name = "First name must be at least 2 characters";
//     }
    
//     if (!formData.last_name || formData.last_name.trim() === "") {
//       newErrors.last_name = "Last name is required";
//     } else if (formData.last_name.trim().length < 2) {
//       newErrors.last_name = "Last name must be at least 2 characters";
//     }
    
//     if (!formData.dob) {
//       newErrors.dob = "Date of birth is required";
//     } else {
//       const birthDate = new Date(formData.dob);
//       const today = new Date();
//       let age = today.getFullYear() - birthDate.getFullYear();
//       const monthDiff = today.getMonth() - birthDate.getMonth();
//       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//       }
//       if (age < 18) {
//         newErrors.dob = "You must be at least 18 years old";
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateTab2 = () => {
//     const newErrors = {};
    
//     // Aadhaar validation
//     if (!formData.id_number || formData.id_number.trim() === "") {
//       newErrors.id_number = "Aadhaar number is required";
//     } else if (formData.id_number.trim().length !== 12) {
//       newErrors.id_number = "Aadhaar must be exactly 12 digits";
//     } else if (!/^\d+$/.test(formData.id_number.trim())) {
//       newErrors.id_number = "Aadhaar number must contain only digits";
//     }
    
//     if (!formData.id_front_image) {
//       newErrors.id_front_image = "Aadhaar front image is required";
//     }
//     if (!formData.id_back_image) {
//       newErrors.id_back_image = "Aadhaar back image is required";
//     }
    
//     // PAN Card validations - Case insensitive
//     if (!formData.pancard_number || formData.pancard_number.trim() === "") {
//       newErrors.pancard_number = "PAN card number is required";
//     } else {
//       const panNumber = formData.pancard_number.trim().toUpperCase();
//       if (panNumber.length !== 10) {
//         newErrors.pancard_number = "PAN card must be exactly 10 characters";
//       } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
//         newErrors.pancard_number = "Invalid PAN card format. Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)";
//       }
//     }
    
//     if (!formData.pancard_image) {
//       newErrors.pancard_image = "PAN card image is required";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateTab3 = () => {
//     let newErrors = {};
    
//     if (enableBank) {
//       const bankErrors = validateBankDetails();
//       newErrors = { ...newErrors, ...bankErrors };
//     }
    
//     if (enableUPI) {
//       if (!formData.upi_id || formData.upi_id.trim() === "") {
//         newErrors.upi_id = "UPI ID is required";
//       } else {
//         const upiError = validateUPI(formData.upi_id);
//         if (upiError) {
//           newErrors.upi_id = upiError;
//         }
//       }
//     }
    
//     if (!enableBank && !enableUPI) {
//       alert("Please select at least one payment method (Bank Account or UPI ID)");
//       return false;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isTab3Completed = () => {
//     let bankCompleted = false;
//     let upiCompleted = false;
    
//     if (enableBank) {
//       const accNumber = formData.account_number ? formData.account_number.trim().replace(/\s/g, '') : '';
//       bankCompleted = !!(formData.account_holder_name && 
//                         formData.bank_name && 
//                         formData.account_number && 
//                         formData.ifsc_code && 
//                         ifscVerified &&
//                         accNumber.length >= 9 &&
//                         accNumber.length <= 18 &&
//                         /^\d+$/.test(accNumber));
//     }
    
//     if (enableUPI) {
//       upiCompleted = !!(formData.upi_id && 
//                        formData.upi_id.trim() !== "" && 
//                        !validateUPI(formData.upi_id));
//     }
    
//     return (enableBank ? bankCompleted : true) && (enableUPI ? upiCompleted : true) && (enableBank || enableUPI);
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
//       setTimeout(() => {
//         setActiveTab("tab3");
//         setIsSaved(false);
//       }, 500);
//     }
//   };

//   const handleSaveTab3 = () => {
//     if (validateTab3()) {
//       const completed = isTab3Completed();
//       setCompletedTabs({ ...completedTabs, tab3: completed });
//       setIsSaved(true);
//       setTimeout(() => {
//         setIsSaved(false);
//       }, 500);
//     }
//   };

//   const toggleBank = () => {
//     setEnableBank(!enableBank);
//     if (enableBank) {
//       setFormData(prev => ({
//         ...prev,
//         account_holder_name: "",
//         bank_name: "",
//         account_number: "",
//         confirm_account_number: "",
//         ifsc_code: "",
//       }));
//       setIfscVerified(false);
//     }
//     setCompletedTabs(prev => ({ ...prev, tab3: false }));
//     setErrors({});
//   };

//   const toggleUPI = () => {
//     setEnableUPI(!enableUPI);
//     if (enableUPI) {
//       setFormData(prev => ({
//         ...prev,
//         upi_id: "",
//       }));
//     }
//     setCompletedTabs(prev => ({ ...prev, tab3: false }));
//     setErrors({});
//   };

//   const handleSubmit = async () => {
//     if (!completedTabs.tab1 || !completedTabs.tab2) {
//       alert("Please complete all previous sections before submitting");
//       return;
//     }

//     if (!enableBank && !enableUPI) {
//       alert("Please select at least one payment method (Bank Account or UPI ID)");
//       return;
//     }

//     const isTab3Valid = validateTab3();
//     if (!isTab3Valid) {
//       alert("Please fill in all required payment details correctly");
//       return;
//     }

//     if (!isTab3Completed()) {
//       alert("Please complete all payment details before submitting");
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const submitData = {
//         first_name: formData.first_name.trim(),
//         last_name: formData.last_name.trim(),
//         dob: formData.dob,
//         id_type: "aadhaar",
//         id_number: formData.id_number.trim(),
//         pancard_number: formData.pancard_number.trim().toUpperCase(),
//       };
      
//       if (enableBank) {
//         const cleanAccNumber = formData.account_number.trim().replace(/\s/g, '');
//         submitData.account_number = cleanAccNumber;
//         submitData.ifsc_code = formData.ifsc_code.trim().toUpperCase();
//         submitData.bank_name = formData.bank_name.trim();
//         submitData.account_holder_name = formData.account_holder_name.trim();
//       } else {
//         submitData.account_number = "";
//         submitData.ifsc_code = "";
//         submitData.bank_name = "";
//         submitData.account_holder_name = "";
//       }
      
//       if (enableUPI) {
//         submitData.upi_id = formData.upi_id.trim();
//       } else {
//         submitData.upi_id = "";
//       }
      
//       if (formData.id_front_image && typeof formData.id_front_image !== 'string') {
//         submitData.id_front_image = formData.id_front_image;
//       }
//       if (formData.id_back_image && typeof formData.id_back_image !== 'string') {
//         submitData.id_back_image = formData.id_back_image;
//       }
//       if (formData.pancard_image && typeof formData.pancard_image !== 'string') {
//         submitData.pancard_image = formData.pancard_image;
//       }
      
//       let response;
//       if (isEditMode && (kycId || existingData)) {
//         response = await updateKYC(submitData);
//         console.log("Update KYC response:", response);
//         console.log("Updated data:", submitData);
//       } else {
//         response = await submitKYC(submitData);
//         console.log("Submit KYC response:", response);
//         console.log("Submitted data:", submitData);
//       }
      
//       if (response.success) {
//         alert("KYC submitted successfully!");
//         navigate("/kyc-view");
//       } else {
//         throw new Error(response.message || "Submission failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message || "Failed to submit KYC");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />

//       <main className="grow pt-24 md:pt-28 pb-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">
//               {isEditMode ? "Update KYC" : "Complete Your KYC"}
//             </h1>
//             <p className="text-gray-500 text-sm md:text-base">
//               Verify your identity to unlock all features and withdrawals
//             </p>
//           </div>

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
//                   }`}
//                 >
//                   <span>{tab.icon}</span>
//                   <span className="hidden sm:inline">{tab.label}</span>
//                   {completedTabs[tab.id] && <span className="text-green-500 text-xs">✓</span>}
//                 </button>
//               ))}
//             </div>

//             <div className="text-center mt-3">
//               <p className="text-xs text-gray-400">{tabs.find(t => t.id === activeTab)?.hint}</p>
//             </div>

//             <div className="mt-4 mb-6">
//               <span className="text-xs text-gray-500">
//                 {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 
//                   ? "✅ All sections completed" 
//                   : `📋 ${Object.values(completedTabs).filter(Boolean).length}/3 completed`}
//               </span>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              
//               {/* Tab 1: Personal Info */}
//               {activeTab === "tab1" && (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                     <span className="text-xl">👤</span>
//                     <h3 className="text-xl font-bold text-[#004296]">Personal Information</h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         First Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         placeholder="Enter your first name"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.first_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
//                       />
//                       {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Last Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         placeholder="Enter your last name"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.last_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
//                       />
//                       {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
//                     </div>

//                     <div className="md:col-span-2">
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Date of Birth <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
//                       />
//                       {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <button
//                       onClick={handleSaveTab1}
//                       disabled={isSaved}
//                       className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all"
//                     >
//                       {isSaved ? "✓ Saved! Moving..." : "Save & Continue →"}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Tab 2: ID Proof */}
//               {activeTab === "tab2" && (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                     <span className="text-2xl">🆔</span>
//                     <h3 className="text-xl font-bold text-[#004296]">ID Proof Details</h3>
//                   </div>

//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                     <div className="flex items-center gap-2">
//                       <span className="text-blue-600 font-semibold">ID Type:</span>
//                       <span className="text-blue-800 font-bold">Aadhaar Card</span>
//                     </div>
//                     <p className="text-xs text-blue-600 mt-1">Please provide your Aadhaar card details below</p>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Aadhaar Number <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="id_number"
//                         value={formData.id_number}
//                         onChange={handleChange}
//                         placeholder="Enter 12-digit Aadhaar number"
//                         maxLength="12"
//                         className={`w-full px-4 py-3 rounded-lg border ${errors.id_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
//                       />
//                       {errors.id_number && <p className="text-red-500 text-xs mt-1">{errors.id_number}</p>}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Aadhaar Front Image <span className="text-red-500">*</span>
//                       </label>
//                       <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.id_front_image ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                         <input type="file" name="id_front_image" onChange={handleFileChange} accept="image/*" className="hidden" id="id_front_image" />
//                         <label htmlFor="id_front_image" className="cursor-pointer block">
//                           <span className="text-3xl mb-2 block">📄</span>
//                           <p className="text-gray-600 text-sm">{formData.id_front_image ? (typeof formData.id_front_image === 'string' ? "Image loaded" : formData.id_front_image.name) : "Click to upload front side"}</p>
//                         </label>
//                       </div>
//                       {errors.id_front_image && <p className="text-red-500 text-xs mt-1">{errors.id_front_image}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                         Aadhaar Back Image <span className="text-red-500">*</span>
//                       </label>
//                       <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.id_back_image ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                         <input type="file" name="id_back_image" onChange={handleFileChange} accept="image/*" className="hidden" id="id_back_image" />
//                         <label htmlFor="id_back_image" className="cursor-pointer block">
//                           <span className="text-3xl mb-2 block">📄</span>
//                           <p className="text-gray-600 text-sm">{formData.id_back_image ? (typeof formData.id_back_image === 'string' ? "Image loaded" : formData.id_back_image.name) : "Click to upload back side"}</p>
//                         </label>
//                       </div>
//                       {errors.id_back_image && <p className="text-red-500 text-xs mt-1">{errors.id_back_image}</p>}
//                     </div>
//                   </div>

//                   {/* PAN Card Section */}
//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <h4 className="text-lg font-semibold text-[#004296] mb-3">PAN Card Details</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           PAN Card Number <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="pancard_number"
//                           value={formData.pancard_number}
//                           onChange={(e) => {
//                             const value = e.target.value.toUpperCase();
//                             setFormData(prev => ({ ...prev, pancard_number: value }));
//                             if (errors.pancard_number) {
//                               setErrors(prev => ({ ...prev, pancard_number: "" }));
//                             }
//                           }}
//                           placeholder="Enter 10-digit PAN number"
//                           maxLength="10"
//                           className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.pancard_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
//                         />
//                         {errors.pancard_number && <p className="text-red-500 text-xs mt-1">{errors.pancard_number}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           PAN Card Image <span className="text-red-500">*</span>
//                         </label>
//                         <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.pancard_image ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
//                           <input type="file" name="pancard_image" onChange={handleFileChange} accept="image/*" className="hidden" id="pancard_image" />
//                           <label htmlFor="pancard_image" className="cursor-pointer block">
//                             <span className="text-3xl mb-2 block">🪪</span>
//                             <p className="text-gray-600 text-sm">{formData.pancard_image ? (typeof formData.pancard_image === 'string' ? "Image loaded" : formData.pancard_image.name) : "Click to upload PAN card"}</p>
//                           </label>
//                         </div>
//                         {errors.pancard_image && <p className="text-red-500 text-xs mt-1">{errors.pancard_image}</p>}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <button onClick={handleSaveTab2} disabled={isSaved} className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all">
//                       {isSaved ? "✓ Saved! Moving..." : "Save & Continue →"}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Tab 3: Payment Details - Bank and/or UPI */}
//               {activeTab === "tab3" && (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
//                     <span className="text-2xl">💳</span>
//                     <h3 className="text-xl font-bold text-[#004296]">Payment Details</h3>
//                   </div>

//                   {/* Payment Method Selection - Independent Toggles */}
//                   <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                     <p className="text-sm text-gray-600 mb-3">Select payment method(s):</p>
//                     <div className="flex gap-4">
//                       <button
//                         onClick={toggleBank}
//                         className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
//                           enableBank
//                             ? "bg-[#004296] text-white shadow-lg"
//                             : "bg-white text-gray-600 border border-gray-300 hover:border-[#004296]"
//                         }`}
//                       >
//                         <span className="mr-2">🏦</span>
//                         {enableBank ? "✓ Bank Account" : "Bank Account"}
//                       </button>
//                       <button
//                         onClick={toggleUPI}
//                         className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
//                           enableUPI
//                             ? "bg-[#004296] text-white shadow-lg"
//                             : "bg-white text-gray-600 border border-gray-300 hover:border-[#004296]"
//                         }`}
//                       >
//                         <span className="mr-2">📱</span>
//                         {enableUPI ? "✓ UPI ID" : "UPI ID"}
//                       </button>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-2">
//                       {enableBank && enableUPI ? "✅ Both payment methods selected" : 
//                        enableBank ? "✅ Bank Account selected" : 
//                        enableUPI ? "✅ UPI ID selected" : 
//                        "⚠️ Please select at least one payment method"}
//                     </p>
//                   </div>

//                   {/* Bank Account Details - Only if enabled */}
//                   {enableBank && (
//                     <div className="space-y-4 border-l-4 border-[#004296] pl-4">
//                       <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                         <p className="text-sm text-green-700">✅ Fill in your bank account details below</p>
//                       </div>
                      
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           Account Holder Name <span className="text-red-500">*</span>
//                         </label>
//                         <input 
//                           type="text" 
//                           name="account_holder_name" 
//                           value={formData.account_holder_name} 
//                           onChange={handleChange} 
//                           placeholder="As per bank records" 
//                           className={`w-full px-4 py-3 rounded-lg border ${errors.account_holder_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} 
//                         />
//                         {errors.account_holder_name && <p className="text-red-500 text-xs mt-1">{errors.account_holder_name}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           IFSC Code <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input 
//                             type="text" 
//                             name="ifsc_code" 
//                             value={formData.ifsc_code} 
//                             onChange={handleIFSCChange}
//                             onBlur={handleIFSCBlur}
//                             placeholder="e.g., SBIN0001234" 
//                             maxLength="11"
//                             className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.ifsc_code ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} 
//                           />
//                           {fetchingIFSC && (
//                             <div className="absolute right-3 top-3">
//                               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#004296]"></div>
//                             </div>
//                           )}
//                           {ifscVerified && !fetchingIFSC && (
//                             <div className="absolute right-3 top-3">
//                               <span className="text-green-500 text-lg">✓</span>
//                             </div>
//                           )}
//                         </div>
//                         {errors.ifsc_code && <p className="text-red-500 text-xs mt-1">{errors.ifsc_code}</p>}
//                         {!errors.ifsc_code && formData.ifsc_code && formData.ifsc_code.length === 11 && ifscVerified && (
//                           <p className="text-green-600 text-xs mt-1">IFSC code verified successfully!</p>
//                         )}
//                         {formData.ifsc_code && formData.ifsc_code.length === 11 && !ifscVerified && !errors.ifsc_code && (
//                           <p className="text-yellow-600 text-xs mt-1">⏳ Verifying IFSC code...</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           Bank Name <span className="text-red-500">*</span>
//                         </label>
//                         <input 
//                           type="text" 
//                           name="bank_name" 
//                           value={formData.bank_name} 
//                           readOnly 
//                           placeholder={fetchingIFSC ? "Fetching bank name..." : "Auto-filled from IFSC"} 
//                           className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed ${fetchingIFSC ? 'animate-pulse' : ''}`} 
//                         />
//                         {errors.bank_name && <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           Account Number <span className="text-red-500">*</span>
//                         </label>
//                         <input 
//                           type="text" 
//                           name="account_number" 
//                           value={formData.account_number} 
//                           onChange={handleChange} 
//                           placeholder="Enter account number (9-18 digits)" 
//                           maxLength="18"
//                           className={`w-full px-4 py-3 rounded-lg border ${errors.account_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} 
//                         />
//                         {errors.account_number && <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>}
//                         {!errors.account_number && formData.account_number && (
//                           <p className="text-green-600 text-xs mt-1">
//                             ✓ {formData.account_number.length} digits
//                           </p>
//                         )}
//                         <p className="text-gray-400 text-xs mt-1">
//                           Account number must be between 9-18 digits (numbers only)
//                         </p>
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           Confirm Account Number <span className="text-red-500">*</span>
//                         </label>
//                         <input 
//                           type="text" 
//                           name="confirm_account_number" 
//                           value={formData.confirm_account_number} 
//                           onChange={handleChange} 
//                           placeholder="Re-enter account number" 
//                           maxLength="18"
//                           className={`w-full px-4 py-3 rounded-lg border ${errors.confirm_account_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} 
//                         />
//                         {errors.confirm_account_number && <p className="text-red-500 text-xs mt-1">{errors.confirm_account_number}</p>}
//                         {formData.confirm_account_number && formData.account_number === formData.confirm_account_number && (
//                           <p className="text-green-600 text-xs mt-1">✓ Account numbers match</p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* UPI ID Details - Only if enabled */}
//                   {enableUPI && (
//                     <div className="space-y-4 border-l-4 border-[#004296] pl-4">
//                       <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                         <p className="text-sm text-green-700">✅ Enter your UPI ID below</p>
//                       </div>
                      
//                       <div>
//                         <label className="block text-gray-700 font-medium mb-1.5 text-sm">
//                           UPI ID <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input 
//                             type="text" 
//                             name="upi_id" 
//                             value={formData.upi_id} 
//                             onChange={handleChange} 
//                             placeholder="e.g., username@okhdfcbank" 
//                             className={`w-full px-4 py-3 rounded-lg border ${errors.upi_id ? 'border-red-500 bg-red-50' : formData.upi_id && !errors.upi_id ? 'border-green-500 bg-green-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} 
//                           />
//                           {formData.upi_id && !errors.upi_id && (
//                             <div className="absolute right-3 top-3">
//                               <span className="text-green-500 text-lg">✓</span>
//                             </div>
//                           )}
//                         </div>
//                         {errors.upi_id && <p className="text-red-500 text-xs mt-1">{errors.upi_id}</p>}
//                         {formData.upi_id && !errors.upi_id && (
//                           <p className="text-green-600 text-xs mt-1">Valid UPI ID format ✓</p>
//                         )}
//                         <p className="text-gray-400 text-xs mt-1">
//                           Format: username@bankname (e.g., name@okhdfcbank, name@ybl)
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {!enableBank && !enableUPI && (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//                       <p className="text-yellow-700">⚠️ Please select at least one payment method above</p>
//                     </div>
//                   )}
                  
//                   <div className="pt-4 space-y-3">
//                     <button onClick={handleSaveTab3} disabled={isSaved || (!enableBank && !enableUPI)} className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
//                       {isSaved ? "✓ Payment Details Saved!" : "Save Payment Details"}
//                     </button>

//                     {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 && (
//                       <button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-all">
//                         {isSubmitting ? "Submitting..." : "🚀 Submit KYC for Verification"}
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

// export default KYCAddEdit;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { submitKYC, updateKYC, getKYC } from "../../services/kyc_services";
import { API } from "../../services/api_url";

const KYCAddEdit = ({ isEditMode = false, existingData = null }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [completedTabs, setCompletedTabs] = useState({
    tab1: false,
    tab2: false,
  });
  const [loading, setLoading] = useState(false);
  const [kycId, setKycId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data - Only API parameters
  const [formData, setFormData] = useState({
    // Tab 1: Personal Info
    first_name: "",
    last_name: "",
    dob: "",
    // Tab 2: UPI Details
    upi_id: "",
  });

  const [errors, setErrors] = useState({});

  const tabs = [
    { id: "tab1", label: "Personal Info", icon: "👤", hint: "Enter your personal details" },
    { id: "tab2", label: "UPI Details", icon: "📱", hint: "Add your UPI ID" },
  ];

  // Helper functions
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  // UPI ID validation function
  const validateUPI = (upiId) => {
    if (!upiId || upiId.trim() === "") {
      return "UPI ID is required";
    }
    
    const trimmedUpi = upiId.trim();
    
    // UPI ID pattern: username@bankname
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    
    if (!upiRegex.test(trimmedUpi)) {
      return "Invalid UPI ID format. Use format: username@bankname";
    }
    
    if (trimmedUpi.length < 5) {
      return "UPI ID is too short (minimum 5 characters)";
    }
    
    if (trimmedUpi.length > 50) {
      return "UPI ID is too long (maximum 50 characters)";
    }
    
    const atCount = (trimmedUpi.match(/@/g) || []).length;
    if (atCount !== 1) {
      return "UPI ID must contain exactly one @ symbol";
    }
    
    const [username, domain] = trimmedUpi.split('@');
    if (!username || username.trim().length < 2) {
      return "Username part of UPI ID is too short (minimum 2 characters)";
    }
    
    if (!domain || domain.trim().length < 3) {
      return "Domain part of UPI ID is invalid (minimum 3 characters)";
    }
    
    const validDomains = ['okhdfcbank', 'okicici', 'oksbi', 'okaxis', 'ybl', 'ibl', 'paytm', 'upi', 'icici', 'hdfc', 'sbi', 'axis', 'kotak', 'yesbank', 'idfc', 'rbl', 'au', 'federal'];
    if (!validDomains.includes(domain.toLowerCase()) && !domain.includes('.')) {
      if (domain.length < 3) {
        return "Invalid UPI domain";
      }
    }
    
    return "";
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API.PROFILE_URL}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.status === 200 && result.success) {
        const profileData = result.data;
        setFormData(prev => ({
          ...prev,
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Load existing data for edit mode
  useEffect(() => {
    fetchUserProfile();
    if (isEditMode && existingData) {
      loadExistingData(existingData);
    } else if (isEditMode && !existingData) {
      fetchExistingKYC();
    }
  }, [isEditMode, existingData]);

  const fetchExistingKYC = async () => {
    try {
      const response = await getKYC();
      if (response.success && response.data) {
        loadExistingData(response.data);
        setKycId(response.data.id);
      }
    } catch (error) {
      console.error("Error fetching KYC:", error);
    }
  };

  const loadExistingData = (data) => {
    const formattedDob = formatDateForInput(data.dob);
    
    setFormData({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      dob: formattedDob,
      upi_id: data.upi_id || "",
    });

    setCompletedTabs({
      tab1: !!(data.first_name && data.dob),
      tab2: !!(data.upi_id && data.upi_id.trim() !== ""),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "upi_id") {
      setFormData(prev => ({ ...prev, upi_id: value }));
      
      if (value.length > 0) {
        const upiError = validateUPI(value);
        if (upiError) {
          setErrors(prev => ({ ...prev, upi_id: upiError }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.upi_id;
            return newErrors;
          });
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.upi_id;
          return newErrors;
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }
  };

  // Validations
  const validateTab1 = () => {
    const newErrors = {};
    if (!formData.first_name || formData.first_name.trim() === "") {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }
    
    if (!formData.last_name || formData.last_name.trim() === "") {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    }
    
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTab2 = () => {
    const newErrors = {};
    
    if (!formData.upi_id || formData.upi_id.trim() === "") {
      newErrors.upi_id = "UPI ID is required";
    } else {
      const upiError = validateUPI(formData.upi_id);
      if (upiError) {
        newErrors.upi_id = upiError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isTab2Completed = () => {
    return !!(formData.upi_id && 
             formData.upi_id.trim() !== "" && 
             !validateUPI(formData.upi_id));
  };

  const handleTabClick = (tabId) => {
    if (tabId === "tab2" && !completedTabs.tab1) {
      alert("Please complete Personal Info first");
      return;
    }
    setActiveTab(tabId);
  };

  const handleSaveTab1 = () => {
    if (validateTab1()) {
      setCompletedTabs({ ...completedTabs, tab1: true });
      setIsSaved(true);
      setTimeout(() => {
        setActiveTab("tab2");
        setIsSaved(false);
      }, 500);
    }
  };

  const handleSaveTab2 = () => {
    if (validateTab2()) {
      const completed = isTab2Completed();
      setCompletedTabs({ ...completedTabs, tab2: completed });
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (!completedTabs.tab1) {
      alert("Please complete Personal Info first");
      return;
    }

    const isTab2Valid = validateTab2();
    if (!isTab2Valid) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if (!isTab2Completed()) {
      alert("Please enter a valid UPI ID before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        dob: formData.dob,
        upi_id: formData.upi_id.trim(),
        // Empty fields for compatibility
        id_type: "",
        id_number: "",
        pancard_number: "",
        account_number: "",
        ifsc_code: "",
        bank_name: "",
        account_holder_name: "",
      };
      
      let response;
      if (isEditMode && (kycId || existingData)) {
        response = await updateKYC(submitData);
        console.log("Update KYC response:", response);
        console.log("Updated data:", submitData);
      } else {
        response = await submitKYC(submitData);
        console.log("Submit KYC response:", response);
        console.log("Submitted data:", submitData);
      }
      
      if (response.success) {
        alert("KYC submitted successfully!");
        navigate("/kyc-view");
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to submit KYC");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-24 md:pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">
              {isEditMode ? "Update KYC" : "Complete Your UPI ID Verification"}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Verify your identity to unlock all features and withdrawals
            </p>
          </div>

          <div className="w-full max-w-6xl mx-auto">
            <div className="w-full max-w-2xl mx-auto flex bg-blue-50 rounded-xl p-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex-1 py-3 text-sm md:text-base font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-white shadow text-[#004296]"
                      : "text-gray-600 hover:text-[#004296]"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {completedTabs[tab.id] && <span className="text-green-500 text-xs">✓</span>}
                </button>
              ))}
            </div>

            <div className="text-center mt-3">
              <p className="text-xs text-gray-400">{tabs.find(t => t.id === activeTab)?.hint}</p>
            </div>

            <div className="mt-4 mb-6">
              <span className="text-xs text-gray-500">
                {completedTabs.tab1 && completedTabs.tab2 
                  ? "✅ All sections completed" 
                  : `📋 ${Object.values(completedTabs).filter(Boolean).length}/2 completed`}
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              
              {/* Tab 1: Personal Info */}
              {activeTab === "tab1" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-xl">👤</span>
                    <h3 className="text-xl font-bold text-[#004296]">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.first_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
                      />
                      {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.last_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
                      />
                      {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
                      />
                      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveTab1}
                      disabled={isSaved}
                      className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all"
                    >
                      {isSaved ? "✓ Saved! Moving..." : "Save & Continue →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: UPI Details */}
              {activeTab === "tab2" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-2xl">📱</span>
                    <h3 className="text-xl font-bold text-[#004296]">UPI Details</h3>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-3">Enter your UPI ID for withdrawals:</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700">✅ Enter your UPI ID below</p>
                    </div>
                  </div>

                  <div className="space-y-4 border-l-4 border-[#004296] pl-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        UPI ID <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="upi_id" 
                          value={formData.upi_id} 
                          onChange={handleChange} 
                          placeholder="e.g., username@okhdfcbank" 
                          className={`w-full px-4 py-3 rounded-lg border ${errors.upi_id ? 'border-red-500 bg-red-50' : formData.upi_id && !errors.upi_id ? 'border-green-500 bg-green-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} 
                        />
                        {formData.upi_id && !errors.upi_id && (
                          <div className="absolute right-3 top-3">
                            <span className="text-green-500 text-lg">✓</span>
                          </div>
                        )}
                      </div>
                      {errors.upi_id && <p className="text-red-500 text-xs mt-1">{errors.upi_id}</p>}
                      {formData.upi_id && !errors.upi_id && (
                        <p className="text-green-600 text-xs mt-1">Valid UPI ID format ✓</p>
                      )}
                      <p className="text-gray-400 text-xs mt-1">
                        Format: username@bankname (e.g., name@okhdfcbank, name@ybl)
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Supported domains: okhdfcbank, okicici, oksbi, okaxis, ybl, ibl, paytm, upi, icici, hdfc, sbi, axis, kotak, yesbank, idfc, rbl, au, federal
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button onClick={handleSaveTab2} disabled={isSaved} className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all">
                      {isSaved ? "✓ UPI Details Saved!" : "Save UPI Details"}
                    </button>

                    {completedTabs.tab1 && completedTabs.tab2 && (
                      <button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-all">
                        {isSubmitting ? "Submitting..." : "🚀 Submit KYC for Verification"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KYCAddEdit;