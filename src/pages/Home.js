// Home.js - หน้า Landing สำหรับ Affiliator React

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KEYCLOAK_BASE, REDIRECT_URI } from '../utils/config';

function Home() {
    const navigate = useNavigate();

    const keycloakRegisterUrl = `https://keycloak-deploy-1.onrender.com/realms/affiliate-realm/protocol/openid-connect/registrations?client_id=affiliator-client&response_type=code&scope=openid&redirect_uri=https://frontend-affiliate-chi.vercel.app/callback`;

    const handleClickViewPackages = () => {
        navigate("/packages"); // ✅ ไม่มี log homepage-entry อีกแล้ว
    };

    return (
        <>
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h1 className="fw-bold mb-3">สมัครเป็นพาร์ทเนอร์กับเรา</h1>
                    <p className="text-muted mb-4">
                        เข้าร่วมโปรแกรม Affiliate เพื่อโปรโมตแพ็กเกจท่องเที่ยว และรับค่าคอมมิชชั่นจากทุกการจองผ่านเว็บไซต์ของคุณ
                    </p>
                    <a href={keycloakRegisterUrl} className="btn btn-lg btn-success px-4 me-3">
                        ✍️ สมัครเป็นพาร์ทเนอร์
                    </a>
                    <button onClick={handleClickViewPackages} className="btn btn-lg btn-outline-primary px-4">
                        📦 ดูแพ็กเกจท่องเที่ยว
                    </button>
                </div>
            </section>

            <section className="container py-5">
                <h2 className="fw-bold text-center mb-5">สิ่งที่คุณจะได้รับ</h2>
                <div className="row g-4 text-center">
                    <div className="col-md-4">
                        <div className="p-4 border rounded h-100">
                            <h5 className="fw-bold">💸 ค่าคอมมิชชั่นสูง</h5>
                            <p>รับรายได้จากทุกการจองที่เกิดจากลิงก์ของคุณ</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border rounded h-100">
                            <h5 className="fw-bold">📈 ระบบติดตามเรียลไทม์</h5>
                            <p>ดูยอดคลิก ยอดจอง และรายได้ผ่านแดชบอร์ดส่วนตัว</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border rounded h-100">
                            <h5 className="fw-bold">🌏 แพ็กเกจหลากหลาย</h5>
                            <p>เลือกโปรโมตแพ็กเกจที่ตรงกับกลุ่มเป้าหมายของคุณ</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
