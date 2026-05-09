'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/DashboardShell';

interface DailyUpdate {
    id: string;
    contentDone: string;
    contentExplored: string;
    contentLearned: string;
    createdAt: string;
    employee: {
        fullName: string;
        company: string;
        profilePhoto: string;
    };
    likes: any[];
    comments: any[];
}

export default function NetworkingPage() {
    const [updates, setUpdates] = useState<DailyUpdate[]>([]);
    const [isFetching, setIsFetching] = useState(true);

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

    return (
        <DashboardShell>
            <div className="network-container">
                <div className="header-section">
                    <h1 className="title">Community Feed</h1>
                    <p className="subtitle">Discover insights and achievements from the Atlas network.</p>
                </div>

                {isFetching ? (
                    <div className="loading-state">Syncing organizational feed...</div>
                ) : (
                    <div className="blog-grid">
                        {updates.map((update) => (
                            <Link 
                                href={`/employee/dashboard/networking/${update.id}`} 
                                key={update.id} 
                                className="blog-card"
                            >
                                <div className="card-image-placeholder">
                                    <div className="category-tag">{update.employee.company}</div>
                                </div>
                                <div className="card-content">
                                    <div className="user-strip">
                                        <div className="mini-avatar">
                                            {update.employee.profilePhoto ? (
                                                <img src={update.employee.profilePhoto} alt="" />
                                            ) : (
                                                update.employee.fullName[0].toUpperCase()
                                            )}
                                        </div>
                                        <span className="user-name">{update.employee.fullName}</span>
                                    </div>
                                    <h3 className="card-title">Daily Update: {new Date(update.createdAt).toLocaleDateString()}</h3>
                                    <p className="card-excerpt">
                                        {update.contentDone.substring(0, 100)}...
                                    </p>
                                    <div className="card-footer">
                                        <div className="stat">
                                            <span className="material-symbols-outlined">favorite</span>
                                            {update.likes.length}
                                        </div>
                                        <div className="stat">
                                            <span className="material-symbols-outlined">chat_bubble</span>
                                            {update.comments.length}
                                        </div>
                                        <span className="read-more">Read Full Update →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .network-container {
                    padding-bottom: 60px;
                    animation: fadeIn 0.8s ease-out;
                }

                .header-section {
                    margin-bottom: 40px;
                }

                .title {
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                }

                .subtitle {
                    color: #555;
                    font-size: 15px;
                }

                .blog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 32px;
                }

                .blog-card {
                    background: #111;
                    border: 1px solid #222;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                    overflow: hidden;
                    border-radius: 8px;
                }

                .blog-card:hover {
                    transform: translateY(-8px);
                    border-color: #333;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .card-image-placeholder {
                    height: 160px;
                    background: linear-gradient(45deg, #111, #1a1a1a);
                    position: relative;
                    border-bottom: 1px solid #222;
                }

                .category-tag {
                    position: absolute;
                    bottom: 16px;
                    left: 16px;
                    background: #7c3aed;
                    color: #fff;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 4px 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 2px;
                }

                .card-content {
                    padding: 24px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .user-strip {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                }

                .mini-avatar {
                    width: 24px;
                    height: 24px;
                    background: #222;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: 700;
                    color: #7c3aed;
                    overflow: hidden;
                }

                .mini-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .user-name {
                    font-size: 13px;
                    font-weight: 600;
                    color: #888;
                }

                .card-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    color: #fff;
                    line-height: 1.3;
                }

                .card-excerpt {
                    font-size: 14px;
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 24px;
                    flex: 1;
                }

                .card-footer {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding-top: 20px;
                    border-top: 1px solid #222;
                }

                .stat {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #444;
                }

                .stat .material-symbols-outlined {
                    font-size: 18px;
                }

                .read-more {
                    margin-left: auto;
                    font-size: 12px;
                    font-weight: 700;
                    color: #7c3aed;
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
