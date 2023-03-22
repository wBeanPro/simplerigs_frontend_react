import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from "react-icons/ai";

import { useSelector } from 'react-redux'
import { getLogoutModal } from '../../store/reducer';

import MobSidebar from '../../compnents/MobSidebar/MobSidebar';
import Sidebar from '../../compnents/Sidebar/Sidebar';
import Navbar from '../../compnents/Navbar/Navbar';
import Footer from '../../compnents/Footer/Footer';
import Logout from '../../compnents/Logout/Logout';
import CheckoutTruck from '../../assets/images/checkout-truck.png'
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';

const Faq = () => {
    const navigate = useNavigate();
    const [MobileSidebar, setMobileSidebar] = useState(false);
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const loginStatus = localStorage.getItem('logged_in');
    const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');
    const data = {"user_id": user_id, "accessToken": access_token}

    // const CloseMobSidebar = () => {
    //     setMobileSidebar(!MobileSidebar);
    // };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user_id) {
            axios.post(process.env.REACT_APP_API_HOST + 'api/getUserInfo', data)
                .then((response) => {
                    if (response.data) {
                        setFirstName(response.data.first_name);
                        setLastName(response.data.last_name);
                        console.log("Got the user's name");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [user_id]);

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }
    const CloseToIcon = () => {
        navigate('/');
    }
    return (
        <>
            {loginStatus ?
                <>
                    <div className="lg:h-[100vh] dashboard-root-container">
                        <div className='flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]' >
                            {!MobileSidebar &&
                                <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center space-x-[15px]'>
                                        <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} />
                                        <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Frequently ...</p>
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
                            }

                            <div className='flex lg:space-x-[24px]'>
                                <div className="sidebar">
                                    <Sidebar />
                                </div>
                                <div className="main-container">
                                    <div className="flex flex-col justify-between lg:h-[93vh] text-[#595A5B]">

                                        <div className="mt-[4vh] ml-[1.8vw]">
                                            <h1 className='text-[28px] lg:text-[1.2vw] font-[500] lg:font-[600] font-Rajdhani lg:font-montserrat mb-[0] text-[#000000]'>Frequently Asked <span className='text-[#449552]'>Questions</span></h1>
                                        </div>

                                        <div className='lg:flex flex-col space-y-[1vh] h-full w-full lg:w-[68vw] mt-[2vh] relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] px-[20px] py-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] shadow-[0px_0px_44px_rgba(0,0,0,0.1)] leading-[3vh] font-Rajdhani lg:font-montserrat text-[20px] lg:text-[0.7vw] text-[#595A5B]'>                               <div className='overflow-y-scroll h-[580px] lg:h-full'>
                                            <p className='mb-[0] font-bold'>Who we are?</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>The most simple Cloud Mining Company on the market. No need to have any special knowledge or any know-how, no need to choose between GPU or ASICs. Get Your first income within 3 simple actions. Just click on a calculator, select desired hash power amount, make a deposit and start earn.</p>
                                            </div>

                                            <p className='mb-[0] font-bold'>How to Start?</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Go through a simple registration and payment procedure to join us.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Use the calculator to know Your potencial profit (all fees already deducted, what You see is what You'll get - no hidden costs or fees)</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Make a refundable deposit using one of offered options.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>You can increase Your total hash rate any time, the more hash rate You got, the more BTC will be generated.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>You are not required to buy or install any additional equipment.</p>
                                            </div>

                                            <p className='mb-[0] font-bold'>Payouts and withdrawal</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>You will be paid daily at the same time.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-0'>All payouts are in BTC.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Minimum withdrawal amount is 0.001 BTC (will be processed within 24 hours). Withdrawal fees are covered by the company.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>No hidden fees.</p>
                                            </div>

                                            <p className='mb-[0] font-bold'>Expenses and maintenance fees</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>All fees already deducted and won't cost You any extra. Income stated on the calculator is NET.</p>
                                            </div>
                                        </div>
                                            <div className="checkout-truck">
                                                <img src={CheckoutTruck} alt="truck" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='lg:block hidden items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[10px] font-montserrat text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                        <p className='mb-0'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[1.8vw] h-[2.5vh]' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <img className='lg:hidden block mt-[-45px] bottom-0 left-0 w-[100vw]' src={MobilePagesBack}/>
                    </div>
                    {logoutModalStatus && <Logout />}
                </>
                :
                <>
                    <div className="lg:block hidden bg-gradient-to-b from-[#CEEBEF] to-[#FED480]">
                        <Navbar />

                        {/* <div className="sidebar fixed-sidebar">
                    <Sidebar/>
                </div> */}

                        <div className='w-full text-[#595A5B]'>
                            <div className='w-[66%] font-montserrat bg-[#fff] bg-opacity-[60%] rounded-[20px] mt-[66px] ml-[146px] pt-[16px] pr-[44px] pb-[42px] pl-[34px] '>
                                <h6 className='mb-[25px] font-bold'>Who we are?</h6>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p className='mb-[25px]'>The most simple Cloud Mining Copany on the market. No need to have any special knowledges or any know-how, no need to choose between GPU or ASICs. Get Your first income within 3 simple actions. Just click on a calculator, select desired hash power amount, make a deposit and start earn.</p>
                                </div>

                                <h6 className='mb-[25px] font-bold'>How to Start?</h6>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p className='mr-[12px] mb-[25px]'>Go through a simple registration and payment procedure to join us.</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>Use the calculator to know Your potencial profit (all fees already deducted, what You see is what You'll get - no hidden costs or fees)</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>Make a refundable deposit using one of offered options.</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>You can increase Your total hash rate any time, the more hash rate You got, the more BTC will be generated.</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>You are not required to buy or install any additional equipment.</p>
                                </div>

                                <h6 className='mb-[25px] font-bold'>Payouts and withdrawal</h6>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>You will be paid daily at the same time.</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>All payouts are in BTC.</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>Minimum withdrawal amount is 0.001 BTC (will be processed within 24 hours). Withdrawal fees are covered by the company.</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>No hidden fees.</p>
                                </div>

                                <h6 className='mb-[25px] font-bold'>Expenses and maintenance fees</h6>
                                <div className='flex'>
                                    <p className='mr-[12px] mb-[25px] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                    <p>All fees already deducted and won't cost You any extra. Income stated on the calculator is NET.</p>
                                </div>
                            </div>
                        </div>


                        {/* <div className='desktop-logout'>
                    <Logout/>
                </div> */}
                        <div className="mt-[35px]"></div>
                        <Footer />
                    </div>

                    <div className="lg:hidden block  dashboard-root-container">
                        <div className='flex lg:flex-row flex-col justify-between pt-[32px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]' >
                            {!MobileSidebar &&
                                <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center space-x-[15px]'>
                                        <div onClick={CloseToIcon} className='block w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                        <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Frequently ...</p>
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
                            }

                            <div className='flex lg:space-x-[24px]'>
                                <div className="sidebar">
                                    <Sidebar />
                                </div>
                                <div className="main-container">
                                    <div className="flex flex-col justify-between lg:h-[93vh] text-[#595A5B]">

                                        <div className="mt-[4vh] ml-[1.8vw]">
                                            <h1 className='text-[28px] lg:text-[1.2vw] font-[500] lg:font-[600] font-Rajdhani lg:font-montserrat mb-[0] text-[#000000]'>Frequently Asked <span className='text-[#449552]'>Questions</span></h1>
                                        </div>

                                        <div className='lg:flex flex-col space-y-[1vh] h-full w-full lg:w-[68vw] mt-[2vh] relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] px-[20px] py-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] shadow-[0px_0px_44px_rgba(0,0,0,0.1)] leading-[3vh] font-Rajdhani lg:font-montserrat text-[20px] lg:text-[0.7vw] text-[#595A5B]'>                               <div className='overflow-y-scroll h-[580px] lg:h-full'>
                                            <p className='mb-[0] font-bold'>Who we are?</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>The most simple Cloud Mining Company on the market. No need to have any special knowledge or any know-how, no need to choose between GPU or ASICs. Get Your first income within 3 simple actions. Just click on a calculator, select desired hash power amount, make a deposit and start earn.</p>
                                            </div>

                                            <p className='mb-[0] font-bold'>How to Start?</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Go through a simple registration and payment procedure to join us.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Use the calculator to know Your potencial profit (all fees already deducted, what You see is what You'll get - no hidden costs or fees)</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Make a refundable deposit using one of offered options.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>You can increase Your total hash rate any time, the more hash rate You got, the more BTC will be generated.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>You are not required to buy or install any additional equipment.</p>
                                            </div>

                                            <p className='mb-[0] font-bold'>Payouts and withdrawal</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>You will be paid daily at the same time.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-0'>All payouts are in BTC.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>Minimum withdrawal amount is 0.001 BTC (will be processed within 24 hours). Withdrawal fees are covered by the company.</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>No hidden fees.</p>
                                            </div>

                                            <p className='mb-[0] font-bold'>Expenses and maintenance fees</p>
                                            <div className='flex'>
                                                <p className='mr-[12px] mb-[0] lg:pt-[12px] pt-[8px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                                <p className='mb-[0]'>All fees already deducted and won't cost You any extra. Income stated on the calculator is NET.</p>
                                            </div>
                                        </div>
                                            <div className="checkout-truck">
                                                <img src={CheckoutTruck} alt="truck" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='lg:block hidden items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[10px] font-montserrat text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                        <p className='mb-0'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[1.8vw] h-[2.5vh]' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <img className='lg:hidden block mt-[-45px] bottom-0 left-0 w-[100vw]' src={MobilePagesBack}/>
                    </div>
                </>
            }
            {MobileSidebar &&
                <MobSidebar SidbarTitle="FAQ" NavigationLink="/faqs" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
        </>
    )
}

export default Faq