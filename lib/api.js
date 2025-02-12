const BASE_URL = 'https://blockvest-7a03d13814c1.herokuapp.com/api';

// ============ Auth API endpoints ============
export const authAPI = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Verify email with code
    verifyEmail: async (verificationData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verificationData),
            });

            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Resend verification code
    resendVerification: async (email) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/resend-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        } catch (error) {
            throw error;
        }
    },
};