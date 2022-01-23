const headerInputReducer = (state = "", action) => {
    switch (action.type) {
        case "CHANGE_HEADER_INPUT":
            return state = action.payload
        default:
            return state;
    }
}
export default headerInputReducer;