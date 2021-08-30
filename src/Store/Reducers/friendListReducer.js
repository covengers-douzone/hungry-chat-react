const friendListReducer = (state = false, action) => {
    switch (action.type) {
        case 'FRIEND_LIST':
            return action.fl
        default:
            return state
    }
};

export default friendListReducer;