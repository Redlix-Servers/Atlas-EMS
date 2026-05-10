'use client';

import React, { useState, useEffect } from 'react';

export default function RealTimeAttendance() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [todayAttendance, setTodayAttendance] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMarking, setIsMarking] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchTodayAttendance();
        return () => clearInterval(timer);
    }, []);

    const fetchTodayAttendance = async () => {
        try {
            const res = await fetch('/api/employee/attendance');
            if (res.ok) {
                const records = await res.json();
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const found = records.find((r: any) => {
                    const recordDate = new Date(r.date);
                    recordDate.setHours(0, 0, 0, 0);
                    return recordDate.getTime() === today.getTime();
                });
                setTodayAttendance(found || null);
            }
        } catch (error) {
            console.error('Error fetching today attendance');
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAttendance = async () => {
        setIsMarking(true);
        try {
            const res = await fetch('/api/employee/attendance', { method: 'POST' });
            if (res.ok) {
                await fetchTodayAttendance();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to mark attendance');
            }
        } catch (error) {
            alert('Error marking attendance');
        } finally {
            setIsMarking(false);
        }
    };

    const timeString = currentTime.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });

    const dateString = currentTime.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kolkata'
    });

    return (
        <div style={{ 
            background: '#0a0a0a', 
            border: '1px solid #1a1a1a', 
            borderRadius: '12px', 
            padding: '16px',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
        }}>
            <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80' }}></div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#444', letterSpacing: '1px', textTransform: 'uppercase' }}>Live System</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '4px' }}>
                    {timeString}
                </div>
                <div style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>
                    {dateString}
                </div>
            </div>

            <div style={{ 
                background: '#111', 
                border: '1px solid #222', 
                padding: '12px 20px', 
                borderRadius: '8px', 
                minWidth: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}>
                {isLoading ? (
                    <div style={{ color: '#444', fontSize: '13px' }}>Checking status...</div>
                ) : todayAttendance ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#4ade80', fontSize: '13px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Attendance Marked</div>
                        <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>
                            {new Date(todayAttendance.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })}
                        </div>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '4px' }}>Successfully synchronized with server</div>
                    </div>
                ) : (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: '#f87171', fontSize: '13px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Not Marked Yet</div>
                            <div style={{ fontSize: '11px', color: '#444' }}>Please mark your presence for today</div>
                        </div>
                        <button 
                            onClick={handleMarkAttendance}
                            disabled={isMarking}
                            style={{
                                width: '100%',
                                background: '#7c3aed',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 700,
                                cursor: isMarking ? 'not-allowed' : 'pointer',
                                opacity: isMarking ? 0.7 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>front_hand</span>
                            {isMarking ? 'Marking...' : 'Punch In Now'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
