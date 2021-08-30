const roomNoReducer = (state = false, action) => {
    switch (action.type) {
        case 'ROOM_NO':
            return action.no
        default:
            return state
    }
};

export default roomNoReducer;
