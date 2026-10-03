import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

type Params = Record<string, unknown> | unknown[];

/**
 * Thin wrapper around better-sqlite3. Applies database/schema.sql on boot and
 * seeds from database/seed.sql when the catalogue is empty.
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private db!: Database.Database;

  onModuleInit() {
    const dir = path.resolve(process.cwd(), process.env.DATABASE_DIR || '../database');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'app.sqlite');
    this.db = new Database(file);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('foreign_keys = ON');

    this.db.exec(fs.readFileSync(path.join(dir, 'schema.sql'), 'utf8'));
    const { n } = this.db.prepare('SELECT COUNT(*) AS n FROM products').get() as { n: number };
    if (n === 0) {
      this.db.exec(fs.readFileSync(path.join(dir, 'seed.sql'), 'utf8'));
      this.logger.log('Seeded catalogue from seed.sql');
    }
    this.logger.log(`SQLite ready at ${file}`);
  }

  onModuleDestroy() {
    this.db?.close();
  }

  all<T = any>(sql: string, params: Params = []): T[] {
    return this.db.prepare(sql).all(params as any) as T[];
  }

  get<T = any>(sql: string, params: Params = []): T | undefined {
    return this.db.prepare(sql).get(params as any) as T | undefined;
  }

  run(sql: string, params: Params = []) {
    return this.db.prepare(sql).run(params as any);
  }

  transaction<T>(fn: () => T): T {
    return this.db.transaction(fn)();
  }
}
