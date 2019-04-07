class Account {
    constructor (account) {
        this.id = account.id || '';
        this.name = account.name || '';
        this.creationDate = account.creationDate || new Date();
        this.modificationDate = new Date();
        this.currency = account.currency || 'грн';
        this.balance = account.balance || 0;
    }

    static getColumnDefinitions () {
        return {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            name: 'VARCHAR(50)',
            creationDate: 'DATETIME',
            modificationDate: 'DATETIME',
            currency: 'VARCHAR(3)',
            balance: 'FLOAT'
        };
    }
}

module.exports = Account;
