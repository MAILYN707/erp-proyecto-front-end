import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser, UserProvider } from './components/UserContext';
import { Spinner } from './components/Spinner';
import { Home, Productos, Proveedores, SobreNosotros, Contacto, AuthPanel, Carrito, TusPedidos, PasarelaPago, ListaEmpresasPendientes, ListaEmpresasAprobadas, ListaUsuarios } from './pages';
import { Layout } from './components/Layout';



function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainApp />
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
          <Route path="*" element={<Navigate to={rol === 'Administrador' ? "/admin/empresas-pendientes" : "/"} />} />

        </Route>

        {/* Ruta de autenticación accesible para todos */}
        <Route path="/authenticate" element={<AuthPanel />} />
      </Routes>
  );
}

export default App;
