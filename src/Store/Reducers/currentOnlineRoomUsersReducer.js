const currentOnlineRoomUsersReducer = (state = false, action) => {
    switch (action.type) {
        case 'CURRENT_ONLINE_ROOM_USERS':
            return action.cu;
        default:
            return state
    }
};

export default currentOnlineRoomUsersReducer;
