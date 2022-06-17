const tenderPassedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_TENDER_PASSED_DETAILS':
            return { ...state, ...action.payload }
        case 'FETCH_ALL_STAGES':
            return { ...state, ...action.payload}
        default:
            return state;
    }
}

export default tenderPassedReducer;