// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Configure React Testing Library to handle async updates more strictly
import { configure } from '@testing-library/react';

configure({
  // Increase timeout for async operations
  asyncUtilTimeout: 5000,
});

// Enable React act environment for proper test behavior
// This is required for React 19 with Vitest
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
