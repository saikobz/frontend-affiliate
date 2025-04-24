import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { KEYCLOAK_BASE, REDIRECT_URI } from '../utils/config';

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // ใช้สำหรับการเปลี่ยนเส้นทาง

    // ฟังก์ชันเช็คว่า token หมดอายุหรือไม่
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const exp = decoded.exp * 1000; // ค่าหมดอายุของ token
            return Date.now() > exp; // ถ้าหมดอายุแล้ว
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // ถ้า decode ไม่ได้, ถือว่า token หมดอายุ
        }
    };

    // ฟังก์ชันรีเฟรช token
    const refreshToken = () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            alert("Refresh token not found. Please login again.");
            navigate("/login");
            return;
        }

        const data = new URLSearchParams();
        data.append("grant_type", "refresh_token");
        data.append("refresh_token", refreshToken);
        data.append("client_id", "affiliator-client");
        data.append("redirect_uri", REDIRECT_URI);

        fetch(`${KEYCLOAK_BASE}/protocol/openid-connect/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
        })
        .then((res) => res.json())
        .then((token) => {
            if (token.access_token) {
                localStorage.setItem("access_token", token.access_token);
                localStorage.setItem("refresh_token", token.refresh_token); // ถ้ามี refresh token ให้เก็บ
                navigate("/packages"); // หรือหน้าอื่นๆ ที่ต้องการ
            } else {
                console.error("Failed to refresh token:", token);
                navigate("/login");
            }
        })
        .catch((err) => {
            console.error("Error refreshing token:", err);
            navigate("/login");
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token && isTokenExpired(token)) {
            // รีเฟรช token ถ้ามันหมดอายุ
            refreshToken();
        } else if (token) {
            const decoded = jwtDecode(token);
            const username = decoded.preferred_username || decoded.name || "ผู้ใช้";
            setUsername(username); // ตั้งชื่อผู้ใช้
        } else {
            setUsername(null); // ไม่มี token, รีเซ็ตชื่อผู้ใช้
        }
    }, [location]); // ทุกครั้งที่ path เปลี่ยน ให้เช็ค token ใหม่

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUsername(null);
        navigate("/login");
    };

    const loginUrl = `${KEYCLOAK_BASE}/protocol/openid-connect/auth?client_id=affiliator-client&response_type=code&scope=openid&redirect_uri=${REDIRECT_URI}`;

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