const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'RECORD_ADD_LIST':
            return action.records;
        case 'RECORD_ADD_ONE':
            return [action.record, ...state];
        case 'RECORD_UPDATE':
            return [...state.filter(record => record.id !== action.id), action.record];
        case 'RECORD_DELETE':
            return state.filter(record => record.id !== action.id);
        default:
            return state;
    }
};