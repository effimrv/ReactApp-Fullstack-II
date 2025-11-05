import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Productos from '../../Paginas/Productos';
import { BrowserRouter } from 'react-router-dom';

// Mock del módulo de productos con datos controlados
vi.mock('../../Data/productos', () => {
  const productos = [
    { id: 1, nombre: 'PS5', precio: 499990, categoria: 'consolas', imagen: '', descripcion: 'Consola', rating: 4.5, stock: 10 },
    { id: 2, nombre: 'Mouse Gamer', precio: 49990, categoria: 'perifericos', imagen: '', descripcion: 'Mouse', rating: 4.7, stock: 20 },
    { id: 3, nombre: 'Xbox Series X', precio: 529990, categoria: 'consolas', imagen: '', descripcion: 'Consola Xbox', rating: 4.6, stock: 5 }
  ];

  return {
    obtenerProductos: vi.fn(() => productos),
    obtenerProductosPorCategoria: vi.fn((categoria: string) => productos.filter(p => p.categoria === categoria)),
    categorias: [
      { id: 'todos', nombre: 'Todos los Productos' },
      { id: 'consolas', nombre: 'Consolas' },
      { id: 'perifericos', nombre: 'Periféricos' }
    ]
  };
});

describe('Filtrado de productos por categoría', () => {
  test('muestra solo productos de la categoría consolas', async () => {
    render(
      <BrowserRouter>
        <Productos />
      </BrowserRouter>
    );

    // Seleccionar la opción "Consolas"
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'consolas');

    // Verificar que los productos de consolas se muestran
    expect(screen.getByText('PS5')).toBeInTheDocument();
    expect(screen.getByText('Xbox Series X')).toBeInTheDocument();

    // Y que los de otra categoría no se muestran
    expect(screen.queryByText('Mouse Gamer')).toBeNull();
  });

  test('muestra solo productos de la categoría perifericos', async () => {
    // Renderizar de nuevo para estado limpio
    render(
      <BrowserRouter>
        <Productos />
      </BrowserRouter>
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'perifericos');

    expect(screen.getByText('Mouse Gamer')).toBeInTheDocument();
    expect(screen.queryByText('PS5')).toBeNull();
    expect(screen.queryByText('Xbox Series X')).toBeNull();
  });
});
