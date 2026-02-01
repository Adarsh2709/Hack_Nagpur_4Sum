const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/auth';

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email || credentials.username, // Handle both username/email field names
            password: credentials.password,
            vector: credentials.vector || null
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || 'Login failed');
        } catch (e) {
            throw new Error(errorText || 'Login failed');
        }
    }

    const data = await response.json();
    return data;
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            vector: userData.vector || null
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || 'Registration failed');
        } catch (e) {
            throw new Error(errorText || 'Registration failed');
        }
    }

    const data = await response.json();
    return data;
};
