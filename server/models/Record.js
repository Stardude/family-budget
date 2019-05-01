const moment = require('moment');

class Record {
    constructor (record) {
        this.id = record.id || '';
        this.creationDate = record.creationDate || new Date();
        this.modificationDate = new Date();
        this.recordDate = record.recordDate || moment().startOf('day').toDate();
        this.accountId = record.accountId || '';
        this.categoryId = record.categoryId || '';
        this.price = record.price || 0;
        this.amount = record.amount || 1;
        this.isIncome = record.isIncome || false;
        this.comment = record.comment || '';
        this.transferRecordId = record.transferRecordId || '';
    }

    static getColumnDefinitions () {
        return {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            creationDate: 'DATETIME',
            modificationDate: 'DATETIME',
            recordDate: 'DATETIME',
            accountId: 'INTEGER REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE',
            categoryId: 'INTEGER REFERENCES categories(id) ON UPDATE CASCADE ON DELETE RESTRICT',
            price: 'FLOAT',
            amount: 'INTEGER',
            isIncome: 'BOOLEAN',
            comment: 'VARCHAR(100)',
            transferRecordId: 'INTEGER'
        };
    }
}

module.exports = Record;
