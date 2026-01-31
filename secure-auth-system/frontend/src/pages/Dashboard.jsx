import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail') || 'UNKNOWN_USER';

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    return (
        <div className="full-screen">
            <div className="neo-container" style={{ minWidth: '600px', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary-color)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>
                    COMMAND_CENTER
                </h1>

                <div style={{ margin: '2rem 0', textAlign: 'left' }}>
                    <p>STATUS: <span style={{ color: 'var(--primary-color)' }}>ONLINE</span></p>
                    <p>USER: {email}</p>
                    <p>SECURITY_LEVEL: <span style={{ color: 'var(--primary-color)' }}>MAXIMUM</span></p>
                    <p>BEHAVIORAL_PROFILE: <span style={{ color: 'var(--primary-color)' }}>ACTIVE</span></p>
                </div>

                <div style={{ border: '1px dashed #333', padding: '1rem', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>
                        SYSTEM_LOGS: NO ANOMALIES DETECTED IN LAST LOGIN SEQUENCE.
                    </p>
                </div>

                <button className="neo-btn" onClick={handleLogout}>
                    TERMINATE_SESSION
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
