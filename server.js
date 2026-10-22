const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())
app.use(express.static('public'))

const db = new sqlite3.Database('./simulacro.db', (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Conexión a la base de datos establecida')
})

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)`)

app.post('/api/users', (req, res) => {
    const { username, password } = req.body
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`
    db.run(query, [username, password], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ id: this.lastID, username, password })
    }
)})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})