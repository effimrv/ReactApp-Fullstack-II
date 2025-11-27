import React from 'react';

const AdminOrders = () => {
  // No hay sistema de órdenes en la app actual; mostramos mensaje simulado
  return (
    <div className="container py-4">
      <h2>Órdenes</h2>
      <div className="card p-3">
        <p>No hay órdenes en este momento</p>
      </div>
    </div>
  );
};

export default AdminOrders;
