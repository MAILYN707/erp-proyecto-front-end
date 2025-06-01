import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export function RoleProtectedRoute({ children, rol }) {
    const { usuario } = useUser();
    
    return usuario?.rol === rol
        ? children
        : <Navigate to="/" />;
}
