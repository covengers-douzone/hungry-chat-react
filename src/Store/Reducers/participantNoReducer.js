const participantNoReducer = (state = false, action) => {
    switch (action.type) {
        case 'PARTICIPANT_NO':
            return action.no
        default:
            return state
    }
};

export default participantNoReducer;
