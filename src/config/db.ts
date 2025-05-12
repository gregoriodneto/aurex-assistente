import Database from 'better-sqlite3';

const db = new Database('auth.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS google_token (
        id INTEGER PRIMARY KEY,
        token TEXT NOT NULL
    )
`).run();

export default db;