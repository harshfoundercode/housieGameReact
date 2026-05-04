import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { submitKYC, updateKYC, getKYC, verifyIFSC } from "../../services/kyc_services";
import { API } from "../../services/api_url";

const KYCAddEdit = ({ isEditMode = false, existingData = null }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [completedTabs, setCompletedTabs] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetchingIFSC, setFetchingIFSC] = useState(false);
  const [kycId, setKycId] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    // Tab 1: Personal Info
    first_name: "",
    last_name: "",
    dob: "",
    // Tab 2: ID Proof
    id_type: "aadhaar",
    id_number: "",
    id_name: "",
    id_front_image: null,
    id_back_image: null,
    // Tab 3: Bank Details
    account_holder_name: "",
    bank_name: "",
    account_number: "",
    confirm_account_number: "",
    ifsc_code: "",
    cheque_image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "tab1", label: "Personal Info", icon: "👤", hint: "Enter your personal details" },
    { id: "tab2", label: "ID Proof", icon: "🆔", hint: "Upload your ID documents" },
    { id: "tab3", label: "Bank Details", icon: "🏦", hint: "Add your bank account info" },
  ];

  // Helper functions
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
      id_type: data.id_type || "aadhaar",
      id_number: data.id_number || "",
      id_name: data.id_name || "",
      id_front_image: data.id_front_image,
      id_back_image: data.id_back_image,
      account_holder_name: data.account_holder_name || "",
      bank_name: data.bank_name || "",
      account_number: data.account_number || "",
      confirm_account_number: data.account_number || "",
      ifsc_code: data.ifsc_code || "",
      cheque_image: null,
    });

    setCompletedTabs({
      tab1: !!(data.first_name && data.dob),
      tab2: !!(data.id_number),
      tab3: !!(data.account_number && data.ifsc_code),
    });
  };

  // IFSC verification
  const handleIFSCBlur = async () => {
    const ifscCode = formData.ifsc_code.toUpperCase();
    if (!ifscCode || ifscCode.length !== 11) {
      setErrors({ ...errors, ifsc_code: "Please enter valid IFSC code" });
      return;
    }

    setFetchingIFSC(true);
    try {
      const response = await verifyIFSC(ifscCode);
      if (response.success && response.data) {
        setFormData(prev => ({
          ...prev,
          bank_name: response.data.bank,
        }));
        setErrors({ ...errors, ifsc_code: "" });
      } else {
        setErrors({ ...errors, ifsc_code: "Invalid IFSC code" });
      }
    } catch (error) {
      setErrors({ ...errors, ifsc_code: "Failed to verify IFSC code" });
    } finally {
      setFetchingIFSC(false);
    }
  };

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

  // Validations
  const validateTab1 = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTab2 = () => {
    const newErrors = {};
    if (!formData.id_number) newErrors.id_number = "ID number is required";
    if (formData.id_type === "aadhaar" && formData.id_number.length !== 12) {
      newErrors.id_number = "Aadhaar must be 12 digits";
    }
    if (!formData.id_name) newErrors.id_name = "Name as per ID is required";
    if (!formData.id_front_image) newErrors.id_front_image = "Front image is required";
    if (!formData.id_back_image) newErrors.id_back_image = "Back image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTab3 = () => {
    const newErrors = {};
    if (!formData.account_holder_name) newErrors.account_holder_name = "Account holder name is required";
    if (!formData.bank_name) newErrors.bank_name = "Bank name is required";
    if (!formData.account_number) newErrors.account_number = "Account number is required";
    if (!formData.confirm_account_number) newErrors.confirm_account_number = "Please confirm account number";
    if (formData.account_number !== formData.confirm_account_number) {
      newErrors.confirm_account_number = "Account numbers do not match";
    }
    if (!formData.ifsc_code) newErrors.ifsc_code = "IFSC code is required";
    if (!formData.cheque_image) newErrors.cheque_image = "Cheque/Passbook image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabClick = (tabId) => {
    if (tabId === "tab2" && !completedTabs.tab1) {
      alert("Please complete Personal Info first");
      return;
    }
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
      setTimeout(() => {
        setIsSaved(false);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (!completedTabs.tab1 || !completedTabs.tab2 || !completedTabs.tab3) {
      alert("Please complete all sections before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert files to base64
      const idFrontBase64 = formData.id_front_image && typeof formData.id_front_image !== 'string' 
        ? await fileToBase64(formData.id_front_image) : formData.id_front_image;
      const idBackBase64 = formData.id_back_image && typeof formData.id_back_image !== 'string'
        ? await fileToBase64(formData.id_back_image) : formData.id_back_image;
      const chequeBase64 = formData.cheque_image && typeof formData.cheque_image !== 'string'
        ? await fileToBase64(formData.cheque_image) : formData.cheque_image;

      const submitData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        dob: new Date(formData.dob).toISOString(),
        id_type: formData.id_type,
        id_number: formData.id_number,
        id_name: formData.id_name,
        id_front_image: idFrontBase64,
        id_back_image: idBackBase64,
        account_number: formData.account_number,
        ifsc_code: formData.ifsc_code,
        bank_name: formData.bank_name,
        account_holder_name: formData.account_holder_name,
        cheque_image: chequeBase64,
      };
      
      let response;
      if (isEditMode && (kycId || existingData)) {
        response = await updateKYC(submitData);
      } else {
        response = await submitKYC(submitData);
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
              {isEditMode ? "Update KYC" : "Complete Your KYC"}
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
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {completedTabs[tab.id] && <span className="text-green-500 text-xs">✓</span>}
                </button>
              ))}
            </div>

            {/* Tab Hint */}
            <div className="text-center mt-3">
              <p className="text-xs text-gray-400">{tabs.find(t => t.id === activeTab)?.hint}</p>
            </div>

            <div className="mt-4 mb-6">
              <span className="text-xs text-gray-500">
                {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 
                  ? "✅ All sections completed" 
                  : `📋 ${Object.values(completedTabs).filter(Boolean).length}/3 completed`}
              </span>
            </div>

            {/* Tab Content */}
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

              {/* Tab 2: ID Proof */}
              {activeTab === "tab2" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-2xl">🆔</span>
                    <h3 className="text-xl font-bold text-[#004296]">ID Proof Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        ID Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="id_type"
                        value={formData.id_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#004296] outline-none transition-all"
                      >
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="voter">Voter ID</option>
                        <option value="passport">Passport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        ID Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="id_number"
                        value={formData.id_number}
                        onChange={handleChange}
                        placeholder={formData.id_type === "aadhaar" ? "Enter 12-digit Aadhaar number" : "Enter ID number"}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.id_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
                      />
                      {errors.id_number && <p className="text-red-500 text-xs mt-1">{errors.id_number}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Name as on ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="id_name"
                        value={formData.id_name}
                        onChange={handleChange}
                        placeholder="Full name exactly as it appears on your ID"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.id_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`}
                      />
                      {errors.id_name && <p className="text-red-500 text-xs mt-1">{errors.id_name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        ID Front Image <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.id_front_image ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                        <input type="file" name="id_front_image" onChange={handleFileChange} accept="image/*" className="hidden" id="id_front_image" />
                        <label htmlFor="id_front_image" className="cursor-pointer block">
                          <span className="text-3xl mb-2 block">📄</span>
                          <p className="text-gray-600 text-sm">{formData.id_front_image ? (typeof formData.id_front_image === 'string' ? "Image loaded" : formData.id_front_image.name) : "Click to upload front side"}</p>
                        </label>
                      </div>
                      {errors.id_front_image && <p className="text-red-500 text-xs mt-1">{errors.id_front_image}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        ID Back Image <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.id_back_image ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                        <input type="file" name="id_back_image" onChange={handleFileChange} accept="image/*" className="hidden" id="id_back_image" />
                        <label htmlFor="id_back_image" className="cursor-pointer block">
                          <span className="text-3xl mb-2 block">📄</span>
                          <p className="text-gray-600 text-sm">{formData.id_back_image ? (typeof formData.id_back_image === 'string' ? "Image loaded" : formData.id_back_image.name) : "Click to upload back side"}</p>
                        </label>
                      </div>
                      {errors.id_back_image && <p className="text-red-500 text-xs mt-1">{errors.id_back_image}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button onClick={handleSaveTab2} disabled={isSaved} className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all">
                      {isSaved ? "✓ Saved! Moving..." : "Save & Continue →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Bank Details */}
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
                      <input type="text" name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} placeholder="As per bank records" className={`w-full px-4 py-3 rounded-lg border ${errors.account_holder_name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} />
                      {errors.account_holder_name && <p className="text-red-500 text-xs mt-1">{errors.account_holder_name}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        IFSC Code <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input type="text" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} onBlur={handleIFSCBlur} placeholder="e.g., SBIN0001234" className={`w-full px-4 py-3 rounded-lg border uppercase ${errors.ifsc_code ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} />
                        {fetchingIFSC && <div className="absolute right-3 top-3"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#004296]"></div></div>}
                      </div>
                      {errors.ifsc_code && <p className="text-red-500 text-xs mt-1">{errors.ifsc_code}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="bank_name" value={formData.bank_name} readOnly placeholder="Auto-filled from IFSC" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed" />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} placeholder="Enter account number" className={`w-full px-4 py-3 rounded-lg border ${errors.account_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} />
                      {errors.account_number && <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Confirm Account Number <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="confirm_account_number" value={formData.confirm_account_number} onChange={handleChange} placeholder="Re-enter account number" className={`w-full px-4 py-3 rounded-lg border ${errors.confirm_account_number ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:border-[#004296] outline-none transition-all`} />
                      {errors.confirm_account_number && <p className="text-red-500 text-xs mt-1">{errors.confirm_account_number}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                        Cheque/Passbook Image <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.cheque_image ? 'border-red-500 bg-red-50' : 'border-gray-300'} hover:border-[#004296] transition-all cursor-pointer`}>
                        <input type="file" name="cheque_image" onChange={handleFileChange} accept="image/*" className="hidden" id="cheque_image" />
                        <label htmlFor="cheque_image" className="cursor-pointer block">
                          <span className="text-3xl mb-2 block">📄</span>
                          <p className="text-gray-600 text-sm">{formData.cheque_image ? (typeof formData.cheque_image === 'string' ? "Image loaded" : formData.cheque_image.name) : "Click to upload cancelled cheque or passbook"}</p>
                        </label>
                      </div>
                      {errors.cheque_image && <p className="text-red-500 text-xs mt-1">{errors.cheque_image}</p>}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button onClick={handleSaveTab3} disabled={isSaved} className="w-full py-3 rounded-xl font-bold text-white bg-[#004296] hover:bg-[#003380] transition-all">
                      {isSaved ? "✓ Bank Details Saved!" : "Save Bank Details"}
                    </button>

                    {completedTabs.tab1 && completedTabs.tab2 && completedTabs.tab3 && (
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