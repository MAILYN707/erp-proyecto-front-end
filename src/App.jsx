import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
//import { ProtectedRoute } from './components/routes/ProtectedRoute';
//import { PublicRoute } from './components/routes/PublicRoute';
import { Home, Productos, Proveedores, SobreNosotros, Contacto, AuthPanel, Carrito, TusPedidos, PasarelaPago } from './pages';
import { Layout } from './components/Layout';


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contactanos" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/tus-pedidos" element={<TusPedidos />} />
            <Route path="/pago" element={<PasarelaPago />} />
          </Route>

          <Route path="/authenticate" element={<AuthPanel />} />


          {/* Rutas protegidas */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )

}

export default App;
