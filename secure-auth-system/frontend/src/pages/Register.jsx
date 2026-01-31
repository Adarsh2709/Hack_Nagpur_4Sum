import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingTracker from '../components/TypingTracker';
import '../styles/theme.css';

const Register = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [biometricData, setBiometricData] = useState([]); // Stores 10 patterns
    const [referencePassword, setReferencePassword] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (e) => TypingTracker.handleKeyDown(e);
    const handleKeyUp = (e) => TypingTracker.handleKeyUp(e);

    const handleNextAttempt = () => {
        if (!email) {
            alert('ENTER_EMAIL_FIRST');
            return;
        }

        if (step === 0) {
            // First entry sets the reference password
            if (!passwordInput) return;
            setReferencePassword(passwordInput);
        } else {
            // Subsequent entries must match reference
            if (passwordInput !== referencePassword) {
                alert('PASSWORD_MISMATCH_RETRY');
                setPasswordInput('');
                TypingTracker.clear();
                return;
            }
        }

        // Capture data
        const currentPattern = TypingTracker.getPattern();
        setBiometricData([...biometricData, currentPattern]);

        // Reset for next attempt
        TypingTracker.clear();
        setPasswordInput('');
        setStep(prev => prev + 1);
    };

    const finishRegistration = () => {
        // Placeholder for API call
        console.log('REGISTER_PAYLOAD:', {
            email,
            password: referencePassword,
            typingPatterns: biometricData
        });
        alert('REGISTRATION_COMPLETE_REDIRECTING');
        navigate('/login');
    };

    return (
        <div className="full-screen">
            <div className="neo-container" style={{ width: '400px' }}>
                <h2 style={{ color: 'var(--primary-color)' }}>REGISTER_ENTITY</h2>

                <div style={{ marginBottom: '1rem' }}>
                    <label>EMAIL_ID</label>
                    <input
                        className="neo-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={step > 0}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        {step === 0 ? 'SET_PASSWORD' : `VERIFY_PATTERN [${step}/10]`}
                    </label>
                    <input
                        className="neo-input"
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        placeholder={step === 0 ? "TYPE_PASSWORD" : "REPEAT_PASSWORD"}
                        autoComplete="off"
                    />
                </div>

                {step <= 10 ? (
                    <button className="neo-btn" onClick={handleNextAttempt} style={{ width: '100%' }}>
                        {step === 0 ? 'INITIATE_TRAINING' : 'NEXT_ITERATION'}
                    </button>
                ) : (
                    null
                )}

                {step >= 10 && (
                    <button className="neo-btn" onClick={finishRegistration} style={{ width: '100%', marginTop: '10px' }}>
                        FINALIES_PROFILE
                    </button>
                )}

                <div style={{ marginTop: '1rem', height: '10px', background: '#333' }}>
                    <div style={{
                        width: `${(step / 10) * 100}%`,
                        background: 'var(--primary-color)',
                        height: '100%',
                        transition: 'width 0.3s'
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Register;
