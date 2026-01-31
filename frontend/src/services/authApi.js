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
        const error = await response.text();
        throw new Error(error || 'Login failed');
    }

    return await response.json();
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
        const error = await response.text();
        throw new Error(error || 'Registration failed');
    }

    return await response.json();
};
