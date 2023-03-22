import React, { useRef, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import Bitcoin from '../../assets/images/deposit_slider_bitoin.png'
import Copy from '../../assets/images/copy.png';
import Master from '../../assets/images/mastercard.png'
import Visa from '../../assets/images/deposit_visa.png'
import axios from 'axios'
import { BiUserCircle } from 'react-icons/bi';
import copyFunction from "copy-to-clipboard";
import { toast } from "react-toastify"

const DepositSlider = ({ depositType, closeDepositModal }) => {
    const [walletAddress, setWalletAddress] = useState();
    const [qrURL, setQRURL] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');
    const data = {"user_id": user_id, "accessToken": access_token}
    const animation = useSpring({
        config: {
            duration: 150
        },
        from: { opacity: 0 },
        to: { opacity: 1 },
    });

    // const closeModal = () => {
    //     closeDepositModal();
    // };

    const CloseToIcon = () => {
        closeDepositModal();
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + 'api/getWalletAddress/' + user_id)
            .then((response) => {
                if(response.data.result) {
                    setWalletAddress(response.data.address);
                    setQRURL(response.data.url);
                } else {
                    toast.warn(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    }); 
                }
            }).catch((error) => {
                console.log(error);
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
    }, [user_id, walletAddress]);

    return (
        <>
            <div className="flex justify-end items-center z-50 top-0 w-full h-full fixed bg-[#000] bg-opacity-[30%]" id='scroll'>
                <animated.div style={animation} className="font-Rajdhani">
                    {depositType == 1 ?
                        <div className='relative flex flex-col md:justify-evenly w-screen lg:w-[27vw] h-screen overflow-y-scroll pt-[12px] pb-[1vh] px-[12px] lg:pl-[0.8vw] lg:pr-[0.5vw] lg:py-[1vh] md:px-[60px] bg-[#fff] lg:rounded-l-[20px] font-montserrat bg-[url("../src/assets/images/deposit_slider_back.png")] bg-no-repeat bg-bottom bg-[length:100%_38vh]'>

                            <div className='lg:hidden flex justify-between items-center py-[8px] pl-[25px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                <div className='flex items-center space-x-[18px]'>
                                    <div onClick={CloseToIcon} className='block w-[8px] h-[8px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                    <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Buy Plans</p>
                                </div>

                                <div className='items-center justify-end hover:text-[#429763]'>
                                    <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                        <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                            <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                            <BiUserCircle className='w-[20px] h-[20px]' />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='text-center px-[1.5vw] mt-[10px]'>
                                <p className='text-[90%] lg:font-montserrat font-Rajdhani lg:text-[1.2vw] font-[700] text-[#000000] mb-[0]'>Deposit</p>
                            </div>
                            <div className='text-center px-[1.5vw] mt-[10px]'>
                                <div className='flex justify-between grid grid-cols-6 items-center w-full px-[15px] py-[0.6vh] lg:py-[1vh] lg:pr-[1vw] lg:pl-[1vw] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center col-span-1'>
                                        <img className='w-[4vh] mr-[0.3vw]' src={Visa} alt="Visa" />
                                        <img className='w-[3.5vh] h-[2.2vh]' src={Master} alt="Master" />
                                    </div>
                                    <div className='col-span-1'></div>
                                    <div className='col-span-2 text-center'>
                                        <p className='text-[#7F7F7F] font-[500] text-[90%] lg:text-[0.9vw] mb-[0] lg:font-montserrat font-Rajdhani'>Credit Card</p>
                                    </div>
                                    <div className='col-span-1'></div>
                                    <div className='col-span-1 grid justify-items-end'>
                                        <div className='block w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#292D32] rotate-[135deg]'></div>
                                    </div>
                                </div>
                            </div>

                            <div className='text-center px-[1.5vw] mt-[10px]'>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='mb-[0] text-[#595A5B] font-[500] lg:font-montserrat font-Rajdhani text-[1.8vh] lg:text-[0.8vw]'>Copy your personal wallet address</p>
                                    <div className='flex items-center justify-center lg:font-montserrat font-Rajdhani px-[4vw] py-[0.6vh] lg:px-[0.8vw] lg:py-[0.8vh] bg-[#EBEBEB] text-[2vh] lg:text-[0.8vw] text-[#1E9E39] font-[600] rounded-[5px]'>Step 1</div>
                                </div>
                            </div>

                            {/* Wallet Address QR code */}
                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex flex-col justify-evenly items-center px-[1.5vw] rounded-[10px] bg-[#F8F8F8] w-full lg:h-[34vh] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] py-[0.8vh] lg:pb-[0.8vh] lg:pt-[0px]'>
                                    <p className='text-[#000000] font-[500] text-[2vh] lg:text-[0.9vw] lg:font-montserrat font-Rajdhani lg:mb-[1rem] mb-[10px]'>Wallet Address</p>
                                    <img src={qrURL} alt='Wallet QR code' className='md:block hidden w-[26vw] h-[13vh] lg:w-[8vw] lg:h-[15vh] md:w-[24vw] md:h-[20vh]' />
                                    <hr className='w-[90%] text-[#919191] border-[1px]' />
                                    <div className='flex justify-evenly lg:justify-between lg:ml-[0px] items-center w-full'>
                                        <p className='mb-[0] text-[1.5vh] lg:text-[0.7vw] md:text-[17px]'>{walletAddress}</p>
                                        <span className='ml-[5px] cursor-pointer' onClick={() => {
                                            console.log("Copy");
                                            copyFunction(walletAddress);
                                            toast.success("Copied your wallet address", {
                                                position: "bottom-center",
                                                autoClose: 2000,
                                                closeOnClick: true,
                                                hideProgressBar: true,
                                            });
                                        }}> <img src={Copy} alt='copy' />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='mb-[0] text-[#595A5B] font-[500] text-[1.8vh] lg:text-[0.8vw] lg:font-montserrat font-Rajdhani'>Follow website link below</p>
                                    <div className='flex items-center justify-center bg-[#EBEBEB] lg:font-montserrat font-Rajdhani text-[2vh] lg:text-[0.8vw] text-[#1E9E39] font-[600] px-[4vw] py-[0.6vh] lg:px-[0.8vw] lg:py-[0.8vh] rounded-[5px]'>Step 2</div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <a href='https://changelly.com/buy-crypto' target="_blank" className='block w-full py-[0.6vh] px-[20px] lg:py-[16px] lg:pr-[0.8vw] lg:pl-[20px] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)] bg-[#fff] no-underline'>
                                    <div className='flex justify-between items-center'>
                                        <div></div>
                                        <p className='text-[#7F7F7F] font-[500] text-[18px] lg:text-[0.9vw] mb-[0] font-Rajdhani'>Changelly.com</p>
                                        <div className='block w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#292D32] rotate-[135deg]'></div>
                                    </div>
                                </a>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='mb-[0] text-[#595A5B] font-[500] text-[1.8vh] lg:text-[0.8vw] lg:font-montserrat font-Rajdhani w-[70%] lg:w-[75%]'>Enter the amount, wallet address and proceed</p>
                                    <div className='flex items-center justify-center px-[4vw] py-[0.6vh] lg:px-[0.8vw] lg:py-[0.8vh] bg-[#EBEBEB] text-[2vh] lg:text-[0.8vw] text-[#1E9E39] font-[600] rounded-[5px] lg:font-montserrat font-Rajdhani'>Step 3</div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='bg-[#fff] bg-opacity-[30%] w-full rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] py-[6px] px-[14px] lg:py-[1vh] lg:px-[0.8vw] text-[#595A5B] text-[1.8vh] lg:text-[0.6vw] font-[500] leading-[2vh] text-left space-y-[1vh] lg:font-montserrat font-Rajdhani'>
                                    <div className='flex'>
                                        <p className='mr-[8px] text-[20px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>Please make sure that only BTC deposit is made via this address and Your wallet address is correct . Otherwise, Your deposited funds will not be added to Your available balance - nor will be refunded.</p>
                                    </div>

                                    <div className='flex'>
                                        <p className='mr-[8px] text-[20px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>3 block confirmation are required to launch a new miner.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex justify-evenly items-center font-Rajdhani w-full'>
                                    <a href={"https://blockchair.com/bitcoin/address/" + walletAddress} target="_blank" className='w-full font-Rajdhani text-center bg-[#449552] py-[1vh] px-[2vw] rounded-[5px] cursor-pointer no-underline border-[2px] border-[#449552] hover:bg-opacity-70 transition duration-300 font-[600] shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'><span className='text-[#fff]'>Review Transaction</span></a>
                                </div>
                            </div>

                            <div className="absolute hidden lg:flex justify-center items-center z-10 top-[20px] left-[20px] w-[45px] h-[45px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={CloseToIcon}>
                                <div className="border-[1px] w-[30px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[10px] my-[4px] mx-[0]"></div>
                                <div className="border-[1px] w-[30px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-10px] my-[4px] mx-[0]"></div>
                            </div>
                        </div>
                        :
                        <div className='relative flex flex-col md:justify-evenly w-screen lg:w-[27vw] h-screen overflow-y-scroll pt-[12px] pb-[1vh] px-[12px] lg:pl-[0.8vw] lg:pr-[0.5vw] lg:py-[1vh] md:px-[60px] bg-[#fff] lg:rounded-l-[20px] font-montserrat bg-[url("../src/assets/images/deposit_slider_back.png")] bg-no-repeat bg-bottom bg-[length:100%_38vh]'>

                            <div className='lg:hidden flex justify-between items-center py-[8px] pl-[25px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                <div className='flex items-center space-x-[18px]'>
                                    <div onClick={CloseToIcon} className='block w-[8px] h-[8px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                    <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Buy Plans</p>
                                </div>

                                <div className='items-center justify-end hover:text-[#429763]'>
                                    <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                        <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                            <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                            <BiUserCircle className='w-[20px] h-[20px]' />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] text-center mt-[10px]'>
                                <p className='text-[90%] md:font-montserrat font-Rajdhani lg:text-[1.2vw] font-[700] text-[#000000] mb-[0]'>Crypto Deposit</p>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex justify-between items-center w-full px-[15px] py-[0.6vh] lg:py-[1vh] lg:pr-[1vw] lg:pl-[1vw] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center'>
                                        <img src={Bitcoin} alt="Bitoin" className='w-[3vh] mr-[20px] lg:mr-[0.5vw]' />
                                        <p className='text-[#7F7F7F] font-[500] text-[90%] lg:text-[0.9vw] mb-[0] font-Rajdhani'>BTC Bitcoin</p>
                                    </div>
                                    <div className='block w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#292D32] rotate-[135deg]'></div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='mb-[0] text-[#000] font-[500] text-[1.8vh] lg:text-[0.8vw] lg:font-montserrat font-Rajdhani'>Chain Type</p>
                                    <div className='flex items-center justify-center px-[4vw] py-[0.8vh] lg:px-[1.2vw] lg:py-[0.8vh] bg-[#EBEBEB] text-[18px] lg:text-[0.8vw] font-[600] rounded-[5px] text-[#F7931A] lg:font-montserrat font-Rajdhani'>BTC</div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                {/* Wallet Address QR code */}
                                <div className='flex flex-col justify-evenly items-center px-[1.5vw] lg:py-[0px] py-[1vh] rounded-[10px] bg-[#F8F8F8] w-full lg:h-[43vh]'>
                                    <p className='text-[#000000] font-[500] lg:font-montserrat font-Rajdhani text-[90%]'>Wallet Address</p>
                                    <img src={qrURL} alt='Wallet QR code' className='md:block hidden w-[30vw] h-[18vh] lg:w-[11vw] lg:h-[22vh] md:w-[25vw] md:h-[20vh]' />
                                    <hr className='w-[90%] text-[#919191] border-[1px]' />
                                    <div className='flex justify-evenly lg:justify-between items-center w-full lg:ml-[0px]'>
                                        <p className='mb-[0] text-[1.5vh] lg:text-[0.7vw] md:text-[17px] text-[#4B4B4B]'>{walletAddress}</p>
                                        <span className='ml-[5px] cursor-pointer' onClick={() => {
                                            console.log("Copy");
                                            copyFunction(walletAddress);
                                            toast.success("Copied your wallet address", {
                                                position: "bottom-center",
                                                autoClose: 2000,
                                                closeOnClick: true,
                                                hideProgressBar: true,
                                            });
                                        }}> <img src={Copy} alt='copy' />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='bg-[#fff] bg-opacity-[30%] w-full rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] py-[6px] px-[14px] lg:py-[1vh] lg:px-[0.8vw] text-[#595A5B] text-[1.8vh] lg:text-[0.6vw] font-[500] leading-[2vh] text-left space-y-[1vh] lg:font-montserrat font-Rajdhani'>
                                    <div className='flex'>
                                        <p className='mr-[8px] text-[20px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>Please make sure that only BTC deposit is made via this address. Otherwise, Your deposited funds will not be added to Your available balance - nor will be refunded.</p>
                                    </div>

                                    <div className='flex'>
                                        <p className='mr-[8px] text-[20px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>Please make sure that Your Simple Rigs address is correct. Otherwise, Your deposited funds will not be added to Your available balance - nor will be refunded.</p>
                                    </div>

                                    <div className='flex'>
                                        <p className='mr-[8px] text-[20px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>3 block confirmation are required to launch a new miner.</p>
                                    </div>

                                    <div className='flex'>
                                        <p className='mr-[8px] text-[20px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>Please make sure that You are using BTC network to transfer funds.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex justify-evenly items-center font-Rajdhani w-full'>
                                    <a href={"https://blockchair.com/bitcoin/address/" + walletAddress} target="_blank" className='block w-full font-Rajdhani text-center bg-[#449552] py-[1vh] px-[2vw] rounded-[5px] cursor-pointer no-underline border-[2px] border-[#449552] hover:bg-opacity-70 transition duration-300 font-[600] shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'><span className='text-[#fff]'>Review Transaction</span></a>
                                </div>
                            </div>

                            <div className="absolute hidden lg:flex justify-center items-center z-10 top-[20px] left-[20px] w-[45px] h-[45px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={CloseToIcon}>
                                <div className="border-[1px] w-[30px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[10px] my-[4px] mx-[0]"></div>
                                <div className="border-[1px] w-[30px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-10px] my-[4px] mx-[0]"></div>
                            </div>
                        </div>
                    }

                </animated.div>
            </div>
        </>
    )
}

export default DepositSlider