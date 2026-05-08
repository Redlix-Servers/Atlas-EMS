'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/AdminShell';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        type: 'Standard'
    });

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/events');
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
                setFormData({ title: '', description: '', date: '', location: '', type: 'Standard' });
                fetchEvents();
                alert('Event published successfully!');
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
        <AdminShell>
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: 600 }}>Organization Events</h2>
                        <p style={{ color: '#555', fontSize: '14px' }}>Schedule and manage company-wide announcements and activities.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{ 
                            background: '#7c3aed', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '12px 24px', 
                            borderRadius: '4px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showForm ? 'close' : 'add'}</span>
                        {showForm ? 'Cancel' : 'Post New Event'}
                    </button>
                </div>

                {showForm && (
                    <div style={{ background: '#111', border: '1px solid #222', padding: '32px', marginBottom: '40px', animation: 'fadeIn 0.3s ease-out' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Event Details</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="form-label">Event Title</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    placeholder="Town Hall Q1 2024"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="form-label">Description</label>
                                <textarea 
                                    className="form-input" 
                                    style={{ minHeight: '100px', resize: 'vertical' }}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    placeholder="Main topics and agenda..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    className="form-input" 
                                    value={formData.date}
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    placeholder="Conference Hall A / Zoom"
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <button 
                                    type="submit" 
                                    className="submit-button" 
                                    disabled={isPosting}
                                    style={{ width: 'auto', padding: '12px 40px', background: '#7c3aed' }}
                                >
                                    {isPosting ? 'Posting...' : 'Publish Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                    {isLoading ? (
                        <div style={{ color: '#444' }}>Syncing events...</div>
                    ) : events.length === 0 ? (
                        <div style={{ color: '#444' }}>No events posted yet.</div>
                    ) : (
                        events.map(event => (
                            <div key={event.id} style={{ background: '#111', border: '1px solid #222', padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', padding: '4px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '20px' }}>
                                        {event.type}
                                    </div>
                                    <div style={{ color: '#333', fontSize: '11px' }}>ID: {event.id.slice(-6)}</div>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>{event.title}</h3>
                                <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px', minHeight: '40px' }}>{event.description}</p>
                                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444', fontSize: '12px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
                                        {new Date(event.date).toLocaleString()}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444', fontSize: '12px' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </AdminShell>
    );
}
