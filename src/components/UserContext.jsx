import { createContext, useContext, useState, useEffect } from 'react';
import { axiosClient } from '@services/axiosClient';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Carga desde localStorage al iniciar la app
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  const [loading, setLoading] = useState(!usuario); // solo carga si no hay usuario local

  const login = async (credenciales) => {
    const res = await axiosClient.post('/login', credenciales);
    const token = res.data.data.token;

    localStorage.setItem('token', token);
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const me = await axiosClient.get('/me');
    setUsuario(me.data.data);
    localStorage.setItem('usuario', JSON.stringify(me.data.data)); // ⬅️ cache usuario
  };

  const logout = async () => {
    try {
      await axiosClient.post('/logout');
    } catch (e) {
      console.error('Error cerrando sesión:', e);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); // ⬅️ eliminamos cache también
    delete axiosClient.defaults.headers.common['Authorization'];
    setUsuario(null);
    window.location.href = "/authenticate";
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // solo si no tenemos usuario cargado desde cache
      if (!usuario) {
        axiosClient.get('/me')
          .then(res => {
            setUsuario(res.data.data);
            localStorage.setItem('usuario', JSON.stringify(res.data.data)); // cache actualizado
          })
          .catch(() => logout())
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }

    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
