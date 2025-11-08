import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { localStorageService } from '../Data/localStorage';

const OrderResult = () => {
  const location = useLocation();
  const state = location.state || {};
  const { ordenId, estado } = state;

  let orden = null;
  if (ordenId) {
    const ordenes = localStorageService.obtenerOrdenes();
    orden = ordenes.find(o => o.id === ordenId) || null;
  }

  const titulo = estado === 'accepted' ? 'Pago Aceptado' : 'Pago Rechazado';
  const descripcion = estado === 'accepted'
    ? 'Tu compra fue procesada correctamente. Se generó una orden.'
    : 'La transacción fue rechazada. Puedes intentar nuevamente o contactarnos.';

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body text-center">
          <h2 className="mb-3">{titulo}</h2>
          <p className="mb-4">{descripcion}</p>

          {orden && (
            <div className="mb-4">
              <h5>Orden: {orden.id}</h5>
              <p>Fecha: {new Date(orden.fecha).toLocaleString()}</p>
              <p>Total: ${orden.total.toLocaleString('es-CL')}</p>
            </div>
          )}

          <div className="d-flex justify-content-center gap-3">
            <Link to="/productos" className="btn btn-primary">Seguir comprando</Link>
            <Link to="/carrito" className="btn btn-outline-secondary">Ver carrito</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderResult;
