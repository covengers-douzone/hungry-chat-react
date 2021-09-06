const lastReadNoReducer = (state = false, action) => {
    switch (action.type) {
        case 'LASTREAD_NO':
            return action.no
        default:
            return state
    }
};

export default lastReadNoReducer;