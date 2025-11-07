import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Componentes/Navbar';
import Home from './Paginas/Home';
import Productos from './Paginas/Productos';
import ProductoDetalle from './Paginas/ProductoDetalle';
import Carrito from './Paginas/Carrito';
import Nosotros from './Paginas/Nosotros';
import Contacto from './Paginas/Contacto';
import Login from './Paginas/Login';
import Registro from './Paginas/Registro';

// Admin
import ProtectedRoute from './Utils/ProtectedRoute';
import AdminDashboard from './Paginas/AdminDashboard';
import AdminProducts from './Paginas/AdminProducts';
import AdminUsers from './Paginas/AdminUsers';
import AdminOrders from './Paginas/AdminOrders';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/global.css';
import './Styles/estilos.css';
import './Styles/components.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Admin routes - protegidas */}
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute adminOnly={true}><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;