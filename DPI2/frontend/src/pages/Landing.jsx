import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/theme.css';
import '../styles/neo.css';
import FloatingBackground from '../components/FloatingBackground';

const Landing = () => {
    const navigate = useNavigate();

    // Redirection logic: If already authenticated, go to dashboard
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    return (
        <div style={{ background: 'var(--app-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden', color: 'var(--text-main)' }}>

            {/* Global Security Background */}
            <FloatingBackground />

            {/* --- ANIMATED SECURITY VISUALS --- */}
            <div className="bg-grid"></div>
            <div className="scanner-line"></div>

            <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.1, pointerEvents: 'none' }}>
                <div className="waveform-container">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
                <p className="micro-text" style={{ textAlign: 'right', marginTop: '10px' }}>Behavioral signals captured in real time</p>
            </div>

            {/* --- TOP SECTION (SYSTEM IDENTITY BADGE) --- */}
            <div className="badge-container" style={{ position: 'absolute', top: '3rem', textAlign: 'center', zIndex: 10 }}>
                <div className="soft-card" style={{ padding: '8px 24px', borderRadius: '40px', border: '2px solid var(--primary)', display: 'inline-block', background: 'rgba(0,255,157,0.05)', cursor: 'default' }}>
                    <span style={{ fontWeight: '900', letterSpacing: '2px', fontSize: '0.85rem' }}>BIOKEY_GUARD :: BEHAVIORAL_AUTH_v2.0</span>
                </div>
                <p className="micro-text" style={{ marginTop: '0.5rem', opacity: 0.7 }}>Continuous Behavioral Biometric Engine</p>
            </div>

            {/* --- MAIN HERO SECTION --- */}
            <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '1000px', margin: '4rem 0' }}>
                <h1 style={{ marginBottom: '2rem', lineHeight: 1.1 }}>
                    <span style={{ fontSize: '5rem', fontWeight: '900', color: '#FFF', display: 'block', letterSpacing: '-2px' }}>SECURE ACCESS</span>
                    <span style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--primary)', display: 'block', letterSpacing: '-1px' }}>CONTINUOUSLY VERIFIED BY YOUR BEHAVIOR</span>
                </h1>

                {/* --- SUBHEADLINE / EXPLANATION --- */}
                <div style={{ marginBottom: '4rem' }}>
                    <p style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: '500', maxWidth: '800px', margin: '0 auto 1rem', lineHeight: 1.4 }}>
                        A real-time authentication system that analyzes typing behavior
                        to verify identity throughout the session — not just at login.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', opacity: 0.8 }}>
                        No static passwords. No constant OTPs. Security adapts silently.
                    </p>
                </div>

                {/* --- PRIMARY ACTION BUTTONS --- */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>

                    {/* LEFT BUTTON - REGISTRATION */}
                    <div style={{ textAlign: 'center', width: '380px' }}>
                        <button
                            className="soft-btn"
                            style={{ width: '100%', height: '70px', fontSize: '1.1rem', fontWeight: '900', background: 'var(--primary)', color: '#000', marginBottom: '1rem' }}
                            onClick={() => navigate('/register')}
                        >
                            REGISTER & CREATE BEHAVIOR PROFILE
                        </button>
                        <p className="micro-text" style={{ opacity: 0.8 }}>First-time users: typing pattern capture required</p>
                    </div>

                    {/* RIGHT BUTTON - LOGIN */}
                    <div style={{ textAlign: 'center', width: '380px' }}>
                        <button
                            className="soft-btn secondary"
                            style={{ width: '100%', height: '70px', fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary)', border: '2px solid var(--primary)', marginBottom: '1rem' }}
                            onClick={() => navigate('/login')}
                        >
                            LOGIN WITH CONTINUOUS VERIFICATION
                        </button>
                        <p className="micro-text" style={{ opacity: 0.8 }}>Behavior monitored in real time after login</p>
                    </div>

                </div>
            </div>

            {/* --- BOTTOM SYSTEM STATUS STRIP --- */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: '1rem 2rem', background: 'rgba(0,0,0,0.8)', borderTop: '1px solid #333', display: 'flex', justifyContent: 'center', gap: '3rem', zIndex: 100 }}>
                <span className="micro-text">[ ENCRYPTION: AES-256 ]</span>
                <span className="micro-text">[ AUTH_ENGINE: ACTIVE ]</span>
                <span className="micro-text">[ SESSION_MONITOR: ENABLED ]</span>
                <span className="micro-text">[ ML_MODEL: BEHAVIORAL_SVM ]</span>
                <span className="micro-text">[ RISK_ENGINE: LIVE ]</span>
            </div>
        </div>
    );
};

export default Landing;
