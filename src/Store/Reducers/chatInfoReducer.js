const chatInfoReducer = (state = false, action) => {
    switch (action.type) {
        case 'CHAT_INFO':
            return action.ci
        default:
            return state
    }
};

export default chatInfoReducer;