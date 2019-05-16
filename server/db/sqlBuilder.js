const _ = require('lodash');

const _replaceQuotes = value => value.toString().replace('\'', '\'\'');

const _convertToSQLString = data => _.values(data).map(_replaceQuotes).join('\',\'');

const _updateValues = updated => _.keys(updated)
    .map(key => `${key} = '${_replaceQuotes(updated[key])}'`).join(',');

const getStringDefinition = columnDefinition =>
    _.keys(columnDefinition).map(key => `${key} ${columnDefinition[key]}`).join(',');

class SqlBuilder {
    constructor (tableName) {
        if (tableName) {
            this.tableName = tableName;
            this.method = 'GET_MANY';
        }

        this.query = '';
    }

    select (label) {
        this.query += `SELECT <COLUMNS> FROM ${this.tableName} `;
        if (label) {
            this.query += `${label} `;
        }
        return this;
    }

    join (tableName, label, relations) {
        this.query += `JOIN ${tableName} ${label} ON ${relations[0].label}.${relations[0].column} = ${relations[1].label}.${relations[1].column} `;
        return this;
    }

    insert () {
        this.query += `INSERT INTO ${this.tableName} (<COLUMNS>) VALUES (<VALUES>) `;
        this.method = 'CUD';
        return this;
    }

    columns (...data) {
        let queryString = '';
        for (let columnData of data) {
            if (columnData.label) {
                queryString += columnData.label + '.' + columnData.columns.join(`, ${columnData.label}.`) + ', ';
            } else {
                queryString += columnData.columns.join(`, `) + ', ';
            }
        }
        queryString = queryString.slice(0, -2);

        this.query = this.query.replace('<COLUMNS>', queryString);
        return this;
    }

    values (data) {
        this.query = this.query.replace('<VALUES>', `'${_convertToSQLString(data)}'`);
        return this;
    }

    update (data) {
        this.query += `UPDATE ${this.tableName} SET ${_updateValues(data)} `;
        this.method = 'CUD';
        return this;
    }

    delete () {
        this.query += `DELETE FROM ${this.tableName} `;
        this.method = 'CUD';
        return this;
    }

    groupBy (column) {
        this.query += `GROUP BY ${column} `;
        return this;
    }

    orderBy (columnsWithDirection) {
        this.query += `ORDER BY ${columnsWithDirection.map(o => `${o.field} ${o.direction}`).join(',')} `;
        return this;
    }

    limit (value) {
        this.query += `LIMIT ${value} `;
        return this;
    }

    offset (value) {
        this.query += `OFFSET ${value} `;
        return this;
    }

    where () {
        this.query += `WHERE `;
        return this;
    }

    eq (data, value) {
        if (data.label) {
            this.query += `${data.label}.${data.column} = '${_replaceQuotes(value)}' `;
        } else {
            this.query += `${data.column} = '${_replaceQuotes(value)}' `;
        }

        return this;
    }

    lessOrEq (data, value) {
        if (data.label) {
            this.query += `${data.label}.${data.column} <= '${_replaceQuotes(value)}' `;
        } else {
            this.query += `${data.column} <= '${_replaceQuotes(value)}' `;
        }

        return this;
    }

    and () {
        this.query += `AND `;
        return this;
    }

    or () {
        this.query += `OR `;
        return this;
    }

    openBrackets () {
        this.query += `( `;
        return this;
    }

    closeBrackets () {
        this.query += `) `;
        return this;
    }

    one () {
        this.method = 'GET_ONE';
        return this;
    }

    create (tableName, columnDefinition) {
        this.query += `CREATE TABLE IF NOT EXISTS ${tableName} (${getStringDefinition(columnDefinition)}) `;
        this.method = 'CUD';
        return this;
    }

    drop (tableName) {
        this.query += `DROP TABLE IF EXISTS ${tableName} `;
        this.method = 'CUD';
        return this;
    }

    wrapIntoTransaction () {
        this.query = `BEGIN TRANSACTION;\n${this.query};\nCOMMIT;`;
        return this;
    }
}

module.exports = SqlBuilder;
