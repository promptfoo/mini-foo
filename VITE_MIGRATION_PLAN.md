# Migration Plan: react-scripts to Vite

## Overview
This document outlines the step-by-step migration from Create React App (react-scripts) to Vite for the mini-foo frontend application.

## Pre-Migration Checklist
- [ ] Backup current project or ensure git is up to date
- [ ] Review and document any custom webpack configurations
- [ ] Ensure all tests are passing
- [ ] Document current environment variables usage

## Migration Steps

### Phase 1: Setup Vite
1. **Install Vite and dependencies**
   ```bash
   cd app
   npm install --save-dev vite @vitejs/plugin-react
   ```

2. **Create Vite configuration** (`app/vite.config.ts`)
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3007,
       proxy: {
         '/evals': 'http://localhost:8085'
       }
     },
     build: {
       outDir: 'build',
       sourcemap: true
     }
   })
   ```

3. **Update package.json scripts**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview",
       "test": "vitest",
       "test:ui": "vitest --ui"
     }
   }
   ```

### Phase 2: Project Structure Updates
1. **Move public/index.html to project root**
   - Update to use Vite's entry point syntax
   - Replace `%PUBLIC_URL%` with `/`
   - Add module script tag: `<script type="module" src="/src/index.tsx"></script>`

2. **Update environment variables**
   - Change `REACT_APP_*` to `VITE_*`
   - Update references in code: `process.env.REACT_APP_API_URL` → `import.meta.env.VITE_API_URL`

3. **Update TypeScript configuration**
   - Add Vite types to tsconfig.json
   - Update module resolution for Vite

### Phase 3: Testing Migration
1. **Replace Jest with Vitest**
   ```bash
   npm uninstall @types/jest
   npm install --save-dev vitest @vitest/ui jsdom @testing-library/jest-dom
   ```

2. **Create vitest configuration**
   ```typescript
   // app/vitest.config.ts
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: './src/setupTests.ts',
       css: true
     }
   })
   ```

3. **Update test files**
   - No changes needed for most tests
   - Update any Jest-specific mocks to Vitest equivalents

### Phase 4: Clean Up
1. **Remove CRA dependencies**
   ```bash
   npm uninstall react-scripts eslint-config-react-app
   ```

2. **Remove CRA-specific files**
   - Delete `react-app-env.d.ts`
   - Remove `browserslist` from package.json
   - Clean up any CRA-specific configurations

3. **Update ESLint configuration**
   - Remove react-app references from root eslint.config.js
   - Ensure TypeScript plugin is properly configured

### Phase 5: Optimization
1. **Add development optimizations**
   - Configure fast refresh
   - Set up proper source maps
   - Configure build chunking

2. **Production optimizations**
   - Enable build compression
   - Configure proper caching headers
   - Set up build analysis tools

## Testing Plan
1. Run all existing unit tests
2. Test development server with HMR
3. Verify production build works correctly
4. Test environment variable handling
5. Ensure proxy configuration works with backend
6. Validate TypeScript compilation
7. Check bundle size comparison

## Rollback Plan
If issues arise:
1. Git reset to pre-migration commit
2. Restore node_modules: `npm ci`
3. Document specific issues for resolution

## Timeline
- Phase 1-2: 1-2 hours
- Phase 3: 2-3 hours (depending on test complexity)
- Phase 4-5: 1 hour
- Testing: 1-2 hours

Total estimated time: 5-8 hours

## Post-Migration Benefits
- ⚡ 10-100x faster cold starts
- 🔥 Instant HMR (Hot Module Replacement)
- 📦 Smaller bundle sizes with better tree-shaking
- 🛠 Simpler configuration
- 🔧 Better TypeScript performance
- 📊 Built-in build analysis
- 🎯 Future-proof tooling