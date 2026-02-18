import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getMe()
                .then((res) => {
                    setUser(res.data.user);
                    setFavorites(res.data.user.favorites || []);
                })
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const res = await apiLogin(credentials);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setFavorites(res.data.user.favorites || []);
        return res.data;
    };

    const register = async (data) => {
        const res = await apiRegister(data);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setFavorites([]);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setFavorites([]);
    };

    const updateFavorites = (newFavorites) => {
        setFavorites(newFavorites);
    };

    return (
        <AuthContext.Provider value={{ user, loading, favorites, login, register, logout, updateFavorites }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
