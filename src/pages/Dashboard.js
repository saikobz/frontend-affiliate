// Dashboard.js - หน้า Dashboard พร้อมการแบ่งหน้า (Pagination)

import React, { useEffect, useState } from "react";
import { API_BASE } from '../utils/config';

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/affiliate/logs`)
            .then((res) => {
                if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูล log ได้");
                return res.json();
            })
            .then((data) => setLogs(data.reverse())) // ✅ เรียงล่าสุดไว้ก่อน
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
    const paginatedLogs = logs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">
                📊 รายการ Log การคลิกแพ็กเกจ
            </h2>

            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}

            {loading ? (
                <div className="text-center">⏳ กำลังโหลดข้อมูล...</div>
            ) : (
                <>
                    <div className="table-responsive mb-4">
                        <table className="table table-striped table-bordered align-middle">
                            <thead className="table-light text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Affiliate</th>
                                    <th>Package</th>
                                    <th>เวลาคลิก</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLogs.map((log, idx) => (
                                    <tr key={idx}>
                                        <td className="text-center">
                                            {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td>{log.user}</td>
                                        <td>{log.package}</td>
                                        <td className="text-nowrap">
                                            {new Date(log.timestamp).toLocaleString("th-TH", {
                                                dateStyle: "short",
                                                timeStyle: "medium",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                                {paginatedLogs.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted">
                                            ไม่มีรายการคลิกในระบบ
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-center">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                                    <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                                        ก่อนหน้า
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                    >
                                        <button className="page-link" onClick={() => changePage(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                                    <button className="page-link" onClick={() => changePage(currentPage + 1)}>
                                        ถัดไป
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
