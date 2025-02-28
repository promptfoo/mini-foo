import Database from "better-sqlite3";
import { evals, evalResults } from "./sample_data";

const db = new Database("db.sqlite");

db.exec(
  "CREATE TABLE IF NOT EXISTS evals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
);

db.exec(
  "CREATE TABLE IF NOT EXISTS eval_results (id INTEGER PRIMARY KEY AUTOINCREMENT, eval_id INTEGER, input TEXT, output TEXT, passed BOOLEAN)"
);

// Insert sample evaluation data
const insertEvals = () => {
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO evals (id, name) VALUES (?, ?)"
  );

  evals.forEach((eval_) => {
    stmt.run(eval_.id, eval_.name);
  });

  console.log("Sample evals inserted");
};

// Insert sample evaluation results
const insertEvalResults = () => {
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO eval_results (id, eval_id, input, output, passed) VALUES (?, ?, ?, ?, ?)"
  );

  evalResults.forEach((result) => {
    stmt.run(
      result.id,
      result.evalId,
      result.input,
      result.output,
      result.passed
    );
  });

  console.log("Sample eval results inserted");
};

// Remove db.serialize() - better-sqlite3 doesn't have this method
// Just call the functions directly
insertEvals();
insertEvalResults();
console.log("Database initialization complete");
