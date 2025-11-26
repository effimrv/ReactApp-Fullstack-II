import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// Seed admin user in localStorage for development / testing
const seedAdminUser = () => {
  try {
    const usuariosRaw = localStorage.getItem('usuarios');
    const usuarios = usuariosRaw ? JSON.parse(usuariosRaw) : [];
    
    // Eliminar el admin viejo si existe
    const indexAdminViejo = usuarios.findIndex(u => u.email === 'ara.escobar@duoc.cl');
    if (indexAdminViejo !== -1) {
      usuarios.splice(indexAdminViejo, 1);
      console.info('[seed] admin eliminado: ara.escobar@duoc.cl');
    }

    // Lista de administradores
    const adminsList = [
      {
        email: 'cely@levelupgamer.com',
        password: 'level1234',
        nombre: 'Administrador'
      },
      {
        email: 'maca@levelupgamer.com',
        password: 'level1234',
        nombre: 'Administrador'
      },
      {
        email: 'benja@levelupgamer.com',
        password: 'level1234',
        nombre: 'Administrador'
      }
    ];

    // Crear/actualizar cada administrador
    adminsList.forEach((adminData, index) => {
      const existeAdmin = usuarios.find(u => u.email === adminData.email);
      if (!existeAdmin) {
        const admin = {
          id: Date.now() + index,
          email: adminData.email,
          password: adminData.password,
          nombre: adminData.nombre,
          fechaRegistro: new Date().toISOString(),
          role: 'admin'
        };
        usuarios.push(admin);
        console.info(`[seed] admin creado: ${adminData.email} / ${adminData.password}`);
      } else if (existeAdmin.nombre !== adminData.nombre) {
        // Actualizar el nombre si ya existe pero con nombre diferente
        existeAdmin.nombre = adminData.nombre;
        console.info(`[seed] admin actualizado: ${adminData.email} - nombre cambiado a "${adminData.nombre}"`);
      }
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
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