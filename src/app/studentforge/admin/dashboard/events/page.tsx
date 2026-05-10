'use client';

import React, { useState, useEffect } from 'react';
import StudentForgeShell from '@/components/StudentForgeShell';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
    company: string | null;
}

export default function StudentForgeEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const companyName = "StudentForge";

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        type: 'Standard',
        company: companyName
    });

    const fetchEvents = async () => {
        try {
            const res = await fetch(`/api/events?company=${encodeURIComponent(companyName)}`);
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            }
        } catch (err) {
            console.error('Error fetching events');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({ title: '', description: '', date: '', location: '', type: 'Standard', company: companyName });
                fetchEvents();
                alert('Forge Event published successfully!');
            } else {
                const errorData = await res.json();
                alert(`Failed to publish: ${errorData.details || errorData.error}`);
            }
        } catch (err) {
            console.error('Error posting event');
            alert('Connection error. Please check your internet.');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <StudentForgeShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-1px' }}>Forge Events</h2>
                        <p style={{ color: '#666', fontSize: '14px' }}>Broadcast announcements and schedule activities for the Forge community.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{ 
                            background: showForm ? '#111' : '#fbbf24', 
                            color: showForm ? '#666' : '#000', 
                            border: showForm ? '1px solid #222' : 'none', 
                            padding: '12px 28px', 
                            borderRadius: '12px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showForm ? 'close' : 'campaign'}</span>
                        {showForm ? 'Cancel' : 'Host New Event'}
                    </button>
                </div>

                {showForm && (
                    <div style={{ background: '#0a0a0a', border: '1px solid #fbbf24', padding: '40px', borderRadius: '16px', marginBottom: '40px', boxShadow: '0 20px 40px rgba(251, 191, 36, 0.05)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>Forge Broadcast Details</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Event Title</label>
                                <input 
                                    type="text" 
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none' }}
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. StudentForge Hackathon 2024"
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Full Agenda</label>
                                <textarea 
                                    style={{ width: '100%', minHeight: '120px', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none', resize: 'vertical' }}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    placeholder="Details about the event, rules, and outcomes..."
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Scheduled Timestamp</label>
                                <input 
                                    type="datetime-local" 
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none' }}
                                    value={formData.date}
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: '10px', letterSpacing: '1px' }}>Operational Location</label>
                                <input 
                                    type="text" 
                                    style={{ width: '100%', background: '#050505', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '14px', color: 'white', outline: 'none' }}
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    placeholder="Discord / Main Hall / Virtual"
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <button 
                                    type="submit" 
                                    disabled={isPosting}
                                    style={{ width: '100%', padding: '16px', background: 'linear-gradient(90deg, #fbbf24 0%, #d97706 100%)', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 800, cursor: 'pointer', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}
                                >
                                    {isPosting ? 'DEPLOYING BROADCAST...' : 'LAUNCH FORGE EVENT'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
                    {isLoading ? (
                        <div style={{ padding: '40px', color: '#444' }}>Syncing Forge spectrum...</div>
                    ) : events.length === 0 ? (
                        <div style={{ padding: '40px', color: '#444', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', gridColumn: '1 / -1', textAlign: 'center' }}>No active events found in the Forge.</div>
                    ) : (
                        events.map(event => (
                            <div key={event.id} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '32px', borderRadius: '16px', transition: 'transform 0.3s', position: 'relative', overflow: 'hidden' }} className="event-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                    <div style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', padding: '6px 14px', fontSize: '10px', fontWeight: 800, borderRadius: '20px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                        {event.type}
                                    </div>
                                    <div style={{ color: '#222', fontSize: '10px', fontWeight: 800 }}>REF: {event.id.slice(-6).toUpperCase()}</div>
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>{event.title}</h3>
                                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px', minHeight: '60px' }}>{event.description}</p>
                                <div style={{ borderTop: '1px solid #111', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '13px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#fbbf24' }}>event</span>
                                        {new Date(event.date).toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '13px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#fbbf24' }}>location_searching</span>
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <style jsx>{`
                .event-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(251, 191, 36, 0.3);
                }
            `}</style>
        </StudentForgeShell>
    );
}
