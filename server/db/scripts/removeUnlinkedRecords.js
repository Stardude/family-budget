require('../db').connect();

const execute = require('../dbExecutor');

execute({
    method: 'CUD',
    query: 'DELETE FROM records WHERE id NOT IN (' +
        'SELECT MAIN.id FROM records MAIN JOIN categories SECOND ON MAIN.categoryId = SECOND.id JOIN accounts THIRD ON MAIN.accountId = THIRD.id)'
}).then(result => console.log(result));
