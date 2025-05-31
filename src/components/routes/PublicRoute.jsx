import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export function PublicRoute({ children }) {
  const { usuario } = useUser();
  return !usuario ? children : <Navigate to="/" />;
}
