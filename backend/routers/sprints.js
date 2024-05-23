const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new sprint
router.post('/', (req, res) => {
    const { name, start_date, end_date } = req.body;
    const sql = 'INSERT INTO sprints (name, start_date, end_date) VALUES (?, ?, ?)';
    db.query(sql, [name, start_date, end_date], (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ id: result.insertId, name, start_date, end_date });
    });
});

// Get all sprints
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM sprints';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

module.exports = router;
