const messageAllLengthReducer = (state = false, action) => {
    switch (action.type) {
        case 'MESSAGE_ALL_LENGTH':
            return action.length
        default:

            return state
    }
};

export default messageAllLengthReducer;
