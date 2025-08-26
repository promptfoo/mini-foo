// Minimal test to check CI environment
import { describe, it, expect } from 'vitest';

describe('CI Environment Test', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should detect CI environment when present', () => {
    if (process.env.CI) {
      expect(process.env.CI).toBe('true');
    } else {
      expect(process.env.CI).toBeUndefined();
    }
  });
});