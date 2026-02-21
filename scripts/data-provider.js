/**
 * This file provides connection to songs database
 */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, "../data/songs-2026.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) { //DELETE LATER
        console.error("Database connection error!:", err.message);
    } else {
        console.log("Sucessfully connected to database!");
    }
});

module.exports = db;