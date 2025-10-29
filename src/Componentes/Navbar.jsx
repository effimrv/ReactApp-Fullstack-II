import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { authService } from '../Utils/Auth';
import { carritoUsuarioService } from '../Data/carritoUsuario';

const Navbar = () => {
  const [contadorCarrito, setContadorCarrito] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const actualizarEstado = () => {
      const usuarioActual = authService.obtenerUsuarioActual();
      setUsuario(usuarioActual);
      
      const carrito = usuarioActual ? carritoUsuarioService.obtenerCarrito() : [];
      const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
      setContadorCarrito(total);
    };

    actualizarEstado();
    window.addEventListener('storage', actualizarEstado);
    return () => window.removeEventListener('storage', actualizarEstado);
  }, []);

  const manejarLogout = () => {
    authService.logout();
    setUsuario(null);
    setContadorCarrito(0);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-3">
          LevelUp<span className="text-primary">Gamer</span>
        </Link>

        <button 
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FaBars />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : ''}`}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className={`nav-link ${location.pathname === '/productos' ? 'active fw-bold' : ''}`}>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/nosotros" className={`nav-link ${location.pathname === '/nosotros' ? 'active fw-bold' : ''}`}>
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className={`nav-link ${location.pathname === '/contacto' ? 'active fw-bold' : ''}`}>
                Contacto
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-outline-primary position-relative">
              <FaShoppingCart />
              {contadorCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {contadorCarrito}
                </span>
              )}
            </Link>

            {usuario ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUser className="me-1" />
                  {usuario.nombre.split(' ')[0]}
                </button>
                <ul className="dropdown-menu">
                  <li><span className="dropdown-item-text small text-muted">{usuario.email}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={manejarLogout}>
                      <FaSignOutAlt className="me-1" />
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-secondary">
                <FaUser className="me-1" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;