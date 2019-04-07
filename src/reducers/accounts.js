const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ACCOUNT_ADD_LIST':
            return action.accounts;
        case 'ACCOUNT_ADD_ONE':
            return [...state, action.account];
        case 'ACCOUNT_UPDATE':
            return [...state.filter(account => account.id !== action.id), action.account];
        case 'ACCOUNT_DELETE':
            return state.filter(account => account.id !== action.id);
        default:
            return state;
    }
};