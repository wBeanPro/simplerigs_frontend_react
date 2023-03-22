import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setForgotPassword, setLogInModalShow, setLoginModalStatus, setPasswordRecovery } from "../../store/action";
import axios from "axios";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [verifiactionCode, setVerifiactionCode] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [request, setRequest] = useState(false);
    const forgotConfirmhandler = (e) => {
        if (!request) {
            axios.post(process.env.REACT_APP_API_HOST + 'api/requestForgotPassword', { 'email': email })
                .then((response) => {
                    if (response.data) {
                        setRequest(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            if (password === confirmPassword) {
                const data = { 'token': verifiactionCode, 'password': password }
                axios.post(process.env.REACT_APP_API_HOST + 'api/forgotPasswordChange', data)
                    .then((response) => {
                        if (response.data) {
                            dispatch(setPasswordRecovery(true));
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 500) {
                            dispatch(setLogInModalShow(false));
                            toast.error(error.response.data.message, {
                                position: "top-right",
                                autoClose: 2000,
                                closeOnClick: true,
                                hideProgressBar: true,
                            });
                        }
                    })
            } else {
                toast.error("Confirm password doesn't match!", {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    hideProgressBar: true,
                });
            }

        }

        e.preventDefault();
    }

    const CloseToIcon = () => {
        // setShowModal((prev) => !prev);
        dispatch(setLogInModalShow(false));
        dispatch(setForgotPassword(false));
        dispatch(setLoginModalStatus(false));
        dispatch(setPasswordRecovery(false));
    };

    return (
        <div className="w-screen h-screen md:h-auto md:w-[860px] md:px-[22px] px-[12px] pb-[13px] pt-[100px] md:py-[24px] bg-[#fff] md:rounded-[10px]">
            <div className="items-center text-center relative">
                <h1 className='text-[5vh] font-[600] text-[#4B4B4B] font-montserrat'>SIMPLE<span className='text-[#449552]'>RIGS</span></h1>
                <p className='text-[2.5vh] md:text-[20px] font-[600] mb-0'>You're just few steps away from mining</p>
                <div
                    className="md:block hidden absolute lg:top-[-35px] lg:right-[-35px] md:top-[-35px] md:right-[-35px] w-[35px] h-[35px] border-[3px] border-solid rounded-[20px] bg-[#1A8731] text-[white] cursor-pointer"
                    onClick={CloseToIcon}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="cross_icon" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
                </div>

                {/* <div className="md:hidden absolute flex justify-center items-center z-10 top-[-70px] right-[20px] w-[36px] h-[36px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={CloseToIcon}>
                    <div className="border-[1px] w-[20px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[8px] my-[4px] mx-[0]"></div>
                    <div className="border-[1px] w-[20px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-8px] my-[4px] mx-[0]"></div>
                </div> */}
            </div>

            <div className="flex justify-center px-[22px] text-center md:h-auto h-[86%] text-[#4B4B4B] bg-[url('../src/assets/images/mobile_login_back.png')] md:bg-[url('../src/assets/images/login_back.png')] bg-no-repeat bg-[length:100%_35%] bg-bottom md:bg-cover font-Rajdhani md:font-montserrat">
                <form onSubmit={forgotConfirmhandler} className="md:w-auto w-full">
                    {
                        request
                            ?
                            <div className="mt-[80px] md:mt-[33px] h-full md:h-auto text-left md:w-[366px] w-full">
                                <div className="">
                                    <p className='text-[18px] font-[300] mb-0 font-Rajdhani md:font-montserrat'>Change password</p>
                                </div>
                                <div className="mt-[10px] space-y-[11px]">
                                    <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                                        <input type="text" value={verifiactionCode} placeholder="Enter the confirmation code" className="w-full px-[20px] py-[13px] md:py-[19px] text-left md:text-center text-[15px] font-[200] md:h-[66px] focus:outline-[#449552] rounded-[10px]" onChange={e => setVerifiactionCode(e.target.value)} required />
                                    </div>

                                    <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                                        <input type="password" value={password} placeholder="Enter Your new password" className="w-full px-[20px] py-[13px] md:py-[19px] text-left md:text-center text-[15px] font-[200] md:h-[66px] focus:outline-[#449552] rounded-[10px]" onChange={e => setPassword(e.target.value)} required />
                                    </div>
                                    

                                    <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px] ">
                                        <input type="password" value={confirmPassword} placeholder="Confirm Your new password" className="w-full px-[20px] py-[13px] md:py-[19px] text-left md:text-center text-[15px] font-[200] md:h-[66px] focus:outline-[#449552] rounded-[10px]" onChange={e => setConfirmPassword(e.target.value)} required />
                                    </div>
                                
                                    <div className="mt-[21px] text-center mb-[16px] font-rajdhani w-full">
                                        <button type="submit" className="bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[13px] font-Rajdhani w-full md:w-[198px] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]">Confirm</button>
                                    </div>

                                    <div className="md:hidden block mt-[21px] text-center mb-[16px] font-rajdhani w-full">
                                        <button type="submit" className="bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[13px] font-Rajdhani w-full md:w-[198px] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]" onClick={CloseToIcon}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="mt-[10vh] md:mt-[9px] h-full md:h-auto">
                                <div className="">
                                    <p className='md:text-center text-left text-[18px] font-[300] mb-[11px] md:mb-0'>Password recovery</p>
                                    <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                                        <input type="email" value={email} placeholder='Enter Your email' className="w-full px-[20px] py-[13px] md:py-[19px] text-left md:text-center text-[15px] font-[200] md:h-[66px] focus:outline-[#449552] rounded-[10px]" onChange={e => setEmail(e.target.value)} required />
                                    </div>

                                    <div className="w-full md:w-[355px] px-[3px] mt-[8px] text-[11px] font-[300] text-left">
                                        <p>
                                            Enter Your email for further verification proccess. We will send You Password reset link. Please check Your inbox or spam folder after confirmation.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-[8vh] md:mt-[50px] md:mb-[16px] text-center items-center">
                                    <button type="submit" className="bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[13px] font-Rajdhani w-full md:w-[366px] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]">Send me a recovery link</button>
                                </div>

                                <div className="md:hidden block mt-[3vh] md:mt-[50px] md:mb-[16px] text-center items-center">
                                    <button type="submit" className="bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[13px] font-Rajdhani w-full md:w-[366px] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]" onClick={CloseToIcon}>Cancel</button>
                                </div>

                            </div>
                    }
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword;