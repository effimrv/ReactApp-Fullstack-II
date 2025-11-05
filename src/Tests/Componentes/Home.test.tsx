import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../Paginas/Home';

// Mock de los productos
vi.mock('../../Data/productos', () => ({
  obtenerProductos: vi.fn(() => [
    {
      id: 1,
      nombre: 'Test Product 1',
      precio: 99990,
      category: 'consolas',
      imagen: '/test1.jpg',
      descripcion: 'Test description 1',
      rating: 4.5,
      stock: 10
    },
    {
      id: 2,
      nombre: 'Test Product 2',
      precio: 79990,
      category: 'perifericos',
      imagen: '/test2.jpg',
      descripcion: 'Test description 2',
      rating: 4.2,
      stock: 5
    }
  ])
}));

describe('Home Page', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  test('renders hero section with correct content', () => {
    renderComponent();
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/Eleva tu/);
  expect(heading).toHaveTextContent(/Experiencia/);
  expect(heading).toHaveTextContent(/Gaming/);
  expect(screen.getByText('Explorar Productos')).toBeInTheDocument();
  });

  test('renders features section', () => {
    renderComponent();
    
  expect(screen.getByText('Envío Gratis')).toBeInTheDocument();
  expect(screen.getByText(/Garantía/)).toBeInTheDocument();
  expect(screen.getByText(/Soporte/)).toBeInTheDocument();
  });

  test('renders featured products section', () => {
    renderComponent();
    
    expect(screen.getByText('Productos Destacados')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  test('renders call to action section', () => {
    renderComponent();
    
  // Hero already has "Explorar Productos"; below there is a CTA to view all products
  expect(screen.getByText('Explorar Productos')).toBeInTheDocument();
  expect(screen.getByText('Ver Todos los Productos')).toBeInTheDocument();
  });
});
