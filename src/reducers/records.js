import { unionWith } from 'lodash';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'RECORD_ADD_LIST':
            return action.records;
        case 'RECORD_ADD_ONE':
            return [...state, action.record];
        case 'RECORD_UPDATE':
            return [...state.filter(record => record.id !== action.id), action.record];
        case 'RECORD_DELETE':
            return state.filter(record => record.id !== action.id);
        case 'RECORD_FILTER':
            return {
                filters: Array.isArray(state) ?
                    [action.filter] :
                    unionWith([action.filter], state.filters, (a, b) => a.field === b.field),
                data: state.data || state
            };
        default:
            return state;
    }
};