import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('navbar and hero show Explorar Productos button on home', async () => {
  render(<App />);
  const btn = await screen.findByText('Explorar Productos');
  expect(btn).toBeInTheDocument();
});
