/* This file handles routes for queries related to artists*/

const express = require("express");
const app = express.Router();
const db = require("../data-provider");

/* Route for /api/artists */
// This route will return artists by artists name.
app.get("/", (req, res) => {
    const sql = `
        SELECT artists.*, types.type_name
        FROM artists
        INNER JOIN types ON artists.artist_type_id = types.type_id
        ORDER BY artist_name`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json(rows);
    });
});

/*Route for /api/artists/averages/:id*/
// Return averages for an artist, specfied by id. Will check to make sure parameter is valid nubmer first.
app.get("/averages/:id", (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.json({ error: "Invalid artist id, not a number" });
    }

    const sql = `
        SELECT 
            AVG(bpm) as avg_bpm,
            AVG(energy) as avg_energy,
            AVG(danceability) as avg_danceability,
            AVG(loudness) as avg_loudness,
            AVG(liveness) as avg_liveness,
            AVG(valence) as avg_valence,
            AVG(duration) as avg_duration,
            AVG(acousticness) as avg_acousticness,
            AVG(speechiness) as avg_speechiness,
            AVG(popularity) as avg_popularity
        FROM songs
        WHERE artist_id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (!row || row.avg_bpm === null) {
            return res.json({ error: "Artist not found or no songs available" });
        }

        res.json(row);
    });
});

/* Route for /api/artists/:id */
// Returns artist by id. Will check to see if provided id parameter is a valid number.
app.get("/:id", (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.json({ error: "Invalid artist id, not a number!" });
    }

    const sql = `
        SELECT artists.*, types.type_name
        FROM artists
        INNER JOIN types ON artists.artist_type_id = types.type_id
        WHERE artist_id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (!row) {
            return res.json({ error: "Artist not found" });
        }

        res.json(row);
    });
});

module.exports = app;