import { query } from '../db';

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
  id: number | undefined;
  name: string;
  results: EvalResult[];

  constructor(name: string, id?: number, results: EvalResult[] = []) {
    this.id = id;
    this.name = name;
    this.results = results;
  }

  static findAll(): Eval[] {
    const rows = query.all<EvalRow>(`
      SELECT
        e.id as eval_id,
        e.name as eval_name,
        r.id as result_id,
        r.input,
        r.output,
        r.passed
      FROM evals e
      LEFT JOIN eval_results r ON e.id = r.eval_id
    `);

    const evalsMap = new Map<number, Eval>();

    rows.forEach((row) => {
      if (!evalsMap.has(row.eval_id)) {
        evalsMap.set(row.eval_id, new Eval(row.eval_name, row.eval_id));
      }

      if (row.result_id) {
        const eval_ = evalsMap.get(row.eval_id)!;
        eval_.results.push({
          id: row.result_id,
          evalId: row.eval_id,
          input: row.input || '',
          output: row.output || '',
          passed: Boolean(row.passed),
        });
      }
    });

    return Array.from(evalsMap.values());
  }

  static findById(id: number): Eval | null {
    const rows = query.all<EvalRow>(
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
    `,
      id
    );

    if (rows.length === 0) {
      return null;
    }

    const eval_ = new Eval(rows[0].eval_name, rows[0].eval_id);

    rows.forEach((row) => {
      if (row.result_id) {
        eval_.results.push({
          id: row.result_id,
          evalId: row.eval_id,
          input: row.input || '',
          output: row.output || '',
          passed: Boolean(row.passed),
        });
      }
    });

    return eval_;
  }

  save(): void {
    if (this.id !== undefined) {
      // Update
      query.run('UPDATE evals SET name = ? WHERE id = ?', this.name, this.id);
    } else {
      // Insert
      const result = query.run('INSERT INTO evals (name) VALUES (?)', this.name);
      this.id = result.lastInsertRowid;
    }
  }

  delete(): void {
    if (this.id === undefined) return;
    // Delete results first to avoid orphans (no FK cascade in schema)
    query.run('DELETE FROM eval_results WHERE eval_id = ?', this.id);
    query.run('DELETE FROM evals WHERE id = ?', this.id);
  }
}
