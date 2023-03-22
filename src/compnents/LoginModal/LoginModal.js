import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Login from '../Login/Login'
import Register from '../Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { getForgotPassword, getLoginModalShow, getTwoFAVerification, getLoginModalStatus, getPasswordRecovery } from '../../store/reducer'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import { setForgotPassword, setLogInModalShow, setLoginModalStatus, setTwoFAVerification } from '../../store/action'
import TwoFAVerification from '../TwoFAVerification/TwoFAVerification'
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery'

const LoginModal = () => {
    const modalRef = useRef();
    // const [activeTab, setActiveTab] = useState("login")
    const forgotPassword = useSelector(state => getForgotPassword(state))
    const showModal = useSelector(state => getLoginModalShow(state));
    const twoFAStatus = useSelector(state => getTwoFAVerification(state));
    const loginModalStatus = useSelector(state => getLoginModalStatus(state));
    const passwordRecoveryStatus = useSelector(state => getPasswordRecovery(state));
    
    const dispatch = useDispatch();
    const animation = useSpring({
        config: {
            duration: 450
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });


    const closeModal = e => {
        if (modalRef.current === e.target) {
            dispatch(setLogInModalShow(false));
            dispatch(setForgotPassword(false));
            dispatch(setLoginModalStatus(false));
        }

    };

    const CloseToIcon = () => {
        dispatch(setLogInModalShow(false));
        dispatch(setForgotPassword(false));
        dispatch(setLoginModalStatus(false));
        dispatch(setTwoFAVerification(false));
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                dispatch(setLogInModalShow(false));
            }
        },
        [showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );
    return (
        <>
            {showModal ? (
                <div className="flex justify-center items-center z-50 top-0 w-full h-full fixed bg-[#000] bg-opacity-[52%]" id='scroll' onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation} className="font-Rajdhani">
                        {
                            forgotPassword
                                ? <div>
                                    {passwordRecoveryStatus ?
                                        <PasswordRecovery />
                                        :
                                        <ForgotPassword />}
                                </div>

                                : <div className='w-screen h-screen md:h-auto md:w-[860px] lg:px-[22px] md:px-[22px] px-[12px] pb-[8px] pt-[8vh] md:py-[24px] bg-[#fff] md:rounded-[10px] '>
                                    <div className="items-center text-center relative">
                                        <h1 className='text-[5vh] font-[600] text-[#4B4B4B] font-montserrat'>SIMPLE<span className='text-[#449552]'>RIGS</span></h1>
                                        <p className='text-[2.5vh] md:text-[20px] font-[600] mb-0'>You're just few steps away from mining</p>
                                        <div
                                            className="md:block hidden absolute lg:top-[-35px] lg:right-[-35px] md:top-[-35px] md:right-[-35px] w-[35px] h-[35px] border-[3px] border-solid rounded-[20px] bg-[#1A8731] text-[white] cursor-pointer"
                                            onClick={CloseToIcon}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="cross_icon" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
                                        </div>

                                        {/* <div className="md:hidden absolute flex justify-center items-center z-10 top-[-45px] right-[20px] w-[36px] h-[36px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={CloseToIcon}>
                                            <div className="border-[1px] w-[20px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[8px] my-[4px] mx-[0]"></div>
                                            <div className="border-[1px] w-[20px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-8px] my-[4px] mx-[0]"></div>
                                        </div> */}
                                    </div>
                                    {twoFAStatus ?
                                        <div className="md:flex md:justify-center px-[22px] text-left md:text-center text-[#4B4B4B] md:h-auto h-[72%] bg-[url('../src/assets/images/mobile_login_back.png')] md:bg-[url('../src/assets/images/login_back.png')] bg-no-repeat bg-[length:100%_40%] md:bg-cover bg-bottom mt-[100px] md:mt-[0] md:w-full">
                                            <div className="mt-[9px]">
                                                <p className='md:block hidden text-[18px] font-[300] mb-[11px] md:mb-0'>2FA VERIFICATION</p>
                                                <p className='md:hidden block text-[18px] font-[300] mb-[11px] md:mb-0'>Please enter 2FA code</p>
                                                <TwoFAVerification 
                                                    closeTwoFAModal={() =>
                                                        CloseToIcon()
                                                    }
                                                />
                                            </div>
                                        </div>
                                        :
                                        <div className="md:h-auto h-[84%] bg-[url('../src/assets/images/mobile_login_back.png')] md:bg-[url('../src/assets/images/login_back.png')] bg-no-repeat bg-[length:100%_40%] md:bg-cover bg-bottom">
                                            {loginModalStatus ? 
                                                <Register 
                                                    closeRegisterModal={() =>
                                                        CloseToIcon()
                                                    }
                                                />
                                            : <Login 
                                                    closeLoginModal={() =>
                                                        CloseToIcon()
                                                    }
                                             
                                                />}
                                        </div>
                                    }
                                </div>
                        }

                    </animated.div>
                </div>
            ) : null}
        </>
    )
}

export default LoginModal