const switchValueReducer = (state = false, action) => {
    switch (action.type) {
        case "CHANGE_SWITCH_VALUE":
            return state = action.payload
        default:
            return state;
    }
}
export default switchValueReducer;