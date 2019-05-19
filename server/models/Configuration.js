class Configuration {
    constructor (configuration) {
        this.id = configuration.id || 1;
        this.data = configuration.data || '';
    }

    static getColumnDefinitions () {
        return {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            data: 'TEXT'
        };
    }
}

module.exports = Configuration;
