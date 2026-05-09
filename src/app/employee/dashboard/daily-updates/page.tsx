'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';

interface DailyUpdate {
    id: string;
    contentDone: string;
    contentExplored: string;
    contentLearned: string;
    createdAt: string;
    employee: {
        fullName: string;
        role: string;
        profilePhoto: string;
        company: string;
    };
}

export default function DailyUpdatesPage() {
    const [updates, setUpdates] = useState<DailyUpdate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        contentDone: '',
        contentExplored: '',
        contentLearned: ''
    });

    const fetchUpdates = async () => {
        try {
            const res = await fetch('/api/employee/daily-updates');
            if (res.ok) setUpdates(await res.json());
        } catch (err) {
            console.error('Failed to fetch updates');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/employee/daily-updates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setFormData({ contentDone: '', contentExplored: '', contentLearned: '' });
                fetchUpdates();
            }
        } catch (err) {
            console.error('Failed to post update');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardShell>
            <div className="updates-container">
                <div className="header-section">
                    <h1 className="title">Daily Updates</h1>
                    <p className="subtitle">Share your progress and learnings with the team.</p>
                </div>

                <div className="updates-layout">
                    {/* Submission Form */}
                    <div className="form-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>What have you done today?</label>
                                <textarea 
                                    value={formData.contentDone}
                                    onChange={(e) => setFormData({...formData, contentDone: e.target.value})}
                                    placeholder="List your completed tasks..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>What have you explored?</label>
                                <textarea 
                                    value={formData.contentExplored}
                                    onChange={(e) => setFormData({...formData, contentExplored: e.target.value})}
                                    placeholder="New tools, technologies, or ideas..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>What new thing did you learn?</label>
                                <textarea 
                                    value={formData.contentLearned}
                                    onChange={(e) => setFormData({...formData, contentLearned: e.target.value})}
                                    placeholder="Specific skills or knowledge gained..."
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? 'Publishing...' : 'Publish Update'}
                            </button>
                        </form>
                    </div>

                    {/* Feed */}
                    <div className="feed-section">
                        <h2 className="feed-title">Recent Activity</h2>
                        {isFetching ? (
                            <div className="loading-state">Syncing collective feed...</div>
                        ) : updates.length === 0 ? (
                            <div className="empty-state">No updates published yet. Be the first!</div>
                        ) : (
                            <div className="updates-list">
                                {updates.map((update) => (
                                    <div key={update.id} className="update-card">
                                        <div className="update-header">
                                            <div className="user-info">
                                                <div className="avatar">
                                                    {update.employee.profilePhoto ? (
                                                        <img src={update.employee.profilePhoto} alt="" />
                                                    ) : (
                                                        update.employee.fullName[0].toUpperCase()
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="user-name">{update.employee.fullName}</div>
                                                    <div className="user-meta">{update.employee.role} @ {update.employee.company}</div>
                                                </div>
                                            </div>
                                            <div className="update-date">
                                                {new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="update-body">
                                            <div className="content-block">
                                                <label>DONE</label>
                                                <p>{update.contentDone}</p>
                                            </div>
                                            <div className="content-block">
                                                <label>EXPLORED</label>
                                                <p>{update.contentExplored}</p>
                                            </div>
                                            <div className="content-block">
                                                <label>LEARNED</label>
                                                <p>{update.contentLearned}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .updates-container {
                    animation: fadeIn 0.5s ease-out;
                }

                .header-section {
                    margin-bottom: 32px;
                }

                .title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 4px;
                }

                .subtitle {
                    color: #555;
                    font-size: 13px;
                }

                .updates-layout {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 32px;
                    align-items: flex-start;
                }

                .form-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 24px;
                    position: sticky;
                    top: 24px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #444;
                    margin-bottom: 8px;
                    letter-spacing: 0.5px;
                }

                .form-group textarea {
                    width: 100%;
                    background: #000;
                    border: 1px solid #333;
                    color: #fff;
                    padding: 12px;
                    font-size: 13px;
                    resize: vertical;
                    min-height: 80px;
                    transition: border-color 0.2s;
                }

                .form-group textarea:focus {
                    outline: none;
                    border-color: #7c3aed;
                }

                .submit-btn {
                    width: 100%;
                    background: #7c3aed;
                    color: #fff;
                    border: none;
                    padding: 12px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .submit-btn:hover {
                    background: #6d28d9;
                    transform: translateY(-1px);
                }

                .feed-title {
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #444;
                    margin-bottom: 20px;
                    letter-spacing: 1px;
                }

                .updates-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .update-card {
                    background: #111;
                    border: 1px solid #222;
                    padding: 24px;
                }

                .update-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 20px;
                }

                .user-info {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .avatar {
                    width: 36px;
                    height: 36px;
                    background: #222;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    overflow: hidden;
                }

                .avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .user-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #fff;
                }

                .user-meta {
                    font-size: 11px;
                    color: #555;
                }

                .update-date {
                    font-size: 12px;
                    color: #444;
                }

                .update-body {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .content-block label {
                    display: block;
                    font-size: 9px;
                    font-weight: 800;
                    color: #333;
                    margin-bottom: 4px;
                    letter-spacing: 1px;
                }

                .content-block p {
                    font-size: 13px;
                    color: #aaa;
                    line-height: 1.5;
                    margin: 0;
                }

                .loading-state, .empty-state {
                    padding: 40px;
                    text-align: center;
                    color: #444;
                    font-size: 13px;
                    border: 1px dashed #222;
                }

                @media (max-width: 1024px) {
                    .updates-layout {
                        grid-template-columns: 1fr;
                    }
                    .form-card {
                        position: static;
                    }
                }
            `}</style>
        </DashboardShell>
    );
}
