'use client';

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';

interface Comment {
    id: string;
    content: string;
    employee: { fullName: string };
    createdAt: string;
}

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
    likes: any[];
    comments: Comment[];
}

export default function NetworkingPage() {
    const [updates, setUpdates] = useState<DailyUpdate[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

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

    const handleInteract = async (updateId: string, type: 'like' | 'comment', content?: string) => {
        try {
            const res = await fetch('/api/employee/daily-updates/interact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updateId, type, content })
            });
            if (res.ok) {
                if (type === 'comment') setCommentText({ ...commentText, [updateId]: '' });
                fetchUpdates();
            }
        } catch (err) {
            console.error('Interaction failed');
        }
    };

    return (
        <DashboardShell>
            <div className="network-container">
                <div className="header-section">
                    <h1 className="title">Networking Hub</h1>
                    <p className="subtitle">Connect and collaborate with members across the ecosystem.</p>
                </div>

                {isFetching ? (
                    <div className="loading-state">Synchronizing organizational updates...</div>
                ) : (
                    <div className="bento-grid">
                        {updates.map((update, index) => (
                            <div 
                                key={update.id} 
                                className={`social-card ${index % 3 === 0 ? 'card-wide' : ''} ${index % 5 === 0 ? 'card-tall' : ''}`}
                            >
                                <div className="card-header">
                                    <div className="user-profile">
                                        <div className="avatar">
                                            {update.employee.profilePhoto ? (
                                                <img src={update.employee.profilePhoto} alt="" />
                                            ) : (
                                                update.employee.fullName[0].toUpperCase()
                                            )}
                                        </div>
                                        <div className="user-info">
                                            <div className="name">{update.employee.fullName}</div>
                                            <div className="meta">{update.employee.company}</div>
                                        </div>
                                    </div>
                                    <div className="timestamp">
                                        {new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="update-section">
                                        <label>DONE</label>
                                        <p>{update.contentDone}</p>
                                    </div>
                                    <div className="update-section">
                                        <label>LEARNED</label>
                                        <p>{update.contentLearned}</p>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="interaction-row">
                                        <button 
                                            className="action-btn like-btn" 
                                            onClick={() => handleInteract(update.id, 'like')}
                                        >
                                            <span className="material-symbols-outlined">favorite</span>
                                            <span>{update.likes.length}</span>
                                        </button>
                                        <button className="action-btn">
                                            <span className="material-symbols-outlined">chat_bubble</span>
                                            <span>{update.comments.length}</span>
                                        </button>
                                    </div>
                                    
                                    <div className="comment-mini-input">
                                        <input 
                                            type="text" 
                                            placeholder="Reply..."
                                            value={commentText[update.id] || ''}
                                            onChange={(e) => setCommentText({ ...commentText, [update.id]: e.target.value })}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') handleInteract(update.id, 'comment', commentText[update.id]);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .network-container {
                    padding-bottom: 40px;
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .header-section {
                    margin-bottom: 48px;
                }

                .title {
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                }

                .subtitle {
                    color: #555;
                    font-size: 14px;
                    font-weight: 500;
                }

                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    grid-auto-rows: minmax(280px, auto);
                    gap: 20px;
                }

                .social-card {
                    background: #111;
                    border: 1px solid #222;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .social-card:hover {
                    border-color: #333;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .card-wide {
                    grid-column: span 2;
                }

                .card-tall {
                    grid-row: span 2;
                }

                .card-header {
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .user-profile {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .avatar {
                    width: 32px;
                    height: 32px;
                    background: #1a1a1a;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 700;
                    color: #7c3aed;
                    border: 1px solid #222;
                }

                .user-info .name {
                    font-size: 13px;
                    font-weight: 600;
                    color: #fff;
                }

                .user-info .meta {
                    font-size: 10px;
                    color: #444;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .timestamp {
                    font-size: 10px;
                    color: #333;
                    font-weight: 600;
                }

                .card-body {
                    padding: 0 20px 20px;
                    flex: 1;
                }

                .update-section {
                    margin-bottom: 16px;
                }

                .update-section label {
                    display: block;
                    font-size: 8px;
                    font-weight: 800;
                    color: #333;
                    margin-bottom: 6px;
                    letter-spacing: 1px;
                }

                .update-section p {
                    font-size: 13px;
                    color: #888;
                    line-height: 1.5;
                    margin: 0;
                }

                .card-footer {
                    padding: 16px 20px;
                    background: rgba(255,255,255,0.01);
                    border-top: 1px solid #1a1a1a;
                }

                .interaction-row {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 12px;
                }

                .action-btn {
                    background: none;
                    border: none;
                    color: #444;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: color 0.2s;
                    padding: 0;
                }

                .action-btn:hover {
                    color: #888;
                }

                .action-btn .material-symbols-outlined {
                    font-size: 18px;
                }

                .like-btn:hover {
                    color: #f43f5e;
                }

                .comment-mini-input input {
                    width: 100%;
                    background: #000;
                    border: 1px solid #222;
                    padding: 8px 12px;
                    color: #fff;
                    font-size: 12px;
                    border-radius: 4px;
                }

                .comment-mini-input input:focus {
                    outline: none;
                    border-color: #7c3aed;
                }

                .loading-state {
                    padding: 100px 0;
                    text-align: center;
                    color: #444;
                    font-size: 13px;
                    letter-spacing: 1px;
                }

                @media (max-width: 768px) {
                    .card-wide, .card-tall {
                        grid-column: span 1;
                        grid-row: span 1;
                    }
                }
            `}</style>
        </DashboardShell>
    );
}
