const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "llama3",
            prompt: prompt,
            stream: true
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            responseType: 'stream'
        });

        response.data.on('data', (chunk) => {
            const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                const parsed = JSON.parse(line);
                if (parsed.response) {
                    res.write(`data: ${JSON.stringify({ token: parsed.response })}\n\n`);
                }
            }
        });

        response.data.on('end', () => {
            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            res.end();
        });

    } catch (error) {
        console.error('Error calling OLLAMA API:', error);
        res.write(`data: ${JSON.stringify({ error: 'Error generating response' })}\n\n`);
        res.end();
    }
});

const port = 3002;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});