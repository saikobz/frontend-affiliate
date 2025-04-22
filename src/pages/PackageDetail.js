// PackageDetail.js - แสดงรายละเอียดของแพ็กเกจท่องเที่ยว

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../utils/config';

const PackageDetail = () => {
    const { slug } = useParams();
    const [pkg, setPkg] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("กรุณาเข้าสู่ระบบก่อนดูรายละเอียด");
            return;
        }

        fetch(`${API_BASE}/api/affiliate/packages/${slug}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("ไม่พบข้อมูลแพ็กเกจ");
                return res.json();
            })
            .then(setPkg)
            .catch(err => setError(err.message));
    }, [slug]);

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }

    if (!pkg) {
        return <div className="container mt-5">⏳ กำลังโหลดข้อมูล...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="fw-bold text-primary">{pkg.name}</h2>
            <p className="text-muted">{pkg.description}</p>
            {pkg.image && (
                <img src={pkg.image} alt={pkg.name} className="img-fluid rounded shadow-sm mb-4" />
            )}
            <h5>📍 สถานที่: {pkg.location || "ไม่ระบุ"}</h5>
            <h5>📆 ระยะเวลา: {pkg.duration || "ไม่ระบุ"}</h5>
            <h5>💸 ราคา: {pkg.price ? `${pkg.price.toLocaleString()} บาท` : "ไม่ระบุ"}</h5>
        </div>
    );
};

export default PackageDetail;