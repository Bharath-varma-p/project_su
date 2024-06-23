const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new user
router.post('/', (req, res) => {
    const { name, role } = req.body;
    const sql = 'INSERT INTO users (name, role) VALUES (?, ?)';
    db.query(sql, [name, role], (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        res.json({ id: result.insertId, name, role });
    });
});

// Get all users
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

module.exports = router;
