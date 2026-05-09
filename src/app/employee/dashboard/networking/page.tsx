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
                    <div className="feed-grid">
                        {updates.map((update) => (
                            <div key={update.id} className="social-card">
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
                                            <div className="meta">{update.employee.role} • {update.employee.company}</div>
                                        </div>
                                    </div>
                                    <div className="timestamp">
                                        {new Date(update.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="update-section">
                                        <label>ACCOMPLISHMENTS</label>
                                        <p>{update.contentDone}</p>
                                    </div>
                                    <div className="update-section">
                                        <label>EXPLORATIONS</label>
                                        <p>{update.contentExplored}</p>
                                    </div>
                                    <div className="update-section">
                                        <label>LEARNINGS</label>
                                        <p>{update.contentLearned}</p>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button 
                                        className="action-btn like-btn" 
                                        onClick={() => handleInteract(update.id, 'like')}
                                    >
                                        <span className="material-symbols-outlined">favorite</span>
                                        <span>{update.likes.length} Likes</span>
                                    </button>
                                    <button className="action-btn">
                                        <span className="material-symbols-outlined">chat_bubble</span>
                                        <span>{update.comments.length} Comments</span>
                                    </button>
                                    <button className="action-btn">
                                        <span className="material-symbols-outlined">share</span>
                                        <span>Share</span>
                                    </button>
                                </div>

                                <div className="comments-section">
                                    {update.comments.map((comment) => (
                                        <div key={comment.id} className="comment-item">
                                            <span className="comment-user">{comment.employee.fullName}:</span>
                                            <span className="comment-text">{comment.content}</span>
                                        </div>
                                    ))}
                                    
                                    <div className="comment-input-wrapper">
                                        <input 
                                            type="text" 
                                            placeholder="Write a comment..."
                                            value={commentText[update.id] || ''}
                                            onChange={(e) => setCommentText({ ...commentText, [update.id]: e.target.value })}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') handleInteract(update.id, 'comment', commentText[update.id]);
                                            }}
                                        />
                                        <button onClick={() => handleInteract(update.id, 'comment', commentText[update.id])}>
                                            <span className="material-symbols-outlined">send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .network-container {
                    max-width: 800px;
                    margin: 0 auto;
                    animation: fadeIn 0.5s ease-out;
                }

                .header-section {
                    margin-bottom: 32px;
                    text-align: center;
                }

                .title {
                    font-size: 28px;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                }

                .subtitle {
                    color: #555;
                    font-size: 14px;
                }

                .feed-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .social-card {
                    background: #111;
                    border: 1px solid #222;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .card-header {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #1a1a1a;
                }

                .user-profile {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    background: #222;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    color: #7c3aed;
                    overflow: hidden;
                }

                .avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .user-info .name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #fff;
                }

                .user-info .meta {
                    font-size: 11px;
                    color: #555;
                }

                .timestamp {
                    font-size: 11px;
                    color: #444;
                }

                .card-body {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .update-section label {
                    display: block;
                    font-size: 9px;
                    font-weight: 800;
                    color: #444;
                    margin-bottom: 6px;
                    letter-spacing: 1px;
                }

                .update-section p {
                    font-size: 14px;
                    color: #bbb;
                    line-height: 1.6;
                    margin: 0;
                }

                .card-actions {
                    display: flex;
                    padding: 8px 12px;
                    border-top: 1px solid #1a1a1a;
                    border-bottom: 1px solid #1a1a1a;
                    gap: 8px;
                }

                .action-btn {
                    flex: 1;
                    background: none;
                    border: none;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 10px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    border-radius: 4px;
                }

                .action-btn:hover {
                    background: #1a1a1a;
                    color: #fff;
                }

                .action-btn .material-symbols-outlined {
                    font-size: 20px;
                }

                .like-btn:hover {
                    color: #f43f5e;
                }

                .comments-section {
                    background: rgba(255,255,255,0.01);
                    padding: 16px 20px;
                }

                .comment-item {
                    font-size: 13px;
                    margin-bottom: 8px;
                }

                .comment-user {
                    font-weight: 600;
                    color: #888;
                    margin-right: 8px;
                }

                .comment-text {
                    color: #eee;
                }

                .comment-input-wrapper {
                    margin-top: 16px;
                    display: flex;
                    background: #000;
                    border: 1px solid #333;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .comment-input-wrapper input {
                    flex: 1;
                    background: none;
                    border: none;
                    padding: 10px 14px;
                    color: #fff;
                    font-size: 13px;
                }

                .comment-input-wrapper input:focus {
                    outline: none;
                }

                .comment-input-wrapper button {
                    background: none;
                    border: none;
                    color: #7c3aed;
                    padding: 0 12px;
                    cursor: pointer;
                }

                .loading-state {
                    padding: 100px 0;
                    text-align: center;
                    color: #444;
                }
            `}</style>
        </DashboardShell>
    );
}
