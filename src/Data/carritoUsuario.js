export const carritoUsuarioService = {
  obtenerCarrito: () => {
    const usuario = JSON.parse(localStorage.getItem('levelupgamer_usuario'));
    if (!usuario) return [];
    
    const carritos = JSON.parse(localStorage.getItem('carritos_usuarios') || '{}');
    return carritos[usuario.id] || [];
  },

  guardarCarrito: (carrito) => {
    const usuario = JSON.parse(localStorage.getItem('levelupgamer_usuario'));
    if (!usuario) return;
    
    const carritos = JSON.parse(localStorage.getItem('carritos_usuarios') || '{}');
    carritos[usuario.id] = carrito;
    localStorage.setItem('carritos_usuarios', JSON.stringify(carritos));
  },

  agregarAlCarrito: (producto) => {
    const carrito = carritoUsuarioService.obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);
    
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      });
    }
    
    carritoUsuarioService.guardarCarrito(carrito);
    return carrito;
  }
};