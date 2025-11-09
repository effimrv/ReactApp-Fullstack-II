// Servicio para manejar las reseñas de productos

const REVIEWS_KEY = 'levelupgamer_reviews';

export const reviewsService = {
  // Obtener todas las reseñas de un producto
  obtenerReseñas: (productoId) => {
    try {
      const todasLasReseñas = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
      return todasLasReseñas[productoId] || [];
    } catch {
      return [];
    }
  },

  // Agregar nueva reseña
  agregarReseña: (productoId, reseña) => {
    try {
      const todasLasReseñas = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
      
      if (!todasLasReseñas[productoId]) {
        todasLasReseñas[productoId] = [];
      }

      const nuevaReseña = {
        id: Date.now(),
        usuarioNombre: reseña.usuarioNombre,
        usuarioEmail: reseña.usuarioEmail,
        rating: reseña.rating,
        comentario: reseña.comentario,
        fecha: new Date().toISOString()
      };

      todasLasReseñas[productoId].push(nuevaReseña);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(todasLasReseñas));
      
      return { exito: true, reseña: nuevaReseña };
    } catch (error) {
      return { exito: false, error: 'Error al guardar la reseña' };
    }
  },

  // Calcular rating promedio de un producto
  calcularRatingPromedio: (productoId) => {
    const reseñas = reviewsService.obtenerReseñas(productoId);
    if (reseñas.length === 0) return 0;
    
    const suma = reseñas.reduce((acc, reseña) => acc + reseña.rating, 0);
    return Number((suma / reseñas.length).toFixed(1));
  },

  // Obtener estadísticas de reseñas
  obtenerEstadisticas: (productoId) => {
    const reseñas = reviewsService.obtenerReseñas(productoId);
    const total = reseñas.length;
    
    if (total === 0) return { total: 0, promedio: 0, distribucion: {} };

    const distribucion = {
      5: reseñas.filter(r => r.rating === 5).length,
      4: reseñas.filter(r => r.rating === 4).length,
      3: reseñas.filter(r => r.rating === 3).length,
      2: reseñas.filter(r => r.rating === 2).length,
      1: reseñas.filter(r => r.rating === 1).length
    };

    return {
      total,
      promedio: reviewsService.calcularRatingPromedio(productoId),
      distribucion
    };
  }
};