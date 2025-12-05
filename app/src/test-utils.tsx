import { render, RenderOptions, waitFor, screen } from '@testing-library/react';
import { expect } from 'vitest';
import type { ReactElement, ReactNode } from 'react';

// Custom render function that includes providers
// This is useful when you add context providers, routers, etc.

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>;

export function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    // Add providers here as your app grows
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Mock data generators
interface MockEval {
  id: number;
  name: string;
  results: MockEvalResult[];
}

interface MockEvalResult {
  id: number;
  evalId: number;
  input: string;
  output: string;
  passed: boolean;
}

export const mockEval = (overrides: Partial<MockEval> = {}): MockEval => ({
  id: 1,
  name: 'Test Evaluation',
  results: [],
  ...overrides,
});

export const mockEvalResult = (
  overrides: Partial<MockEvalResult> = {}
): MockEvalResult => ({
  id: 1,
  evalId: 1,
  input: 'test input',
  output: 'test output',
  passed: true,
  ...overrides,
});

// Common test utilities
export const waitForLoadingToFinish = () =>
  waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
