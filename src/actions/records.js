import axios from 'axios';

export const addRecordList = (records) => ({
    type: 'RECORD_ADD_LIST',
    records
});

export const addRecord = (record) => ({
    type: 'RECORD_ADD_ONE',
    record
});

export const editRecord = (id, record) => ({
    type: 'RECORD_UPDATE',
    id,
    record
});

export const deleteRecord = (id) => ({
    type: 'RECORD_DELETE',
    id
});

export const filterRecords = (filter) => ({
    type: 'RECORD_FILTER',
    filter
});

export const startGetRecordsForAccount = (accountId) => dispatch => axios.get('/api/records', {params: {accountId}})
    .then(response => dispatch(addRecordList(response.data)));

export const startAddRecord = record => dispatch => axios.post('/api/records', record)
    .then(response => dispatch(addRecord(response.data)));

export const startEditRecord = (id, updates) => dispatch => axios.put(`/api/records/${id}`, updates)
    .then(response => dispatch(editRecord(id, response.data)));

export const startDeleteRecord = id => dispatch => axios.delete(`/api/records/${id}`)
    .then(response => dispatch(deleteRecord(id)));
