const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new discussion
router.post('/', (req, res) => {
    const { topic } = req.body;
    const sql = 'INSERT INTO discussions (topic) VALUES (?)';
    db.query(sql, [topic], (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ id: result.insertId, topic });
    });
});

// Get all discussions
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM discussions';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

module.exports = router;
