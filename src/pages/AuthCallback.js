// AuthCallback.js - รับ code จาก Keycloak และแลก token

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { KEYCLOAK_BASE, REDIRECT_URI } from '../utils/config';

const AuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get("code");

        if (!code) {
            navigate("/packages");
            return;
        }

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", REDIRECT_URI);
        data.append("client_id", "affiliator-client");
        // ถ้ามี client_secret → data.append("client_secret", "...secret...");

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
                    navigate("/packages");
                } else {
                    console.error("ไม่สามารถแลก token ได้", token);
                    navigate("/packages");
                }
            })
            .catch((err) => {
                console.error("เกิดข้อผิดพลาดขณะแลก token:", err);
                navigate("/packages");
            });
    }, [location.search, navigate]);

    return <div className="text-center mt-5">🔄 กำลังเข้าสู่ระบบ...</div>;
};

export default AuthCallback;
