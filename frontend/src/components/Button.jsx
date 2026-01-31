import React from 'react';

const Button = ({ text, onClick, type = 'button', variant = 'primary' }) => {
    return (
        <button
            className="soft-btn"
            type={type}
            onClick={onClick}
            style={{
                backgroundColor: variant === 'primary' ? 'var(--primary)' : '#ffffff',
                border: variant === 'secondary' ? '1px solid var(--border-color)' : 'none',
                color: 'var(--text-main)'
            }}
        >
            {text}
        </button>
    );
};

export default Button;
