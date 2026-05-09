'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
        company: string;
        profilePhoto: string;
    };
    likes: any[];
    comments: Comment[];
}

export default function UpdateDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [update, setUpdate] = useState<DailyUpdate | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [commentText, setCommentText] = useState('');

    const fetchUpdate = async () => {
        try {
            // Re-using the existing feed API but filtering on client for now 
            // In a real app, you'd have a specific GET /api/updates/[id]
            const res = await fetch('/api/employee/daily-updates');
            if (res.ok) {
                const data = await res.json();
                const found = data.find((u: any) => u.id === params.id);
                setUpdate(found || null);
            }
        } catch (err) {
            console.error('Failed to fetch update');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (params.id) fetchUpdate();
    }, [params.id]);

    const handleInteract = async (type: 'like' | 'comment') => {
        try {
            const res = await fetch('/api/employee/daily-updates/interact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updateId: params.id, type, content: commentText })
            });
            if (res.ok) {
                if (type === 'comment') setCommentText('');
                fetchUpdate();
            }
        } catch (err) {
            console.error('Interaction failed');
        }
    };

    if (isFetching) return <DashboardShell><div className="loading">Loading details...</div></DashboardShell>;
    if (!update) return <DashboardShell><div className="error">Update not found</div></DashboardShell>;

    return (
        <DashboardShell>
            <div className="detail-container">
                <button className="back-btn" onClick={() => router.back()}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Feed
                </button>

                <div className="blog-post">
                    <div className="post-header">
                        <div className="author-info">
                            <div className="avatar-large">
                                {update.employee.profilePhoto ? (
                                    <img src={update.employee.profilePhoto} alt="" />
                                ) : (
                                    update.employee.fullName[0].toUpperCase()
                                )}
                            </div>
                            <div className="author-meta">
                                <h1 className="author-name">{update.employee.fullName}</h1>
                                <p className="author-sub">{update.employee.role} • {update.employee.company}</p>
                            </div>
                        </div>
                        <div className="post-date">
                            {new Date(update.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    <div className="post-content">
                        <section className="content-section">
                            <div className="section-header">
                                <div className="dot green"></div>
                                <h2>Today's Accomplishments</h2>
                            </div>
                            <p>{update.contentDone}</p>
                        </section>

                        <section className="content-section">
                            <div className="section-header">
                                <div className="dot blue"></div>
                                <h2>Explorations & Discoveries</h2>
                            </div>
                            <p>{update.contentExplored}</p>
                        </section>

                        <section className="content-section">
                            <div className="section-header">
                                <div className="dot purple"></div>
                                <h2>Key Learnings</h2>
                            </div>
                            <p>{update.contentLearned}</p>
                        </section>
                    </div>

                    <div className="post-footer">
                        <button className="interact-btn like" onClick={() => handleInteract('like')}>
                            <span className="material-symbols-outlined">favorite</span>
                            {update.likes.length} Likes
                        </button>
                    </div>
                </div>

                <div className="comments-section">
                    <h3>Discussion ({update.comments.length})</h3>
                    <div className="comment-input-block">
                        <textarea 
                            placeholder="Add to the conversation..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={() => handleInteract('comment')} disabled={!commentText.trim()}>
                            Post Comment
                        </button>
                    </div>

                    <div className="comments-list">
                        {update.comments.map((comment) => (
                            <div key={comment.id} className="comment-card">
                                <div className="comment-header">
                                    <span className="comment-author">{comment.employee.fullName}</span>
                                    <span className="comment-time">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="comment-body">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .detail-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding-bottom: 100px;
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .back-btn {
                    background: none;
                    border: none;
                    color: #555;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-bottom: 32px;
                    transition: color 0.2s;
                }

                .back-btn:hover {
                    color: #fff;
                }

                .blog-post {
                    background: #111;
                    border: 1px solid #222;
                    border-radius: 12px;
                    padding: 48px;
                    margin-bottom: 40px;
                }

                .post-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 48px;
                    border-bottom: 1px solid #1a1a1a;
                    padding-bottom: 32px;
                }

                .author-info {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .avatar-large {
                    width: 56px;
                    height: 56px;
                    background: #222;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: 700;
                    color: #7c3aed;
                    overflow: hidden;
                    border: 2px solid #1a1a1a;
                }

                .author-name {
                    font-size: 24px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 4px;
                }

                .author-sub {
                    font-size: 14px;
                    color: #555;
                    font-weight: 600;
                }

                .post-date {
                    font-size: 13px;
                    color: #444;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .content-section {
                    margin-bottom: 40px;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .green { background: #22c55e; }
                .blue { background: #3b82f6; }
                .purple { background: #a855f7; }

                .section-header h2 {
                    font-size: 14px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: #444;
                }

                .content-section p {
                    font-size: 16px;
                    color: #bbb;
                    line-height: 1.8;
                    margin: 0;
                }

                .post-footer {
                    margin-top: 60px;
                    padding-top: 32px;
                    border-top: 1px solid #1a1a1a;
                }

                .interact-btn {
                    background: #1a1a1a;
                    border: 1px solid #222;
                    color: #fff;
                    padding: 12px 24px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .interact-btn:hover {
                    background: #222;
                    border-color: #333;
                }

                .like:hover {
                    color: #f43f5e;
                    border-color: #f43f5e33;
                }

                .comments-section {
                    background: #000;
                    padding: 0;
                }

                .comments-section h3 {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 24px;
                }

                .comment-input-block {
                    margin-bottom: 48px;
                }

                .comment-input-block textarea {
                    width: 100%;
                    height: 120px;
                    background: #111;
                    border: 1px solid #222;
                    border-radius: 8px;
                    padding: 20px;
                    color: #fff;
                    font-size: 15px;
                    resize: none;
                    margin-bottom: 16px;
                }

                .comment-input-block textarea:focus {
                    outline: none;
                    border-color: #7c3aed;
                }

                .comment-input-block button {
                    background: #7c3aed;
                    color: #fff;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: opacity 0.2s;
                }

                .comment-input-block button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .comments-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .comment-card {
                    background: #111;
                    border: 1px solid #1a1a1a;
                    padding: 24px;
                    border-radius: 8px;
                }

                .comment-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }

                .comment-author {
                    font-weight: 700;
                    color: #888;
                    font-size: 14px;
                }

                .comment-time {
                    font-size: 12px;
                    color: #444;
                }

                .comment-body {
                    color: #ddd;
                    font-size: 15px;
                    line-height: 1.6;
                }

                .loading {
                    padding: 100px;
                    text-align: center;
                    color: #444;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </DashboardShell>
    );
}
