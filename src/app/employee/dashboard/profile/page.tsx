'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('Personal Details');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        phoneNumber: '',
        dob: '',
        upiId: '',
        fatherName: '',
        fatherPhoneNumber: '',
        college: '',
        isGraduated: false,
        profilePhoto: '',
        isProfileComplete: false,
        address: '',
        gender: ''
    });
    const [sessionInfo, setSessionInfo] = useState({ email: '', company: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/employee/profile');
                if (res.ok) {
                    const data = await res.json();
                    setSessionInfo({ email: data.email, company: data.company });
                    setFormData({
                        fullName: data.fullName || '',
                        role: data.role || '',
                        phoneNumber: data.phoneNumber || '',
                        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
                        upiId: data.upiId || '',
                        fatherName: data.fatherName || '',
                        fatherPhoneNumber: data.fatherPhoneNumber || '',
                        college: data.college || '',
                        isGraduated: data.isGraduated || false,
                        profilePhoto: data.profilePhoto || '',
                        isProfileComplete: data.isProfileComplete || false,
                        address: data.address || '',
                        gender: data.gender || ''
                    });
                    
                    if (!data.isProfileComplete) {
                        setIsEditing(true);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch profile');
            } finally {
                setIsFetching(false);
            }
        };
        fetchProfile();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePhoto: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Strict Validation
        const requiredFields = [
            { key: 'fullName', label: 'Full Name' },
            { key: 'role', label: 'Role' },
            { key: 'phoneNumber', label: 'Phone Number' },
            { key: 'dob', label: 'Date of Birth' },
            { key: 'upiId', label: 'UPI ID' },
            { key: 'fatherName', label: "Father's Name" },
            { key: 'fatherPhoneNumber', label: "Father's Phone" },
            { key: 'college', label: 'College' },
            { key: 'address', label: 'Full Address' },
            { key: 'gender', label: 'Gender' },
            { key: 'profilePhoto', label: 'Profile Photo' }
        ];

        const missing = requiredFields
            .filter(field => !formData[field.key as keyof typeof formData])
            .map(field => field.label);

        if (missing.length > 0) {
            alert(`You didn't fill these fields: ${missing.join(', ')}. Please fill those to avoid the banning of account.`);
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/employee/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setFormData({ ...formData, isProfileComplete: true });
                setTimeout(() => {
                    setIsEditing(false);
                    setMessage({ type: '', text: '' });
                }, 1000);
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) return <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading...</div>;

    if (!isEditing && formData.isProfileComplete) {
        return (
            <DashboardShell userEmail={sessionInfo.email} company={sessionInfo.company} onLogout={async () => {}}>
                <div className="profile-container">
                    <div className="profile-header-card">
                        <div className="profile-banner">
                            <img 
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                                alt="Banner" 
                                className="banner-img"
                            />
                            <div className="banner-overlay"></div>
                        </div>
                        <div className="profile-info-main">
                            <div className="profile-photo-wrapper">
                                {formData.profilePhoto ? (
                                    <img src={formData.profilePhoto} alt="Profile" />
                                ) : (
                                    <div className="photo-placeholder">
                                        {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
                                    </div>
                                )}
                            </div>
                            
                            <div className="header-details">
                                <div className="name-section">
                                    <h2 className="display-name">{formData.fullName}</h2>
                                    <span className="role-badge">{formData.role || 'Employee'}</span>
                                </div>
                                <div className="meta-info">
                                    <div className="meta-item">
                                        <span className="material-symbols-outlined">mail</span>
                                        <span>{sessionInfo.email}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="material-symbols-outlined">location_city</span>
                                        <span>{sessionInfo.company}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="material-symbols-outlined">calendar_today</span>
                                        <span>Joined May 2024</span>
                                    </div>
                                </div>
                            </div>

                            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                                <span className="material-symbols-outlined">edit</span>
                                <span>Edit Profile</span>
                            </button>
                        </div>

                        <div className="profile-tabs">
                            {['Personal Details', 'Family Info', 'Payroll'].map(tab => (
                                <button 
                                    key={tab}
                                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="tab-content-area">
                        {activeTab === 'Personal Details' && (
                            <div className="details-grid">
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Phone Number</label>
                                        <p>{formData.phoneNumber || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">cake</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Date of Birth</label>
                                        <p>{formData.dob || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">history_edu</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Education</label>
                                        <p>{formData.college}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">verified_user</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Status</label>
                                        <p>{formData.isGraduated ? 'Graduated' : 'Pursuing'}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">person</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Gender</label>
                                        <p>{formData.gender || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">home</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Address</label>
                                        <p>{formData.address || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Family Info' && (
                            <div className="details-grid">
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">family_restroom</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Father's Name</label>
                                        <p>{formData.fatherName || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">emergency</span>
                                    </div>
                                    <div className="info-body">
                                        <label>Emergency Contact</label>
                                        <p>{formData.fatherPhoneNumber || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Payroll' && (
                            <div className="payroll-grid">
                                <div className="info-card highlight">
                                    <div className="info-icon">
                                        <span className="material-symbols-outlined">account_balance_wallet</span>
                                    </div>
                                    <div className="info-body">
                                        <label>UPI ID (Primary Payout)</label>
                                        <p className="payout-address">{formData.upiId || 'Not set'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <style jsx>{`
                    .profile-container {
                        max-width: 1000px;
                        animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                        padding-bottom: 40px;
                    }

                    .profile-header-card {
                        background: #111;
                        border: 1px solid #222;
                        margin-bottom: 24px;
                        overflow: hidden;
                        border-radius: 4px;
                    }

                    .profile-banner {
                        height: 160px;
                        position: relative;
                        background: #1a1a1a;
                    }

                    .banner-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        opacity: 0.6;
                    }

                    .banner-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(to bottom, transparent, #111);
                    }

                    .profile-info-main {
                        padding: 0 32px 32px;
                        display: flex;
                        align-items: flex-end;
                        gap: 24px;
                        margin-top: -60px;
                        position: relative;
                        z-index: 2;
                    }

                    .profile-photo-wrapper {
                        width: 120px;
                        height: 120px;
                        background: #111;
                        border: 4px solid #111;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    }

                    .profile-photo-wrapper img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .photo-placeholder {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 32px;
                        font-weight: 700;
                        color: #7c3aed;
                        background: rgba(124, 58, 237, 0.1);
                    }

                    .header-details {
                        flex: 1;
                        padding-bottom: 12px;
                    }

                    .name-section {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        margin-bottom: 12px;
                    }

                    .display-name {
                        font-size: 26px;
                        font-weight: 600;
                        color: #fff;
                        margin: 0;
                        letter-spacing: -0.5px;
                    }

                    .role-badge {
                        background: #7c3aed;
                        color: #fff;
                        font-size: 9px;
                        font-weight: 700;
                        text-transform: uppercase;
                        padding: 4px 10px;
                        letter-spacing: 1px;
                        border-radius: 2px;
                    }

                    .meta-info {
                        display: flex;
                        gap: 24px;
                        flex-wrap: wrap;
                    }

                    .meta-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: #555;
                        font-size: 13px;
                    }

                    .meta-item span:not(.material-symbols-outlined) {
                        font-weight: 500;
                    }

                    .meta-item .material-symbols-outlined {
                        font-size: 18px;
                        color: #333;
                    }

                    .edit-profile-btn {
                        background: #fff;
                        color: #000;
                        border: none;
                        padding: 10px 20px;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-bottom: 12px;
                        transition: all 0.2s;
                    }

                    .edit-profile-btn:hover {
                        background: #eee;
                        transform: translateY(-2px);
                    }

                    .profile-tabs {
                        display: flex;
                        gap: 32px;
                        padding: 0 32px;
                        border-top: 1px solid #1a1a1a;
                        background: rgba(255,255,255,0.01);
                    }

                    .tab-btn {
                        background: none;
                        border: none;
                        padding: 20px 0;
                        color: #444;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        cursor: pointer;
                        position: relative;
                        transition: all 0.2s;
                    }

                    .tab-btn:hover {
                        color: #888;
                    }

                    .tab-btn.active {
                        color: #7c3aed;
                    }

                    .tab-btn.active::after {
                        content: '';
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: #7c3aed;
                    }

                    .details-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                        gap: 16px;
                    }

                    .info-card {
                        background: #111;
                        border: 1px solid #222;
                        padding: 20px;
                        display: flex;
                        gap: 16px;
                        transition: border-color 0.2s;
                    }

                    .info-card:hover {
                        border-color: #333;
                    }

                    .info-icon {
                        width: 40px;
                        height: 40px;
                        background: #161616;
                        border: 1px solid #1a1a1a;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #444;
                    }

                    .info-icon .material-symbols-outlined {
                        font-size: 20px;
                    }

                    .info-body label {
                        display: block;
                        font-size: 10px;
                        font-weight: 700;
                        text-transform: uppercase;
                        color: #444;
                        margin-bottom: 6px;
                        letter-spacing: 1px;
                    }

                    .info-body p {
                        font-size: 14px;
                        color: #eee;
                        margin: 0;
                        font-weight: 500;
                    }

                    .info-card.highlight {
                        border-color: rgba(124, 58, 237, 0.3);
                        background: linear-gradient(to bottom right, rgba(124, 58, 237, 0.05), transparent);
                    }

                    .info-card.highlight .info-icon {
                        background: rgba(124, 58, 237, 0.1);
                        border-color: rgba(124, 58, 237, 0.2);
                        color: #7c3aed;
                    }

                    .payout-address {
                        font-family: monospace;
                        color: #7c3aed !important;
                        font-size: 15px !important;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @media (max-width: 768px) {
                        .profile-info-main {
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                            margin-top: -60px;
                            padding: 0 20px 20px;
                        }
                        .meta-info {
                            justify-content: center;
                            gap: 16px;
                        }
                        .profile-tabs {
                            overflow-x: auto;
                            gap: 20px;
                        }
                    }
                `}</style>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell userEmail={sessionInfo.email} company={sessionInfo.company} onLogout={async () => {}}>
            <div className="edit-container">
                <div className="back-link" onClick={() => setIsEditing(false)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span>Cancel</span>
                </div>
                
                <h2 className="edit-title">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="photo-upload-section">
                        <div className="photo-preview" onClick={() => fileInputRef.current?.click()}>
                            {formData.profilePhoto ? (
                                <img src={formData.profilePhoto} alt="Profile" />
                            ) : (
                                <span className="material-symbols-outlined">add_a_photo</span>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                        <span className="upload-label">Change Profile Photo</span>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>DOB</label>
                            <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>UPI ID</label>
                            <input type="text" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>College</label>
                            <input type="text" value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Graduation Status</label>
                            <select 
                                value={formData.isGraduated ? "true" : "false"} 
                                onChange={(e) => setFormData({...formData, isGraduated: e.target.value === "true"})}
                                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #222', padding: '12px', color: '#fff', fontSize: '13px' }}
                            >
                                <option value="false">Pursuing / Incomplete</option>
                                <option value="true">Graduated</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select 
                                value={formData.gender} 
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #222', padding: '12px', color: '#fff', fontSize: '13px' }}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Father's Name</label>
                            <input type="text" value={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Father's Phone</label>
                            <input type="tel" value={formData.fatherPhoneNumber} onChange={(e) => setFormData({...formData, fatherPhoneNumber: e.target.value})} />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label>Full Address</label>
                            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="House No, Street, City, Pincode" />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .edit-container {
                    max-width: 600px;
                    animation: fadeIn 0.5s ease-out;
                }

                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #555;
                    margin-bottom: 24px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: color 0.2s;
                }

                .back-link:hover {
                    color: #888;
                }

                .edit-title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 32px;
                    color: #fff;
                    letter-spacing: -0.5px;
                }

                .edit-form {
                    background: #111;
                    border: 1px solid #222;
                    padding: 32px;
                }

                .photo-upload-section {
                    margin-bottom: 32px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }

                .photo-preview {
                    width: 80px;
                    height: 80px;
                    background: #1a1a1a;
                    border: 1px solid #222;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    overflow: hidden;
                    transition: border-color 0.2s;
                }

                .photo-preview:hover {
                    border-color: #7c3aed;
                }

                .photo-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .photo-preview span {
                    font-size: 24px;
                    color: #444;
                }

                .upload-label {
                    font-size: 10px;
                    color: #444;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .form-group label {
                    display: block;
                    font-size: 10px;
                    color: #444;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }

                .form-group input {
                    width: 100%;
                    background: #1a1a1a;
                    border: 1px solid #222;
                    padding: 12px;
                    color: #fff;
                    font-size: 13px;
                    transition: border-color 0.2s;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #7c3aed;
                }

                .form-actions {
                    margin-top: 32px;
                    display: flex;
                    justify-content: flex-end;
                }

                .save-btn {
                    background: #7c3aed;
                    color: #fff;
                    border: none;
                    padding: 12px 32px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .save-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
                }

                .save-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 600px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </DashboardShell>
    );
}
