import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react';
import App from './App';

test('renders evaluation results header', async () => {
  await act(async () => {
    render(<App />);
  });
  const headerElement = screen.getByText(/Evaluation Results/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders evaluation dropdown', async () => {
  await act(async () => {
    render(<App />);
  });
  const selectElement = screen.getByText(/Choose an evaluation.../i);
  expect(selectElement).toBeInTheDocument();
});
