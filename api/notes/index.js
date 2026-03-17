import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT id, title, content FROM notes ORDER BY id DESC",
      );
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch notes" });
    }
  }

  if (req.method === "POST") {
    const { title, content } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id, title, content",
        [title, content],
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create note" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
