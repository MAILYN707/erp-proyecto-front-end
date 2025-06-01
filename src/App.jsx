import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { ProtectedRoute } from '@components/routes/ProtectedRoute';
import { useUser } from './components/UserContext';
import { Spinner } from './components/Spinner'; //
//import { PublicRoute } from './components/routes/PublicRoute';
import { Home, Productos, Proveedores, SobreNosotros, Contacto, AuthPanel, Carrito, TusPedidos, PasarelaPago, ListaEmpresasPendientes, ListaEmpresasAprobadas, ListaUsuarios } from './pages';
import { Layout } from './components/Layout';


function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contactanos" element={<Contacto />} />
          <Route path="/carrito" element={
            <ProtectedRoute><Carrito /></ProtectedRoute>
          } />
          <Route path="/tus-pedidos" element={
            <ProtectedRoute><TusPedidos /></ProtectedRoute>
          } />
          <Route path="/pago" element={
            <ProtectedRoute><PasarelaPago /></ProtectedRoute>
          } />
            <Route path="/empresas-pendientes" element={<ListaEmpresasPendientes />} />
            <Route path="/empresas-aprobadas" element={<ListaEmpresasAprobadas/>} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
        </Route>

        <Route path="/authenticate" element={<AuthPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
