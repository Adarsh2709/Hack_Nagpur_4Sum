import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="full-screen">
            <div className="neo-container">
                <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem' }}>
                    SECURE_AUTH_SYSTEM
                </h1>
                <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    KEYSTROKE_DYNAMICS_INITIATED
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="neo-btn" onClick={() => navigate('/register')}>
                        REGISTER
                    </button>
                    <button className="neo-btn" onClick={() => navigate('/login')}>
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
