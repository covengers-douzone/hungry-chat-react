const markDownReducer = (state = false, action) => {
    switch (action.type) {
        case 'MARKDOWN':
            return action.status
        default:
            return state
    }
};

export default markDownReducer;