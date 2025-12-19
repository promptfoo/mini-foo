import { evals, evalResults } from './sample_data';
import { query } from './src/db';

query.exec(
  'CREATE TABLE IF NOT EXISTS evals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
);

query.exec(
  'CREATE TABLE IF NOT EXISTS eval_results (id INTEGER PRIMARY KEY AUTOINCREMENT, eval_id INTEGER, input TEXT, output TEXT, passed BOOLEAN)'
);

const insertEvals = () => {
  // Check if data already exists
  const result = query.get<{ count: number }>('SELECT COUNT(*) as count FROM evals');
  const existingCount = result?.count ?? 0;

  if (existingCount === 0) {
    const stmt = query.prepare('INSERT OR IGNORE INTO evals (id, name) VALUES (?, ?)');

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
  const result = query.get<{ count: number }>('SELECT COUNT(*) as count FROM eval_results');
  const existingCount = result?.count ?? 0;

  if (existingCount === 0) {
    const stmt = query.prepare(
      'INSERT OR IGNORE INTO eval_results (id, eval_id, input, output, passed) VALUES (?, ?, ?, ?, ?)'
    );

    evalResults.forEach((evalResult) => {
      // Convert boolean to integer (0 or 1) for SQLite compatibility
      const passedValue = evalResult.passed ? 1 : 0;

      stmt.run(
        evalResult.id,
        evalResult.evalId,
        evalResult.input,
        evalResult.output,
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
