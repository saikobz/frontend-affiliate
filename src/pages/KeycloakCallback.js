// src/pages/KeycloakCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KeycloakCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', '?'));

        const token = params.get('access_token');
        const error = params.get('error');

        if (error) {
            console.error("เกิดข้อผิดพลาด:", params.get("error_description"));
            alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
            navigate("/login"); // redirect ไปหน้า login เมื่อเกิดข้อผิดพลาด
        }

        if (token) {
            localStorage.setItem('access_token', token);
            alert("🎉 เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ");
            navigate('/packages'); // หรือหน้าอื่นๆ ที่ต้องการ
        } else {
            alert("ไม่พบ token");
            navigate("/login"); // redirect ไปหน้า login หากไม่มี token
        }
    }, [navigate]);

    return <p className="text-center mt-5">กำลังเข้าสู่ระบบ...</p>;
}

export default KeycloakCallback;