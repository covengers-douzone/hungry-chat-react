const userNoReducer = (state = false, action) => {
    switch (action.type) {
        case 'USER_NO':
            console.log("USER_NO" , action.type.toString())
            return action.no
        default:
            console.log("default" , action)
            return state
    }

};

export default userNoReducer;
