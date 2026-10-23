const { createClient } = require('@libsql/client')

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { username } = req.body

  try {
    await db.execute({
      sql: 'INSERT INTO registros (email, fecha) VALUES (?, ?)',
      args: [username, new Date().toISOString()],
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
