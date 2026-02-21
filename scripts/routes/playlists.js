/* This file handles routes for queries related to playlists*/
const express = require('express');
const app = express.Router();
const db = require('../data-provider');

/* Route for /api/playlists */
// Route will return all playlists and order them by playlist_id
app.get('/', (req, res) => {
    const sql = `
        SELECT *
        FROM playlists
        ORDER BY playlist_id`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json(rows);
    });
});

/* Route for /api/playlists/:id*/
// Route will return songs with specified information (song id, year, title, genre, etc) 
app.get('/:id', (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.json({ error: "Invalid playlist id, not a number!" });
    }

    const sql = `
        SELECT 
            playlists.playlist_id AS playlist,
            songs.song_id,
            songs.title,
            artists.artist_name,
            genres.genre_name,
            songs.year
        FROM playlists
        INNER JOIN songs ON playlists.song_id = songs.song_id
        INNER JOIN artists ON songs.artist_id = artists.artist_id
        INNER JOIN genres ON songs.genre_id = genres.genre_id
        WHERE playlists.playlist_id = ?
        ORDER BY songs.title`;

    db.all(sql, [id], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.json({ error: "Playlist not found" });
        }

        res.json(rows);
    });
});

module.exports = app;