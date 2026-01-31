import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { registerUser } from '../services/authApi';
import { validateEmail, validatePassword } from '../utils/validators';
import AlertBox from '../components/AlertBox';
import FloatingBackground from '../components/FloatingBackground';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirection logic: If already authenticated, go to dashboard
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(formData.email)) {
            setError('Invalid Email format');
            return;
        }
        if (!validatePassword(formData.password)) {
            setError('Password must be at least 6 chars');
            return;
        }

        try {
            await registerUser(formData);
            // On success, set a token so ProtectedRoute allows entry
            localStorage.setItem('authToken', 'fake-jwt-token');
            localStorage.setItem('userEmail', formData.username);
            // On success, redirect directly to dashboard
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div style={{ background: 'var(--app-bg)', minHeight: '100vh', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

            {/* --- GLOBAL FLOATING BACKGROUND --- */}
            <FloatingBackground />

            {/* --- GLOBAL DYNAMIC BACKGROUND LAYER --- */}
            <div className="bg-grid"></div>
            <div className="scanner-line"></div>
            <div className="circuit-overlay"></div>

            {/* --- PROFESSIONAL CYBERSECURITY NAVBAR --- */}
            <nav className="neo-nav" style={{ width: '100%', position: 'absolute', top: 0, left: 0, borderBottom: '1px solid rgba(0,255,157,0.3)', boxShadow: '0 4px 15px rgba(0,255,157,0.1)' }}>
                {/* LEFT SIDE: LOGO + ANIMATED ICON */}
                <div
                    onClick={() => navigate('/', { replace: true })}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                >
                    <div className="security-icon-rotate" style={{ width: '32px', height: '32px', border: '2px solid var(--primary)', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px var(--primary)' }}>
                        <div style={{ width: '16px', height: '2px', background: 'var(--primary)' }}></div>
                        <div style={{ width: '2px', height: '16px', background: 'var(--primary)', position: 'absolute' }}></div>
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '3px', textShadow: '0 0 10px rgba(0,255,157,0.5)' }}>BIOKEY_GUARD</span>
                </div>

                {/* CENTER: STATUS INDICATOR */}
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <div className="capture-ready-text" style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        SECURE REGISTRATION MODE
                    </div>
                </div>

                {/* RIGHT SIDE: BACK BUTTON */}
                <button
                    className="soft-btn"
                    style={{
                        width: 'auto',
                        padding: '10px 25px',
                        fontSize: '0.75rem',
                        background: 'rgba(0,0,0,0.8)',
                        color: 'var(--primary)',
                        border: '1px solid var(--primary)',
                        transition: 'all 0.3s'
                    }}
                    onClick={() => navigate('/', { replace: true })}
                >
                    BACK_TO_DASHBOARD
                </button>
            </nav>

            {/* --- PERFECTLY CENTERED FORM MODULE --- */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 10 }}>
                <div className="soft-card biometric-pulse-box" style={{ maxWidth: '500px', width: '100%', padding: '3rem', background: 'rgba(10,10,10,0.95)', position: 'relative', transition: 'transform 0.3s' }}>

                    {/* BIOMETRIC INDICATOR ABOVE TITLE */}
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div className="capture-ready-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }}></div>
                            INITIALIZING_BIOMETRIC_SIGNATURE
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(0,184,255,0.05)', border: '1px solid var(--secondary)', borderRadius: '40px', marginBottom: '1rem', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', color: 'var(--secondary)' }}>
                            NEW_OPERATOR_REGISTRATION
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1.5px', color: '#FFF' }}>CREATE_PROFILE</h1>
                    </div>

                    <AlertBox message={error} type="error" />

                    <form onSubmit={handleSubmit}>
                        <InputBox
                            label="FULL_NAME"
                            name="username"
                            placeholder="Operator Name"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <InputBox
                            label="EMAIL_ADDRESS"
                            name="email"
                            type="email"
                            placeholder="operator@biokey.internal"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <InputBox
                            label="CHOOSE_ACCESS_CODE"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <div style={{ margin: '2rem 1rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                By initializing, you accept the <b>SECURITY_PROTOCOLS</b> and <b>DATA_USAGE_POLICY</b>.
                            </p>
                        </div>

                        <Button text="INITIALIZE_PROFILE" type="submit" variant="primary" style={{ height: '55px', fontSize: '1.1rem' }} />
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>EXISTING_OPERATOR? </span>
                        <span
                            onClick={() => navigate('/login', { replace: true })}
                            style={{ color: 'var(--primary)', fontWeight: '900', textDecoration: 'none', cursor: 'pointer', borderBottom: '1px solid var(--primary)' }}
                        >
                            LOGIN_TO_SESSION
                        </span>
                    </div>
                </div>
            </div>

            {/* --- SYSTEM STATUS STRIP (REMOVE DEAD SPACE) --- */}
            <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.65rem', color: 'rgba(0,184,255,0.4)', letterSpacing: '4px', fontWeight: 'bold', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)' }}>
                BIOKEY_GUARD v2.0 // NODE_ENCRYPTION_ACTIVE // BIOMETRIC_INIT_ACTIVE
            </div>

            {/* Footer decoration */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))' }}></div>
        </div>
    );
};

export default Register;
