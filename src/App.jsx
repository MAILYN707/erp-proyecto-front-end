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
  ListaEmpresasAprobadas,
  PerfilEmpresa,
  Encargos,
  PublicarProducto
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
      {/* Layout general para todas las vistas */}
      <Route path="/" element={<Layout />}>

        {/* Rutas públicas: accesibles para todos menos admin */}
        {(rol !== 'Administrador') && (
          <>
            <Route index element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contactanos" element={<Contacto />} />
          </>
        )}

        {/* Rutas para Empresa autenticada */}
        {(rol === 'Empresa') && (
          <>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/tus-pedidos" element={<TusPedidos />} />
            <Route path="/pago" element={<PasarelaPago />} />
            <Route path="/perfil-empresa" element={<PerfilEmpresa />} />
            <Route path="/encargos" element={<Encargos />} />
            <Route path="/publicar" element={<PublicarProducto />} />
          </>
        )}

        {/* Rutas para Administrador */}
        {(rol === 'Administrador') && (
          <>
            <Route path="/admin/empresas-pendientes" element={<ListaEmpresasPendientes />} />
            <Route path="/admin/empresas-aprobadas" element={<ListaEmpresasAprobadas />} />
            {/* <Route path="/admin/usuarios" element={<ListaUsuarios />} /> */}
          </>
        )}

        {/* Si intenta acceder a cualquier ruta no permitida */}
        <Route
          path="*"
          element={<Navigate to={rol === 'Administrador' ? '/admin/empresas-pendientes' : '/'} />}
        />
      </Route>

      {/* Ruta de autenticación accesible para todos */}
      <Route path="/authenticate" element={<AuthPanel />} />
    </Routes>
  );
}

export default App;
