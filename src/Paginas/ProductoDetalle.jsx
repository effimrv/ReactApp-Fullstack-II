import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaArrowLeft, FaUser } from 'react-icons/fa';
import { obtenerProductoPorId } from '../Data/productos';
import { localStorageService } from '../Data/localStorage';
import { reviewsService } from '../Data/reviews';
import { authService } from '../Utils/Auth';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [reseñas, setReseñas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({ total: 0, promedio: 0, distribucion: {} });
  const [mostrarFormReseña, setMostrarFormReseña] = useState(false);
  const [nuevaReseña, setNuevaReseña] = useState({
    rating: 5,
    comentario: ''
  });

  useEffect(() => {
    const productoData = obtenerProductoPorId(id);
    if (!productoData) {
      navigate('/productos');
      return;
    }
    setProducto(productoData);
    
    // Cargar reseñas y estadísticas
    const reseñasProducto = reviewsService.obtenerReseñas(parseInt(id));
    const stats = reviewsService.obtenerEstadisticas(parseInt(id));
    setReseñas(reseñasProducto);
    setEstadisticas(stats);
  }, [id, navigate]);

  const manejarAgregarCarrito = () => {
    for (let i = 0; i < cantidad; i++) {
      localStorageService.agregarAlCarrito(producto);
    }
    window.dispatchEvent(new Event('storage'));
  // Mostrar toast en vez de alert
  setToast({ visible: true, message: `¡${cantidad} ${producto.nombre} agregado(s) al carrito!` });
  // Ocultar después de 3s
  setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const manejarEnviarReseña = () => {
    const usuario = authService.obtenerUsuarioActual();
    
    if (!usuario) {
      setToast({ visible: true, message: 'Debes iniciar sesión para dejar una reseña' });
      setTimeout(() => setToast({ visible: false, message: '' }), 3000);
      return;
    }

    const resultado = reviewsService.agregarReseña(parseInt(id), {
      usuarioNombre: usuario.nombre,
      usuarioEmail: usuario.email,
      rating: nuevaReseña.rating,
      comentario: nuevaReseña.comentario
    });

    if (resultado.exito) {
      // Recargar reseñas y estadísticas
      const reseñasActualizadas = reviewsService.obtenerReseñas(parseInt(id));
      const statsActualizadas = reviewsService.obtenerEstadisticas(parseInt(id));
      setReseñas(reseñasActualizadas);
      setEstadisticas(statsActualizadas);
      
      // Limpiar formulario
      setNuevaReseña({ rating: 5, comentario: '' });
      setMostrarFormReseña(false);
      
      setToast({ visible: true, message: '¡Reseña agregada exitosamente!' });
      setTimeout(() => setToast({ visible: false, message: '' }), 3000);
    } else {
      setToast({ visible: true, message: 'Error al agregar la reseña' });
      setTimeout(() => setToast({ visible: false, message: '' }), 3000);
    }
  };

  const renderizarEstrellas = (rating, tamaño = '16') => {
    return (
      <div className="d-flex align-items-center">
        {[1, 2, 3, 4, 5].map(estrella => (
          <FaStar
            key={estrella}
            size={tamaño}
            color={estrella <= rating ? '#ffc107' : '#e4e5e9'}
          />
        ))}
      </div>
    );
  };

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-12">
          <div className="detalle-flex d-flex flex-column flex-md-row">
            <div className="detalle-left pe-md-3">
              <div className="detalle-imagen-contenedor rounded shadow">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="detalle-right ps-md-3 d-flex flex-column">
              <div className="detalle-contenido">
                <h1 className="display-6 fw-bold mb-3">{producto.nombre}</h1>

                <div className="d-flex align-items-center mb-3">
                  <div className="text-warning me-2">
                    <FaStar className="text-warning" />
                    <span className="ms-1">{producto.rating}</span>
                  </div>
                  <span className="text-muted">(128 reseñas)</span>
                </div>

                <h2 className="text-primary mb-4">${producto.precio.toLocaleString('es-CL')}</h2>

                <p className="lead mb-4">{producto.descripcion}</p>

                <div className="mb-4">
                  <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {producto.stock > 0 ? 'En Stock' : 'Agotado'}
                  </span>
                </div>

                <div className="row g-3 align-items-center mb-4">
                  <div className="col-auto">
                    <label className="form-label fw-bold">Cantidad:</label>
                  </div>
                  <div className="col-auto">
                    <div className="input-group" style={{width: '140px'}}>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                        disabled={cantidad <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center fw-bold" 
                        value={cantidad}
                        readOnly
                        style={{minWidth: '60px'}}
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                        disabled={cantidad >= producto.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">
                      Stock disponible: {producto.stock} unidades
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <button 
                    className="btn btn-primary btn-lg flex-fill"
                    onClick={manejarAgregarCarrito}
                    disabled={producto.stock === 0}
                  >
                    <FaShoppingCart className="me-2" />
                    Agregar al Carrito
                  </button>
                  <button className="btn btn-outline-primary btn-lg">
                    Comprar Ahora
                  </button>
                </div>
              </div>

              <div className="mt-3 mt-md-4 mt-auto">
                <Link to="/productos" className="btn btn-outline-secondary">
                  <FaArrowLeft className="me-2" />
                  Volver a Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Reseñas */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Reseñas y Calificaciones</h5>
                  <div className="d-flex align-items-center gap-2">
                    {renderizarEstrellas(estadisticas.promedio, 20)}
                    <span className="fw-bold">{estadisticas.promedio}/5</span>
                    <span className="text-muted">({estadisticas.total} reseñas)</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setMostrarFormReseña(!mostrarFormReseña)}
                >
                  Escribir Reseña
                </button>
              </div>
            </div>

            <div className="card-body">
              {/* Formulario de nueva reseña */}
              {mostrarFormReseña && (
                <div className="border rounded p-3 mb-4" style={{ 
                  background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #004d00 100%)',
                  border: '1px solid rgba(0, 255, 65, 0.3)'
                }}>
                  <h6 className="text-light">Escribir una reseña</h6>
                  
                  <div className="mb-3">
                    <label className="form-label text-light">Calificación</label>
                    <div className="d-flex gap-1">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => setNuevaReseña({...nuevaReseña, rating})}
                        >
                          <FaStar
                            size={24}
                            color={rating <= nuevaReseña.rating ? '#ffc107' : '#e4e5e9'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">Comentario</label>
                    <textarea
                      className="form-control bg-dark text-light border-secondary"
                      rows="3"
                      value={nuevaReseña.comentario}
                      onChange={(e) => setNuevaReseña({...nuevaReseña, comentario: e.target.value})}
                      placeholder="Comparte tu experiencia con este producto..."
                      style={{ backgroundColor: '#2d3748 !important' }}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={manejarEnviarReseña}
                      disabled={!nuevaReseña.comentario.trim()}
                    >
                      Enviar Reseña
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setMostrarFormReseña(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Lista de reseñas */}
              <div className="reseñas-list">
                {reseñas.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <p>No hay reseñas aún. ¡Sé el primero en dejar una reseña!</p>
                  </div>
                ) : (
                  reseñas.map(reseña => (
                    <div key={reseña.id} className="border-bottom py-3">
                      <div className="d-flex align-items-start gap-3">
                        <div className="d-flex align-items-center justify-content-center bg-light rounded-circle" 
                             style={{ width: '40px', height: '40px' }}>
                          <FaUser className="text-muted" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="fw-semibold">{reseña.usuarioNombre}</span>
                            {renderizarEstrellas(reseña.rating, 14)}
                          </div>
                          <p className="mb-1 text-muted">{reseña.comentario}</p>
                          <small className="text-muted">
                            {new Date(reseña.fecha).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast local */}
      {toast.visible && (
        <div className="toast-notification" role="status" aria-live="polite">
          <div className="toast-card shadow-lg">
            <div className="toast-body d-flex align-items-center small">
              <div className="toast-icon d-inline-flex align-items-center justify-content-center me-3">
                <FaShoppingCart />
              </div>
              <div className="toast-text">{toast.message}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;