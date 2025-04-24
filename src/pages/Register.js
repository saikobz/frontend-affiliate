// Register.js - หน้า React สำหรับสมัคร Affiliator

import React from 'react';

const Register = () => {
    const keycloakRegisterUrl =
        "https://keycloak-deploy-1.onrender.com/realms/affiliate-realm/account/#/register";

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h2 className="mb-4">📝 สมัครเป็น Affiliator</h2>
                <p className="text-muted">ลงทะเบียนเพื่อเริ่มต้นโปรโมตแพ็กเกจท่องเที่ยวและรับค่าคอมมิชชั่น</p>
                <a href={keycloakRegisterUrl} className="btn btn-lg btn-success mt-3">
                    ➕ สมัครสมาชิกผ่าน Keycloak
                </a>
            </div>
        </div>
    );
};

export default Register;
