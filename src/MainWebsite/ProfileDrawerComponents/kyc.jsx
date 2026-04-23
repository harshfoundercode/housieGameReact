import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const KYC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [completedTabs, setCompletedTabs] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
  });
  
  // Form Data
  const [formData, setFormData] = useState({
    // Tab 1: Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    // Tab 2: ID Proof
    panNumber: "",
    aadhaarNumber: "",
    panFile: null,
    aadhaarFront: null,
    aadhaarBack: null,
    // Tab 3: Bank Details
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    frontImage: null,
  });
  
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "tab1", label: "Personal Info", icon: "👤" },
    { id: "tab2", label: "ID Proof", icon: "🆔" },
    { id: "tab3", label: "Bank Details", icon: "🏦" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateTab1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTab2 = () => {
    const newErrors = {};
    if (!formData.panNumber) newErrors.panNumber = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
    }
    if (!formData.aadhaarNumber) newErrors.aadhaarNumber = "Aadhaar number is required";
    else if (formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = "Aadhaar must be 12 digits";
    if (!formData.panFile) newErrors.panFile = "PAN card image is required";
    if (!formData.aadhaarFront) newErrors.aadhaarFront = "Aadhaar front image is required";
    if (!formData.aadhaarBack) newErrors.aadhaarBack = "Aadhaar back image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTab3 = () => {
    const newErrors = {};
    if (!formData.accountHolder) newErrors.accountHolder = "Account holder name is required";
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!formData.confirmAccountNumber) newErrors.confirmAccountNumber = "Please confirm account number";
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)";
    }
     if (!formData.frontImage) newErrors.frontImage = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabClick = (tabId) => {
    // Check if trying to access tab2
    if (tabId === "tab2" && !completedTabs.tab1) {
      alert("Please complete Personal Info first");
      return;
    }
    // Check if trying to access tab3
    if (tabId === "tab3" && (!completedTabs.tab1 || !completedTabs.tab2)) {
      alert("Please complete all previous steps first");
      return;
    }
    setActiveTab(tabId);
  };

  const handleSaveTab1 = () => {
    if (validateTab1()) {
      setCompletedTabs({ ...completedTabs, tab1: true });
      setIsSaved(true);
      alert("Personal information saved successfully!");
      // Automatically move to tab2
      setTimeout(() => {
        setActiveTab("tab2");
        setIsSaved(false);
      }, 500);
    }
  };

  const handleSaveTab2 = () => {
    if (validateTab2()) {
      setCompletedTabs({ ...completedTabs, tab2: true });
      setIsSaved(true);
      alert("ID Proof details saved successfully!");
      setTimeout(() => {
        setActiveTab("tab3");
        setIsSaved(false);
      }, 500);
    }
  };

  const handleSaveTab3 = () => {
    if (validateTab3()) {
      setCompletedTabs({ ...completedTabs, tab3: true });
      setIsSaved(true);
      alert("Bank details saved successfully!");
    }
  };

  const handleFinalSubmit = async () => {
    if (!completedTabs.tab1 || !completedTabs.tab2 || !completedTabs.tab3) {
      alert("Please complete all sections before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("KYC Data Submitted:", formData);
      alert("KYC submitted successfully! Your documents are under verification.");
      setIsSubmitting(false);
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-24 md:pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">
              Complete Your KYC
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Verify your identity to unlock all features and withdrawals
            </p>
          </div>

          {/* Tab Buttons */}
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
                  } ${completedTabs[tab.id] ? "border-2 border-bs-indigo-950-500" : ""}`}
                >

                  <span className="hidden sm:inline">{tab.label}</span>
                  {completedTabs[tab.id] && <span className="text-green-500 text-xs">✓</span>}
                </button>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 
                    ? "✅ All sections completed" 
                    : `📋 ${Object.values(completedTabs).filter(Boolean).length}/3 completed`}
                </span>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              
              {/* ========== TAB 1: Personal Info ========== */}
              {activeTab === "tab1" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-xl">👤</span>
                    <h3 className="text-xl font-bold text-[#004296]">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                    </div>

                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-500 text-xs mb-4">
                      ⚠️ Please ensure all information matches your official ID documents.
                    </p>
                    <button
                      onClick={handleSaveTab1}
                      disabled={isSaved}
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                        isSaved 
                          ? "bg-green-500" 
                          : "bg-[#004296] hover:bg-[#003380]"
                      }`}
                    >
                      {isSaved ? (
                        <span className="flex items-center justify-center gap-2">
                          <span>✓</span> Saved! Moving to next step...
                        </span>
                      ) : (
                        "Save & Continue →"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ========== TAB 2: ID Proof ========== */}
              {activeTab === "tab2" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-2xl">🆔</span>
                    <h3 className="text-xl font-bold text-[#004296]">ID Proof Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        PAN Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        placeholder="ABCDE1234F"
                        className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.panNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Aadhaar Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012"
                        maxLength="12"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.aadhaarNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.aadhaarNumber && <p className="text-red-500 text-xs mt-1">{errors.aadhaarNumber}</p>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        PAN Card Image <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.panFile ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                        <input
                          type="file"
                          name="panFile"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                          id="panFile"
                        />
                        <label htmlFor="panFile" className="cursor-pointer">
                          <span className="text-3xl mb-2 block">📄</span>
                          <p className="text-gray-600 text-sm">{formData.panFile ? formData.panFile.name : "Click to upload PAN card"}</p>
                        </label>
                      </div>
                      {errors.panFile && <p className="text-red-500 text-xs mt-1">{errors.panFile}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                          Aadhaar Front <span className="text-red-500">*</span>
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-3 text-center ${errors.aadhaarFront ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                          <input
                            type="file"
                            name="aadhaarFront"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            id="aadhaarFront"
                          />
                          <label htmlFor="aadhaarFront" className="cursor-pointer">
                            <span className="text-2xl mb-1 block">🆔</span>
                            <p className="text-gray-600 text-xs">{formData.aadhaarFront ? formData.aadhaarFront.name : "Front side"}</p>
                          </label>
                        </div>
                        {errors.aadhaarFront && <p className="text-red-500 text-xs mt-1">{errors.aadhaarFront}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                          Aadhaar Back <span className="text-red-500">*</span>
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-3 text-center ${errors.aadhaarBack ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                          <input
                            type="file"
                            name="aadhaarBack"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            id="aadhaarBack"
                          />
                          <label htmlFor="aadhaarBack" className="cursor-pointer">
                            <span className="text-2xl mb-1 block">🆔</span>
                            <p className="text-gray-600 text-xs">{formData.aadhaarBack ? formData.aadhaarBack.name : "Back side"}</p>
                          </label>
                        </div>
                        {errors.aadhaarBack && <p className="text-red-500 text-xs mt-1">{errors.aadhaarBack}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSaveTab2}
                      disabled={isSaved}
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                        isSaved 
                          ? "bg-green-500" 
                          : "bg-[#004296] hover:bg-[#003380]"
                      }`}
                    >
                      {isSaved ? (
                        <span className="flex items-center justify-center gap-2">
                          <span>✓</span> Saved! Moving to next step...
                        </span>
                      ) : (
                        "Save & Continue →"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ========== TAB 3: Bank Details ========== */}
              {activeTab === "tab3" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-2xl">🏦</span>
                    <h3 className="text-xl font-bold text-[#004296]">Bank Account Details</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Account Holder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="accountHolder"
                        value={formData.accountHolder}
                        onChange={handleChange}
                        placeholder="As per bank records"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.accountHolder ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.bankName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      >
                        <option value="">Select Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        <option value="Kotak">Kotak Mahindra Bank</option>
                      </select>
                      {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.accountNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Confirm Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="confirmAccountNumber"
                        value={formData.confirmAccountNumber}
                        onChange={handleChange}
                        placeholder="Re-enter account number"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.confirmAccountNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.confirmAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.confirmAccountNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        IFSC Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        placeholder="e.g., SBIN0001234"
                        className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.ifscCode ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all`}
                      />
                      {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
                    </div>

  <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                          Front Image <span className="text-red-500">*</span>
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-3 text-center ${errors.aadhaarBack ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                          <input
                            type="file"
                            name="frontImage"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            id="frontImage"
                          />
                          <label htmlFor="frontImage" className="cursor-pointer">
                            <span className="text-2xl mb-1 block">🆔</span>
                            <p className="text-gray-600 text-xs">{formData.frontImage ? formData.frontImage.name : "Choose an Image"}</p>
                          </label>
                        </div>
                        {errors.frontImage && <p className="text-red-500 text-xs mt-1">{errors.frontImage}</p>}
                      </div>
                   
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <button
                      onClick={handleSaveTab3}
                      disabled={isSaved}
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                        isSaved 
                          ? "bg-green-500" 
                          : "bg-[#004296] hover:bg-[#003380]"
                      }`}
                    >
                      {isSaved ? "✓ Bank Details Saved!" : "Save Bank Details"}
                    </button>

                    {/* Final Submit Button - Only show when all tabs completed */}
                    {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 && (
                      <button
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                          isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          "🚀 Submit KYC for Verification"
                        )}
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

export default KYC;