import { API } from "./api_url";

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API.REGISTER_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// Send OTP API call
export const sendOTP = async (phoneNumber) => {
    try {
        const response = await fetch(`${API.OTP_SEND_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phoneNumber }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send OTP');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// Verify OTP API call
export const verifyOTP = async (phoneNumber, otp) => {
    try {
        const response = await fetch(`${API.OTP_VERIFY_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phoneNumber,
                otp: otp
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'OTP verification failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};