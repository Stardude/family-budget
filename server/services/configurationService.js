const _ = require('lodash');

const Configuration = require('./../models/Configuration');
const SqlBuilder = require('./../db/sqlBuilder');
const execute = require('./../db/dbExecutor');

module.exports.get = () => {
    const sqlData = new SqlBuilder('configuration').select()
        .columns({ columns: _.keys(Configuration.getColumnDefinitions()) }).where().eq('id', 1).one();
    return execute(sqlData).then(result => JSON.parse(result.data));
};

module.exports.update = data => {
    const configuration = new Configuration({ data: typeof data === 'string' ? data : JSON.stringify(data) });
    const sqlData = new SqlBuilder('configuration').update(configuration).where().eq('id', 1);
    return execute(sqlData);
};
