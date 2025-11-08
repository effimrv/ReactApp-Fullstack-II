
const CARRITO_KEY = 'levelupgamer_carrito';
const ORDERS_KEY = 'levelupgamer_orders_v1';

export const localStorageService = {
  obtenerCarrito: () => {
    try {
      return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    } catch {
      return [];
    }
  },

  guardarCarrito: (carrito) => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  },

  agregarAlCarrito: (producto) => {
    const carrito = localStorageService.obtenerCarrito();
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
    
    localStorageService.guardarCarrito(carrito);
    return carrito;
  },

  eliminarDelCarrito: (productoId) => {
    const carrito = localStorageService.obtenerCarrito().filter(item => item.id !== productoId);
    localStorageService.guardarCarrito(carrito);
    return carrito;
  },

  actualizarCantidad: (productoId, cantidad) => {
    const carrito = localStorageService.obtenerCarrito();
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
      if (cantidad <= 0) {
        return localStorageService.eliminarDelCarrito(productoId);
      }
      item.cantidad = cantidad;
      localStorageService.guardarCarrito(carrito);
    }
    
    return carrito;
  }
};

// Orders helpers
localStorageService.crearOrden = (orden) => {
  try {
    const ordenes = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    ordenes.push(orden);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(ordenes));
    return orden;
  } catch (e) {
    console.error('Error creando orden', e);
    return null;
  }
};

localStorageService.obtenerOrdenes = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
};

localStorageService.vaciarCarrito = () => {
  localStorageService.guardarCarrito([]);
  return [];
};