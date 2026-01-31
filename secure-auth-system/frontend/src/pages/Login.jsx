import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingTracker from '../components/TypingTracker';
import '../styles/theme.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (e) => TypingTracker.handleKeyDown(e);
    const handleKeyUp = (e) => TypingTracker.handleKeyUp(e);

    const submitLogin = () => {
        const pattern = TypingTracker.getPattern();

        console.log('LOGIN_ATTEMPT:', {
            email,
            password,
            typingPattern: pattern
        });

        // Placeholder Simulation
        if (email && password) {
            localStorage.setItem('authToken', 'placeholder-jwt-token');
            localStorage.setItem('userEmail', email);
            navigate('/dashboard');
        } else {
            alert('CREDENTIALS_REQUIRED');
        }
    };

    return (
        <div className="full-screen">
            <div className="neo-container" style={{ width: '400px' }}>
                <h2 style={{ color: 'var(--primary-color)' }}>ACCESS_TERMINAL</h2>

                <div style={{ marginBottom: '1rem' }}>
                    <label>EMAIL_ID</label>
                    <input
                        className="neo-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>PASSWORD</label>
                    <input
                        className="neo-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                    />
                </div>

                <button className="neo-btn" onClick={submitLogin} style={{ width: '100%' }}>
                    AUTHENTICATE
                </button>
            </div>
        </div>
    );
};

export default Login;
