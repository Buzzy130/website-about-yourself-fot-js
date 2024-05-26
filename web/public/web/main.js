const express = require('express');
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'comment',
    password: '',
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Обслуживание статических файлов (HTML, CSS, JS)
app.use(express.static('public'));

app.get('/comments', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT name, email, message FROM komment');
        res.json(rows);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/comments', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await pool.query('INSERT INTO komment (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
        res.redirect('/');
    } catch (err) {
        console.error('Error inserting into the database:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
