import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { localStorageService } from '../Data/localStorage';
import { obtenerProductoPorId } from '../Data/productos';

const Carrito = () => {
  const [itemsCarrito, setItemsCarrito] = useState([]);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carrito = localStorageService.obtenerCarrito();
    const itemsConDetalles = carrito.map(item => ({
      ...item,
      ...obtenerProductoPorId(item.id) || {}
    }));
    setItemsCarrito(itemsConDetalles);
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }
    localStorageService.actualizarCantidad(productoId, nuevaCantidad);
    cargarCarrito();
    window.dispatchEvent(new Event('storage'));
  };

  const eliminarDelCarrito = (productoId) => {
    localStorageService.eliminarDelCarrito(productoId);
    cargarCarrito();
    window.dispatchEvent(new Event('storage'));
  };

  const calcularSubtotal = () => itemsCarrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const calcularEnvio = () => calcularSubtotal() > 50000 ? 0 : 3000;
  const calcularTotal = () => calcularSubtotal() + calcularEnvio();

  if (itemsCarrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <FaShoppingBag className="text-muted mb-3" style={{fontSize: '4rem'}} />
          <h2>Tu carrito está vacío</h2>
          <p className="text-muted mb-4">¡Agrega algunos productos para comenzar!</p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            <FaArrowLeft className="me-2" />
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="display-5 fw-bold mb-4">Tu Carrito de Compras</h1>

      <div className="row">
        <div className="col-lg-8">
          {itemsCarrito.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre}
                      className="img-fluid rounded"
                      style={{height: '80px', objectFit: 'cover'}}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="text-primary fw-bold mb-0">
                      ${item.precio.toLocaleString('es-CL')} c/u
                    </p>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center flex-nowrap">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-3 fw-bold">{item.cantidad}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center justify-content-end">
                    <h5 className="text-primary mb-0">
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </h5>
                  </div>
                  <div className="col-md-1 d-flex align-items-center justify-content-end">
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="btn btn-outline-danger btn-sm align-self-center"
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Resumen de Compra</h4>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({itemsCarrito.length} productos)</span>
                  <span>${calcularSubtotal().toLocaleString('es-CL')}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío</span>
                  <span className={calcularEnvio() === 0 ? 'text-success fw-bold' : ''}>
                    {calcularEnvio() === 0 ? 'Gratis' : `$${calcularEnvio().toLocaleString('es-CL')}`}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>${calcularTotal().toLocaleString('es-CL')}</span>
                </div>
              </div>

              <a href="/checkout" className="btn btn-primary btn-lg w-100 mb-3">
                Proceder al Pago
              </a>

              <Link to="/productos" className="btn btn-outline-primary w-100">
                <FaArrowLeft className="me-2" />
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;