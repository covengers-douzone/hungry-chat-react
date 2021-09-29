const lastPageReducer = (state =  0, action) => {
    switch (action.type) {
        case 'LAST_PAGE':
            return action.lp;
        default:
            return state
    }
};

export default lastPageReducer;
