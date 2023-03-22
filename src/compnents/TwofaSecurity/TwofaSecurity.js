import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'
import axios from "axios";
import copyFunction from "copy-to-clipboard";
import { toast } from "react-toastify"
import Copy from '../../assets/images/copy.png';
import GooglePlay from '../../assets/images/google_play_profile.png'
import AppStore from '../../assets/images/app_store_profile.png'

import { BiUserCircle } from 'react-icons/bi';

import './TwofaSecurity.css';

import { useDispatch } from 'react-redux'
import { setTwoFAModalStatus } from '../../store/action'

const TwofaSecurity = () => {
    const dispatch = useDispatch();
    const [imgurl, setImgUrl] = useState('');
    const [code, setCode] = useState('');
    const [verifyCode, setVerifyCode] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');

    const animation = useSpring({
        config: {
            duration: 150
        },
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    useEffect(() => {
        const data = {"user_id": user_id, "accessToken": access_token}
        axios.post(process.env.REACT_APP_API_HOST + 'api/getQrcode', data)
            .then((res) => {
                setImgUrl(res.data.url);
                setCode(res.data.key)
            })
            .catch((error) => {
                console.log(error)
            })

        axios.post(process.env.REACT_APP_API_HOST + 'api/getUserInfo', data)
            .then((response) => {
                if (response.data) {
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [user_id]);

    // const confirmActivate = () => {
    //     const data = { "user_id": user_id, "accessToken": access_token, "code": verifyCode }
    //     axios.post(process.env.REACT_APP_API_HOST + 'api/qrcodeVerify', data)
    //         .then((res) => {
    //             dispatch(setTwoFAModalStatus(false));
    //         })
    //         .catch((error) => {
    //             toast.error('An error occurred during verify qr code. Please try again', {
    //                 position: "bottom-center",
    //                 autoClose: 2000,
    //                 closeOnClick: true,
    //                 hideProgressBar: true,
    //             });
    //         })
    // }

    const TwoFaCheck = () => {
        const data = { "user_id": user_id, "accessToken": access_token, "code": verifyCode };
        console.log("verify code", verifyCode);
        axios.post(process.env.REACT_APP_API_HOST + 'api/setTwoFAuth', data)
            .then((response) => {
                if(response.data.result) {
                    localStorage.setItem('twoFAStatus', true);
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
                    dispatch(setTwoFAModalStatus(false));
                } else {
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                console.log("2fa setting error", error);
            })
    }

    const CloseToIcon = () => {
        dispatch(setTwoFAModalStatus(false));
    };

    const handleSubDivClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div className="flex justify-end items-center z-50 top-0 w-full h-full fixed bg-[#000] bg-opacity-[30%]" onClick={CloseToIcon} id='scroll'>
                <animated.div style={animation} className="font-Rajdhani">

                    <div className='relative flex flex-col md:justify-between w-screen lg:w-[27vw] h-[100vh] lg:overflow-y-scroll pt-[38px] pb-[1vh] px-[12px] md:px-[60px] lg:pl-[0.8vw] lg:pr-[0.5vw] lg:py-[1vh] bg-[#fff] lg:rounded-l-[20px] font-montserrat bg-[url("../src/assets/images/deposit_slider_back.png")] bg-no-repeat bg-bottom bg-[length:100%_40vh]' onClick={handleSubDivClick}>
                        <div className='lg:hidden flex justify-between items-center py-[0.8vh] pl-[25px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[18px]'>
                                <div onClick={CloseToIcon} className='block w-[8px] h-[8px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Profile</p>
                            </div>

                            <div className='items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-Rajdhani md:font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <button className='profile_icon no-underline flex items-center py-[0.8vh] px-[0.8vw] text-[90%] font-[500] space-x-[10px]'>
                                        <p className='mb-0 md:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[20px] h-[20px]' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-[3%] w-full items-center text-center px-[1.5vw] pt-[10px] lg:pt-[5vh]">
                            <div>
                                <p className='text-[18px] font-Rajdhani lg:font-montserrat lg:text-[1.2vw] font-[700] text-[#000000] mb-[0]'>Set up Your 2FA Security</p>
                                <p className='text-[12px] font-Rajdhani lg:font-montserrat lg:text-[0.65vw] font-[600] text-[#000000] mb-[0]'>Scan the QR-code in the Google Authenticator app.</p>
                            </div>
                        </div>

                        {/* Wallet Address QR code */}
                        <div className='flex flex-col justify-evenly items-center px-[1.5vw] mt-[10px]'>
                            <img src={imgurl} alt='Wallet QR code' className='w-[140px] h-[140px] mt-[10px] lg:w-[13vw] lg:h-[26vh] md:w-[13vw] md:h-[26vh]' />
                        </div>
                        <div className="text-center px-[1.5vw] mt-[10px]">
                            <p className="text-[#595A5B] text-[2vh] lg:text-[0.65vw] lg:font-montserrat font-Rajdhani font-[500] mb-[0px]">if you don’t have the Google Authenticator app yet, <br />you can download it using link below;</p>
                        </div>

                        {/* Google App & App Store */}
                        <div className="px-[1.5vw] mt-[10px]">
                            <div className="w-full flex justify-between items-center">
                                <img className="w-[45%] h-[65%] lg:w-[45%] lg:h-[65%] md:w-[40%] md:h-[50%]" src={GooglePlay} alt="tractor-drag-mobile" />
                                <img className="w-[45%] h-[75%] lg:w-[45%] lg:h-[75%] md:w-[40%] md:h-[65%]" src={AppStore} alt="tractor-drag-mobile" />
                            </div>
                        </div>

                        <div className="px-[1.5vw] mt-[10px]">
                            <p className="text-center text-[#595A5B] lg:text-[0.65vw] text-[2vh] font-[500] lg:font-montserrat font-Rajdhani mb-[0px]">If you can’t scan the QR-code on the left, please enter this code manually in the Google Authenticator app:</p>
                        </div>

                        <div className="px-[1.5vw] mt-[10px]">
                            <div className="flex justify-between items-center bg-[#fff] bg-opacity-50 rounded-[10px] w-full shadow-[0px_0px_34px_rgb(0,0,0,0.15)] px-[2vw] py-[1vh] lg:px-[1vw]">
                                <p className="mb-[0] text-[2vh] lg:text-[0.8vw] text-[#000000]">{code}</p>
                                <span className='cursor-pointer' onClick={() => {
                                    console.log("Copy");
                                    copyFunction(code);
                                    toast.success("Copied your QR code", {
                                        position: "bottom-center",
                                        autoClose: 2000,
                                        closeOnClick: true,
                                        hideProgressBar: true,
                                    });
                                }}> <img src={Copy} alt='copy' />
                                </span>
                            </div>
                        </div>

                        <div className="px-[1.5vw] mt-[10px]">
                            <div className="w-full">
                                <p className="text-[#595A5B] lg:font-montserrat font-Rajdhani text-[2vh] lg:text-[0.65vw] font-[500] mb-[0px]">Enter the 6-digit code from the Google Authenticator app.</p>
                                <div className="bg-[#ffffff] w-full rounded-[10px] shadow-[0px_0px_24px_rgb(0,0,0,0.1)] py-[1vh] px-[1vw]">
                                    <input placeholder="Google verification code" onChange={(e) => setVerifyCode(e.target.value)} value={verifyCode} className="text-center w-full text-[#7F7F7F] focus:outline-none bg-transparent font-Rajdhani md:font-montserrat" />
                                </div>
                            </div>
                        </div>

                        <div className="px-[1.5vw] mt-[10px]">
                            <button onClick={TwoFaCheck} className='font-Rajdhani text-center w-full bg-[#449552] py-[1vh] px-[10px] rounded-[10px] font-[600] cursor-pointer no-underline border-[2px] border-[#449552] text-[#ffffff] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Activate</button>
                        </div>

                        <div className="absolute hidden lg:flex justify-center items-center z-10 top-[20px] left-[20px] w-[45px] h-[45px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={CloseToIcon}>
                            <div className="border-[1px] w-[30px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[10px] my-[4px] mx-[0]"></div>
                            <div className="border-[1px] w-[30px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-10px] my-[4px] mx-[0]"></div>
                        </div>
                    </div>

                </animated.div>
            </div>
        </>
    )
}

export default TwofaSecurity;