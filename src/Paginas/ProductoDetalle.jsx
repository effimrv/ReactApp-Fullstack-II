import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { obtenerProductoPorId } from '../Data/productos';
import { localStorageService } from '../Data/localStorage';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const productoData = obtenerProductoPorId(id);
    if (!productoData) {
      navigate('/productos');
      return;
    }
    setProducto(productoData);
  }, [id, navigate]);

  const manejarAgregarCarrito = () => {
    for (let i = 0; i < cantidad; i++) {
      localStorageService.agregarAlCarrito(producto);
    }
    window.dispatchEvent(new Event('storage'));
    alert(`¡${cantidad} ${producto.nombre} agregado(s) al carrito!`);
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
        <div className="col-md-6">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="img-fluid rounded shadow"
          />
        </div>
        
        <div className="col-md-6">
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
              <div className="input-group" style={{width: '120px'}}>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                >
                  -
                </button>
                <input 
                  type="text" 
                  className="form-control text-center" 
                  value={cantidad}
                  readOnly
                />
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setCantidad(cantidad + 1)}
                >
                  +
                </button>
              </div>
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

          <div className="mt-4">
            <Link to="/productos" className="btn btn-outline-secondary">
              <FaArrowLeft className="me-2" />
              Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;