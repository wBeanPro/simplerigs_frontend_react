import { actionConstants } from './constants';

const initialState = {
    forgotPassword: false,
    loginModalShow: false,
    slidervalue:125,
    twoFAverification: false,
    loginModalStatus : false,
    passwordRecovery : false,
    logoutModal : false,
    twoFAModal: false,
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionConstants.SET_FORGOT_PASSWORD:
            return {
                ...state,
                forgotPassword: payload
            }
        case actionConstants.SET_SLIDER_VALUE:
            return {
                ...state,
                slidervalue: payload
            }
        case actionConstants.SET_LOGINMODALSHOW:
            return {
                ...state,
                loginModalShow: payload
            }
        case actionConstants.SET_TWOFAVERFICATION:
            return {
                ...state,
                twoFAverification: payload
            }
        case actionConstants.SET_LOGINMODALSTATUS:
            return {
                ...state,
                loginModalStatus: payload
            }
        case actionConstants.SET_PASSWORDRECOVERY:
            return {
                ...state,
                passwordRecovery: payload
            }
        case actionConstants.SET_LOGOUTMODAL:
            return {
                ...state,
                logoutModal: payload
            }
        case actionConstants.SET_TWOFAMODALSTATUS:
            return {
                ...state,
                twoFAModal: payload
            }
        default:
            return state
    }
}

export const getForgotPassword = (state) => {
    return state.forgotPassword;
}

export const getSliderValueFor = (state) => {
    return state.slidervalue;
}
export const getLoginModalShow = (state) => {
    return state.loginModalShow;
}

export const getTwoFAVerification = (state) => {
    return state.twoFAverification;
}

export const getLoginModalStatus = (state) => {
    return state.loginModalStatus;
}

export const getPasswordRecovery = (state) => {
    return state.passwordRecovery;
}

export const getLogoutModal = (state) => {
    return state.logoutModal;
}

export const getTwoFAStatus = (state) => {
    return state.twoFAModal;
}