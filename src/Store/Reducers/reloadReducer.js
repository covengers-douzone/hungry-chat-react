const reloadReducer = (state = false, action) => {
    switch (action.type) {
        case 'RELOAD':
            return action.status
        default:
            return state
    }
};

export default reloadReducer;
