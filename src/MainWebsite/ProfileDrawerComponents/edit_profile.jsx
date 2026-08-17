// EditProfileModal.jsx
import React, { useState, useEffect } from 'react';
import { editUserProfile } from '../../services/profile_services';

const EditProfileModal = ({ isOpen, onClose, currentProfile, onProfileUpdate }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (currentProfile && isOpen) {
            setFormData({
                first_name: currentProfile.first_name || '',
                last_name: currentProfile.last_name || ''
            });
        }
    }, [currentProfile, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Validate
            if (!formData.first_name.trim()) {
                throw new Error('First name is required');
            }
            
            const response = await editUserProfile(formData);
            
            if (response.success) {
                setSuccess('Profile updated successfully!');
                
                // Update localStorage with new data
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    userData.first_name = formData.first_name;
                    userData.last_name = formData.last_name;
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                
                // Call parent callback to refresh profile
                if (onProfileUpdate) {
                    onProfileUpdate();
                }
                
                // Close modal after short delay
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#004296]">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                    >
                        ✕
                    </button>
                </div>

                {/* Phone display (read-only) */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-700">{currentProfile?.phone || 'Not available'}</p>
                    <p className="text-xs text-gray-400 mt-1">Phone number cannot be changed</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004296] focus:border-transparent transition-all"
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004296] focus:border-transparent transition-all"
                            placeholder="Enter last name"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#004296] text-white py-2.5 rounded-lg font-medium hover:bg-[#003380] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Saving...</span>
                                </div>
                            ) : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProfileModal;