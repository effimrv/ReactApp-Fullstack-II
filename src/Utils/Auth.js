
const USUARIO_KEY = 'levelupgamer_usuario';

export const authService = {
  // Registrar nuevo usuario
  registrar: (email, password, nombre) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el usuario ya existe
    if (usuarios.find(u => u.email === email)) {
      return { exito: false, error: 'El usuario ya existe' };
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: Date.now(),
      email,
      password, // En una app real esto estaría encriptado
      nombre,
      fechaRegistro: new Date().toISOString(),
  role: email === 'ara.escobar@duoc.cl' ? 'admin' : 'user'
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Iniciar sesión automáticamente
    localStorage.setItem(USUARIO_KEY, JSON.stringify(nuevoUsuario));
    
    return { exito: true, usuario: nuevoUsuario };
  },

  // Iniciar sesión
  login: (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (!usuario) {
      return { exito: false, error: 'Credenciales incorrectas' };
    }

    // Asegurarnos que el usuario tenga role (compatibilidad con usuarios previos)
  const usuarioConRole = { ...usuario, role: usuario.role || (usuario.email === 'ara.escobar@duoc.cl' ? 'admin' : 'user') };
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuarioConRole));
    return { exito: true, usuario };
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(USUARIO_KEY);
  },

  // Obtener usuario actual
  obtenerUsuarioActual: () => {
    try {
      const u = JSON.parse(localStorage.getItem(USUARIO_KEY));
  return u ? { ...u, role: u.role || (u.email === 'ara.escobar@duoc.cl' ? 'admin' : 'user') } : null;
    } catch {
      return null;
    }
  },

  // Verificar si está autenticado
  estaAutenticado: () => {
    return !!localStorage.getItem(USUARIO_KEY);
  }
};