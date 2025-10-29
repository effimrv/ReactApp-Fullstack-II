import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

// Mock de localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = mockLocalStorage;

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99990,
  category: 'consolas',
  image: '/test-image.jpg',
  description: 'Test product description',
  rating: 4.5,
  stock: 10,
  features: ['Feature 1', 'Feature 2']
};

describe('ProductCard Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <ProductCard product={mockProduct} {...props} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([]));
  });

  test('renders product information correctly', () => {
    renderComponent();
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test product description')).toBeInTheDocument();
    expect(screen.getByText('$99.990')).toBeInTheDocument();
  });

  test('displays stock badge when stock is low', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    renderComponent({ product: lowStockProduct });
    
    expect(screen.getByText('Últimas 5 unidades')).toBeInTheDocument();
  });

  test('displays out of stock badge when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderComponent({ product: outOfStockProduct });
    
    expect(screen.getByText('Agotado')).toBeInTheDocument();
  });

  test('calls onAddToCart when add to cart button is clicked', () => {
    const mockOnAddToCart = jest.fn();
    renderComponent({ onAddToCart: mockOnAddToCart });
    
    const addToCartButton = screen.getByTitle('Agregar al carrito');
    fireEvent.click(addToCartButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('renders correct number of rating stars', () => {
    renderComponent();
    
    // Debería renderizar 4 estrellas llenas y 1 vacía para rating 4.5
    const stars = screen.getByText('(4.5)').previousSibling;
    expect(stars.children.length).toBe(5);
  });
});