'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';

interface AnalyticsStats {
    totalUpdates: number;
    activeEmployees: number;
    averageEngagement: number;
    dailyActivity: number[];
}

export default function StudentForgeAnalyticsPage() {
    const [stats, setStats] = useState<AnalyticsStats>({
        totalUpdates: 0,
        activeEmployees: 0,
        averageEngagement: 0,
        dailyActivity: []
    });

    const [isFetching, setIsFetching] = useState(true);
    const companyName = "StudentForge";

    const fetchAnalytics = async () => {
        try {
            const res = await fetch(`/api/admin/analytics?company=${encodeURIComponent(companyName)}`);
            if (res.ok) {
                const data = await res.json();
                setStats({
                    totalUpdates: data.totalUpdates,
                    activeEmployees: data.activeEmployees,
                    averageEngagement: data.engagementRate,
                    dailyActivity: data.dailyActivity
                });
            }
        } catch (err) {
            console.error('Failed to fetch analytics');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
        const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <StudentForgeShell>
            <div className="analytics-container">
                <div className="analytics-header">
                    <h1 className="title" style={{ color: '#fff' }}>Forge Analytics</h1>
                    <p className="subtitle" style={{ color: '#666' }}>Performance tracking and engagement metrics for StudentForge participants.</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <label>Forge Updates</label>
                        <div className="value">{stats.totalUpdates}</div>
                        <div className="trend positive" style={{ color: '#fbbf24' }}>Real-time activity</div>
                    </div>
                    <div className="stat-card">
                        <label>Active Members</label>
                        <div className="value">{stats.activeEmployees}</div>
                        <div className="trend positive" style={{ color: '#34d399' }}>Verified Students</div>
                    </div>
                    <div className="stat-card">
                        <label>Participation Rate</label>
                        <div className="value">{stats.averageEngagement}%</div>
                        <div className="trend neutral" style={{ color: '#60a5fa' }}>Forge engagement</div>
                    </div>
                </div>

                <div className="chart-section">
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3 style={{ color: '#fff' }}>Forge Activity Index</h3>
                            <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}>LIVE_DATA</span>
                        </div>
                        <div className="chart-visual">
                            {stats.dailyActivity.map((val, i) => (
                                <div 
                                    key={i} 
                                    className="bar-wrapper"
                                    style={{ background: '#050505' }}
                                >
                                    <div 
                                        className="bar" 
                                        style={{ 
                                            height: `${Math.max(val * 10, 5)}%`, 
                                            background: 'linear-gradient(to top, #d97706, #fbbf24)',
                                            boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)' 
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="chart-labels" style={{ color: '#444' }}>
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>

                    <div className="infra-status">
                        <h3 style={{ color: '#fff' }}>Forge Health</h3>
                        <div className="status-item">
                            <span>Profile Verification</span>
                            <span className="status-pill online" style={{ background: '#064e3b', color: '#34d399' }}>Optimal</span>
                        </div>
                        <div className="status-item">
                            <span>Data Syncing</span>
                            <span className="status-pill online" style={{ background: '#064e3b', color: '#34d399' }}>Active</span>
                        </div>
                        <div className="status-item">
                            <span>Task Pipelines</span>
                            <span className="status-pill online" style={{ background: '#fbbf24', color: '#000' }}>Running</span>
                        </div>
                        <div className="status-item">
                            <span>Cloud Persistence</span>
                            <span className="status-pill online" style={{ background: '#064e3b', color: '#34d399' }}>Healthy</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .analytics-container {
                    animation: fadeIn 0.8s ease-out;
                    max-width: 1200px;
                }

                .analytics-header {
                    margin-bottom: 40px;
                }

                .title {
                    font-size: 28px;
                    font-weight: 800;
                    letter-spacing: -1px;
                }

                .subtitle {
                    font-size: 14px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    padding: 24px;
                    border-radius: 12px;
                }

                .stat-card label {
                    display: block;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #444;
                    margin-bottom: 12px;
                    letter-spacing: 1px;
                }

                .stat-card .value {
                    font-size: 36px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 8px;
                }

                .trend {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .chart-section {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 24px;
                }

                .chart-card {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    padding: 32px;
                    border-radius: 12px;
                }

                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .badge {
                    font-size: 9px;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 20px;
                    letter-spacing: 0.5px;
                }

                .chart-visual {
                    height: 240px;
                    display: flex;
                    align-items: flex-end;
                    gap: 16px;
                    margin-bottom: 20px;
                    padding: 0 10px;
                }

                .bar-wrapper {
                    flex: 1;
                    height: 100%;
                    border-radius: 6px;
                    display: flex;
                    align-items: flex-end;
                    overflow: hidden;
                }

                .bar {
                    width: 100%;
                    transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 4px 4px 0 0;
                }

                .chart-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 0 10px;
                }

                .infra-status {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    padding: 32px;
                    border-radius: 12px;
                }

                .infra-status h3 {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 24px;
                }

                .status-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 0;
                    border-bottom: 1px solid #111;
                }

                .status-item:last-child {
                    border-bottom: none;
                }

                .status-item span:first-child {
                    font-size: 13px;
                    color: #666;
                }

                .status-pill {
                    font-size: 9px;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                @media (max-width: 1024px) {
                    .chart-section {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </StudentForgeShell>
    );
}
