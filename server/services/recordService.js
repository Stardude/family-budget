const _ = require('lodash');

const Record = require('./../models/Record');
const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

const balanceService = require('./../services/balanceService');

module.exports.create = data => {
    const record = new Record({
        accountId: data.accountId,
        categoryId: data.categoryId,
        price: data.price,
        amount: data.amount,
        comment: data.comment,
        recordDate: data.date,
        isIncome: data.isIncome
    });
    delete record.id;
    const sqlData = new SqlBuilder('records').insert().columns({ label: null, columns: _.keys(record) }).values(record);
    return execute(sqlData).then(result => balanceService.synchronizeAccountBalance(record.accountId)
        .then(() => module.exports.getOneById(result.lastID)));
};

module.exports.getAll = (accountId) => {
    const sqlData = new SqlBuilder('records').select('MAIN')
        .columns(
            { label: 'MAIN', columns: _.keys(Record.getColumnDefinitions()) },
            { label: 'SECOND', columns: ['name'] },
            { label: 'THIRD', columns: ['currency']})
        .join('categories', 'SECOND', [{ label: 'MAIN', column: 'categoryId' }, { label: 'SECOND', column: 'id' }])
        .join('accounts', 'THIRD', [{ label: 'MAIN', column: 'accountId' }, { label: 'THIRD', column: 'id' }])
        .where().eq({ label: 'MAIN', column: 'accountId' }, accountId);
    return execute(sqlData);
};

module.exports.getOneById = id => {
    const sqlData = new SqlBuilder('records').select('MAIN')
        .columns(
            { label: 'MAIN', columns: _.keys(Record.getColumnDefinitions()) },
            { label: 'SECOND', columns: ['name'] },
            { label: 'THIRD', columns: ['currency']})
        .join('categories', 'SECOND', [{ label: 'MAIN', column: 'categoryId' }, { label: 'SECOND', column: 'id' }])
        .join('accounts', 'THIRD', [{ label: 'MAIN', column: 'accountId' }, { label: 'THIRD', column: 'id' }])
        .where().eq({ label: 'MAIN', column: 'id' }, id).one();
    return execute(sqlData);
};

module.exports.update = (id, updated) => {
    const record = new Record({
        accountId: updated.accountId,
        categoryId: updated.categoryId,
        price: updated.price,
        amount: updated.amount,
        comment: updated.comment,
        recordDate: updated.date,
        isIncome: updated.isIncome
    });
    delete record.creationDate;
    delete record.id;
    const sqlData = new SqlBuilder('records').update(record).where().eq({ label: null, column: 'id' }, id);
    return execute(sqlData).then(result => balanceService.synchronizeAccountBalance(record.accountId))
        .then(() => module.exports.getOneById(id));
};

module.exports.delete = id => {
    return module.exports.getOneById(id).then(record => {
        const sqlData = new SqlBuilder('records').delete().where().eq({ label: null, column: 'id' }, id);
        return execute(sqlData).then(result => balanceService.synchronizeAccountBalance(record.accountId));
    });

};
