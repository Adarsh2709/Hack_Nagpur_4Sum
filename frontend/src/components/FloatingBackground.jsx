import React, { useMemo } from 'react';

const SECURITY_EMOJIS = [
    '🛡️', '🔐', '🔑', '👁️', '🧠', '⌨️',
    '📡', '⚠️', '🕵️', '💳', '🧬', '🧱'
];

const FloatingBackground = () => {
    // Generate randomized properties for each emoji once
    const emojis = useMemo(() => {
        return SECURITY_EMOJIS.map((emoji, index) => {
            // Distribute across 4 quadrants to prevent clustering
            const quadrant = index % 4;
            let baseLeft, baseTop;

            if (quadrant === 0) { baseLeft = 0; baseTop = 0; }        // Top-Left
            else if (quadrant === 1) { baseLeft = 50; baseTop = 0; }   // Top-Right
            else if (quadrant === 2) { baseLeft = 0; baseTop = 50; }   // Bottom-Left
            else { baseLeft = 50; baseTop = 50; }                      // Bottom-Right

            return {
                id: index,
                char: emoji,
                style: {
                    left: `${baseLeft + Math.random() * 40}%`,
                    top: `${baseTop + Math.random() * 40}%`,
                    animationDelay: `${Math.random() * -20}s`, // Wider range for variety
                    animationDuration: `${25 + Math.random() * 15}s`,
                    fontSize: `${1.5 + Math.random() * 2}rem`
                }
            };
        });
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
            {emojis.map((emoji) => (
                <span key={emoji.id} className="floating-emoji" style={emoji.style}>
                    {emoji.char}
                </span>
            ))}
        </div>
    );
};

export default FloatingBackground;
