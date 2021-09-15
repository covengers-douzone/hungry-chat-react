const chatProfileSidebarReducer = (state = false, action) => {
    switch (action.type) {
        case 'CHAT':
            return !state;
        default:
            return state
    }
};

export default chatProfileSidebarReducer;
