const sqlite3 = require('sqlite3').verbose();
const config = require('config');

let db = null;

module.exports.connect = () => {
    db = new sqlite3.Database(config.database.path);
    console.log('Database successfully connected');
    return db;
};

module.exports.get = () => db;
