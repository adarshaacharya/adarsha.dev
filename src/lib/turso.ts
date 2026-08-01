import { createClient } from "@tursodatabase/serverless/compat";
import { randomBytes } from "node:crypto";

function getTursoClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error("Turso database is not configured.");
  }

  return createClient({ url, authToken });
}

async function ensureNewsletterTable() {
  const db = getTursoClient();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'active',
      source TEXT NOT NULL DEFAULT 'website',
      unsubscribe_token TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const columns = await db.execute("PRAGMA table_info(newsletter_subscribers)");
  const hasUnsubscribeToken = columns.rows.some(
    (column) => column.name === "unsubscribe_token",
  );

  if (!hasUnsubscribeToken) {
    await db.execute(
      "ALTER TABLE newsletter_subscribers ADD COLUMN unsubscribe_token TEXT",
    );
    await db.execute(`
      CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_unsubscribe_token
      ON newsletter_subscribers(unsubscribe_token)
    `);
  }

  return db;
}

export async function saveNewsletterSubscriber(email: string) {
  const db = await ensureNewsletterTable();
  const unsubscribeToken = randomBytes(32).toString("base64url");

  await db.execute({
    sql: `
      INSERT INTO newsletter_subscribers (email, unsubscribe_token)
      VALUES (:email, :unsubscribeToken)
      ON CONFLICT(email) DO UPDATE SET
        status = 'active',
        unsubscribe_token = excluded.unsubscribe_token,
        updated_at = CURRENT_TIMESTAMP
    `,
    args: { email, unsubscribeToken },
  });

  return { unsubscribeToken };
}

export async function unsubscribeNewsletterSubscriber(token: string) {
  const db = await ensureNewsletterTable();
  const result = await db.execute({
    sql: `
      UPDATE newsletter_subscribers
      SET status = 'unsubscribed', updated_at = CURRENT_TIMESTAMP
      WHERE unsubscribe_token = :token
    `,
    args: { token },
  });

  return result.rowsAffected > 0;
}
