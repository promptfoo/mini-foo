# Potential Challenges and Solutions

## Common Migration Challenges

### 1. Environment Variables
**Challenge:** CRA uses `REACT_APP_*` prefix, Vite uses `VITE_*`
**Solution:** 
- Search and replace all `process.env.REACT_APP_` with `import.meta.env.VITE_`
- Update `.env` files to use new prefix
- For the API URL: `VITE_API_URL=http://localhost:8085`

### 2. Public Assets
**Challenge:** CRA uses `%PUBLIC_URL%` in HTML, different asset handling
**Solution:**
- Replace `%PUBLIC_URL%` with `/` in index.html
- Move static assets that need processing to `src/assets`
- Keep truly static files in `public/`

### 3. SVG Imports
**Challenge:** CRA has built-in SVG as React component support
**Solution:**
- For `import logo from './logo.svg'` - this works as-is in Vite
- For SVG as components, add `vite-plugin-svgr` if needed

### 4. Jest to Vitest Migration
**Challenge:** Different API for some testing utilities
**Solution:**
- Most Jest tests work without changes
- Global imports are handled by `globals: true` in config
- Mock syntax is very similar
- `jest.fn()` → `vi.fn()` if not using globals

### 5. CSS Modules
**Challenge:** Slightly different handling in Vite
**Solution:**
- Files named `*.module.css` work automatically
- TypeScript types are generated automatically
- No changes needed for your current CSS setup

### 6. Proxy Configuration
**Challenge:** Different proxy setup between CRA and Vite
**Solution:**
- Already configured in the vite.config.ts example
- Maps `/evals` → `http://localhost:8085/evals`

### 7. TypeScript Paths
**Challenge:** Path aliases might need reconfiguration
**Solution:**
- Currently not using path aliases, so no issue
- If needed later, configure in both tsconfig and vite.config

### 8. Build Output
**Challenge:** Different build folder structure
**Solution:**
- Configure `build.outDir: 'build'` to match CRA
- Assets are hashed by default for caching

### 9. Hot Module Replacement
**Challenge:** Different HMR behavior
**Solution:**
- Vite's HMR is actually faster and more reliable
- React Fast Refresh works out of the box
- No action needed

### 10. Production Build Testing
**Challenge:** Different production server
**Solution:**
- Use `npm run preview` to test production builds locally
- Same static file serving for deployment

## Quick Fixes Script

```bash
# Run from app directory to handle common replacements
# Environment variables
find src -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/process\.env\.REACT_APP_/import.meta.env.VITE_/g'

# Update .env file
if [ -f .env ]; then
  sed -i '' 's/REACT_APP_/VITE_/g' .env
fi

# Update .env.example if exists
if [ -f .env.example ]; then
  sed -i '' 's/REACT_APP_/VITE_/g' .env.example
fi
```

## Verification Checklist
- [ ] All environment variables are accessible
- [ ] Images and assets load correctly
- [ ] API proxy works in development
- [ ] All tests pass
- [ ] Production build runs correctly
- [ ] Bundle size is reasonable (should be smaller)
- [ ] No console errors in development or production