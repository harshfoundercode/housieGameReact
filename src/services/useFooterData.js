import { useState, useEffect } from 'react';
import { API } from '../services/api_url';

export const useFooterData = () => {
    const [footerData, setFooterData] = useState({
        contact: {
            address: "",
            email: "",
            phone: "",
            whatsapp: ""
        },
        rules: "",
        terms: "",
        privacy: "",
        faq: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFooterData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(API.FOOTER_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.data) {
                // Parse contact data if it's a string
                const contactData = typeof result.data.contact === 'string' 
                    ? JSON.parse(result.data.contact) 
                    : result.data.contact || {};
                
                setFooterData({
                    contact: {
                        address: contactData.address || "Delhi, India",
                        email: contactData.email || "support@tambola.com",
                        phone: contactData.phone || "9999999999",
                        whatsapp: contactData.whatsapp || "7881116009"
                    },
                    rules: result.data.rules || "",
                    terms: result.data.terms || "",
                    privacy: result.data.privacy || "",
                    faq: result.data.faq || ""
                });
            } else {
                throw new Error('Invalid API response structure');
            }
        } catch (err) {
            console.error('Error fetching footer data:', err);
            setError(err.message);
            
            // Set fallback data
            setFooterData({
                contact: {
                    address: "Delhi, India",
                    email: "support@tambola.com",
                    phone: "9999999999",
                    whatsapp: "7881116009"
                },
                rules: "",
                terms: "",
                privacy: "",
                faq: ""
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFooterData();
    }, []);

    return {
        footerData,
        loading,
        error,
        refreshData: fetchFooterData
    };
};