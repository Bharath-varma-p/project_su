const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/ai', require('./routes/ai'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'ai_startup'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to handle AI requests
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "llama3",
            prompt: prompt,
            stream: false
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error calling OLLAMA API:', error);
        res.status(500).send('Error generating response');
    }
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/sprints', require('./routes/sprints'));
app.use('/api/discussions', require('./routes/discussions'));

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
