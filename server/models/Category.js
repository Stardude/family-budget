class Category {
    constructor (category) {
        this.id = category.id || '';
        this.name = category.name || '';
        this.creationDate = category.creationDate || new Date();
        this.modificationDate = new Date();
        this.tags = category.currency || [];
    }

    static getColumnDefinitions () {
        return {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            name: 'VARCHAR(50)',
            creationDate: 'DATETIME',
            modificationDate: 'DATETIME',
            tags: 'VARCHAR(50)'
        };
    }
}

module.exports = Category;
