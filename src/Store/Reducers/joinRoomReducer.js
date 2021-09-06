const joinRoomReducer = (state = false, action) => {
    switch (action.type) {
        case 'JOIN_ROOM':
            return action.status
        default:
            return state
    }
};

export default joinRoomReducer;
