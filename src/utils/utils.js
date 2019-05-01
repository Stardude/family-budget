import moment from 'moment';

export const checkIfValuesExist = (...args) => {
    for (let value of args) {
        if (!value || value === '') {
            return false;
        }
    }

    return true;
};

export const convertToSelectList = (array, labelProp, valueProp) =>
    array.map(item => ({ label: item[labelProp], value: item[valueProp] }));

export const filterRecords = records => {
    if (Array.isArray(records)) {
        return records;
    } else {
        const filters = records.filters;
        let data = records.data;

        for (let filter of filters) {
            data = data.filter(record => {
                if (filter.type === 'EQUAL') {
                    return filter.value ? record[filter.field] === filter.value : true;
                }

                if (filter.type === 'DATE_LESS') {
                    return filter.value ? moment(record[filter.field]).isSameOrBefore(filter.value) : true;
                }
            });
        }

        return data;
    }
};

export const sortRecords = records => {
    return records.sort((a, b) => moment(a.recordDate).isAfter(b.recordDate) ? -1 :
        (moment(a.recordDate).isBefore(b.recordDate) ? 1 : (a.id > b.id ? -1: 1)));
};
