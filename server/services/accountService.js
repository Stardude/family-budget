const _ = require('lodash');

const Account = require('./../models/Account');
const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

const recordService = require('./recordService');
const balanceService = require('./balanceService');

const TRANSFER_ID = 26;

module.exports.create = newAccount => {
    const account = new Account(newAccount);
    delete account.id;
    const sqlData = new SqlBuilder('accounts').insert().columns({ columns: _.keys(account) }).values(account);
    return execute(sqlData).then(result => module.exports.getOneById(result.lastID));
};

module.exports.getAll = () => {
    const sqlData = new SqlBuilder('accounts').select()
        .columns({ columns: _.keys(Account.getColumnDefinitions()) });
    return execute(sqlData);
};

module.exports.getAllAndSynchronizeBalance = () => {
    return balanceService.synchronizeBalanceForAllAccounts().then(module.exports.getAll);
};

module.exports.getOneByName = name => {
    const sqlData = new SqlBuilder('accounts').select()
        .columns({ columns: _.keys(Account.getColumnDefinitions()) })
        .where().eq('name', name).one();
    return execute(sqlData);
};

module.exports.getOneById = id => {
    const sqlData = new SqlBuilder('accounts').select()
        .columns({ columns: _.keys(Account.getColumnDefinitions()) })
        .where().eq('id', id).one();
    return execute(sqlData);
};

module.exports.update = (id, updated) => {
    const account = new Account(updated);
    delete account.creationDate;
    delete account.id;
    const sqlData = new SqlBuilder('accounts').update(account).where().eq('id', id);
    return execute(sqlData);
};

module.exports.updateAndGet = (id, updated) => {
    return module.exports.update(id, updated).then(result => module.exports.getOneById(id));
};

module.exports.delete = id => {
    const sqlData = new SqlBuilder('accounts').delete().where().eq('id', id);
    return execute(sqlData).then(() => recordService.deleteByField('accountId', id));
};

module.exports.transfer = parameters => {
    return recordService.createAndGet({
        accountId: parameters.source,
        categoryId: TRANSFER_ID,
        price: parameters.amount,
        amount: 1,
        isIncome: false,
        comment: `${parameters.destinationName}: ${parameters.comment}`
    }).then(record => recordService.create({
        accountId: parameters.destination,
        categoryId: TRANSFER_ID,
        price: parameters.total,
        amount: 1,
        isIncome: true,
        comment: `${parameters.sourceName}: ${parameters.comment}`,
        transferRecordId: record.id
    }).then(result => recordService.update(record.id, Object.assign(record, { transferRecordId: result.lastID }))
    )).then(() => Promise.all([
        module.exports.getOneById(parameters.source),
        module.exports.getOneById(parameters.destination)
    ]).then(accounts => ({source: accounts[0], destination: accounts[1]})));
};
