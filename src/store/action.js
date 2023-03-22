import {actionConstants} from './constants';

export const setForgotPassword = (value) => {
    return {
        type: actionConstants.SET_FORGOT_PASSWORD,
        payload: value
    }
}

export const setLogInModalShow = (value) => {
    return {
        type: actionConstants.SET_LOGINMODALSHOW,
        payload: value
    }
}

export const setSliderValueFor = (value) => {
    return {
        type: actionConstants.SET_SLIDER_VALUE,
        payload: value
    }
}

export const setTwoFAVerification = (value) => {
    return {
        type: actionConstants.SET_TWOFAVERFICATION,
        payload: value
    }
}

export const setLoginModalStatus = (value) => {
    return {
        type: actionConstants.SET_LOGINMODALSTATUS,
        payload: value
    }
}

export const setPasswordRecovery = (value) => {
    return {
        type: actionConstants.SET_PASSWORDRECOVERY,
        payload: value
    }
}

export const setLogoutModal = (value) => {
    return {
        type: actionConstants.SET_LOGOUTMODAL,
        payload: value
    }
}

export const setTwoFAModalStatus = (value) => {
    return {
        type: actionConstants.SET_TWOFAMODALSTATUS,
        payload: value
    }
}