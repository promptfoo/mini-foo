import { db } from '../db';

export interface EvalResult {
  id: number;
  evalId: number;
  input: string;
  output: string;
  passed: boolean;
}

interface EvalRow {
  eval_id: number;
  eval_name: string;
  result_id: number | null;
  input: string | null;
  output: string | null;
  passed: number | null;
}

export class Eval {
  id: number;
  name: string;
  results: EvalResult[];

  constructor(id: number, name: string, results: EvalResult[] = []) {
    this.id = id;
    this.name = name;
    this.results = results;
  }

  static findAll(): Eval[] {
    const rows = db
      .prepare(
        `
      SELECT
        e.id as eval_id,
        e.name as eval_name,
        r.id as result_id,
        r.input,
        r.output,
        r.passed
      FROM evals e
      LEFT JOIN eval_results r ON e.id = r.eval_id
    `
      )
      .all();

    const evalsMap = new Map<number, Eval>();

    rows.forEach((row: EvalRow) => {
      if (!evalsMap.has(row.eval_id)) {
        evalsMap.set(row.eval_id, new Eval(row.eval_id, row.eval_name));
      }

      if (row.result_id) {
        const eval_ = evalsMap.get(row.eval_id)!;
        eval_.results.push({
          id: row.result_id,
          evalId: row.eval_id,
          input: row.input,
          output: row.output,
          passed: row.passed,
        });
      }
    });

    return Array.from(evalsMap.values());
  }

  static findById(id: number): Eval | null {
    const rows = db
      .prepare(
        `
      SELECT
        e.id as eval_id,
        e.name as eval_name,
        r.id as result_id,
        r.input,
        r.output,
        r.passed
      FROM evals e
      LEFT JOIN eval_results r ON e.id = r.eval_id
      WHERE e.id = ?
    `
      )
      .all(id);

    if (rows.length === 0) {
      return null;
    }

    const eval_ = new Eval(
      (rows[0] as EvalRow).eval_id,
      (rows[0] as EvalRow).eval_name
    );

    rows.forEach((row: EvalRow) => {
      if (row.result_id) {
        eval_.results.push({
          id: row.result_id,
          evalId: row.eval_id,
          input: row.input,
          output: row.output,
          passed: row.passed,
        });
      }
    });

    return eval_;
  }

  save(): void {
    if (this.id) {
      // Update
      db.prepare('UPDATE evals SET name = ? WHERE id = ?').run(
        this.name,
        this.id
      );
    } else {
      // Insert
      const result = db
        .prepare('INSERT INTO evals (name) VALUES (?)')
        .run(this.name);
      this.id = result.lastInsertRowid as number;
    }
  }

  delete(): void {
    db.prepare('DELETE FROM evals WHERE id = ?').run(this.id);
  }
}
