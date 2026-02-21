/**
 * COMP 4513 W2026 ASG1
 * Chris Botuli
 * 
 */
const express = require('express');
require('./scripts/data-provider');

const artistsRoutes = require('./scripts/routes/artists');
const genresRoutes = require('./scripts/routes/genres');
const songsRoutes = require('./scripts/routes/songs');
const playlistsRoutes = require('./scripts/routes/playlists');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/artists', artistsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/playlists', playlistsRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API song server is running" });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});