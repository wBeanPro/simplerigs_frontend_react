import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setForgotPassword, setLogInModalShow, setLoginModalStatus, setPasswordRecovery } from "../../store/action";

const PasswordRecovery = () => {
    const dispatch = useDispatch();

    const CloseToIcon = () => {
        dispatch(setLogInModalShow(false));
        dispatch(setForgotPassword(false));
        dispatch(setLoginModalStatus(false));
        dispatch(setPasswordRecovery(false));
    };

    const login = () => {
        dispatch(setLogInModalShow(true));
        dispatch(setForgotPassword(false));
        dispatch(setLoginModalStatus(false));
        dispatch(setPasswordRecovery(false));
    }

    return(
        <div className="w-[374px] px-[10px] pb-[10px] bg-[#fff] text-[#4B4B4B] rounded-[10px]">
            <div className="bg-[url('../src/assets/images/login_back.png')] bg-cover pt-[59px] pb-[47px]">
                <div className="items-center text-center relative font-montserrat px-[37px] mb-[40px] ">
                    <p className='text-[26px] font-[600] mb-[11px]'>Password recovery</p>
                    <p className='text-[15px] font-[400] mb-0'>Your password has been changed successfully</p>
                    <div
                        className="md:block hidden absolute top-[-73px] right-[-23px] w-[35px] h-[35px] text-[#000] border-[3px] border-solid rounded-[20px] bg-[#1A8731] text-[white] shadow-[0px_4px_4px_rgb(0,0,0,0.25)]"
                        onClick={CloseToIcon}
                    > <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="cross_icon" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
                    </div>
                </div>

                <div className="flex justify-center px-[22px] text-center font-rajdhani">
                    <div className="flex justify-center items-center">
                        <button className="bg-[#449552] w-[140px] h-[50px] border-[#449552] border-[3px] rounded-[10px] text-[#fff] text-[18px] font-[600] hover:bg-transparent hover:text-[#449552]" onClick={login}>Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PasswordRecovery;