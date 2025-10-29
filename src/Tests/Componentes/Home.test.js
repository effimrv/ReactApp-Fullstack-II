import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/Home';

// Mock de los productos
jest.mock('../../data/products', () => ({
  getProducts: jest.fn(() => [
    {
      id: 1,
      name: 'Test Product 1',
      price: 99990,
      category: 'consolas',
      image: '/test1.jpg',
      description: 'Test description 1',
      rating: 4.5,
      stock: 10
    },
    {
      id: 2,
      name: 'Test Product 2',
      price: 79990,
      category: 'perifericos',
      image: '/test2.jpg',
      description: 'Test description 2',
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
    
    expect(screen.getByText(/Tecnología Gaming de/)).toBeInTheDocument();
    expect(screen.getByText(/Alto Rendimiento/)).toBeInTheDocument();
    expect(screen.getByText('Ver Productos')).toBeInTheDocument();
  });

  test('renders features section', () => {
    renderComponent();
    
    expect(screen.getByText('Envío Gratis')).toBeInTheDocument();
    expect(screen.getByText('Garantía Extendida')).toBeInTheDocument();
    expect(screen.getByText('Soporte 24/7')).toBeInTheDocument();
  });

  test('renders featured products section', () => {
    renderComponent();
    
    expect(screen.getByText('Productos Destacados')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  test('renders call to action section', () => {
    renderComponent();
    
    expect(screen.getByText(/¿Listo para Mejorar tu Setup Gaming?/)).toBeInTheDocument();
    expect(screen.getByText('Comprar Ahora')).toBeInTheDocument();
  });
});