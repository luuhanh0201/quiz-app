import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const tokenData = localStorage.getItem("token");

        if (userData && tokenData) {
            try {
                setUser(JSON.parse(userData));
                setToken(JSON.parse(tokenData));
            } catch {
                setUser(null);
                setToken(null);
            }
        }
    }, []);

    const signin = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        setUser(user);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, signin, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


function isTokenExpired(token) {
    if (!token) return true;
    try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        return decoded.exp < Math.floor(Date.now() / 1000);
    } catch {
        return true;
    }
}

export function useAuthCheck() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            logout();
            navigate("/signin");
        }
    }, []);
}

export const useAuth = () => useContext(AuthContext);