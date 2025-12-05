import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import App from './App';

const mockEvaluations = [
  {
    id: 1,
    name: 'Test Eval 1',
    results: [
      {
        id: 1,
        evalId: 1,
        input: 'test input',
        output: 'test output',
        passed: true,
      },
      {
        id: 2,
        evalId: 1,
        input: 'fail input',
        output: 'fail output',
        passed: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Test Eval 2',
    results: [
      { id: 3, evalId: 2, input: 'input 2', output: 'output 2', passed: true },
    ],
  },
];

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Data fetching', () => {
    it('should fetch evaluations on mount and display them', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockEvaluations),
      } as Response);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Test Eval 1' })
        ).toBeInTheDocument();
      });

      expect(fetch).toHaveBeenCalledWith('http://localhost:8085/evals');
    });

    it('should handle fetch errors gracefully', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

      render(<App />);

      // App should still render without crashing
      expect(screen.getByText(/Evaluation Results/i)).toBeInTheDocument();
    });

    it('should display first evaluation by default when data loads', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockEvaluations),
      } as Response);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Test Eval 1' })
        ).toBeInTheDocument();
      });
    });
  });

  describe('Evaluation selection', () => {
    it('should change selected evaluation on dropdown change', async () => {
      const user = userEvent.setup();
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockEvaluations),
      } as Response);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Test Eval 1' })
        ).toBeInTheDocument();
      });

      const select = screen.getByRole('combobox');
      await user.selectOptions(select, '2');

      expect(
        screen.getByRole('heading', { name: 'Test Eval 2' })
      ).toBeInTheDocument();
    });
  });

  describe('Results display', () => {
    it('should show passed results with correct styling', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockEvaluations),
      } as Response);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Passed')).toBeInTheDocument();
      });

      const passedElement = screen.getByText('Passed');
      expect(passedElement).toHaveClass('passed');
    });

    it('should show failed results with correct styling', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockEvaluations),
      } as Response);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Failed')).toBeInTheDocument();
      });

      const failedElement = screen.getByText('Failed');
      expect(failedElement).toHaveClass('failed');
    });

    it('should handle empty evaluations list', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      render(<App />);

      // Wait for fetch to complete
      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      // Should show the placeholder option
      expect(screen.getByText(/Choose an evaluation.../i)).toBeInTheDocument();
    });
  });
});
