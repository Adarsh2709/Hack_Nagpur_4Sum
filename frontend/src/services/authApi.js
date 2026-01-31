export const loginUser = async (credentials) => {
    // Mock API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.username === 'admin' && credentials.password === 'password') {
                resolve({ success: true, token: 'fake-jwt-token' });
            } else {
                reject({ success: false, message: 'Invalid credentials' });
            }
        }, 1000);
    });
};

export const registerUser = async (userData) => {
    // Mock API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Registration successful' });
        }, 1000);
    });
};
