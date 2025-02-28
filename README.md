I'll help create a comprehensive README for the project.

```markdown:README.md
# Mini-foo

A simple evaluation results viewer with a React frontend and Express backend.

## Project Structure

```
mini-foo/
├── app/                # React frontend application
│   ├── public/        # Static files
│   ├── src/           # Source files
│   └── package.json   # Frontend dependencies
└── server/            # Express backend application
    ├── src/           # Source files
    ├── bootstrap.ts   # Database initialization
    └── package.json   # Backend dependencies
```

## Getting Started

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run bootstrap
```

4. Start the server:
```bash
npm start
```

The server will run on http://localhost:8085

### Frontend Setup

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at http://localhost:3007

## API Endpoints

- `GET /evals` - Retrieve all evaluations with their results

## Technologies Used

### Frontend
- React
- TypeScript
- Create React App
- Testing Library

### Backend
- Express
- better-sqlite3
- TypeScript
- Node.js

## Development

- Frontend code is in `app/src/`
- Backend code is in `server/src/`
- Database schema and sample data are in `server/bootstrap.ts`
- API models are in `server/src/models/`



## Notes

- The frontend runs on port 3007 to avoid conflicts with other services
- The backend uses SQLite for data storage
- CORS is enabled on the backend to allow frontend requests

