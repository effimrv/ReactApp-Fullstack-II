import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { authService } from '../Utils/Auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    const resultado = authService.login(formData.email, formData.password);
    
    if (resultado.exito) {
      // Redirigir según el rol del usuario
      if (resultado.usuario.role === 'admin') {
        window.location.href = '/admin'; // Forzar recarga para admins
      } else {
        navigate('/');
        window.location.reload(); // Recargar para actualizar estado de auth
      }
    } else {
      setError(resultado.error);
    }
    
    setCargando(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
                  <FaArrowLeft className="me-1" />
                  Volver al Inicio
                </Link>
                <h3 className="card-title">Iniciar Sesión</h3>
                <p className="text-muted">Accede a tu cuenta</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={manejarCambio}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Contraseña</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={manejarCambio}
                      required
                      placeholder="Tu contraseña"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={cargando}
                >
                  {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>

                <div className="text-center">
                  <span className="text-muted">¿No tienes cuenta? </span>
                  <Link to="/registro" className="text-decoration-none">
                    Regístrate aquí
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;