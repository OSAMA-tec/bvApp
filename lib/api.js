import axios from 'axios';

export const BASE_URL = 'https://blockvest-7a03d13814c1.herokuapp.com/api';
// export const BASE_URL = 'https://892e-103-102-158-222.ngrok-free.app/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============ Auth API endpoints ============
export const authAPI = {
    // Register new user
    register: async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            return data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const { data } = await api.post('/auth/login', credentials);
            return data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Verify email with code
    verifyEmail: async (verificationData) => {
        try {
            const { data } = await api.post('/auth/verify-email', verificationData);
            return data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Resend verification code
    resendVerification: async (email) => {
        try {
            const { data } = await api.post('/auth/resend-verification', { email });
            return data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};