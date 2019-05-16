require('../db').connect();

const moment = require('moment');

const recordService = require('../../services/recordService');

recordService.getAll().then(records => {
    const recordsToChange = records.filter(record => {
        return !moment(record.recordDate, moment.ISO_8601).isValid();
    });

    recordsToChange.forEach(record => {
        record.date = moment(new Date(record.recordDate)).toISOString();
        recordService.update(record.id, record);
    });
});