import React from 'react';

const AlertBox = ({ message, type = 'error' }) => {
    if (!message) return null;

    const bgColor = type === 'error' ? '#fee2e2' :
        type === 'success' ? '#dcfce7' : '#fef9c3';

    const textColor = type === 'error' ? '#991b1b' :
        type === 'success' ? '#166534' : '#854d0e';

    return (
        <div style={{
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            backgroundColor: bgColor,
            color: textColor,
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            border: `1px solid ${textColor}22`
        }}>
            {message}
        </div>
    );
};

export default AlertBox;
