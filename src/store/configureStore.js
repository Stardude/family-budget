import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import accounts from '../reducers/accounts';
import categories from '../reducers/categories';
import records from '../reducers/records';
import filters from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            accounts,
            categories,
            records,
            filters
        }),
        applyMiddleware(thunk)
    );
    return store;
};