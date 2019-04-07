import axios from 'axios';

export default {
    getAll: () => axios.get('/api/categories'),

    create: name => axios.post('/api/categories', {name}),

    head: name => axios.head(`/api/categories/${name}`),

    remove: name => axios.delete(`/api/categories/${name}`),

    update: (name, updates) => axios.put(`/api/categories/${name}`, updates)
};