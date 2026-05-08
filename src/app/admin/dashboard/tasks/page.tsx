'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

interface Employee {
    id: string;
    fullName: string;
    email: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
    employeeId: string | null;
}

export default function AdminTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        employeeId: '' // empty means global
    });

    const fetchData = async () => {
        try {
            const [tasksRes, empsRes] = await Promise.all([
                fetch('/api/tasks'),
                fetch('/api/admin/employees')
            ]);
            if (tasksRes.ok) setTasks(await tasksRes.json());
            if (empsRes.ok) setEmployees(await empsRes.json());
        } catch (err) {
            console.error('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({ title: '', description: '', dueDate: '', priority: 'Medium', employeeId: '' });
                fetchData();
            }
        } catch (err) {
            console.error('Error creating task');
        }
    };

    return (
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Task Assignments</h2>
                        <p style={{ color: '#555', fontSize: '13px' }}>Assign tasks to individual employees or the entire organization.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                        {showForm ? 'Cancel' : 'New Task'}
                    </button>
                </div>

                {showForm && (
                    <div style={{ background: '#111', border: '1px solid #222', padding: '32px', marginBottom: '32px' }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Task Title</label>
                                    <input type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Description</label>
                                    <textarea className="form-input" style={{ minHeight: '80px' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Assign To</label>
                                    <select className="form-input" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})}>
                                        <option value="">Whole Organization (Global)</option>
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.fullName || emp.email}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Due Date</label>
                                    <input type="date" className="form-input" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Priority</label>
                                    <select className="form-input" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="submit-button" style={{ width: 'auto', padding: '10px 32px', background: '#7c3aed' }}>Publish Task</button>
                        </form>
                    </div>
                )}

                <div style={{ background: '#111', border: '1px solid #222' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #222' }}>
                                <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444' }}>TASK</th>
                                <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444' }}>ASSIGNED TO</th>
                                <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444' }}>PRIORITY</th>
                                <th style={{ padding: '12px 20px', fontSize: '11px', color: '#444' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{task.title}</div>
                                        <div style={{ fontSize: '12px', color: '#555' }}>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</div>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <span style={{ fontSize: '12px', color: '#888' }}>
                                            {task.employeeId ? (employees.find(e => e.id === task.employeeId)?.fullName || 'Selected Employee') : 'All Employees'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <span style={{ 
                                            fontSize: '10px', 
                                            color: task.priority === 'Urgent' ? '#f87171' : '#fbbf24',
                                            fontWeight: 600
                                        }}>{task.priority}</span>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <span style={{ 
                                            fontSize: '11px', 
                                            color: task.status === 'Completed' ? '#4ade80' : '#888'
                                        }}>{task.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminShell>
    );
}
