const mobileChatProfileSidebarReducer = (state = false, action) => {
    switch (action.type) {
        case 'MOBILE_CHAT_PROFILE':
            return !state;
        default:
            return state
    }
};

export default mobileChatProfileSidebarReducer;
