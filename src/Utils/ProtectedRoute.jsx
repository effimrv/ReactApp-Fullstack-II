import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from './Auth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const usuario = authService.obtenerUsuarioActual();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && usuario.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
