const codeBlockReducer = (state = false, action) => {
    switch (action.type) {
        case 'CODE_BLOCK':
            return action.status
        default:
            return state
    }
};

export default codeBlockReducer;