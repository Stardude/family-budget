const _ = require('lodash');

const Account = require('./../models/Account');
const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

module.exports.create = newAccount => {
    const account = new Account(newAccount);
    delete account.id;
    const sqlData = new SqlBuilder('accounts').insert().columns({ label: null, columns: _.keys(account) }).values(account);
    return execute(sqlData).then(result => module.exports.getOneById(result.lastID));
};

module.exports.getAll = () => {
    const sqlData = new SqlBuilder('accounts').select('MAIN')
        .columns({ label: 'MAIN', columns: _.keys(Account.getColumnDefinitions()) });
    return execute(sqlData);
};

module.exports.getOneByName = name => {
    const sqlData = new SqlBuilder('accounts').select('MAIN')
        .columns({ label: 'MAIN', columns: _.keys(Account.getColumnDefinitions()) })
        .where().eq({ label: 'MAIN', column: 'name' }, name).one();
    return execute(sqlData);
};

module.exports.getOneById = id => {
    const sqlData = new SqlBuilder('accounts').select('MAIN')
        .columns({ label: 'MAIN', columns: _.keys(Account.getColumnDefinitions()) })
        .where().eq({ label: 'MAIN', column: 'id' }, id).one();
    return execute(sqlData);
};

module.exports.update = (id, updated) => {
    const account = new Account(updated);
    delete account.creationDate;
    delete account.id;
    const sqlData = new SqlBuilder('accounts').update(account).where().eq({ label: null, column: 'id' }, id);
    return execute(sqlData);
};

module.exports.updateAndGet = (id, updated) => {
    return module.exports.update(id, updated).then(result => module.exports.getOneById(id));
};

module.exports.delete = id => {
    const sqlData = new SqlBuilder('accounts').delete().where().eq({ label: null, column: 'id' }, id);
    return execute(sqlData);
};
