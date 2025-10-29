import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { authService } from '../Utils/Auth';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });
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

    // Validaciones básicas
    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden');
      setCargando(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setCargando(false);
      return;
    }

    const resultado = authService.registrar(
      formData.email,
      formData.password,
      formData.nombre
    );

    if (resultado.exito) {
      navigate('/');
      window.location.reload();
    } else {
      setError(resultado.error);
    }

    setCargando(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
                  <FaArrowLeft className="me-1" />
                  Volver al Inicio
                </Link>
                <h3 className="card-title">Crear Cuenta</h3>
                <p className="text-muted">Únete a LevelUpGamer</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={formData.nombre}
                      onChange={manejarCambio}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
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

                <div className="mb-3">
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
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirmar Contraseña</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      name="confirmarPassword"
                      className="form-control"
                      value={formData.confirmarPassword}
                      onChange={manejarCambio}
                      required
                      placeholder="Repite tu contraseña"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={cargando}
                >
                  {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>

                <div className="text-center">
                  <span className="text-muted">¿Ya tienes cuenta? </span>
                  <Link to="/login" className="text-decoration-none">
                    Inicia sesión aquí
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

export default Registro;