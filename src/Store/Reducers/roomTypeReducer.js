const roomTypeReducer = (state = false, action) => {
    switch (action.type) {
        case 'ROOM_TYPE':
            return action.tp
        default:
            return state
    }
};

export default roomTypeReducer;
