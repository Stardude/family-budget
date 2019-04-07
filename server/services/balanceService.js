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
        .groupBy('isIncome');

    return execute(sqlData).then(result => {
        let balance = 0;

        if (result.length === 2) {
            balance = result[1].total - result[0].total;
        } else if (result.length === 1) {
            balance = result[0].isIncome ? result[0].total : -result[0].total;
        }

        return accountService.getOneById(accountId).then(account => {
            account.balance = balance;
            return accountService.update(accountId, account);
        });
    });
};