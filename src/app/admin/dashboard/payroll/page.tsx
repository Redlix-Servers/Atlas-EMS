'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

interface Employee {
    id: string;
    fullName: string;
    email: string;
}

interface PayrollRecord {
    id: string;
    amount: number;
    month: string;
    status: string;
    type: string;
    employee: {
        fullName: string;
        email: string;
    };
    createdAt: string;
}

export default function AdminPayrollPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        employeeId: '',
        amount: '',
        month: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
        type: 'Salary',
        status: 'Pending'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [empRes, payRes] = await Promise.all([
                fetch('/api/admin/employees/list'),
                fetch('/api/admin/payroll')
            ]);
            
            if (empRes.ok) setEmployees(await empRes.json());
            if (payRes.ok) setPayrolls(await payRes.json());
        } catch (error) {
            console.error('Error fetching admin payroll data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/payroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setFormData({ ...formData, employeeId: '', amount: '' });
                fetchData();
            }
        } catch (error) {
            console.error('Error creating payroll:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AdminShell>
            <div className="admin-payroll-container">
                <header className="page-header">
                    <h1 className="page-title">Payroll Management</h1>
                    <p className="page-subtitle">Assign and manage employee compensation</p>
                </header>

                <div className="admin-grid">
                    {/* Create Form */}
                    <div className="form-card">
                        <h3 className="card-title">Assign New Payroll</h3>
                        <form onSubmit={handleSubmit} className="payroll-form">
                            <div className="form-group">
                                <label>Select Employee</label>
                                <select 
                                    value={formData.employeeId} 
                                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                                    required
                                >
                                    <option value="">Select an employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.email})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Amount (INR)</label>
                                    <input 
                                        type="number" 
                                        placeholder="e.g. 25000"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Month</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. May 2024"
                                        value={formData.month}
                                        onChange={(e) => setFormData({...formData, month: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                                        <option value="Salary">Salary</option>
                                        <option value="Bonus">Bonus</option>
                                        <option value="Stipend">Stipend</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : 'Assign Payroll'}
                            </button>
                        </form>
                    </div>

                    {/* History Table */}
                    <div className="history-card">
                        <h3 className="card-title">Recent Payrolls</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Month</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payrolls.map(pay => (
                                        <tr key={pay.id}>
                                            <td>
                                                <div className="emp-info">
                                                    <div className="emp-name">{pay.employee.fullName}</div>
                                                    <div className="emp-email">{pay.employee.email}</div>
                                                </div>
                                            </td>
                                            <td>{pay.month}</td>
                                            <td className="amount-cell">₹{pay.amount.toLocaleString()}</td>
                                            <td>
                                                <span className={`status-badge ${pay.status.toLowerCase()}`}>
                                                    {pay.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-payroll-container {
                    padding: 32px;
                    animation: fadeIn 0.5s ease-out;
                }

                .page-header {
                    margin-bottom: 32px;
                }

                .page-title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 4px;
                }

                .page-subtitle {
                    font-size: 14px;
                    color: #666;
                }

                .admin-grid {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 32px;
                    align-items: start;
                }

                .form-card, .history-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 24px;
                }

                .card-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 24px;
                    color: #fff;
                }

                .payroll-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .form-group label {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #444;
                    letter-spacing: 0.5px;
                }

                input, select {
                    background: #1a1a1a;
                    border: 1px solid #222;
                    padding: 10px;
                    color: #fff;
                    font-size: 13px;
                }

                input:focus, select:focus {
                    outline: none;
                    border-color: #7c3aed;
                }

                .submit-btn {
                    background: #7c3aed;
                    color: #fff;
                    border: none;
                    padding: 12px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 10px;
                }

                .table-wrapper {
                    overflow-x: auto;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th {
                    text-align: left;
                    font-size: 11px;
                    text-transform: uppercase;
                    color: #444;
                    padding: 12px;
                    border-bottom: 1px solid #222;
                }

                td {
                    padding: 16px 12px;
                    border-bottom: 1px solid #1a1a1a;
                    font-size: 13px;
                }

                .emp-name {
                    font-weight: 600;
                    color: #fff;
                }

                .emp-email {
                    font-size: 11px;
                    color: #555;
                }

                .amount-cell {
                    font-weight: 700;
                    color: #fff;
                }

                .status-badge {
                    font-size: 9px;
                    font-weight: 800;
                    text-transform: uppercase;
                    padding: 4px 10px;
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

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) {
                    .admin-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </AdminShell>
    );
}
