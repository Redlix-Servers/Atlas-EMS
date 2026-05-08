'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
}

export default function EmployeeEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [company, setCompany] = useState('');

    useEffect(() => {
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

        const fetchUser = async () => {
            try {
                const res = await fetch('/api/employee/profile');
                if (res.ok) {
                    const data = await res.json();
                    setUserEmail(data.email);
                    setCompany(data.company);
                }
            } catch (err) {}
        };

        fetchEvents();
        fetchUser();
    }, []);

    return (
        <DashboardShell userEmail={userEmail} company={company} onLogout={async () => {}}>
            <div className="events-container">
                <header className="events-header">
                    <div className="header-content">
                        <div className="accent-badge">Organization</div>
                        <h2 className="title">Upcoming Events</h2>
                        <p className="subtitle">Discover organization milestones, townhalls, and community activities.</p>
                    </div>
                    <div className="stats-mini">
                        <div className="stat-item">
                            <span className="stat-value">{events.length}</span>
                            <span className="stat-label">Scheduled</span>
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div className="loading-state">
                        <div className="shimmer-loader"></div>
                        <span>Syncing organization calendar...</span>
                    </div>
                ) : events.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon-wrapper">
                            <span className="material-symbols-outlined">event_busy</span>
                        </div>
                        <h3>No events scheduled</h3>
                        <p>We'll notify you when new organization activities are posted.</p>
                    </div>
                ) : (
                    <div className="events-grid">
                        {events.map((event, index) => (
                            <div key={event.id} className="event-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="event-card-inner">
                                    <div className="event-date-floating">
                                        <span className="day">{new Date(event.date).getDate()}</span>
                                        <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                    </div>
                                    
                                    <div className="event-content">
                                        <div className="type-tag">{event.type}</div>
                                        <h3 className="event-title">{event.title}</h3>
                                        <p className="event-desc">{event.description}</p>
                                        
                                        <div className="event-meta">
                                            <div className="meta-item">
                                                <span className="material-symbols-outlined">schedule</span>
                                                <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="material-symbols-outlined">location_on</span>
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="card-action">
                                        <button className="view-details-btn">
                                            View Details
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .events-container {
                    animation: fadeIn 0.5s ease-out;
                    max-width: 1000px;
                }

                .events-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .accent-badge {
                    background: rgba(124, 58, 237, 0.1);
                    color: #7c3aed;
                    display: inline-block;
                    padding: 4px 10px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 4px;
                    margin-bottom: 12px;
                }

                .title {
                    font-size: 24px;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                    margin: 0 0 4px 0;
                    color: #fff;
                }

                .subtitle {
                    color: #555;
                    font-size: 13px;
                    margin: 0;
                }

                .stats-mini {
                    background: #111;
                    border: 1px solid #222;
                    padding: 12px 20px;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .stat-value {
                    font-size: 18px;
                    font-weight: 600;
                    color: #fff;
                }

                .stat-label {
                    font-size: 10px;
                    color: #444;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                }

                .event-card {
                    animation: slideUp 0.5s ease-out forwards;
                }

                .event-card-inner {
                    background: #111;
                    border: 1px solid #222;
                    padding: 24px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    transition: border-color 0.2s;
                }

                .event-card-inner:hover {
                    border-color: #333;
                }

                .event-date-floating {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .event-date-floating .day {
                    font-size: 18px;
                    font-weight: 600;
                    color: #fff;
                    line-height: 1;
                }

                .event-date-floating .month {
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #444;
                }

                .type-tag {
                    font-size: 9px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #444;
                    margin-bottom: 8px;
                }

                .event-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #fff;
                    margin: 0 0 12px 0;
                    max-width: 80%;
                }

                .event-desc {
                    color: #888;
                    font-size: 13px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                    flex-grow: 1;
                }

                .event-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding-top: 16px;
                    border-top: 1px solid #1a1a1a;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #666;
                    font-size: 12px;
                }

                .meta-item .material-symbols-outlined {
                    font-size: 16px;
                    color: #7c3aed;
                }

                .card-action {
                    margin-top: 20px;
                }

                .view-details-btn {
                    width: 100%;
                    background: transparent;
                    border: 1px solid #222;
                    color: #888;
                    padding: 8px;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: all 0.2s;
                }

                .view-details-btn:hover {
                    background: #1a1a1a;
                    color: #fff;
                    border-color: #333;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    padding: 60px 0;
                    color: #444;
                    font-size: 13px;
                }

                .shimmer-loader {
                    width: 24px;
                    height: 24px;
                    border: 2px solid rgba(124, 58, 237, 0.1);
                    border-top-color: #7c3aed;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                .empty-state {
                    padding: 60px 24px;
                    text-align: center;
                    background: #111;
                    border: 1px solid #222;
                    margin-top: 24px;
                }

                .empty-icon-wrapper {
                    margin-bottom: 16px;
                }

                .empty-icon-wrapper span {
                    font-size: 32px;
                    color: #222;
                }

                .empty-state h3 {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 4px;
                    color: #fff;
                }

                .empty-state p {
                    color: #444;
                    font-size: 13px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .events-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </DashboardShell>
    );
}
