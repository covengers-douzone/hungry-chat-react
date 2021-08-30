const headCountReducer = (state = false, action) => {
    switch (action.type) {
        case 'HEAD_COUNT':
            return action.no
        default:
            return state
    }
};

export default headCountReducer;
