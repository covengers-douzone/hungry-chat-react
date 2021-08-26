const userNoReducer = (state = false, action) => {
    switch (action.type) {
        case 'USER_NO':
            return action.no
        default:
            return state
    }
};

export default userNoReducer;
