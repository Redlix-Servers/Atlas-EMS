'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function BreezeLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Start loading on route change
        setLoading(true);
        
        // Simulate a "breeze" finish
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div id="nprogress">
            <div className="bar" />
            <style jsx>{`
                .bar {
                    animation: breeze-flow 2s infinite ease-in-out;
                }
                @keyframes breeze-flow {
                    0% { width: 0%; left: 0; }
                    50% { width: 70%; left: 15%; }
                    100% { width: 100%; left: 100%; }
                }
            `}</style>
        </div>
    );
}
