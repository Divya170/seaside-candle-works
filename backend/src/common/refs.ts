import { DatabaseService } from '../database/database.service';

/**
 * Generates a short human reference like GF-4821 that is unique within `table`.
 * Falls back to longer numbers if the 4-digit space gets crowded.
 */
export function uniqueRef(db: DatabaseService, table: 'orders' | 'messages', prefix: string): string {
  for (let digits = 4; digits <= 8; digits++) {
    for (let attempt = 0; attempt < 25; attempt++) {
      const min = 10 ** (digits - 1);
      const ref = `${prefix}-${Math.floor(min + Math.random() * 9 * min)}`;
      const taken = db.get(`SELECT 1 FROM ${table} WHERE ref = ?`, [ref]);
      if (!taken) return ref;
    }
  }
  throw new Error('Could not allocate a reference number');
}
