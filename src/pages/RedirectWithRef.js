// ✅ RedirectWithRef.js
import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { API_BASE } from '../utils/config';

const RedirectWithRef = () => {
    const { ref } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const toPath = new URLSearchParams(location.search).get("to") || "/";
        const packageSlug = toPath.split("/").pop();
        const logKey = `click-${ref}-${packageSlug}`;

        if (!localStorage.getItem(logKey)) {
            localStorage.setItem(logKey, "true");

            fetch(`${API_BASE}/api/affiliate/log-click`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ packageSlug, ref })
            }).finally(() => {
                setTimeout(() => navigate(toPath), 1000);
            });
        } else {
            navigate(toPath);
        }
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ display: "inline-block", padding: "40px", borderRadius: "12px", background: "#f8f9fa", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <h2 style={{ color: "#0d6efd", marginBottom: "16px" }}>🔗 กำลังพาคุณไปยังแพ็กเกจที่เลือก...</h2>
                <p style={{ color: "#6c757d" }}>ระบบกำลังบันทึกการคลิกผ่านลิงก์ของคุณ ({ref})</p>
            </div>
        </div>
    );
};

export default RedirectWithRef;