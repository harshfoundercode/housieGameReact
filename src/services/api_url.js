import { Upload } from "lucide-react";

const API_BASE_URL = 'https://api.luckyfunda.com';


const API_CONFIG_URL = `${API_BASE_URL}/api/`;


export const API = {
    UPLOAD_URL: `${API_BASE_URL}`,

    REGISTER_URL: `${API_CONFIG_URL}auth/user_register`,

    LOGIN_URL: `${API_CONFIG_URL}auth/user/login`,

    OTP_SEND_URL: `${API_CONFIG_URL}otp/send-otp`,
    
    OTP_VERIFY_URL: `${API_CONFIG_URL}otp/verify-otp`,

    PROFILE_URL: `${API_CONFIG_URL}auth/profile`,

    BANNER_URL: `${API_CONFIG_URL}admin/banner`,
    WIN_WORHTY_OFFERS_URL: `${API_CONFIG_URL}admin/offers`,
    WINNER_LIST_URL: `${API_CONFIG_URL}game/winners-list`,
    LIVE_SCHEDULE_RESULT_URL: `${API_CONFIG_URL}game/all-games`,

    FOOTER_URL: `${API_CONFIG_URL}policy/all`,
    NEWS_MEDIA_URL: `${API_CONFIG_URL}news`,

    ADD_MONEY_URL: `${API_CONFIG_URL}wallet/add-credit`,
    TRANSACTION_HISTORY_URL: `${API_CONFIG_URL}wallet/history`,

    IFSC_AUTO_FILL_URL: `${API_CONFIG_URL}kyc/`,
    UPDATE_KYC_URL: `${API_CONFIG_URL}kyc/update`,
    GET_KYC_URL: `${API_CONFIG_URL}kyc/my/kcy`,
    KYC_SUBMIT_URL: `${API_CONFIG_URL}kyc/submit`,

    ///GAME APIS
    
    TICKET_LIST_BY_GAMEID_URL: `${API_CONFIG_URL}ticket/all?game_id=`,
    GET_AGENTS_URL: `${API_CONFIG_URL}agent/agent/list`,
    GET_AGENT_DETAILS_URL: `${API_CONFIG_URL}agent/`,

    BOOK_TICKET_URL: `${API_CONFIG_URL}booking/book-ticket`,
    MY_TICKETS_URL: `${API_CONFIG_URL}booking/my-tickets`,

    FEEDBACK_URL: `${API_CONFIG_URL}user/feedback-video`,
    DELETE_ACCOUNT_URL: `${API_CONFIG_URL}user/delete/`,

    ALL_GAMES_RESULT_URL: `${API_CONFIG_URL}user/results/`,

    ///Socket Url

    SOCKET_URL: "https://api.luckyfunda.com",
    
    LOAD_CURRENT_ROUND_URL: `${API_CONFIG_URL}round/current-game/`,
    BOOKING_ALL_TICKET_SOCKET_URL: `${API_CONFIG_URL}booking/all-tickets/`,
    ROUND_ID_SOCKET_URL: `${API_CONFIG_URL}game/status?round_id=`,
    WINNER_LIST_SOCKET_URL: `${API_CONFIG_URL}game/winners-list?round_id=`,

    

};
