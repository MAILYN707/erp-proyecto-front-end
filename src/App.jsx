import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser, UserProvider } from './components/UserContext';
import { Spinner } from './components/Spinner';
import { Toaster } from 'react-hot-toast';

import {
  Home,
  Productos,
  Proveedores,
  SobreNosotros,
  Contacto,
  AuthPanel,
  Carrito,
  TusPedidos,
  PasarelaPago,
  ListaEmpresasPendientes,
  ListaEmpresasAprobadas
} from './pages';

import { Layout } from '@components/Layout';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainApp />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#D5E8F3',       // Azul muy claro (parecido a la imagen)
              color: '#345769',            // Mismo color del check
              fontWeight: '600',
              borderRadius: '10px',
              padding: '12px 20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
            success: {
              iconTheme: {
                primary: '#345769',       // Color del círculo del check
                secondary: '#EAF3F9',     // Fondo interno del ícono
              },
            },
            error: {
              style: {
                background: '#F8D7DA',
                color: '#B71C1C',
              },
            },
          }}
        />
      </BrowserRouter>
    </UserProvider>
  );
}

function MainApp() {
  const { usuario, cargando } = useUser();
  const location = useLocation();

  if (cargando) return <Spinner />;

  const rol = usuario?.rol;

  if (rol === 'Administrador' && location.pathname === '/') {
    return <Navigate to="/admin/empresas-pendientes" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {(rol !== 'Administrador') && (
          <>
            <Route index element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contactanos" element={<Contacto />} />
          </>
        )}

        {(rol === 'Empresa') && (
          <>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/tus-pedidos" element={<TusPedidos />} />
            <Route path="/pago" element={<PasarelaPago />} />
          </>
        )}

        {(rol === 'Administrador') && (
          <>
            <Route path="/admin/empresas-pendientes" element={<ListaEmpresasPendientes />} />
            <Route path="/admin/empresas-aprobadas" element={<ListaEmpresasAprobadas />} />
          </>
        )}

        <Route
          path="*"
          element={<Navigate to={rol === 'Administrador' ? '/admin/empresas-pendientes' : '/'} />}
        />
      </Route>

      <Route path="/authenticate" element={<AuthPanel />} />
    </Routes>
  );
}

export default App;
