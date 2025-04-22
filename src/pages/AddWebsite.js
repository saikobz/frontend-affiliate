// AddWebsite.js - สำหรับ Affiliator เพิ่มเว็บไซต์ของตัวเอง

import React, { useState } from 'react';
import { API_BASE } from '../utils/config';

const AddWebsite = () => {
    const [websiteName, setWebsiteName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");
        if (!token) return setMessage("🔐 กรุณาเข้าสู่ระบบก่อนเพิ่มเว็บไซต์");

        const res = await fetch(`${API_BASE}/api/register-website`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                websiteName,
                websiteUrl
            })
        });

        if (res.ok) {
            setMessage("✅ เพิ่มเว็บไซต์เรียบร้อยแล้ว");
            setWebsiteName('');
            setWebsiteUrl('');
        } else {
            const text = await res.text();
            setMessage("❌ เพิ่มเว็บไซต์ไม่สำเร็จ: " + text);
        }
    };

    return (
        <div className="container mt-5">
            <h2>🌐 เพิ่มเว็บไซต์ของคุณ</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">ชื่อเว็บไซต์</label>
                    <input
                        type="text"
                        className="form-control"
                        value={websiteName}
                        onChange={(e) => setWebsiteName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">URL เว็บไซต์</label>
                    <input
                        type="url"
                        className="form-control"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">➕ เพิ่มเว็บไซต์</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default AddWebsite;
