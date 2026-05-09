'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

interface AnalyticsStats {
    totalUpdates: number;
    activeEmployees: number;
    averageEngagement: number;
    dailyActivity: number[];
}

export default function AdminAnalyticsPage() {
    const [stats, setStats] = useState<AnalyticsStats>({
        totalUpdates: 0,
        activeEmployees: 0,
        averageEngagement: 0,
        dailyActivity: []
    });

    const [isFetching, setIsFetching] = useState(true);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/admin/analytics');
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
        <AdminShell>
            <div className="analytics-container">
                <div className="analytics-header">
                    <h1 className="title">System Analytics</h1>
                    <p className="subtitle">Real-time performance monitoring and organizational engagement metrics.</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <label>Total Updates</label>
                        <div className="value">{stats.totalUpdates}</div>
                        <div className="trend positive">+12% from last week</div>
                    </div>
                    <div className="stat-card">
                        <label>Active Employees</label>
                        <div className="value">{stats.activeEmployees}</div>
                        <div className="trend positive">+5% new joiners</div>
                    </div>
                    <div className="stat-card">
                        <label>Engagement Rate</label>
                        <div className="value">{stats.averageEngagement}%</div>
                        <div className="trend neutral">Stable performance</div>
                    </div>
                </div>

                <div className="chart-section">
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3>Organizational Activity</h3>
                            <span className="badge">LIVE</span>
                        </div>
                        <div className="chart-visual">
                            {stats.dailyActivity.map((val, i) => (
                                <div 
                                    key={i} 
                                    className="bar-wrapper"
                                >
                                    <div 
                                        className="bar" 
                                        style={{ height: `${val}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="chart-labels">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>

                    <div className="infra-status">
                        <h3>Infrastructure Health</h3>
                        <div className="status-item">
                            <span>Load Balancer (Nginx)</span>
                            <span className="status-pill online">Healthy</span>
                        </div>
                        <div className="status-item">
                            <span>Kubernetes Clusters</span>
                            <span className="status-pill online">Active</span>
                        </div>
                        <div className="status-item">
                            <span>Docker Containers</span>
                            <span className="status-pill online">12 Running</span>
                        </div>
                        <div className="status-item">
                            <span>Database Latency</span>
                            <span className="status-pill online">12ms</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .analytics-container {
                    animation: fadeIn 0.8s ease-out;
                }

                .analytics-header {
                    margin-bottom: 40px;
                }

                .title {
                    font-size: 28px;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .subtitle {
                    color: #555;
                    font-size: 14px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 24px;
                    border-radius: 8px;
                }

                .stat-card label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #444;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }

                .stat-card .value {
                    font-size: 32px;
                    font-weight: 800;
                    color: #fff;
                    margin-bottom: 8px;
                }

                .trend {
                    font-size: 12px;
                    font-weight: 600;
                }

                .positive { color: #22c55e; }
                .neutral { color: #888; }

                .chart-section {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 24px;
                }

                .chart-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 32px;
                    border-radius: 8px;
                }

                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .badge {
                    background: rgba(34, 197, 94, 0.1);
                    color: #22c55e;
                    font-size: 10px;
                    font-weight: 800;
                    padding: 4px 8px;
                    border-radius: 4px;
                }

                .chart-visual {
                    height: 200px;
                    display: flex;
                    align-items: flex-end;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .bar-wrapper {
                    flex: 1;
                    height: 100%;
                    background: rgba(255,255,255,0.02);
                    border-radius: 4px;
                    display: flex;
                    align-items: flex-end;
                    overflow: hidden;
                }

                .bar {
                    width: 100%;
                    background: #7c3aed;
                    transition: height 1s ease-out;
                    border-radius: 2px 2px 0 0;
                }

                .chart-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: #444;
                    font-weight: 700;
                }

                .infra-status {
                    background: #111;
                    border: 1px solid #222;
                    padding: 32px;
                    border-radius: 8px;
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
                    padding: 12px 0;
                    border-bottom: 1px solid #1a1a1a;
                }

                .status-item:last-child {
                    border-bottom: none;
                }

                .status-item span:first-child {
                    font-size: 13px;
                    color: #888;
                }

                .status-pill {
                    font-size: 10px;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 10px;
                    text-transform: uppercase;
                }

                .online { background: #064e3b; color: #34d399; }

                @media (max-width: 1024px) {
                    .chart-section {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </AdminShell>
    );
}
