import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import AlertBox from '../components/AlertBox';
import { loginUser } from '../services/authApi';
import FloatingBackground from '../components/FloatingBackground';
import TypingTracker from '../components/TypingTracker';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
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

    const handleKeyDown = (e) => TypingTracker.handleKeyDown(e);
    const handleKeyUp = (e) => TypingTracker.handleKeyUp(e);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const pattern = TypingTracker.getPattern();
        console.log("Captured Keystroke Pattern:", pattern);

        try {
            const response = await loginUser(formData);
            // On success, save token and redirect
            localStorage.setItem('authToken', response.token || 'fake-jwt-token');
            localStorage.setItem('userEmail', formData.username);

            // Clear tracker after successful use
            TypingTracker.clear();

            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
            // Optionally clear tracker on failure to retry
            TypingTracker.clear();
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
                        AUTHENTICATION MODULE ACTIVE
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
                <div className="soft-card biometric-pulse-box" style={{ maxWidth: '450px', width: '100%', padding: '3rem', background: 'rgba(10,10,10,0.95)', position: 'relative', transition: 'transform 0.3s' }}>

                    {/* BIOMETRIC INDICATOR ABOVE TITLE */}
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div className="capture-ready-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }}></div>
                            BIOMETRIC_CAPTURE_READY
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(0,255,157,0.05)', border: '1px solid var(--primary)', borderRadius: '40px', marginBottom: '1rem', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>
                            SYSTEM_ACCESS_PROTOCOL
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1.5px', color: '#FFF' }}>AGENT_LOGIN</h1>
                    </div>

                    <AlertBox message={error} type="error" />

                    <form onSubmit={handleSubmit}>
                        <InputBox
                            label="OPERATOR_ID"
                            name="username"
                            placeholder="operator_01"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <InputBox
                            label="ACCESS_CODE"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onKeyUp={handleKeyUp}
                        />

                        <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
                            <Link to="#" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '800', textDecoration: 'none' }}>
                                FORGOT_ACCESS_CODE?
                            </Link>
                        </div>

                        <Button text="INITIALIZE_SESSION" type="submit" variant="primary" style={{ height: '55px', fontSize: '1.1rem' }} />
                    </form>

                    <div style={{ margin: '2.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <span style={{ padding: '0 1.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '900' }}>IDENTITY_GATEWAY</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                        <SocialBtn icon="G" label="Google" hoverColor="rgba(234, 67, 53, 0.3)" textColor="white" />
                        <SocialBtn icon="✉" label="Email" hoverColor="rgba(251, 192, 45, 0.3)" textColor="white" />
                        <SocialBtn icon="f" label="Facebook" hoverColor="rgba(24, 119, 242, 0.3)" textColor="white" />
                    </div>

                    <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>NEW_OPERATOR? </span>
                        <span
                            onClick={() => navigate('/register', { replace: true })}
                            style={{ color: 'var(--primary)', fontWeight: '900', textDecoration: 'none', cursor: 'pointer', borderBottom: '1px solid var(--primary)' }}
                        >
                            REQUEST_PROFILING
                        </span>
                    </div>
                </div>
            </div>

            {/* --- SYSTEM STATUS STRIP (REMOVE DEAD SPACE) --- */}
            <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.65rem', color: 'rgba(0,255,157,0.4)', letterSpacing: '4px', fontWeight: 'bold', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)' }}>
                BIOKEY_GUARD v2.0 // NODE_ENCRYPTION_ACTIVE // CONTINUOUS_MONITORING_READY
            </div>

            {/* Footer decoration */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))' }}></div>
        </div>
    );
};

const SocialBtn = ({ icon, label, hoverColor, textColor = 'inherit' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                padding: '0.75rem 0.5rem',
                border: '1.5px solid #333',
                borderRadius: '8px',
                background: isHovered ? hoverColor : '#111',
                color: isHovered ? textColor : 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '0.7rem',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isHovered ? `0 4px 12px ${hoverColor}66` : 'none'
            }}
        >
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            {label}
        </button>
    );
};

export default Login;
