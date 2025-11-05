import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app and shows navbar brand', () => {
  render(<App />);
  const brand = screen.getByText(/LevelUp/i);
  expect(brand).toBeInTheDocument();
});
