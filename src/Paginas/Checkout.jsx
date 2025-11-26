import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageService } from '../Data/localStorage';

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(localStorageService.obtenerCarrito());
  }, []);

  const calcularSubtotal = () => items.reduce((t, i) => t + (i.precio * i.cantidad), 0);
  const calcularEnvio = () => calcularSubtotal() > 200000 ? 0 : 3000;
  const calcularTotal = () => calcularSubtotal() + calcularEnvio();

  const handleResultado = (aceptada) => {
    const subtotal = calcularSubtotal();
    const envio = calcularEnvio();
    const total = calcularTotal();

    const orden = {
      id: `ord_${Date.now()}`,
      fecha: new Date().toISOString(),
      items,
      subtotal,
      envio,
      total,
      estado: aceptada ? 'accepted' : 'rejected'
    };

    // Guardar la orden aunque sea rechazada (para registro), y si fue aceptada vaciar el carrito
    localStorageService.crearOrden(orden);

    if (aceptada) {
      localStorageService.vaciarCarrito();
      window.dispatchEvent(new Event('storage'));
    }

    // Navegar a la pantalla de resultado, pasando estado
    navigate('/order-result', { state: { ordenId: orden.id, estado: orden.estado } });
  };

  if (!items || items.length === 0) {
    return (
      <div className="container py-5">
        <h2>No hay productos en el carrito</h2>
        <p>Agrega productos antes de proceder al pago.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Proceder al Pago</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Resumen de compra</h5>
          <ul className="list-unstyled mb-3">
            {items.map(it => (
              <li key={it.id} className="d-flex justify-content-between py-2 border-bottom">
                <span>{it.nombre} x {it.cantidad}</span>
                <strong>${(it.precio * it.cantidad).toLocaleString('es-CL')}</strong>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <strong>${calcularSubtotal().toLocaleString('es-CL')}</strong>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Envío</span>
            <strong>{calcularEnvio() === 0 ? 'Gratis' : `$${calcularEnvio().toLocaleString('es-CL')}`}</strong>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-0 fw-bold fs-5">
            <span>Total</span>
            <span>${calcularTotal().toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-success" onClick={() => handleResultado(true)}>Aceptar pago (simular éxito)</button>
        <button className="btn btn-danger" onClick={() => handleResultado(false)}>Rechazar pago (simular fallo)</button>
      </div>
    </div>
  );
};

export default Checkout;
