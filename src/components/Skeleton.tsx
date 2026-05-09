'use client';

import React from 'react';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Skeleton({ 
    width = '100%', 
    height = '1rem', 
    borderRadius = '4px',
    className = '',
    style = {}
}: SkeletonProps) {
    return (
        <div 
            className={`skeleton-base ${className}`}
            style={{
                width,
                height,
                borderRadius,
                ...style
            }}
        >
            <style jsx>{`
                .skeleton-base {
                    background: linear-gradient(
                        90deg, 
                        #111 25%, 
                        #1a1a1a 50%, 
                        #111 75%
                    );
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s infinite linear;
                }

                @keyframes skeleton-loading {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </div>
    );
}

export function StatSkeleton() {
    return (
        <div style={{ background: '#111', border: '1px solid #222', padding: '16px', height: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Skeleton width="20px" height="20px" />
                <Skeleton width="30px" height="8px" />
            </div>
            <Skeleton width="60%" height="24px" style={{ marginBottom: '8px' }} />
            <Skeleton width="40%" height="12px" />
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div style={{ background: '#111', border: '1px solid #222', padding: '24px', marginBottom: '16px' }}>
            <Skeleton width="30%" height="20px" style={{ marginBottom: '16px' }} />
            <Skeleton width="100%" height="12px" style={{ marginBottom: '8px' }} />
            <Skeleton width="90%" height="12px" style={{ marginBottom: '8px' }} />
            <Skeleton width="70%" height="12px" />
        </div>
    );
}

export function TableSkeleton() {
    return (
        <div style={{ background: '#111', border: '1px solid #222', padding: '24px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} width="15%" height="10px" />)}
            </div>
            {Array(6).fill(0).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    {Array(5).fill(0).map((_, j) => <Skeleton key={j} width="15%" height="12px" />)}
                </div>
            ))}
        </div>
    );
}
