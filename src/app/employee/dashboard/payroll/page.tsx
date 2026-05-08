'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';

interface PayrollRecord {
    id: string;
    amount: number;
    month: string;
    status: string;
    type: string;
    paymentDate: string | null;
    createdAt: string;
}

export default function PayrollPage() {
    const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionInfo, setSessionInfo] = useState({ email: '', company: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile for header
                const profileRes = await fetch('/api/employee/profile');
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setSessionInfo({ email: profileData.email, company: profileData.company });
                }

                // Fetch payrolls
                const payrollRes = await fetch('/api/employee/payroll');
                if (payrollRes.ok) {
                    const data = await payrollRes.json();
                    setPayrolls(data);
                }
            } catch (error) {
                console.error('Error fetching payroll data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalEarnings = payrolls
        .filter(p => p.status === 'Paid')
        .reduce((sum, p) => sum + p.amount, 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <DashboardShell userEmail={sessionInfo.email} company={sessionInfo.company} onLogout={async () => {}}>
            <div className="payroll-container">
                <header className="page-header">
                    <div>
                        <h1 className="page-title">Payroll & Earnings</h1>
                        <p className="page-subtitle">Track your compensation and payment history</p>
                    </div>
                    <div className="earnings-summary">
                        <div className="summary-item">
                            <label>Total Earnings</label>
                            <span className="amount">{formatCurrency(totalEarnings)}</span>
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div className="loading-state">Loading payroll records...</div>
                ) : payrolls.length > 0 ? (
                    <div className="payroll-grid">
                        {payrolls.map((record) => (
                            <div key={record.id} className="payroll-card">
                                <div className="card-top">
                                    <div className="month-tag">{record.month}</div>
                                    <div className={`status-badge ${record.status.toLowerCase()}`}>
                                        {record.status}
                                    </div>
                                </div>
                                <div className="card-amount">
                                    {formatCurrency(record.amount)}
                                </div>
                                <div className="card-details">
                                    <div className="detail-item">
                                        <span className="material-symbols-outlined">payments</span>
                                        <span>{record.type}</span>
                                    </div>
                                    {record.paymentDate && (
                                        <div className="detail-item">
                                            <span className="material-symbols-outlined">calendar_today</span>
                                            <span>Paid on {new Date(record.paymentDate).toLocaleDateString('en-IN')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span className="material-symbols-outlined">payments</span>
                        <p>No payroll records found yet.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .payroll-container {
                    max-width: 1000px;
                    animation: fadeIn 0.5s ease-out;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                }

                .page-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 8px;
                }

                .page-subtitle {
                    font-size: 13px;
                    color: #555;
                    font-weight: 500;
                }

                .earnings-summary {
                    background: #111;
                    border: 1px solid #222;
                    padding: 16px 24px;
                }

                .summary-item label {
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #444;
                    margin-bottom: 4px;
                    letter-spacing: 1px;
                }

                .summary-item .amount {
                    font-size: 20px;
                    font-weight: 700;
                    color: #7c3aed;
                }

                .payroll-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }

                .payroll-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 24px;
                    transition: all 0.2s;
                }

                .payroll-card:hover {
                    border-color: #333;
                    transform: translateY(-2px);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .month-tag {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #555;
                    letter-spacing: 1px;
                }

                .status-badge {
                    font-size: 9px;
                    font-weight: 800;
                    text-transform: uppercase;
                    padding: 4px 10px;
                    border-radius: 2px;
                    letter-spacing: 1px;
                }

                .status-badge.paid {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                }

                .status-badge.pending {
                    background: rgba(245, 158, 11, 0.1);
                    color: #f59e0b;
                }

                .card-amount {
                    font-size: 32px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 24px;
                    letter-spacing: -1px;
                }

                .card-details {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    border-top: 1px solid #1a1a1a;
                    padding-top: 20px;
                }

                .detail-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #555;
                    font-size: 12px;
                }

                .detail-item .material-symbols-outlined {
                    font-size: 18px;
                    color: #333;
                }

                .loading-state, .empty-state {
                    padding: 100px 0;
                    text-align: center;
                    color: #444;
                    font-size: 14px;
                }

                .empty-state .material-symbols-outlined {
                    font-size: 48px;
                    margin-bottom: 16px;
                    display: block;
                    opacity: 0.2;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .page-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                    }
                    .earnings-summary {
                        width: 100%;
                    }
                }
            `}</style>
        </DashboardShell>
    );
}
