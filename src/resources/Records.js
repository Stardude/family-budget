import axios from 'axios';

export default {
    getAll: accountName => axios.get('/api/records', {params: {accountName}}),

    create: record => axios.post('/api/records', record),

    remove: recordId => axios.delete(`/api/records/${recordId}`),

    update: (name, updates) => axios.put(`/api/records/${name}`, updates)
};