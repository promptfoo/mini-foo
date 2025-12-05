import { render, screen } from '@testing-library/react';
import App from './App';

test('renders evaluation results header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Evaluation Results/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders evaluation dropdown', () => {
  render(<App />);
  const selectElement = screen.getByText(/Choose an evaluation.../i);
  expect(selectElement).toBeInTheDocument();
});
