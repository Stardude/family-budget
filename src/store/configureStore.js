import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import accounts from '../reducers/accounts';
import categories from '../reducers/categories';
import records from '../reducers/records';

export default () => {
    const store = createStore(
        combineReducers({
            accounts,
            categories,
            records
        }),
        applyMiddleware(thunk)
    );
    return store;
};