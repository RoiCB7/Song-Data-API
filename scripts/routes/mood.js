/* This file handles routes for queries related to mood
   NOT FINISHED.
*/
const express = require('express');
const app = express.Router();
const db = require('../data-provider');

/* Route for /api/mood */
app.get('/', (req, res) => {
    const sql = '';

    db.all(sql, [], (err, rows) => {
        if (err) return res.json({ error: err.message });
        res.json(rows);
    });
});

//module.exports = router;