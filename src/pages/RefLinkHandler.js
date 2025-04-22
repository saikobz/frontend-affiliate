// RefLinkHandler.js - บันทึก refId แล้ว redirect ตาม query ?to=

import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const RefLinkHandler = () => {
    const { refId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (refId) {
            localStorage.setItem("ref", refId);

            const searchParams = new URLSearchParams(location.search);
            const redirectPath = searchParams.get("to") || "/packages";

            navigate(redirectPath);
        }
    }, [refId, location.search, navigate]);

    return null;
};

export default RefLinkHandler;
