import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { registerUser } from '../services/authApi';
import { validateEmail, validatePassword } from '../utils/validators';
import AlertBox from '../components/AlertBox';
import FloatingBackground from '../components/FloatingBackground';
import TypingTracker from '../components/TypingTracker';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [enrollmentPasses, setEnrollmentPasses] = useState([]);
    const [currentPass, setCurrentPass] = useState(1);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Redirection logic... (keep existing)
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

        if (!validateEmail(formData.email)) {
            setError('Invalid Email format');
            return;
        }
        if (!validatePassword(formData.password)) {
            setError('Password must be at least 6 chars');
            return;
        }

        const pattern = TypingTracker.getPattern();
        console.log(`Captured Pass ${currentPass}:`, pattern);

        const newPasses = [...enrollmentPasses, pattern];

        if (currentPass < 10) {
            setEnrollmentPasses(newPasses);
            setCurrentPass(currentPass + 1);
            setFormData({ ...formData, password: '' }); // Clear password for next pass
            TypingTracker.clear();
            return;
        }

        // Final pass
        setIsSubmitting(true);
        try {
            await registerUser({
                ...formData,
                vectors: newPasses
            });
            localStorage.setItem('authToken', 'fake-jwt-token');
            localStorage.setItem('userEmail', formData.email);
            TypingTracker.clear();
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'Registration failed');
            setIsSubmitting(false);
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
                        <div className="capture-ready-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: currentPass > 1 ? 'var(--secondary)' : 'var(--primary)' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentPass > 1 ? 'var(--secondary)' : 'var(--primary)', boxShadow: `0 0 8px ${currentPass > 1 ? 'var(--secondary)' : 'var(--primary)'}` }}></div>
                            {currentPass < 10 ? `ENROLLMENT_PASS_${currentPass}_OF_10` : 'FINALIZING_BIOMETRIC_SIGNATURE'}
                        </div>
                    </div>

                    {/* PROGRESS INDICATOR DOTS */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '2rem' }}>
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: `2px solid ${i < currentPass - 1 ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                                    background: i < currentPass - 1 ? 'var(--primary)' : 'transparent',
                                    boxShadow: i < currentPass - 1 ? '0 0 10px var(--primary)' : 'none',
                                    transition: 'all 0.3s'
                                }}
                            />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(0,184,255,0.05)', border: '1px solid var(--secondary)', borderRadius: '40px', marginBottom: '1rem', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', color: 'var(--secondary)' }}>
                            {currentPass === 1 ? 'NEW_OPERATOR_REGISTRATION' : 'CONTINUE_CAPTURING_PATTERN'}
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1.5px', color: '#FFF' }}>
                            {currentPass === 10 ? 'FINAL_INIT' : `PASS_${currentPass}`}
                        </h1>
                    </div>

                    <AlertBox message={error} type="error" />

                    <form onSubmit={handleSubmit}>
                        {/* DECOY INPUTS FOR ANTI-AUTOFILL */}
                        <input type="text" name="decoy_username" style={{ position: 'absolute', top: '-1000px', left: '-1000px' }} tabIndex="-1" autoComplete="off" />
                        <input type="password" name="decoy_password" style={{ position: 'absolute', top: '-1000px', left: '-1000px' }} tabIndex="-1" autoComplete="off" />

                        <InputBox
                            label="FULL_NAME"
                            name="username"
                            placeholder="Operator Name"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="off"
                            id="reg_nm_v2x5"
                        />
                        <InputBox
                            label="EMAIL_ADDRESS"
                            name="email"
                            type="email"
                            placeholder="operator@biokey.internal"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            id="reg_em_k8p1"
                        />
                        <InputBox
                            label="CHOOSE_ACCESS_CODE"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onKeyUp={handleKeyUp}
                            autoComplete="new-password"
                            id="reg_pw_z9w4"
                        />

                        <div style={{ margin: '2rem 1rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                By initializing, you accept the <b>SECURITY_PROTOCOLS</b> and <b>DATA_USAGE_POLICY</b>.
                            </p>
                        </div>

                        <Button
                            text={currentPass === 10 ? "FINALIZE_ENROLLMENT" : "INITIALIZE_PROFILE"}
                            type="submit"
                            variant="primary"
                            style={{
                                height: '55px',
                                fontSize: '1.1rem',
                                background: currentPass === 10 ? 'var(--secondary)' : 'var(--primary)',
                                borderColor: currentPass === 10 ? 'var(--secondary)' : 'var(--primary)'
                            }}
                        />
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
