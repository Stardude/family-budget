const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'CATEGORY_ADD_LIST':
            return action.categories;
        case 'CATEGORY_ADD_ONE':
            return [...state, action.category];
        case 'CATEGORY_UPDATE':
            return [...state.filter(category => category.id !== action.id), action.category];
        case 'CATEGORY_DELETE':
            return state.filter(category => category.id !== action.id);
        default:
            return state;
    }
};