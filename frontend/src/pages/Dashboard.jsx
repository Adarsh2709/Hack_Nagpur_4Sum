import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/theme.css';
import '../styles/neo.css';
import FloatingBackground from '../components/FloatingBackground';

const Dashboard = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail') || 'OPERATOR_01';
    const [trustScore, setTrustScore] = useState(98);

    // Mock biometric data points
    const biometricData = [
        { label: 'FINGERPRINT_HASH', status: 'VERIFIED', color: 'var(--primary)' },
        { label: 'FACIAL_GEOMETRY', status: 'MATCHED', color: 'var(--secondary)' },
        { label: 'IRIS_LATENCY', status: 'STABLE', color: 'var(--primary)' },
    ];

    const [logs] = useState([
        { time: '16:42:05', event: 'SESSION_START', score: '99%', action: 'INITIALIZED' },
        { time: '16:42:10', event: 'TYPING_MONITOR_ACTIVE', score: '98%', action: 'MONITORING' },
        { time: '16:43:12', event: 'PATTERN_MATCH_SUCCESS', score: '99%', action: 'SILENT_VERIFY' },
    ]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login', { replace: true });
    };

    return (
        <div style={{ background: 'var(--app-bg)', minHeight: '100vh', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>

            {/* Global Security Background */}
            <FloatingBackground />

            {/* Security Visuals */}
            <div className="bg-grid"></div>
            <div className="scanner-line"></div>

            {/* 1️⃣ Top Navigation Bar */}
            <nav className="neo-nav">
                <div
                    onClick={() => navigate('/dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                >
                    <div style={{ width: '28px', height: '28px', border: '2px solid var(--primary)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '12px', height: '2px', background: 'var(--primary)' }}></div>
                        <div style={{ width: '2px', height: '12px', background: 'var(--primary)', position: 'absolute' }}></div>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px' }}>BIOKEY_GUARD</span>
                </div>
                <div className="nav-links">
                    <Link to="/dashboard" className="nav-link active">Dashboard</Link>
                    <Link to="#" className="nav-link">Activity</Link>
                    <Link to="#" className="nav-link">Security</Link>
                    <Link to="#" className="nav-link">Profile</Link>
                </div>
                <button className="soft-btn" style={{ width: 'auto', padding: '8px 20px', fontSize: '0.8rem', background: '#111' }} onClick={handleLogout}>
                    TERMINATE
                </button>
            </nav>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div className="dashboard-grid" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
                    {/* 2️⃣ Security Summary Row */}
                    <div className="col-3">
                        <div className="soft-card" style={{ height: '100%', borderTop: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>TRUST_SCORE</p>
                            <h2 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '0.5rem 0' }}>{trustScore}%</h2>
                            <div style={{ height: '8px', background: '#222', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${trustScore}%`, height: '100%', background: 'linear-gradient(90deg, #004d30, var(--primary))' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="soft-card" style={{ height: '100%' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>BIOMETRIC_STATUS</p>
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {biometricData.map((bio, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                                        <span style={{ color: '#888' }}>{bio.label}</span>
                                        <span style={{ color: bio.color, fontWeight: 'bold' }}>{bio.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="soft-card" style={{ height: '100%', borderTop: '4px solid var(--secondary)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>RISK_LEVEL</p>
                            <div style={{ marginTop: '0.5rem' }}>
                                <span className="badge badge-low" style={{ fontSize: '1rem', padding: '10px 24px', background: 'rgba(0, 255, 157, 0.1)' }}>LOW_RISK</span>
                                <p style={{ fontSize: '0.65rem', marginTop: '1rem', color: '#666' }}>Last scan: 3 seconds ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="soft-card" style={{ height: '100%' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>NODE_IDENTITY</p>
                            <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>SECURE_WS_42</h3>
                            <div style={{ border: '1px solid #333', padding: '8px', borderRadius: '4px', background: '#000' }}>
                                <p style={{ fontSize: '0.6rem', color: 'var(--primary)', fontFamily: 'monospace', margin: 0 }}>UUID: 4f9e-8bff-72f4</p>
                            </div>
                        </div>
                    </div>

                    {/* 3️⃣ Typing Metrics & Risk Analysis Section */}
                    <div className="col-8">
                        <div className="soft-card" style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.1, fontSize: '5rem', pointerEvents: 'none' }}>🧠</div>
                            <h3 style={{ margin: '0 0 1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '10px', height: '10px', background: 'var(--primary)' }}></div>
                                BEHAVIORAL_METRICS
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: '#666' }}>KEY_RHYTHM_CONSISTENCY</p>
                                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>94.2%</div>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: '#666' }}>PRESSURE_VARIANCE</p>
                                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>LOW</div>
                                </div>
                            </div>
                            <div style={{ height: '150px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', padding: '1rem' }}>
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} style={{ width: '100%', maxWidth: '10px', height: `${20 + Math.random() * 60}%`, background: i % 7 === 0 ? 'var(--secondary)' : 'var(--primary)', opacity: 0.6 }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="soft-card" style={{ borderColor: 'var(--secondary)', height: '100%', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '60px', height: '60px', opacity: 0.1, border: '2px solid var(--secondary)', borderRadius: '50%' }}>
                                <div style={{ position: 'absolute', top: '50%', left: '-10px', right: '-10px', height: '2px', background: 'var(--secondary)', transform: 'rotate(45deg)' }}></div>
                            </div>
                            <h3 style={{ color: 'var(--secondary)', margin: '0 0 1.5rem', fontSize: '1rem' }}>FRAUD_DETECTION</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>PATTERN_MATCHING:</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Baseline profile matches current operator with 0.98 probability.</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>ANOMALY_STATUS:</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                                        <span style={{ fontSize: '0.8rem' }}>ZERO_THREATS</span>
                                    </div>
                                </div>
                                <div style={{ padding: '1rem', border: '1px dashed var(--secondary)', borderRadius: '8px' }}>
                                    <p style={{ fontSize: '0.65rem', margin: 0, fontStyle: 'italic', opacity: 0.7 }}>"Current behavioral dynamics are within optimal authorized baseline."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4️⃣ Adaptive Security Action Panel */}
                    <div className="col-12">
                        <div className="soft-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: 'var(--accent)', background: 'rgba(255,0,85,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(255,0,85,0.3)' }}>
                                    <div style={{ width: '15px', height: '15px', border: '2px solid black' }}></div>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem' }}>ACTIVE_PROTOCOL: SHIELD_01</h3>
                                    <p style={{ fontSize: '0.75rem', margin: '4px 0 0', color: 'var(--text-muted)' }}>Continuous passive validation active.</p>
                                </div>
                            </div>
                            <button className="soft-btn" style={{ width: 'auto', background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 24px', fontSize: '0.8rem' }} onClick={() => alert('RE-AUTHENTICATION TRIGGERED')}>
                                FORCE_STEP_UP
                            </button>
                        </div>
                    </div>

                    {/* 5️⃣ Activity & Audit Logs Section */}
                    <div className="col-12">
                        <div className="soft-card" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ margin: '0 0 1.5rem', fontSize: '1rem' }}>📋 SESSION_AUDIT_LOG</h3>
                            <div style={{ width: '100%', overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #333' }}>
                                            <th style={{ padding: '1rem', fontSize: '0.7rem', color: '#555' }}>TIME</th>
                                            <th style={{ padding: '1rem', fontSize: '0.7rem', color: '#555' }}>EVENT</th>
                                            <th style={{ padding: '1rem', fontSize: '0.7rem', color: '#555' }}>SCORE</th>
                                            <th style={{ padding: '1rem', fontSize: '0.7rem', color: '#555' }}>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map((log, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                                <td style={{ padding: '1rem', fontSize: '0.75rem', fontFamily: 'monospace' }}>{log.time}</td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>{log.event}</td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--primary)' }}>{log.score}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ fontSize: '0.6rem', border: '1px solid #333', padding: '2px 8px', borderRadius: '4px' }}>{log.action}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer decoration */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))' }}></div>
        </div>
    );
};

export default Dashboard;
