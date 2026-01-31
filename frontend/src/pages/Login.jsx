import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import AlertBox from '../components/AlertBox';
import { loginUser } from '../services/authApi';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await loginUser(formData);
            navigate('/result', { state: { success: true, message: 'Login Successful!' } });
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
            {/* Background Decor System */}
            <div className="bg-decor">
                {/* Dots Pattern */}
                <div className="anim-pulse" style={{ position: 'absolute', top: '5%', left: '5%', display: 'grid', gridTemplateColumns: 'repeat(5, 10px)', gap: '15px', opacity: 0.15 }}>
                    {[...Array(25)].map((_, i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#000' }}></div>)}
                </div>

                {/* Left Illustration: Svg Box & Arrow */}
                <div className="anim-float-rotate" style={{ position: 'absolute', top: '35%', left: '12%', transform: 'rotate(-5deg)' }}>
                    <div style={{ width: '120px', height: '140px', border: '2.5px solid #000', borderRadius: '12px', background: 'white', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '25px', height: '3px', background: '#000' }}></div>
                        <div style={{ position: 'absolute', top: '25px', left: '15px', width: '45px', height: '3px', background: '#000' }}></div>
                        <div style={{ position: 'absolute', bottom: '20px', right: '15px', fontSize: '2rem' }}>↗</div>
                    </div>
                </div>

                {/* Left Illustration: Dotted Pillar */}
                <div className="anim-float" style={{ position: 'absolute', bottom: '15%', left: '15%', width: '100px', height: '180px', background: '#ffd8a8', border: '2.5px solid #000', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '15px' }}>
                        {[...Array(15)].map((_, i) => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000' }}></div>)}
                    </div>
                </div>

                {/* Right Illustration: Character Seat (Simplified) */}
                <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '10%', right: '12%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {/* Floating Box */}
                    <div style={{ width: '160px', height: '160px', border: '2.5px solid #000', borderRadius: '12px', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '-50px', marginRight: '40px', zIndex: 2 }}>
                        <div style={{ width: '30px', height: '3px', background: '#000', marginBottom: '10px' }}></div>
                    </div>
                    {/* Dotted Box */}
                    <div style={{ width: '120px', height: '220px', border: '2.5px solid #000', borderRadius: '8px', background: '#ffe066' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '15px' }}>
                            {[...Array(12)].map((_, i) => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000' }}></div>)}
                        </div>
                    </div>
                </div>

                {/* Squiggle mockups */}
                <div className="anim-pulse" style={{ position: 'absolute', top: '15%', right: '20%', fontSize: '4rem', transform: 'rotate(20deg)', opacity: 0.2 }}>〰</div>
                <div className="anim-float-rotate" style={{ position: 'absolute', top: '45%', right: '10%', transform: 'scale(1.5)', opacity: 0.1 }}>◓</div>
            </div>

            <div className="soft-card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Agent Login</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.4' }}>
                        Hey, Enter your details to get sign in <br /> to your account
                    </p>
                </div>

                <AlertBox message={error} type="error" />

                <form onSubmit={handleSubmit}>
                    <InputBox
                        label="Enter Email / Phone No"
                        name="username"
                        placeholder="admin"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="Passcode"
                        name="password"
                        type="password"
                        placeholder="********"
                        rightLabel="Hide"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <a href="#" style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600', textDecoration: 'none' }}>
                            Having trouble in sign in?
                        </a>
                    </div>

                    <Button text="Sign in" type="submit" variant="primary" />
                </form>

                <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    <span style={{ padding: '0 1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or Sign in with</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                    <SocialBtn icon="G" label="Google" hoverColor="#4285F4" textColor="white" />
                    <SocialBtn icon="✉" label="Email" hoverColor="#ff4d4d" textColor="white" />
                    <SocialBtn icon="f" label="Facebook" hoverColor="#4caf50" textColor="white" />
                </div>

                <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                    <a href="/register" style={{ color: 'var(--text-main)', fontWeight: '700', textDecoration: 'none' }}>Request Now</a>
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Copyright @wework 2022 | Privacy Policy
            </div>
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
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 0.5rem',
                border: '1.5px solid #000',
                borderRadius: 'var(--radius-md)',
                background: isHovered ? hoverColor : 'white',
                color: isHovered && textColor ? textColor : 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'translate(-2px, -2px)' : 'none',
                boxShadow: isHovered ? '4px 4px 0px 0px #000' : 'none'
            }}
        >
            <span style={{ fontSize: '1.1rem' }}>{icon}</span>
            {label}
        </button>
    );
};

export default Login;
