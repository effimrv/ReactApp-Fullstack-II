import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// Seed admin user in localStorage for development / testing
const seedAdminUser = () => {
  try {
    const usuariosRaw = localStorage.getItem('usuarios');
    const usuarios = usuariosRaw ? JSON.parse(usuariosRaw) : [];
    const existeAdmin = usuarios.find(u => u.email === 'admin@admin.com');
    if (!existeAdmin) {
      const admin = {
        id: Date.now(),
        email: 'admin@admin.com',
        password: 'admin',
        nombre: 'Administrador',
        fechaRegistro: new Date().toISOString(),
        role: 'admin'
      };
      usuarios.push(admin);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.info('[seed] admin creado: admin@admin.com / admin');
    }
  } catch (e) {
    // no bloquear la app si falla el seed
    console.warn('No se pudo ejecutar seed de admin', e);
  }
};

seedAdminUser();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);