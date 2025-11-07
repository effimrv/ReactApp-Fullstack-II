import React from 'react';

const AdminOrders = () => {
  // No hay sistema de órdenes en la app actual; mostramos mensaje simulado
  return (
    <div className="container py-4">
      <h2>Órdenes (simulado)</h2>
      <p className="text-muted">Aquí se listarían las órdenes realizadas por los usuarios. Actualmente no hay un backend, así que esta vista es de ejemplo.</p>
      <div className="card p-3">
        <p>No hay órdenes en este entorno de demostración.</p>
      </div>
    </div>
  );
};

export default AdminOrders;
