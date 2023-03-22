import React, { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import './WithdrawConfirmModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiUserCircle } from 'react-icons/bi';
import Bitcoin from '../../assets/images/deposit_slider_bitoin.png'
import List from '../../assets/images/withdraw_slider_list.png'

const WithdrawConfirmModal = ({ modalTile, availableBalance, closeWithdrawModal }) => {
    const [walletAddress, setWalletAddress] = useState();
    const [withdrawAddress, setWithdrawAddress] = useState();
    const [withdrawAmount, setWithdrawAmount] = useState();
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

    const withdrawRequest = () => {
        if (withdrawAddress == null || withdrawAmount == null) {
            toast.warn("Please fill out correct information", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                hideProgressBar: true,
            });
        } else {
            const data = { "id": localStorage.getItem('user_id'), "accessToken": access_token, "amount": withdrawAmount, "wallet": withdrawAddress };
            axios.post(process.env.REACT_APP_API_HOST + 'api/requestWithdraw', data)
                .then((response) => {
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
                    closeWithdrawModal(false);
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: "top-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            hideProgressBar: true,
                        });
                        closeWithdrawModal(false);
                    }
                });
        }
    }

    const CloseToIcon = () => {
        closeWithdrawModal();
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + 'api/getWalletAddress/' + user_id)
            .then((response) => {
                setWalletAddress(response.data.address);
            }).catch((error) => {
                console.log(error);
            })

        const data = { "user_id": user_id, "accessToken": access_token }
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

    const totalInput = () => {
        setWithdrawAmount(availableBalance);
    }
    const handleClickEvent = (event) => {
        event.stopPropagation();
    }
    return (
        <>
            <div className="flex justify-end items-center z-50 top-0 w-full h-[100vh] md:h-full fixed bg-[#000] bg-opacity-[30%]" onClick={CloseToIcon} id='scroll'>
                <animated.div style={animation} className="font-rajdhani">
                    <div className='relative flex flex-col md:justify-between w-[100vw] lg:w-[27vw] h-screen lg:overflow-y-scroll pt-[38px] pb-[1vh] px-[12px] lg:pl-[0.8vw] lg:pr-[0.5vw] lg:py-[1vh] md:px-[60px] bg-[#fff] lg:rounded-l-[20px] font-Rajdhani md:font-montserrat bg-[url("../src/assets/images/deposit_slider_back.png")] bg-no-repeat bg-bottom bg-[length:100%_45vh]' onClick={handleClickEvent}>

                        <div className='lg:hidden flex justify-between items-center py-[8px] pl-[25px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[18px]'>
                                <div onClick={CloseToIcon} className='block w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                <p onClick={CloseToIcon} className='font-[500] text-[18px] font-Rajdhani mb-0'>{modalTile}</p>
                            </div>

                            <div className='items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[5px] text-[#fff] font-[500] font-Rajdhani md:font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[90%] font-[500] space-x-[10px]'>
                                        <p className='mb-0'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[20px] h-[20px]' />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-[2%] w-full items-center text-center px-[1.5vw] pt-[10px] lg:pt-[2vh]">
                            <p className='text-[90%] lg:font-montserrat font-Rajdhani lg:text-[1.2vw] font-[700] text-[#000000] mb-[0]'>Withdraw</p>
                        </div>

                        <div className="flex flex-col space-y-[2%] w-full items-center text-center px-[1.5vw] mt-[10px]">
                            <div className='flex justify-between items-center w-full px-[15px] py-[1vh] lg:py-[1.5vh] lg:pr-[1vw] lg:pl-[1vw] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                <div className='flex items-center'>
                                    <img src={Bitcoin} alt="Bitoin" className='w-[3vh] mr-[20px] lg:mr-[0.7vw]' />
                                    <p className='text-[#7F7F7F] font-[500] text-[2.5vh] lg:text-[0.9vw] mb-[0] font-rajdhani'>BTC Bitcoin</p>
                                </div>
                                <div className='block w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#292D32] rotate-[135deg]'></div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between w-full px-[1.5vw] lg:font-montserrat font-Rajdhani mt-[10px]'>
                            <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.8vw]'>Address</p>
                            <div className='flex items-center justify-center text-[2vh] lg:text-[0.6vw] text-[#1E9E39] font-[500] cursor-pointer'>Address Book</div>
                        </div>

                        {/* Background */}
                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex justify-between px-[18px] py-[1vh] lg:px-[1vw] lg:py-[1.5vh] rounded-[10px] bg-[#F8F8F8] w-full shadow-[0px_0px_34px_rgba(0,0,0,0.15)]'>
                                <textarea className='basis-[70%] lg:basis-[60%] font-Rajdhani bg-transparent text-[#7F7F7F] text-[2vh] lg:text-[0.7vw] focus:outline-none resize-none' onChange={e => setWithdrawAddress(e.target.value)} value={withdrawAddress} placeholder="Input or press and hold to paste the withdrawal address"></textarea>
                                <div className='flex justify-between items-center lg:justify-end basis-[20%] lg:basis-[25%] space-x-[0.8vw]'>
                                    <div className='block w-[12px] h-[12px] border-t-[2px] border-l-[2px] lg:mt-[0.7vh] border-[#7F7F7F] rotate-[135deg]'></div>
                                    <div className='mt-[0.3vh] h-[50%] border-l-[2px] border-[#7F7F7F]'></div>
                                    <img src={List} alt="List" className='h-[60%] cursor-pointer' />
                                </div>
                            </div>
                        </div>

                        {/* <div className='w-full px-[1.5vw]'>
                            <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.8vw]'>Network</p>
                        </div>

                        <div className='px-[1.5vw]'>
                            <div className='flex justify-between items-center w-full px-[18px] py-[1vh] lg:px-[1vw] lg:py-[1.5vh] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                <div className='flex items-center'>
                                    <p className='text-[#7F7F7F] font-[500] text-[2vh] lg:text-[0.8vw] mb-[0] font-rajdhani'>BTC</p>
                                </div>
                                <div className='block w-[12px] h-[12px] border-t-[2px] border-r-[2px] border-[#7F7F7F] rotate-[135deg]'></div>
                            </div>
                        </div> */}

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex items-center justify-between w-full'>
                                <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.8vw] font-Rajdhani md:font-montserrat'>Amount</p>
                                <div></div>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex justify-between items-center w-full py-[1vh] lg:py-[1.5vh] pr-[20px] lg:pr-[0.8vw] pl-[20px] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)] bg-[#fff] text-[#7F7F7F]'>
                                <input onChange={e => setWithdrawAmount(e.target.value)} value={withdrawAmount} placeholder='Min. Withdrawal Amount 0.001' className='basis-[70%] border-none focus:outline-none font-[500] text-[2vh] lg:text-[0.8vw] font-Rajdhani' required />
                                <div className='flex basis-[25%] lg:basis-[18%] justify-between text-[2vh] lg:text-[0.7vw]'>
                                    <p className='mb-[0]'>BTC</p>
                                    <div className='lg:hidden block mt-[0.3vh] h-[18px] border-l-[2px] border-[#7F7F7F]'></div>
                                    <button className='mb-[0] text-[#20A03B]' onClick={totalInput}>ALL</button>
                                </div>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex items-center justify-between mt-[0] w-full'>
                                <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.6vw]'>Withdrawable Amount {availableBalance} BTC</p>
                                <div className='flex items-center justify-center text-[2vh] lg:text-[0.6vw] text-[#1E9E39] font-[500] cursor-pointer'>Transfer Now</div>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='bg-[#fff] bg-opacity-[30%] w-full rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] py-[8px] px-[6px] lg:py-[1vh] lg:px-[0.8vw] text-[#595A5B] text-[1.5vh] lg:text-[0.6vw] font-[500] leading-[2vh] text-left space-y-[1vh]'>
                                <div className='flex items-center'>
                                    <p className='mr-[8px] text-[30px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p className='mb-[0]'>Daily Withdrawal Limit: 2 BTC</p>
                                    <AiOutlineQuestionCircle className='text-[#1E9E39] lg:ml-[0px] ml-[10px] w-[20px] h-[18px] lg:w-[2vw] lg:h-[2vh]' />
                                </div>

                                <div className='flex'>
                                    <p className='mr-[8px] text-[30px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p className='mb-[0]'>If you have made deposits before the withdrawal, please make sure they are complete. </p>
                                </div>

                                <div className='lg:flex hidden'>
                                    <p className='mr-[8px] text-[30px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p className='mb-[0]'>Please make sure that Your withdrawal address is correct and You are using BTC network. Otherwise, Your withdrowed funds might be lost.</p>
                                </div>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex items-center justify-between mt-[0] w-full'>
                                <p className='mb-[0] font-[500] text-[1.5vh] lg:text-[0.6vw] ml-[20px] lg:ml-[0px] text-[#1E9E39] cursor-pointer'>Need help? Please visit our Help Center.</p>
                                <div></div>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex items-center justify-between mt-[0] w-full'>
                                <p className='mb-[0] text-[#595A5B] font-[500] text-[1.8vh] lg:text-[0.6vw] font-Rajdhani md:font-montserrat'>Withdrawal Fees</p>
                                <p className='mb-[0] text-[#595A5B] font-[500] text-[1.8vh] lg:text-[0.6vw] font-Rajdhani md:font-montserrat'>0.00 BTC</p>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex items-center justify-between mt-[0] w-full'>
                                <p className='mb-[0] text-[#595A5B] font-[600] text-[2vh] lg:text-[0.9vw]'>Amount Received</p>
                                <p className='mb-[0] text-[#595A5B] font-[600] text-[2vh] lg:text-[0.9vw]'>0 BTC</p>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className='flex justify-evenly items-center font-Rajdhani w-full'>
                                <button className='text-center w-full bg-[#449552] py-[1vh] px-[10px] rounded-[10px] cursor-pointer no-underline text-[#fff] border-[2px] border-[#449552] font-[600] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={withdrawRequest}>Withdraw</button>
                            </div>
                        </div>

                        <div className='px-[1.5vw] mt-[10px]'>
                            <div className="absolute hidden lg:flex justify-center items-center z-10 top-[20px] left-[20px] w-[45px] h-[45px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={CloseToIcon}>
                                <div className="border-[1px] w-[30px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[10px] my-[4px] mx-[0]"></div>
                                <div className="border-[1px] w-[30px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-10px] my-[4px] mx-[0]"></div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div>
        </>
    )
}
export default WithdrawConfirmModal;