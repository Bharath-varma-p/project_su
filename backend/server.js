// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pa$$w0rd',
    database: 'ai_startup'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/sprints', require('./routes/sprints'));
app.use('/api/discussions', require('./routes/discussions'));

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
