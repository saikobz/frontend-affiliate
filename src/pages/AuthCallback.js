import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code'); // รับ authorization code
        if (code) {
            console.log("Received code:", code);
            // ต่อไปเราจะแลก code เป็น token
            exchangeCodeForToken(code);
        } else {
            console.error("No code found in the URL.");
            navigate("/login"); // ถ้าไม่พบ code, ให้ไปที่หน้า login
        }
    }, [navigate]);

    // ฟังก์ชันในการแลก code เป็น token
    const exchangeCodeForToken = (code) => {
        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", process.env.REACT_APP_REDIRECT_URI);
        data.append("client_id", "affiliator-client");

        fetch(`${process.env.REACT_APP_KEYCLOAK_URL}/protocol/openid-connect/token`, {
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
                localStorage.setItem("refresh_token", token.refresh_token);
                navigate("/packages"); // ถ้าแลก token ได้, ให้ไปที่หน้า packages
            } else {
                console.error("Failed to get token:", token);
                navigate("/login");
            }
        })
        .catch((err) => {
            console.error("Error during token exchange:", err);
            navigate("/login");
        });
    };

    return <div>Redirecting...</div>;
};

export default AuthCallback;