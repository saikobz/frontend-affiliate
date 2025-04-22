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
        }

        if (token) {
            localStorage.setItem('access_token', token);
            // ✅ แจ้งเตือน login สำเร็จ
            alert("🎉 เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ");
            navigate('/');
        } else {
            // fallback: reload ถ้าไม่มี token
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }, [navigate]);

    return <p className="text-center mt-5">กำลังเข้าสู่ระบบ...</p>;
}

export default KeycloakCallback;