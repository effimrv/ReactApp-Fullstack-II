import React, { useEffect, useState, useRef } from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto, categorias } from '../Data/productos';
import AdminProductCard from '../Componentes/AdminProductCard';

const ProductoForm = ({ onSave, productoInicial, onCancel }) => {
  const [form, setForm] = useState(productoInicial || { nombre: '', precio: '', categoria: 'consolas', descripcion: '', imagen: '', stock: 1 });

  const [sinStock, setSinStock] = useState(!!(productoInicial && productoInicial.stock === 0));

  useEffect(() => setForm(productoInicial || { nombre: '', precio: '', categoria: 'consolas', descripcion: '', imagen: '', stock: 1 }), [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'precio' || name === 'stock' ? Number(value) : value }));
  };

  useEffect(() => {
    setSinStock(!!(productoInicial && productoInicial.stock === 0));
  }, [productoInicial]);

  const handleSinStock = (e) => {
    const checked = e.target.checked;
    setSinStock(checked);
    setForm(prev => ({ ...prev, stock: checked ? 0 : (prev.stock === 0 ? 1 : prev.stock) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre) return;
    onSave(form);
    setForm({ nombre: '', precio: '', categoria: 'consolas', descripcion: '', imagen: '', stock: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 card p-3 admin-form-green">
      <div className="row g-2">
        <div className="col-md-4">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="form-control" />
        </div>
        <div className="col-md-2">
          <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" type="number" className="form-control" />
        </div>
        <div className="col-md-2">
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" min="0" className="form-control" disabled={sinStock} />
        </div>
        <div className="col-md-1 d-flex align-items-center">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="sinStockSwitch" checked={sinStock} onChange={handleSinStock} />
            <label className="form-check-label small text-muted" htmlFor="sinStockSwitch">Sin stock</label>
          </div>
        </div>
        <div className="col-md-3">
          <select name="categoria" value={form.categoria} onChange={handleChange} className="form-select">
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-success" type="submit">Guardar</button>
          {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
        </div>
        <div className="col-12 mt-2">
          <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL imagen" className="form-control" />
        </div>
        <div className="col-12 mt-2">
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="form-control" />
        </div>
      </div>
    </form>
  );
};

const AdminProducts = () => {
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);

  const cargar = () => setProductos(obtenerProductos());
  const formRef = useRef(null);

  useEffect(() => {
    cargar();
  }, []);

  const handleSave = (producto) => {
    if (editing) {
      actualizarProducto(editing.id, producto);
      setEditing(null);
    } else {
      agregarProducto(producto);
    }
    cargar();
    // scroll to products list after save for feedback
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEdit = (p) => setEditing(p);

  const handleDelete = (id) => {
    if (!confirm('Eliminar producto?')) return;
    eliminarProducto(id);
    cargar();
  };

  const handleToggleStock = (p) => {
    const nuevoStock = p.stock > 0 ? 0 : 1;
    actualizarProducto(p.id, { stock: nuevoStock });
    cargar();
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Gestión de Productos</h2>
        <div className="text-muted small">Productos: {productos.length}</div>
      </div>

      <div ref={formRef}>
        <ProductoForm onSave={handleSave} productoInicial={editing} onCancel={() => setEditing(null)} />
      </div>

      <div className="row g-4">
        {productos.map(p => (
          <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
            <AdminProductCard producto={p} onEdit={handleEdit} onDelete={handleDelete} onToggleStock={handleToggleStock} />
          </div>
        ))}
      </div>

      {productos.length === 0 && (
        <div className="text-center py-5">
          <h5>No hay productos</h5>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
