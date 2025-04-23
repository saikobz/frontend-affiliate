// Navbar.js - รีเฟรชชื่อผู้ใช้แบบ Reactive เมื่อ login/logout

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { KEYCLOAK_BASE, REDIRECT_URI } from '../utils/config';

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const location = useLocation(); // ✅ ตรวจ path เปลี่ยนเพื่อ refresh token

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const rawUsername = decoded.preferred_username || decoded.name || "ผู้ใช้";
                const onlyUsername = rawUsername.includes("@") ? rawUsername.split("@")[0] : rawUsername;
                setUsername(onlyUsername);
            } catch (error) {
                console.error("ไม่สามารถ decode token ได้:", error);
                setUsername(null);
            }
        } else {
            setUsername(null);
        }
    }, [location]); // ✅ ทุกครั้งที่ path เปลี่ยน ให้เช็ค token ใหม่

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        setUsername(null); // ✅ reset username
        window.location.href = "/";
    };

    const loginUrl = "https://keycloak-deploy-1.onrender.com/realms/affiliate-realm/protocol/openid-connect/auth?client_id=affiliator-client&response_type=code&scope=openid&redirect_uri=https://frontend-affiliate-chi.vercel.app/callback";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">🌐 Capibara</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">หน้าแรก</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-website">➕ เพิ่มเว็บไซต์</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/websites">📋 เว็บไซต์ของคุณ</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">📊 Dashboard</Link>
                    </li>
                    {!username && (
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">สมัครสมาชิก</Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex align-items-center gap-3">
                    {username && (
                        <div className="text-white d-flex align-items-center">
                            <img src={`https://ui-avatars.com/api/?name=${username}`} alt="avatar" width="32" height="32" className="rounded-circle me-2" />
                            <span>{username}</span>
                        </div>
                    )}
                    {username ? (
                        <button className="btn btn-outline-light" onClick={handleLogout}>🚪 ออกจากระบบ</button>
                    ) : (
                        <a className="btn btn-outline-light" href={loginUrl}>🔐 เข้าสู่ระบบ</a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;