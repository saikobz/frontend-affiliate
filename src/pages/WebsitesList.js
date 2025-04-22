// ✅ WebsitesList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/config';

const WebsitesList = () => {
    const [websites, setWebsites] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return setError("🔐 กรุณาเข้าสู่ระบบเพื่อดูเว็บไซต์ที่คุณเพิ่มไว้");

        fetch(`${API_BASE}/api/get-websites`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("โหลดข้อมูลเว็บไซต์ไม่สำเร็จ");
                return res.json();
            })
            .then(data => {
                const filtered = data.filter(site => site.id);
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                setWebsites(filtered);
            })
            .catch((err) => setError(err.message));
    }, []);

    const handleDelete = async (id) => {
        if (!id) return alert("ID เว็บไซต์ไม่ถูกต้อง");

        const confirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเว็บไซต์นี้?");
        if (!confirmed) return;

        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE}/api/delete-website/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            setWebsites((prev) => prev.filter(site => site.id !== id));
        } else {
            alert("❌ ลบไม่สำเร็จ");
        }
    };

    const handleEdit = (id) => {
        if (!id) return alert("ID เว็บไซต์ไม่ถูกต้อง");
        navigate(`/edit-website/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">📋 รายชื่อเว็บไซต์ของคุณ</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {!error && websites.length === 0 && <p>ยังไม่มีเว็บไซต์ที่คุณเพิ่มไว้</p>}

            {websites.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อเว็บไซต์</th>
                            <th>URL</th>
                            <th>วันที่ลงทะเบียน</th>
                            <th>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {websites.map((site, index) => (
                            <tr key={site.id}>
                                <td>{index + 1}</td>
                                <td>{site.websiteName}</td>
                                <td>
                                    <a href={site.websiteUrl} target="_blank" rel="noreferrer">
                                        {site.websiteUrl}
                                    </a>
                                </td>
                                <td>{new Date(site.date).toLocaleString()}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => handleEdit(site.id)} className="btn btn-sm btn-warning">
                                            ✏️ แก้ไข
                                        </button>
                                        <button onClick={() => handleDelete(site.id)} className="btn btn-sm btn-danger">
                                            🗑️ ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WebsitesList;
