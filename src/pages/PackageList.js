// 📦 PackageList.js – Final version ใช้ .env และป้องกัน log ซ้ำ + redirect ปลอดภัย

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/config';

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        fetch(`${API_BASE}/api/affiliate/packages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized or server error");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setPackages(data);
                    setFiltered(data);
                } else {
                    setPackages([]);
                    setFiltered([]);
                }
            })
            .catch((err) => {
                console.error("load failed:", err);
                setIsAuthenticated(false);
            });
    }, []);

    useEffect(() => {
        const lower = searchTerm.toLowerCase();
        const filteredData = packages.filter((pkg) =>
            pkg.name.toLowerCase().includes(lower)
        );
        setFiltered(filteredData);
    }, [searchTerm, packages]);

    const logClick = async (slug) => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`${API_BASE}/api/affiliate/log-click`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ packageSlug: slug }),
            });
            if (!res.ok) throw new Error("Log click ล้มเหลว");
        } catch (err) {
            console.error("Log click failed:", err.message);
        }
    };

    const handleClick = async (slug) => {
        await logClick(slug);
        navigate(`/packages/${slug}`);
    };

    if (!isAuthenticated) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center">
                    🔐 กรุณาเข้าสู่ระบบเพื่อดูแพ็กเกจ <br />
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">📦 แพ็กเกจท่องเที่ยว</h3>
                <input
                    type="text"
                    placeholder="🔎 ค้นหาแพ็กเกจ..."
                    className="form-control w-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {Array.isArray(filtered) && filtered.length === 0 ? (
                <p className="text-muted">ไม่พบแพ็กเกจที่ค้นหา</p>
            ) : (
                <ul className="list-group">
                    {filtered.map((pkg) => (
                        <li
                            key={pkg.slug}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>{pkg.name}</span>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleClick(pkg.slug)}
                            >
                                ดูรายละเอียด
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PackageList;