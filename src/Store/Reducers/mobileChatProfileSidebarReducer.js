const mobileChatProfileSidebarReducer = (state = false, action) => {
    switch (action.type) {
        case 'MOBILE_CHAT':
            return !state;
        default:
            return state
    }
};

export default mobileChatProfileSidebarReducer;
