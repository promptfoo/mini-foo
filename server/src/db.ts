import { DatabaseSync, type StatementSync } from 'node:sqlite';

export type { StatementSync };

const db = new DatabaseSync('db.sqlite');

// Graceful shutdown - close db before process exits
process.on('exit', () => {
  if (db.isOpen) {
    db.close();
  }
});

type QueryParam = null | number | bigint | string;

/** Result of an INSERT/UPDATE/DELETE with safe number conversion */
export interface RunResult {
  changes: number;
  lastInsertRowid: number;
}

/** Safely convert bigint to number, throwing if overflow would occur */
function safeNumber(value: number | bigint): number {
  if (typeof value === 'bigint') {
    if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
      throw new RangeError(`Value ${value} exceeds safe integer range`);
    }
    return Number(value);
  }
  return value;
}

/**
 * Type-safe query helpers for node:sqlite
 */
export const query = {
  /** Execute raw SQL without returning results (for DDL statements) */
  exec(sql: string): void {
    db.exec(sql);
  },

  /** Get a prepared statement for batch operations */
  prepare(sql: string): StatementSync {
    return db.prepare(sql);
  },

  all<T>(sql: string, ...params: QueryParam[]): T[] {
    return db.prepare(sql).all(...params) as T[];
  },

  get<T>(sql: string, ...params: QueryParam[]): T | undefined {
    return db.prepare(sql).get(...params) as T | undefined;
  },

  run(sql: string, ...params: QueryParam[]): RunResult {
    const result = db.prepare(sql).run(...params);
    return {
      changes: safeNumber(result.changes),
      lastInsertRowid: safeNumber(result.lastInsertRowid),
    };
  },
};
