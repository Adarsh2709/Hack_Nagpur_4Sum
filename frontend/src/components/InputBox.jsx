import React, { useState } from 'react';

const InputBox = ({ label, type, placeholder, value, onChange, name, rightLabel }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const labelText = isPassword ? (showPassword ? 'Hide' : 'Show') : rightLabel;

    return (
        <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {label}
                </label>
                {isPassword && (
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {labelText}
                    </span>
                )}
                {!isPassword && rightLabel && (
                    <span style={{ fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}>
                        {rightLabel}
                    </span>
                )}
            </div>
            <input
                className="soft-input"
                type={currentType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />
        </div>
    );
};

export default InputBox;
