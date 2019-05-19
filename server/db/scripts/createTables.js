const _ = require('lodash');

const db = require('../db').connect();

const columnDefinitions = {
    accounts: require('../../models/Account').getColumnDefinitions(),
    categories: require('../../models/Category').getColumnDefinitions(),
    records: require('../../models/Record').getColumnDefinitions(),
    configuration: require('../../models/Configuration').getColumnDefinitions()
};

const getStringDefinition = columnDefinition =>
    _.keys(columnDefinition).map(key => `${key} ${columnDefinition[key]}`).join(',');

db.run(`CREATE TABLE IF NOT EXISTS accounts (${getStringDefinition(columnDefinitions.accounts)})`);
db.run(`CREATE TABLE IF NOT EXISTS categories (${getStringDefinition(columnDefinitions.categories)})`);
db.run(`CREATE TABLE IF NOT EXISTS records (${getStringDefinition(columnDefinitions.records)})`);
db.run(`CREATE TABLE IF NOT EXISTS configuration (${getStringDefinition(columnDefinitions.configuration)})`);

// Initialize default configuration
db.run(`INSERT INTO configuration (id, data) VALUES ('1', '${JSON.stringify({
    accountIdsToIncludeIntoTotalBalance: []
})}')`);
