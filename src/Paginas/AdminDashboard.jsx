import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Panel de Administración</h1>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Productos</h5>
            <p className="text-muted">Gestiona los productos de la tienda</p>
            <Link to="/admin/products" className="btn btn-primary">Ir a Productos</Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Usuarios</h5>
            <p className="text-muted">Ver y gestionar usuarios</p>
            <Link to="/admin/users" className="btn btn-primary">Ir a Usuarios</Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Órdenes</h5>
            <p className="text-muted">Ver órdenes (simulado)</p>
            <Link to="/admin/orders" className="btn btn-primary">Ir a Órdenes</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
