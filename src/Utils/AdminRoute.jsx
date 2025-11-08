import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from './Auth';

// Componente para redirigir automáticamente a los admins al dashboard
const AdminRoute = ({ children }) => {
  const usuario = authService.obtenerUsuarioActual();
  
  // Si el usuario es admin, redirigir al dashboard administrativo
  if (usuario && usuario.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  // Si no es admin, mostrar el contenido normal
  return children;
};

export default AdminRoute;