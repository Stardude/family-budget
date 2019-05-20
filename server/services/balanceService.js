const _ = require('lodash');

const accountService = require('./accountService');
const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

module.exports.synchronizeAccountBalance = accountId => {
    const sqlData = new SqlBuilder('records').select()
        .columns(
            {label: null, columns: ['isIncome']},
            {label: null, columns: ['SUM(price * amount) AS total']}
        )
        .where().eq({label: null, column: 'accountId'}, accountId)
        .groupBy(['isIncome']);

    return execute(sqlData).then(result => {
        let balance = 0;

        if (result.length === 2) {
            balance = result[1].total - result[0].total;
        } else if (result.length === 1) {
            balance = result[0].isIncome === 'true' ? result[0].total : -result[0].total;
        }

        return accountService.getOneById(accountId).then(account => {
            account.balance = balance;
            return accountService.update(accountId, account);
        });
    });
};

module.exports.synchronizeBalanceForAllAccounts = () => {
    const sqlData = new SqlBuilder('records').select()
        .columns(
            {columns: ['accountId']},
            {columns: ['isIncome']},
            {columns: ['SUM(price * amount) AS total']}
        )
        .groupBy(['accountId', 'isIncome']);

    return execute(sqlData).then(accountsData => {
        const accounts = {};

        accountsData.forEach(account => {
            if (!accounts[account.accountId]) {
                accounts[account.accountId] = {};
            }

            if (account.isIncome === 'true') {
                accounts[account.accountId].plus = account.total;
            } else {
                accounts[account.accountId].minus = account.total;
            }
        });

        return Promise.all(_.map(accounts, (value, accountId) => {
            let balance = 0;

            if (value.plus && value.minus) {
                balance = value.plus - value.minus;
            } else {
                balance = value.plus || -value.minus;
            }

            return accountService.getOneById(accountId).then(account => {
                account.balance = balance;
                return accountService.update(accountId, account);
            });
        }));

    });
};
