import db from "./db";

export const saveTokenToDb = (token: any) => {
    const json = JSON.stringify(token);
    db.prepare('DELETE FROM google_token').run();
    db.prepare('INSERT INTO google_token (token) VALUES (?)').run(json);
}

export const loadTokenFromDb = () => {
    const row = db.prepare('SELECT token FROM google_token LIMIT 1').get() as { token: string } | undefined;
    return row ? JSON.parse(row.token) : null;
}