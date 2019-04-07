import axios from 'axios';

export default {
    getAll: () => axios.get('/api/accounts'),

    create: name => axios.post('/api/accounts', {name}),

    head: name => axios.head(`/api/accounts/${name}`),

    remove: name => axios.delete(`/api/accounts/${name}`),

    update: (name, updates) => axios.put(`/api/accounts/${name}`, updates)
};