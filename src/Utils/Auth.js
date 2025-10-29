
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
      fechaRegistro: new Date().toISOString()
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

    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
    return { exito: true, usuario };
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(USUARIO_KEY);
  },

  // Obtener usuario actual
  obtenerUsuarioActual: () => {
    try {
      return JSON.parse(localStorage.getItem(USUARIO_KEY));
    } catch {
      return null;
    }
  },

  // Verificar si está autenticado
  estaAutenticado: () => {
    return !!localStorage.getItem(USUARIO_KEY);
  }
};