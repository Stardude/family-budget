const sqlite3 = require('sqlite3').verbose();
const config = require('config');
const _ = require('lodash');

const columnDefinitions = {
    accounts: require('../models/Account').getColumnDefinitions(),
    categories: require('../models/Category').getColumnDefinitions(),
    records: require('../models/Record').getColumnDefinitions()
};

let db = null;

const getStringDefinition = columnDefinition =>
    _.keys(columnDefinition).map(key => `${key} ${columnDefinition[key]}`).join(',');

module.exports.connect = () => {
    db = new sqlite3.Database(config.database.path);
    console.log('Database successfully connected');
};

module.exports.createTables = () => {
    db.run(`CREATE TABLE IF NOT EXISTS accounts (${getStringDefinition(columnDefinitions.accounts)})`);
    db.run(`CREATE TABLE IF NOT EXISTS categories (${getStringDefinition(columnDefinitions.categories)})`);
    db.run(`CREATE TABLE IF NOT EXISTS records (${getStringDefinition(columnDefinitions.records)})`);
};

module.exports.dropDatabase = () => {
    db.run('DROP TABLE IF EXISTS accounts');
    db.run('DROP TABLE IF EXISTS categories');
    db.run('DROP TABLE IF EXISTS records');
};

module.exports.get = () => db;
