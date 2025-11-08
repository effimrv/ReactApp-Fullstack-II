import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

// Mock productos para tener datos controlados
vi.mock('../../Data/productos', () => {
  const productos = [
    {
      id: 1,
      nombre: 'Prod A',
      precio: 49990,
      categoria: 'consolas',
      imagen: '/prod-a.jpg',
      descripcion: 'Producto A descripcion',
      rating: 4.7,
      stock: 10
    }
  ];

  return {
    obtenerProductos: vi.fn(() => productos),
    obtenerProductosPorCategoria: vi.fn(() => productos),
    obtenerProductoPorId: vi.fn((id) => productos.find(p => p.id === id)),
    categorias: []
  };
});

describe('E2E flujo carrito -> proceder al pago', () => {
  test('desde Home a Productos, agregar al carrito y proceder al pago', async () => {
    render(<App />);

    // Ir a Productos desde el hero (botón "Explorar Productos")
    const explorar = await screen.findByText('Explorar Productos');
    await userEvent.click(explorar);

    // Esperar que la página de productos muestre el listado
    await waitFor(() => expect(screen.getByText('Nuestros Productos')).toBeInTheDocument());

    // Encontrar la tarjeta del producto y dentro buscar el botón que agrega al carrito
    const productoCard = screen.getByText('Prod A').closest('.card');
    expect(productoCard).toBeTruthy();

    const { getByRole } = within(productoCard as HTMLElement);
    const addBtn = getByRole('button'); // el botón circular del carrito
    await userEvent.click(addBtn);

    // Navegar al carrito usando el link con href '/carrito'
    const carritoLink: HTMLAnchorElement | null = document.querySelector('a[href="/carrito"]');
    expect(carritoLink).toBeTruthy();
    if (carritoLink) await userEvent.click(carritoLink);

    // Verificar que estamos en la página del carrito y que el producto aparece
    await waitFor(() => expect(screen.getByText('Tu Carrito de Compras')).toBeInTheDocument());
    expect(screen.getByText('Prod A')).toBeInTheDocument();

    // Click en Proceder al Pago (es un enlace, no un botón)
    const procederLink = screen.getByRole('link', { name: /Proceder al Pago/i });
    await userEvent.click(procederLink);

    // Afirmar que el enlace existe y que tras click sigue presente (no hay navegación definida)
    expect(procederLink).toBeInTheDocument();
  });
});
