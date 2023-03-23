import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'

const planListModal = () => {
    const modalRef = useRef();
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
        }
        
    };

    const CloseToIcon = () => {

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
        <div className="flex justify-center items-center z-50 top-0 w-full h-[100vh] md:h-full fixed bg-[#000] bg-opacity-[52%]" id='scroll' onClick={closeModal} ref={modalRef}>
            <animated.div style={animation} className="font-Rajdhani">
                {
                    forgotPassword
                    ?<div>
                        {passwordRecoveryStatus? 
                        <PasswordRecovery />
                        : 
                        <ForgotPassword/>}
                    </div>
                    
                    : <div className=' w-[860px] px-[22px] py-[24px] bg-[#fff] rounded-[10px] '>
                        <div className="items-center text-center relative">
                            <h1 className='text-[45px] font-[600] text-[#4B4B4B] '>SIMPLE<span className='text-[#449552]'>RIGS</span></h1>
                            <p className='text-[20px] font-[600] mb-0'>You're just few steps away from mining</p>
                            <div
                                className="absolute top-[-30px] right-[-28px] w-[27px] h-[27px] text-[#000] border-[3px] border-solid rounded-[20px] bg-[#1A8731] text-[white]"
                                onClick={CloseToIcon}
                            >
                                X
                            </div>
                        </div>
                        {twoFAStatus ?
                        <div className="flex justify-center px-[22px] text-center text-[#4B4B4B] bg-[url('../src/assets/images/login_back.png')] bg-cover">
                            <div className="mt-[9px]">
                                <p className='text-[18px] font-[300] mb-0'>2FA VERIFICATION</p>
                                <TwoFAVerification/>
                            </div>
                        </div>
                        :
                        <div className="bg-[url('../src/assets/images/login_back.png')] bg-cover">
                            {loginModalStatus ? <Register/> : <Login/>}
                        </div>  
                        }
                    </div>  
                }
                
            </animated.div>
        </div>
    </>
  )
}

export default planListModal