import { createContext, useContext, useState, useEffect } from 'react';
import { axiosClient } from '@services/axiosClient';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true); // 

    const login = async (credenciales) => {
        const res = await axiosClient.post('/login', credenciales);
        const token = res.data.token;

        localStorage.setItem('token', token);
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const userRes = await axiosClient.get('/me');
        setUsuario(userRes.data);
    };

    const logout = async () => {
        try {
            await axiosClient.post('/logout');
        } catch (_) {
            
        }
        localStorage.removeItem('token');
        delete axiosClient.defaults.headers.common['Authorization'];
        setUsuario(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axiosClient.get('/me')
                .then(res => setUsuario(res.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    delete axiosClient.defaults.headers.common['Authorization'];
                    setUsuario(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ usuario, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
