import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { expect } from 'vitest';

// Custom render function that includes providers
// This is useful when you add context providers, routers, etc.

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>;

export function customRender(
  ui: React.ReactElement,
  options?: CustomRenderOptions
) {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    // Add providers here as your app grows
    // Example:
    // return (
    //   <ThemeProvider>
    //     <RouterProvider>
    //       {children}
    //     </RouterProvider>
    //   </ThemeProvider>
    // );
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
  results: unknown[];
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
import { waitFor, screen } from '@testing-library/react';

export const waitForLoadingToFinish = () =>
  waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
