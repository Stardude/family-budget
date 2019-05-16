const defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'FILTER_ADD':
            return {
                ...state,
                ...action.filter
            };
        default:
            return state;
    }
};