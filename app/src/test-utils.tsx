import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Custom render function that includes providers
// This is useful when you add context providers, routers, etc.

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any custom options here
}

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
export const mockEval = (overrides = {}) => ({
  id: 1,
  name: 'Test Evaluation',
  results: [],
  ...overrides,
});

export const mockEvalResult = (overrides = {}) => ({
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