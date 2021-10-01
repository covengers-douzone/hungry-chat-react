const sendOkReducer = (state = false, action) => {
    switch (action.type) {
        case 'SEND_OK':
            return action.status;
        default:
            return state
    }
};

export default sendOkReducer;
