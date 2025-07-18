import Database from 'better-sqlite3';
import { evals, evalResults } from './sample_data';

const dbPath = 'db.sqlite';

const db = new Database(dbPath);

db.exec(
  'CREATE TABLE IF NOT EXISTS evals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
);

db.exec(
  'CREATE TABLE IF NOT EXISTS eval_results (id INTEGER PRIMARY KEY AUTOINCREMENT, eval_id INTEGER, input TEXT, output TEXT, passed BOOLEAN)'
);

const insertEvals = () => {
  // Check if data already exists
  const existingCount = (
    db.prepare('SELECT COUNT(*) as count FROM evals').get() as { count: number }
  ).count;

  if (existingCount === 0) {
    const stmt = db.prepare(
      'INSERT OR IGNORE INTO evals (id, name) VALUES (?, ?)'
    );

    evals.forEach((eval_) => {
      stmt.run(eval_.id, eval_.name);
    });

    // Sample evals inserted
  } else {
    // Evals table already contains data, skipping insertion
  }
};

const insertEvalResults = () => {
  // Check if data already exists
  const existingCount = (
    db.prepare('SELECT COUNT(*) as count FROM eval_results').get() as {
      count: number;
    }
  ).count;

  if (existingCount === 0) {
    const stmt = db.prepare(
      'INSERT OR IGNORE INTO eval_results (id, eval_id, input, output, passed) VALUES (?, ?, ?, ?, ?)'
    );

    evalResults.forEach((result) => {
      // Convert boolean to integer (0 or 1) for SQLite compatibility
      const passedValue = result.passed ? 1 : 0;

      stmt.run(
        result.id,
        result.evalId,
        result.input,
        result.output,
        passedValue
      );
    });

    // Sample eval results inserted
  } else {
    // Eval results table already contains data, skipping insertion
  }
};

insertEvals();
insertEvalResults();
// Database initialization complete
