import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { success, message } = location.state || { success: false, message: 'Unknown state' };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="soft-card" style={{ textAlign: 'center' }}>
                <div style={{
                    fontSize: '5rem',
                    marginBottom: '1.5rem',
                    color: success ? '#166534' : '#991b1b'
                }}>
                    {success ? '✓' : '✕'}
                </div>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '800' }}>
                    {success ? 'Success!' : 'Oops!'}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
                    {message}
                </p>
                <Button
                    text={success ? "Continue to Dashboard" : "Try Again"}
                    onClick={() => navigate('/login')}
                    variant="primary"
                />
            </div>
        </div>
    );
};

export default Result;
