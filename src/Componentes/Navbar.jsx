import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { authService } from '../Utils/Auth';
import { carritoUsuarioService } from '../Data/carritoUsuario';
import { localStorageService } from '../Data/localStorage';
import QuickAdminModal from './QuickAdminModal';

const Navbar = () => {
  const [contadorCarrito, setContadorCarrito] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const actualizarEstado = () => {
      const usuarioActual = authService.obtenerUsuarioActual();
      setUsuario(usuarioActual);
  // Si hay usuario, usamos el carrito por usuario; si no, usamos el carrito local
  const carrito = usuarioActual ? carritoUsuarioService.obtenerCarrito() : localStorageService.obtenerCarrito();
  const total = (carrito || []).reduce((sum, item) => sum + (item.cantidad || 0), 0);
      setContadorCarrito(total);
    };

    actualizarEstado();
    window.addEventListener('storage', actualizarEstado);
    return () => window.removeEventListener('storage', actualizarEstado);
  }, []);

  const manejarLogout = () => {
    authService.logout();
    setUsuario(null);
    setMenuAbierto(false);
    setContadorCarrito(0);
    navigate('/');
  };

  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleQuickAdmin = () => {
    const email = 'admin@admin.com';
    const password = 'admin';

    // Intentar login; si no existe el usuario, registrarlo
    const intento = authService.login(email, password);
    if (intento && intento.exito) {
      setUsuario(intento.usuario);
      navigate('/admin');
      return;
    }

    const registro = authService.registrar(email, password, 'Admin Test');
    if (registro && registro.exito) {
      setUsuario(registro.usuario);
      navigate('/admin');
      return;
    }

    // Fallback: crear directamente el objeto en localStorage
    const usuarioFake = { id: Date.now(), email, nombre: 'Admin Test', role: 'admin' };
    localStorage.setItem('levelupgamer_usuario', JSON.stringify(usuarioFake));
    setUsuario(usuarioFake);
    navigate('/admin');
  };

  // Cerrar dropdown cuando se hace click afuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener('mousedown', manejarClickFuera);
    return () => document.removeEventListener('mousedown', manejarClickFuera);
  }, []);

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
            {usuario && usuario.role === 'admin' && (
              <li className="nav-item">
                <Link to="/admin" className={`nav-link ${location.pathname.startsWith('/admin') ? 'active fw-bold' : ''}`}>
                  Admin
                </Link>
              </li>
            )}
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

            {/* Botón rápido para pruebas: abrir modal para entrar como admin cuando no hay usuario */}
            {!usuario && (
              <>
                <button className="btn btn-primary" onClick={() => setShowAdminModal(true)} title="Entrar como admin de pruebas">Entrar como admin</button>
                <QuickAdminModal show={showAdminModal} onClose={() => setShowAdminModal(false)} onConfirm={() => { setShowAdminModal(false); handleQuickAdmin(); }} />
              </>
            )}

            {usuario ? (
              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="btn btn-outline-secondary d-flex align-items-center"
                  type="button"
                  onClick={() => setMenuAbierto((v) => !v)}
                  aria-expanded={menuAbierto}
                >
                  <FaUser className="me-1" />
                  {usuario.nombre.split(' ')[0]}
                  <span
                    className="ms-2"
                    style={{
                      display: 'inline-block',
                      transition: 'transform 150ms ease',
                      transform: menuAbierto ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>

                {menuAbierto && (
                  <div className="card shadow-sm position-absolute end-0 mt-2" style={{ minWidth: 200, zIndex: 2000 }}>
                    <div className="card-body p-2">
                      <div className="small text-muted px-2">{usuario.email}</div>
                      <hr className="my-2" />
                      <button className="btn btn-link w-100 text-start" onClick={manejarLogout}>
                        <FaSignOutAlt className="me-1" /> Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
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