import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { Spinner } from '../Spinner'; 

export function ProtectedRoute({ children }) {
  const { usuario, loading } = useUser();

  if (loading) return <Spinner />;
  if (!usuario) return <Navigate to="/authenticate" />;
  return children;
}
