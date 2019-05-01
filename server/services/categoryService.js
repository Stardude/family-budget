const _ = require('lodash');

const Category = require('./../models/Category');
const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

const recordService = require('./recordService');

module.exports.create = newCategory => {
    const category = new Category(newCategory);
    delete category.id;
    const sqlData = new SqlBuilder('categories').insert().columns({ label: null, columns: _.keys(category) }).values(category);
    return execute(sqlData).then(result => module.exports.getOneById(result.lastID));
};

module.exports.getAll = () => {
    const sqlData = new SqlBuilder('categories').select('MAIN')
        .columns({ label: 'MAIN', columns: _.keys(Category.getColumnDefinitions()) });
    return execute(sqlData);
};

module.exports.getOneByName = name => {
    const sqlData = new SqlBuilder('categories').select('MAIN')
        .columns({ label: 'MAIN', columns: _.keys(Category.getColumnDefinitions()) })
        .where().eq({ label: 'MAIN', column: 'name' }, name).one();
    return execute(sqlData);
};

module.exports.getOneById = id => {
    const sqlData = new SqlBuilder('categories').select('MAIN')
        .columns({ label: 'MAIN', columns: _.keys(Category.getColumnDefinitions()) })
        .where().eq({ label: 'MAIN', column: 'id' }, id).one();
    return execute(sqlData);
};

module.exports.update = (id, updated) => {
    const category = new Category(updated);
    delete category.creationDate;
    delete category.id;
    const sqlData = new SqlBuilder('categories').update(category).where().eq({ label: null, column: 'id' }, id);
    return execute(sqlData).then(result => module.exports.getOneById(id));
};

module.exports.delete = id => {
    const sqlData = new SqlBuilder('categories').delete().where().eq({ label: null, column: 'id' }, id);
    return execute(sqlData).then(() => recordService.deleteByField('categoryId', id));
};
