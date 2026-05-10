'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';

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

export default function StudentForgeTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const companyName = "StudentForge";

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
                fetch(`/api/tasks?company=${encodeURIComponent(companyName)}`),
                fetch(`/api/admin/employees?company=${encodeURIComponent(companyName)}`)
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
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-1px' }}>Forge Tasks</h2>
                        <p style={{ color: '#666', fontSize: '14px' }}>Assign and monitor mission-critical tasks for StudentForge members.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{ 
                            background: showForm ? '#111' : 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', 
                            color: showForm ? '#666' : '#000', 
                            border: showForm ? '1px solid #222' : 'none', 
                            padding: '12px 28px', 
                            borderRadius: '12px', 
                            cursor: 'pointer', 
                            fontWeight: 800,
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.2s',
                            boxShadow: showForm ? 'none' : '0 10px 20px rgba(217, 119, 6, 0.2)'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                            {showForm ? 'close' : 'add_task'}
                        </span>
                        {showForm ? 'Discard' : 'Create Task'}
                    </button>
                </div>

                {showForm && (
                    <div style={{ background: '#0a0a0a', border: '1px solid #fbbf24', padding: '40px', borderRadius: '16px', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                <div style={{ gridColumn: 'span 3' }}>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Task Identifier</label>
                                    <input type="text" placeholder="e.g. Initialize Neural Engine" style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none' }} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                                </div>
                                <div style={{ gridColumn: 'span 3' }}>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Operational Objectives</label>
                                    <textarea style={{ width: '100%', minHeight: '100px', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', resize: 'vertical' }} placeholder="Define the steps and requirements for this task..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Assign To</label>
                                    <select style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', cursor: 'pointer' }} value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})}>
                                        <option value="">Whole Forge (Global)</option>
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.fullName || emp.email}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Deadline</label>
                                    <input type="date" style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none' }} value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Priority Level</label>
                                    <select style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', cursor: 'pointer' }} value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(90deg, #fbbf24 0%, #d97706 100%)', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 800, cursor: 'pointer', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Publish to Forge</button>
                        </form>
                    </div>
                )}

                <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #111', background: 'rgba(255,255,255,0.01)' }}>
                                <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Task Detail</th>
                                <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Assigned</th>
                                <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Priority</th>
                                <th style={{ padding: '16px 32px', fontSize: '11px', color: '#333', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#444' }}>Loading Forge pipelines...</td></tr>
                            ) : tasks.length === 0 ? (
                                <tr><td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#444' }}>No tasks initialized for the Forge.</td></tr>
                            ) : tasks.map(task => (
                                <tr key={task.id} style={{ borderBottom: '1px solid #111' }}>
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{task.title}</div>
                                        <div style={{ fontSize: '12px', color: '#555' }}>
                                            Deadline: <span style={{ color: '#fbbf24', fontWeight: 600 }}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Continuous'}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>
                                            {task.employeeId ? (employees.find(e => e.id === task.employeeId)?.fullName || 'Member') : 'ALL_FORGE'}
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ 
                                            fontSize: '10px', 
                                            fontWeight: 800,
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            background: task.priority === 'Urgent' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                            color: task.priority === 'Urgent' ? '#f87171' : '#fbbf24',
                                            border: `1px solid ${task.priority === 'Urgent' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            display: 'inline-block'
                                        }}>{task.priority}</div>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ 
                                            fontSize: '12px', 
                                            fontWeight: 700,
                                            color: task.status === 'Completed' ? '#34d399' : '#333'
                                        }}>{task.status}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </StudentForgeShell>
    );
}
