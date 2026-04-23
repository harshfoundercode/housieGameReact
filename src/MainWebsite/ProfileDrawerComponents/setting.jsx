import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const Settings = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      // Perform account deletion logic
      alert("Your account has been scheduled for deletion. You will be logged out.");
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-24 md:pt-28 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">
              Settings
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage your account preferences and app settings
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            
             

            {/* Language Section */}
            <div 
              onClick={() => navigate(ROUTES.LANG)}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="font-medium text-gray-800">Language</p>
                    <p className="text-gray-500 text-xs">Change app language</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">
                    {localStorage.getItem("languageName") || "English"}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

          

            {/* Danger Zone - Delete Account */}
            <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-5 md:p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                <span>⚠️</span> Danger Zone
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-600 transition-all shadow-sm"
              >
                Delete Account
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md ${
                isSaving 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#004296] hover:bg-[#003380]"
              }`}
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">⚠️</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                Delete Account
              </h3>
              <p className="text-gray-500 text-sm text-center mb-6">
                This action cannot be undone. All your data, tickets, and winnings will be permanently deleted.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-600 text-xs mb-2">
                  Type <span className="font-bold">DELETE</span> to confirm:
                </p>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 outline-none text-center font-bold"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation("");
                  }}
                  className="flex-1 py-2.5 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== "DELETE"}
                  className={`flex-1 py-2.5 rounded-lg font-medium text-white transition-all ${
                    deleteConfirmation === "DELETE"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Settings;