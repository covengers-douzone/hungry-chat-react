const currentOnlineUsersReducer = (state = false, action) => {
    switch (action.type) {
        case 'CURRENT_ONLINE_USERS':
            return action.cu;
        default:
            return state
    }
};

export default currentOnlineUsersReducer;
