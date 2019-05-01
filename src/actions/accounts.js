import axios from 'axios';

export const addAccountList = (accounts) => ({
    type: 'ACCOUNT_ADD_LIST',
    accounts
});

export const addAccount = (account) => ({
    type: 'ACCOUNT_ADD_ONE',
    account
});

export const editAccount = (id, account) => ({
    type: 'ACCOUNT_UPDATE',
    id,
    account
});

export const deleteAccount = (id) => ({
    type: 'ACCOUNT_DELETE',
    id
});

export const startGetAccountByName = name => () => axios.get(`/api/accounts/${name}`)
    .then(response => response.data);

export const startGetAllAccounts = () => dispatch => axios.get('/api/accounts')
    .then(response => dispatch(addAccountList(response.data)));

export const startAddAccount = account => dispatch => axios.post('/api/accounts', account)
    .then(response => dispatch(addAccount(response.data)));

export const startEditAccount = (id, updates) => dispatch => axios.put(`/api/accounts/${id}`, updates)
    .then(response => dispatch(editAccount(id, response.data)));

export const startDeleteAccount = id => dispatch => axios.delete(`/api/accounts/${id}`)
    .then(response => dispatch(deleteAccount(id)));

export const startTransfer = parameters => dispatch => axios.post('/api/accounts/transfer', parameters)
    .then(response => {
        dispatch(editAccount(parameters.source, response.data.source));
        dispatch(editAccount(parameters.destination, response.data.destination));
    });
