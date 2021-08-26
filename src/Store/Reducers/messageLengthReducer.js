const messageLengthReducer = (state = false, action) => {
    switch (action.type) {
        case 'MESSAGE_LENGTH':
            return action.length
        default:
            return state
    }
};

export default messageLengthReducer;
