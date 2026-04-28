const API_BASE_URL = 'https://tambola.fctesting.shop/';

const API_CONFIG_URL = `${API_BASE_URL}api/`;


export const API = {
    REGISTER_URL: `${API_CONFIG_URL}auth/save-details`,
    LOGIN_URL: `${API_CONFIG_URL}auth/login/send-otp`,
    OTP_SEND_URL: `${API_CONFIG_URL}auth/send-otp`,
    OTP_VERIFY_URL: `${API_CONFIG_URL}auth/verify-otp`,
    BANNER_URL:`${API_CONFIG_URL}admin/banner`,
    WIN_WORHTY_OFFERS_URL:`${API_CONFIG_URL}admin/offers`,
    
};
