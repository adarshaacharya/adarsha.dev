import { createClient } from "@tursodatabase/serverless/compat";

function getTursoClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error("Turso database is not configured.");
  }

  return createClient({ url, authToken });
}

export async function saveNewsletterSubscriber(email: string) {
  const db = getTursoClient();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'active',
      source TEXT NOT NULL DEFAULT 'website',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute({
    sql: `
      INSERT INTO newsletter_subscribers (email)
      VALUES (:email)
      ON CONFLICT(email) DO UPDATE SET
        status = 'active',
        updated_at = CURRENT_TIMESTAMP
    `,
    args: { email },
  });
}
