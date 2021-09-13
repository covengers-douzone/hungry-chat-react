const profileInfoReducer = (state = false, action) => {
    switch (action.type) {
        case 'PROFILE_INFO':
            return action.pi
        default:
            return state
    }
};

export default profileInfoReducer;