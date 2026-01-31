import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Simple boolean auth state check (placeholder for real auth)
    const isAuthenticated = localStorage.getItem('authToken') === 'placeholder-jwt-token';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
