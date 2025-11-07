import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('productos CRUD (Data/productos.js)', () => {
  beforeEach(() => {
    // Asegurar entorno limpio y reiniciar módulos para volver a cargar el servicio
    localStorage.clear();
    vi.resetModules();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe cargar productos iniciales', async () => {
    const mod = await import('../../Data/productos.js');
    const { obtenerProductos } = mod;
    const list = obtenerProductos();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  it('agregarProducto agrega un nuevo producto y retorna con id', async () => {
    const mod = await import('../../Data/productos.js');
    const { agregarProducto, obtenerProductos } = mod;

    const nuevo = { nombre: 'TestProd', precio: 1000, categoria: 'accesorios', descripcion: 'x', imagen: '', stock: 5 };
    const creado = agregarProducto(nuevo);
    expect(creado).toHaveProperty('id');

    const all = obtenerProductos();
    expect(all.find(p => p.id === creado.id)).toBeTruthy();
  });

  it('actualizarProducto actualiza campos correctamente', async () => {
    const mod = await import('../../Data/productos.js');
    const { agregarProducto, actualizarProducto, obtenerProductoPorId } = mod;

    const nuevo = { nombre: 'ToUpdate', precio: 500, categoria: 'accesorios', descripcion: 'a', imagen: '', stock: 2 };
    const creado = agregarProducto(nuevo);

    actualizarProducto(creado.id, { nombre: 'Updated', precio: 999 });
    const actualizado = obtenerProductoPorId(creado.id);
    expect(actualizado.nombre).toBe('Updated');
    expect(actualizado.precio).toBe(999);
  });

  it('eliminarProducto elimina el producto', async () => {
    const mod = await import('../../Data/productos.js');
    const { agregarProducto, eliminarProducto, obtenerProductos } = mod;

    const nuevo = { nombre: 'ToDelete', precio: 10, categoria: 'accesorios', descripcion: '', imagen: '', stock: 1 };
    const creado = agregarProducto(nuevo);

    const before = obtenerProductos();
    expect(before.find(p => p.id === creado.id)).toBeTruthy();

    eliminarProducto(creado.id);
    const after = obtenerProductos();
    expect(after.find(p => p.id === creado.id)).toBeFalsy();
  });
});
