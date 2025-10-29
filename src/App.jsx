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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;