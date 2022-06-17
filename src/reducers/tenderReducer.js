const tenderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_TENDER_DETAILS':
            return { ...state, ...action.payload }
        case 'FETCH_ALL_PROPOSAL':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export default tenderReducer;