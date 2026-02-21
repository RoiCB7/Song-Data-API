/**  This file handles routes for queries related to songs
 *   Route for /api/songs/search/any/:substring does not work!
*/

const express = require('express');
const app = express.Router();
const db = require('../data-provider');

/* Reusable Select query, file was getting too long*/ 
// Will return all songs with specfied information (artist id, name, genre, etc)
const Query = `
    SELECT 
        songs.*,
        artists.artist_id,
        artists.artist_name,
        genres.genre_id,
        genres.genre_name
    FROM songs
    INNER JOIN artists ON songs.artist_id = artists.artist_id
    INNER JOIN genres ON songs.genre_id = genres.genre_id`;

/*Route to get /api/songs*/
// Will return all songs + specfied information ordered by title
app.get('/', (req, res) => {
    const sql = Query + ` ORDER BY songs.title`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }

        res.json(rows);
    });
});

/* Route for /api/songs/artist/:id*/
// Returns artist by id with + specfied information
app.get('/artist/:id', (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.json({ error: "Invalid artist id, not a number!" });
    }

    const sql = Query + `
        WHERE songs.artist_id = ?
        ORDER BY songs.title`;

    db.all(sql, [id], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.json({ error: "No songs found for that artist" });
        }

        res.json(rows);
    });
});


/* Route for /api/songs/genre/:id */
// Returns genre by id + specfied information
app.get('/genre/:id', (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.json({ error: "Invalid genre id, not a number !" });
    }

    const sql = Query + `
        WHERE songs.genre_id = ?
        ORDER BY songs.title`;

    db.all(sql, [id], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.json({ error: "No songs found for that genre" });
        }

        res.json(rows);
    });
});

/* GET /api/songs/search/year/:year*/
// Returns song by year + specfied information order by song title.
app.get('/search/year/:year', (req, res) => {
    const year = req.params.year;

    if (isNaN(year)) {
        return res.json({ error: "Invalid year, not a number!" });
    }

    const sql = Query + `
        WHERE songs.year = ?
        ORDER BY songs.title`;

    db.all(sql, [year], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.json({ error: "No songs found for that year" });
        }

        res.json(rows);
    });
});


/* Route for /api/songs/sort/:order */
// Returns all songs in the order specfied by the route
app.get('/sort/:order', (req, res) => {
    const order = req.params.order;

    let orderBy;

    switch(order) {
        case 'id':
            orderBy = 'songs.song_id';
            break;
        case 'title':
            orderBy = 'songs.title';
            break;
        case 'artist':
            orderBy = 'artists.artist_name';
            break;
        case 'genre':
            orderBy = 'genres.genre_name';
            break;
        case 'year':
            orderBy = 'songs.year';
            break;
        case 'duration':
            orderBy = 'songs.duration';
            break;
        default:
            return res.json({ error: "Cannot sort by category" });
    }

    const sql = Query + ` ORDER BY ${orderBy}`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.json({ error: err.message });
        }

        res.json(rows);
    });
});



/* Route forr /api/songs/:id */
// Returns song with specfied information
app.get('/:id', (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.json({ error: "Invalid song id" });
    }

    const sql = Query + ` WHERE songs.song_id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.json({ error: err.message });
        }

        if (!row) {
            return res.json({ error: "Song not found" });
        }

        res.json(row);
    });
});

module.exports = app;