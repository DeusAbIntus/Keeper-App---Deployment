import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await pool.query("DELETE FROM notes WHERE id = $1", [id]);
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete note" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
