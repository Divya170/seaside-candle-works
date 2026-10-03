import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { MESSAGE_STATUSES } from '../common/constants';
import { uniqueRef } from '../common/refs';
import { FieldErrors, str, ValidationFailedException } from '../common/validation';
import { EMAIL } from '../orders/orders.service';

const toMsg = (r: any) => ({ id: r.id, ref: r.ref, name: r.name, email: r.email, subject: r.subject, message: r.message, status: r.status, createdAt: r.created_at.replace(' ', 'T') + 'Z' });

@Injectable()
export class MessagesService {
  constructor(private readonly db: DatabaseService) {}

  /** The design's contact-form rules, word for word. */
  check(input: Record<string, unknown>) {
    const v = { name: str(input?.name, 300), email: str(input?.email, 300), subject: str(input?.subject, 400), message: str(input?.message, 8000) };
    const e: FieldErrors = {};
    if (!v.name) e.name = 'Please enter your name.';
    else if (v.name.length > 120) e.name = 'Keep your name under 120 characters.';
    if (!v.email) e.email = 'Please enter your email address.';
    else if (!EMAIL.test(v.email)) e.email = 'Enter a valid email, like name@example.com.';
    if (!v.subject) e.subject = 'Please add a subject.';
    else if (v.subject.length > 150) e.subject = 'Keep the subject under 150 characters.';
    if (v.message.length < 10) e.message = 'Please write a message of at least 10 characters.';
    else if (v.message.length > 5000) e.message = 'Keep the message under 5,000 characters.';
    return { v, e };
  }

  create(input: Record<string, unknown>) {
    const { v, e } = this.check(input);
    if (Object.keys(e).length) throw new ValidationFailedException(e);
    const ref = uniqueRef(this.db, 'messages', 'MSG');
    const res = this.db.run('INSERT INTO messages (ref, name, email, subject, message) VALUES (?, ?, ?, ?, ?)', [ref, v.name, v.email, v.subject, v.message]);
    return this.find(Number(res.lastInsertRowid));
  }

  find(id: number) {
    const r = this.db.get('SELECT * FROM messages WHERE id = ?', [id]);
    if (!r) throw new NotFoundException({ statusCode: 404, message: 'That message no longer exists.' });
    return toMsg(r);
  }

  list(status?: string, q?: string) {
    const where: string[] = [];
    const params: unknown[] = [];
    const st = str(status, 30);
    if (st && st !== 'All') { where.push('status = ?'); params.push(st); }
    const needle = str(q, 120);
    if (needle) { where.push('(ref LIKE ? OR name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)'); params.push(...Array(5).fill(`%${needle}%`)); }
    const items = this.db.all(`SELECT * FROM messages ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC, id DESC`, params).map(toMsg);
    return { items, total: this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM messages')!.n };
  }

  setStatus(id: number, status: unknown) {
    const s = str(status, 30);
    if (!(MESSAGE_STATUSES as readonly string[]).includes(s)) throw new ValidationFailedException({ status: 'Choose a valid status.' });
    this.find(id);
    this.db.run('UPDATE messages SET status = ? WHERE id = ?', [s, id]);
    return this.find(id);
  }

  remove(id: number) {
    this.find(id);
    this.db.run('DELETE FROM messages WHERE id = ?', [id]);
    return { deleted: id };
  }
}
