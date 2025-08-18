# Mini-foo

Evaluation results viewer with React frontend and Express backend.

## Quick Start

**Prerequisites:** Node.js ≥20

```bash
npm install
npm start
```

- Frontend: http://localhost:3007
- Backend: http://localhost:8085

## Development

- `npm test` - Run all tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## API

- `GET /evals` - Retrieve all evaluations with results

## Architecture

- **Frontend:** React + TypeScript + Vite (port 3007)
- **Backend:** Express + SQLite + TypeScript (port 8085)
- **Database:** Auto-initialized with sample data
