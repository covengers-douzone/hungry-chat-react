const joinOkReducer = (state = false, action) => {
    switch (action.type) {
        case 'JOIN_OK':
            return action.value
        default:
            return state
    }
};

export default joinOkReducer;