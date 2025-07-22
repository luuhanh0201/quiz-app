
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function isTokenExpired(token) {
    if (!token) return true;

    try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        const exp = decoded.exp;
        const now = Math.floor(Date.now() / 1000);

        return exp < now;
    } catch {
        return true;
    }
}

export default function useAuthCheck() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin");
        }
    }, []);
}
