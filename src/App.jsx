import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
//import { ProtectedRoute } from './components/routes/ProtectedRoute';
//import { PublicRoute } from './components/routes/PublicRoute';
import { Home } from './pages';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          {/* Rutas protegidas */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )

}

export default App;
