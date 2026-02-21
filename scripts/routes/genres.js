/* This file handles routes for queries related to genres*/
const express = require('express');
const app = express.Router();
const db = require('../data-provider');

/*Route for /api/genres*/
// Returns all genres from genres table and orders them by name
app.get('/', (req, res) => {
    const sql = `
        SELECT *
        FROM genres
        ORDER BY genre_name`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = app;