import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ProductoCard from '../Componentes/ProductoCard';
import { obtenerProductos, obtenerProductosPorCategoria, categorias } from '../Data/productos';

const Productos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const productosFiltrados = categoriaSeleccionada === 'todos' 
    ? obtenerProductos()
    : obtenerProductosPorCategoria(categoriaSeleccionada);

  const productos = terminoBusqueda
    ? productosFiltrados.filter(p => 
        p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase())
      )
    : productosFiltrados;

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Nuestros Productos</h1>
        <p className="lead text-muted">Encuentra lo mejor en tecnología gaming</p>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group buscador-productos">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select 
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Productos */}
      <div className="row g-4">
        {productos.map(producto => (
          <div key={producto.id} className="col-sm-6 col-lg-4">
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>

      {productos.length === 0 && (
        <div className="text-center py-5">
          <h5>No se encontraron productos</h5>
          <p className="text-muted">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Productos;