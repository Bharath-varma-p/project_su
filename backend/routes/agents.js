const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { name, type, status } = req.body;
    const sql = 'INSERT INTO agents (name, type, status) VALUES (?, ?, ?)';
    db.query(sql, [name, type, status], (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ id: result.insertId, name, type, status });
    });
});


router.get('/', (req, res) => {
    const sql = 'SELECT * FROM agents';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

module.exports = router;