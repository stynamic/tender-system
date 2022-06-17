const tendersReducer = (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_TENDERS':
            return { ...state, ...action.payload }
        case 'FETCH_FACTORY_MANAGER':
            return { ...state, factoryManager: action.payload }
        default:
            return state;
    }
}

export default tendersReducer;