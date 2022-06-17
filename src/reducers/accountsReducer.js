const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DEFAULT_ACCOUNT':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export default accountReducer;