import axios from 'axios';

export const addCategoryList = (categories) => ({
    type: 'CATEGORY_ADD_LIST',
    categories
});

export const addCategory = (category) => ({
    type: 'CATEGORY_ADD_ONE',
    category
});

export const editCategory = (id, category) => ({
    type: 'CATEGORY_UPDATE',
    id,
    category
});

export const deleteCategory = (id) => ({
    type: 'CATEGORY_DELETE',
    id
});

export const startGetCategoryByName = name => () => axios.get(`/api/categories/${name}`)
    .then(response => response.data);

export const startGetAllCategories = () => dispatch => axios.get('/api/categories')
    .then(response => dispatch(addCategoryList(response.data)));

export const startAddCategory = name => dispatch => axios.post('/api/categories', {name})
    .then(response => dispatch(addCategory(response.data)));

export const startEditCategory = (id, updates) => dispatch => axios.put(`/api/categories/${id}`, updates)
    .then(response => dispatch(editCategory(id, response.data)));

export const startDeleteCategory = id => dispatch => axios.delete(`/api/categories/${id}`)
    .then(response => dispatch(deleteCategory(id)));
