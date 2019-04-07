const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

const columnDefinitions = {
    accounts: require('../models/Account').getColumnDefinitions(),
    categories: require('../models/Category').getColumnDefinitions(),
    records: require('../models/Record').getColumnDefinitions()
};

module.exports.dropDatabase = () => {
    return execute(new SqlBuilder().drop('records'))
        .then(() => execute(new SqlBuilder().drop('categories')))
        .then(() => execute(new SqlBuilder().drop('accounts')))
        .then(() => execute(new SqlBuilder().create('accounts', columnDefinitions.accounts)))
        .then(() => execute(new SqlBuilder().create('categories', columnDefinitions.categories)))
        .then(() => execute(new SqlBuilder().create('records', columnDefinitions.records)));
};