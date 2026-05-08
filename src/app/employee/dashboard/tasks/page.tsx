'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
}

export default function EmployeeTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [company, setCompany] = useState('');

    const fetchData = async () => {
        try {
            const [tasksRes, profileRes] = await Promise.all([
                fetch('/api/tasks'),
                fetch('/api/employee/profile')
            ]);
            if (tasksRes.ok) setTasks(await tasksRes.json());
            if (profileRes.ok) {
                const data = await profileRes.json();
                setUserEmail(data.email);
                setCompany(data.company);
            }
        } catch (err) {
            console.error('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateStatus = async (id: string, currentStatus: string) => {
        let nextStatus = 'Pending';
        if (currentStatus === 'Pending') nextStatus = 'In Progress';
        else if (currentStatus === 'In Progress') nextStatus = 'Completed';
        else return;

        try {
            const res = await fetch('/api/tasks', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: nextStatus }),
            });
            if (res.ok) fetchData();
        } catch (err) {
            console.error('Error updating status');
        }
    };

    return (
        <DashboardShell userEmail={userEmail} company={company} onLogout={async () => {}}>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 600 }}>My Tasks</h2>
                    <p style={{ color: '#888', fontSize: '14px' }}>Track your assignments and update your progress.</p>
                </div>

                {isLoading ? (
                    <div style={{ color: '#444' }}>Syncing task list...</div>
                ) : tasks.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', background: '#111', border: '1px solid #222', color: '#444' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px' }}>checklist</span>
                        <p>No tasks assigned to you yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {tasks.map(task => (
                            <div key={task.id} style={{ background: '#111', border: '1px solid #222', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{task.title}</h3>
                                        <span style={{ 
                                            fontSize: '10px', 
                                            padding: '2px 8px', 
                                            background: task.priority === 'Urgent' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                                            color: task.priority === 'Urgent' ? '#f87171' : '#888',
                                            borderRadius: '2px',
                                            fontWeight: 600
                                        }}>{task.priority}</span>
                                    </div>
                                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px', maxWidth: '600px' }}>{task.description}</p>
                                    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#444' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_today</span>
                                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Deadline'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '150px' }}>
                                    <div style={{ marginBottom: '12px' }}>
                                        <span style={{ 
                                            fontSize: '11px', 
                                            fontWeight: 600, 
                                            color: task.status === 'Completed' ? '#4ade80' : task.status === 'In Progress' ? '#38bdf8' : '#555',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>{task.status}</span>
                                    </div>
                                    {task.status !== 'Completed' && (
                                        <button 
                                            onClick={() => updateStatus(task.id, task.status)}
                                            style={{ 
                                                background: '#222', 
                                                color: '#fff', 
                                                border: '1px solid #333', 
                                                padding: '8px 16px', 
                                                fontSize: '12px', 
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#333'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#222'}
                                        >
                                            {task.status === 'Pending' ? 'Start Task' : 'Mark as Done'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
