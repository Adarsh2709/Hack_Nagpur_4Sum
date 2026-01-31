import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { registerUser } from '../services/authApi';
import { validateEmail, validatePassword } from '../utils/validators';
import AlertBox from '../components/AlertBox';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            navigate('/result', { state: { success: true, message: 'Registration Successful! Login now.' } });
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div className="bg-decor">
                {/* Top Left Circle */}
                <div className="anim-pulse" style={{ position: 'absolute', top: '10%', left: '15%', width: '120px', height: '120px', border: '2.5px solid #000', borderRadius: '50%', background: '#ffe3e3' }}></div>

                {/* Bottom Left Square Pattern */}
                <div className="anim-float-rotate" style={{ position: 'absolute', bottom: '15%', left: '10%', width: '140px', height: '140px', border: '2.5px solid #000', borderRadius: '16px', background: '#d3f9d8', padding: '20px' }}>
                    <div style={{ width: '40px', height: '3px', background: '#000', marginBottom: '8px' }}></div>
                    <div style={{ width: '60px', height: '3px', background: '#000' }}></div>
                </div>

                {/* Right Floating Pillar */}
                <div className="anim-float" style={{ position: 'absolute', top: '30%', right: '12%', width: '90px', height: '240px', background: '#e7f5ff', border: '2.5px solid #000', borderRadius: '45px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '30px' }}>
                        {[...Array(4)].map((_, i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#000' }}></div>)}
                    </div>
                </div>

                {/* Squiggle */}
                <div className="anim-pulse" style={{ position: 'absolute', bottom: '10%', right: '20%', fontSize: '5rem', opacity: 0.1, transform: 'rotate(-45deg)' }}>≋</div>
            </div>

            <div className="soft-card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Join us and start your journey <br /> with the Agent system
                    </p>
                </div>

                <AlertBox message={error} type="error" />

                <form onSubmit={handleSubmit}>
                    <InputBox
                        label="Full Name"
                        name="username"
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="Choose password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        rightLabel="Hide"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            By signing up, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.
                        </p>
                    </div>

                    <Button text="Create Account" type="submit" variant="primary" />
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Already have account? </span>
                    <a href="/login" style={{ color: 'var(--text-main)', fontWeight: '700', textDecoration: 'none' }}>Login instead</a>
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Copyright @wework 2022 | Privacy Policy
            </div>
        </div>
    );
};

export default Register;
