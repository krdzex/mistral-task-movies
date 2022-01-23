export const changeHeaderInputValue = (newValue) => {
    return {
        type: "CHANGE_HEADER_INPUT",
        payload: newValue
    }
}
export const changeSwitchValue = (newValue) => {
    return {
        type: "CHANGE_SWITCH_VALUE",
        payload: newValue
    }
}