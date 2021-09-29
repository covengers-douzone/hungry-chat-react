const lastReadNoLengthReducer = (state = 0, action) => {
    switch (action.type) {
        case 'LASTREAD_LENGTH':
            return action.length
        default:

            return state
    }
};

export default lastReadNoLengthReducer;
