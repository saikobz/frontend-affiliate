// ✅ EditWebsite.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/config';

const EditWebsite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [website, setWebsite] = useState(null);
    const [websiteName, setWebsiteName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return setMessage("กรุณาเข้าสู่ระบบ");

        fetch(`${API_BASE}/api/get-websites`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                const found = data.find(w => w.id === id);
                if (!found) {
                    setMessage("ไม่พบเว็บไซต์ที่ต้องการแก้ไข");
                } else {
                    setWebsite(found);
                    setWebsiteName(found.websiteName);
                    setWebsiteUrl(found.websiteUrl);
                }
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        if (!token) return setMessage("กรุณาเข้าสู่ระบบ");

        const res = await fetch(`${API_BASE}/api/update-website/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ websiteName, websiteUrl })
        });

        if (res.ok) {
            setMessage("✅ แก้ไขเว็บไซต์เรียบร้อยแล้ว");
            setTimeout(() => navigate('/websites'), 1500);
        } else {
            const err = await res.text();
            setMessage("❌ แก้ไขไม่สำเร็จ: " + err);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">✏️ แก้ไขเว็บไซต์</h2>
            {message && <div className="alert alert-info">{message}</div>}
            {website && (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">💾 บันทึกการเปลี่ยนแปลง</button>
                </form>
            )}
        </div>
    );
};

export default EditWebsite;
