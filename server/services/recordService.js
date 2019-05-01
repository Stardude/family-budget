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
        isIncome: data.isIncome,
        transferRecordId: data.transferRecordId
    });
    delete record.id;
    const sqlData = new SqlBuilder('records').insert().columns({ label: null, columns: _.keys(record) }).values(record);
    return execute(sqlData).then(result => balanceService.synchronizeAccountBalance(record.accountId)
        .then(() => result));
};

module.exports.createAndGet = data => {
    return module.exports.create(data)
        .then(result => module.exports.getOneById(result.lastID));
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
        isIncome: updated.isIncome,
        transferRecordId: updated.transferRecordId
    });
    delete record.creationDate;
    delete record.id;
    const sqlData = new SqlBuilder('records').update(record).where().eq({ label: null, column: 'id' }, id);
    return execute(sqlData).then(result => balanceService.synchronizeAccountBalance(record.accountId))
        .then(() => module.exports.getOneById(id));
};

module.exports.delete = id => {
    return module.exports.getOneById(id).then(record => {
        if (record.transferRecordId) {
            return module.exports.getOneById(record.transferRecordId).then(transferRecord => {
                const sqlData = new SqlBuilder('records').delete().where().eq({label: null, column: 'id'}, id)
                    .or().eq({label: null, column: 'id'}, transferRecord.id);
                return execute(sqlData).then(() =>
                    Promise.all[
                        balanceService.synchronizeAccountBalance(record.accountId),
                        balanceService.synchronizeAccountBalance(transferRecord.accountId)
                    ]);
            });
        }

        const sqlData = new SqlBuilder('records').delete().where().eq({ label: null, column: 'id' }, id);
        return execute(sqlData).then(result => balanceService.synchronizeAccountBalance(record.accountId));
    });

};

module.exports.deleteByField = (field, value) => {
    const sqlData = new SqlBuilder('records').delete().where().eq({ label: null, column: field }, value);
    return execute(sqlData);
};
