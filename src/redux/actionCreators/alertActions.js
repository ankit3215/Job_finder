import * as actionKeys from "../actionKeys";

export const userRegisteredAlert = (dispatch, message, alertType) => {
    dispatch({
        type: actionKeys.USER_REGISTERED_ALERT,
        payload : {
            message : message,
            alertType : alertType
        }
    });
}

export const errorAlert = (dispatch, message) => {
    dispatch({
        type: actionKeys.ERROR_ALERT,
        payload: {
            message: message,
            alertType: "error"
        }
    });
}

export const hideAlert = (dispatch) => {
    dispatch({
        type : actionKeys.HIDE_ALERT,
    })
}