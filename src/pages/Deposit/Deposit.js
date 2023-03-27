import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from "react-icons/ai";

import { Slider } from "@mui/material";
import axios from 'axios';
import DepositSlider from '../../compnents/DepositSlider/DepositSlider';
import Logout from '../../compnents/Logout/Logout';
import Sidebar from '../../compnents/Sidebar/Sidebar';
import MobSidebar from '../../compnents/MobSidebar/MobSidebar'
import GreenTractor from '../../assets/images/green-tractor.webp'
import YellowTractor from '../../assets/images/yellow-tractor1.webp'
import YellowTractor2 from '../../assets/images/yellow-tractor2.webp'
import RedTractor from '../../assets/images/red-tractor1.webp'
import RedTractor2 from '../../assets/images/red-tractor2.webp'
import CreditIcon from '../../assets/images/card.png'
import BitcoinIcon2 from '../../assets/images/bitcoin-icon-2.png'
import CheckoutTruck from '../../assets/images/checkout-truck.webp'
import Master from '../../assets/images/mastercard.webp'
import Visa from '../../assets/images/deposit_visa.png'
import Bitcoin from '../../assets/images/bitcoin2.webp'
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';

import './deposit.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSliderValueFor } from '../../store/action';
import { getLogoutModal } from '../../store/reducer';

const Deposit = () => {
    const navigate = useNavigate();
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const [MobileSidebar, setMobileSidebar] = useState(false);
    const [slideValue, setSlideValue] = useState(125);
    const [showTractor, setShowTractor] = useState(1);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [depositModalShow, setDepositModalShow] = useState(false);
    const [depositType, setDepositType] = useState(1);
    const user_id = Number(localStorage.getItem('user_id'));
    const access_token = localStorage.getItem('access_token');
    const loginStatus = localStorage.getItem('logged_in');
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!loginStatus){
          navigate('/');
        }
      },[loginStatus, navigate]);

    const CloseMobSidebar = () => {
        setMobileSidebar(!MobileSidebar);
    };
    const sliderChange = (e) => {
        setSlideValue(e.target.value);
        dispatch(setSliderValueFor(e.target.value));
    }
    const sliderValueChange = (e) => {
        let price = e.target.value;
        if (price.split(' ')[1]) {
            setSlideValue(Number(price.split(' ')[1]));
        } else {
            setSlideValue(0)
        }
    }
    const sliderValueChanged = (e) => {
        let price = e.target.value;
        if (price.split(' ')[1] && Number(price.split(' ')[1]) >= 125) {
            setSlideValue(Number(price.split(' ')[1]))
            dispatch(setSliderValueFor(Number(price.split(' ')[1])));
        } else {
            setSlideValue(125)
            dispatch(setSliderValueFor(125));
        }
    }
    React.useEffect(() => {
        if (slideValue <= 1000) {
            setShowTractor(1);
        }
        else if (slideValue <= 5000) {
            setShowTractor(2);
        }
        else if (slideValue <= 10000) {
            setShowTractor(3);
        }
        else if (slideValue <= 50000) {
            setShowTractor(4);
        }
        else {
            setShowTractor(5);
        }
    }, [slideValue])

    // Get User's information
    useEffect(() => {
        if (user_id) {
            const data = {"user_id": user_id, "accessToken": access_token}
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

    const depositTypeChoose = (e) => {
        console.log("deposit modal show");
        setDepositType(e);
        setDepositModalShow(true);
        const data = { "user_id": localStorage.getItem('user_id'), "accessToken": access_token, "amount": slideValue, "power": slideValue * 16, "year_pro" : slideValue * 0.12 * 12 };
        axios.post(process.env.REACT_APP_API_HOST + 'api/requestOrder', data)
            .then((response) => {
                console.log("called");
            })
            .catch((error) => {
                console.log("error here", error.response);
            });
    }

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }

    return (
        <>
            <div className="dashboard-root-container  lg:h-[100vh] lg:flex-row flex-col">

                <div className={`${depositModalShow? "md:h-[100vh] h-[50vh]" : "h-full" } flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]`} >
                    {!MobileSidebar &&
                        <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[15px]'>
                                <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} />
                                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>New Assets</p>
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
                            <div className="flex flex-col justify-between h-full lg:h-[93vh] dashboard-container">
                                <div className='mt-[4vh] ml-[1.8vw]'>
                                    <h1 className='text-[28px] font-[500] font-Rajdhani lg:text-[1.2vw] lg:font-[600] lg:font-montserrat mb-[0]'>Buy <span className='text-[#449552]'>Plans</span></h1>
                                    <p className='lg:text-[22px] text-[20px] font-[600] lg:font-montserrat mb-[0]'>DEPOSIT</p>
                                </div>

                                <div className="lg:flex lg:flex-col space-y-[20px] lg:space-y-[3vh] h-full w-full lg:w-[68vw] lg:mt-[2vh] mt-[12px] relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] pt-[14px] pb-[35px] px-[14px] lg:shadow-[0px_0px_44px_rgba(0,0,0,0.1)]">

                                    {/* Calculator Section */}
                                    <div className="flex flex-col w-full lg:w-[70%]" id="calculator">
                                        <div className="flex lg:flex-row flex-col bg-[#8BD66C] bg-opacity-[39%] lg:shadow-[0px_8px_44px_rgb(0,0,0,0.4)] rounded-[10px] justify-between font-rajdhani py-[14px] px-[23px] lg:pt-[1.2vh] lg:pr-[1.2vw] lg:pb-[1.2vh] lg:pl-[1.5vw] font-Rajdhani">
                                            <div className="flex flex-col justify-between basis-[40%] pt-[0.5vw]">
                                                <h2 className='text-[21px] lg:text-[0.9vw] text-[#449552] font-[700] mb-[1vh]'>Choose your Desired Tractor</h2>
                                                <div className='flex lg:flex-col gap-2 lg:space-y-[1.3vh]'>
                                                    {/* Investment */}
                                                    <div>
                                                        <label htmlFor="" className='text-[#595A5B] text-[19px] lg:text-[95%] font-[700] mb-[0.8vh]'>Investment in $</label>
                                                        <input type="text" className='bg-[#FFFFFF] bg-opacity-70 border-0 font-montserrat text-[18px] lg:text-[95%] py-[11px] px-[15px] lg:py-[1.2vh] lg:pl-[1vw] text-[#7F7F7F] rounded-[5px] w-full focus:outline-none' value={`$ ` + slideValue} onChange={e => sliderValueChange(e)} onBlur={e => sliderValueChanged(e)} />
                                                    </div>
                                                    {/* Power */}
                                                    <div>
                                                        <label htmlFor="" className='text-[#595A5B] text-[19px] lg:text-[95%] font-[700] mb-[0.8vh]'>Power</label>
                                                        <input type="text" className='bg-[#FFFFFF] bg-opacity-70 border-0 font-montserrat text-[18px] lg:text-[95%] py-[11px] px-[15px] lg:py-[1.2vh] lg:pl-[1vw] text-[#7F7F7F] rounded-[5px] w-full focus:outline-none' value={slideValue * 16 + ` GH/s`} readOnly />
                                                    </div>
                                                </div>
                                                <div className="mt-[20px] lg:mt-[40px]">
                                                    <Slider value={slideValue} onChange={(e) => sliderChange(e)} min={125} max={100000} aria-label="Default" valueLabelDisplay="auto" />
                                                </div>
                                            </div>
                                            <div className="basis-[55%]">
                                                <div className="relative flex bg-[#8BD66C] bg-opacity-[39%] pt-[20px] pb-[80px] px-[20px] lg:pr-[1vw] lg:pl-[1.2vw] lg:pb-[24px] font-[700] font-rajdhani justify-between rounded-[5px]">
                                                    <div className="">
                                                        <div className="">
                                                            <h3 className='text-[14px] lg:text-[1vw] font-[700]'>CALCULATOR</h3>
                                                            <div className="items-center text-[#595A5B] text-[14px] lg:text-[0.8vw]">
                                                                <span>Daily Income</span>
                                                            </div>
                                                            <h1 className='text-[20px] lg:text-[1vw] mt-[0.5vh] mb-[0px] font-[700]'>${Number((slideValue * 0.004).toFixed(3))}</h1>
                                                        </div>
                                                        <div className="lg:mt-[2vh]">
                                                            <div className="items-center text-[#595A5B] text-[14px] lg:text-[0.8vw]">
                                                                <span>Monthly Income</span>
                                                            </div>
                                                            <h1 className='text-[20px] lg:text-[1vw] mt-[0.5vh] mb-[0px] font-[700]'>${Number((slideValue * 0.12).toFixed(3))}</h1>
                                                        </div>
                                                        <div className="lg:mt-[2vh]">
                                                            <div className="items-center text-[#595A5B] text-[14px] lg:text-[0.8vw]">
                                                                <span>Yearly Income</span>
                                                            </div>
                                                            <h1 className='text-[20px] lg:text-[1vw] mt-[0.5vh] mb-[0px] font-[700]'>${Number((slideValue * 0.12 * 12).toFixed(3))}</h1>
                                                        </div>
                                                    </div>
                                                    <div className="lg:relative absolute right-[15px] bottom-[20px] lg:right-0 lg:bottom-0 self-end">
                                                        <div>
                                                            <img alt="" className="w-[128px] h-[90px] lg:w-[8vw] lg:h-[11vh]" width='265' height='186' src={GreenTractor} style={{ display: showTractor === 1 ? "block" : "none" }} />
                                                            <img alt="" className="w-[160px]  lg:w-[12vw] " width='336' height='157' src={YellowTractor} style={{ display: showTractor === 2 ? "block" : "none" }} />
                                                            <img alt="" className="w-[193px] h-[90px] lg:w-[11vw] lg:h-[12vh]" src={RedTractor} style={{ display: showTractor === 3 ? "block" : "none" }} />
                                                            <img alt="" className="w-[160px] h-[82px] lg:w-[10vw] lg:h-[12vh]" src={YellowTractor2} style={{ display: showTractor === 4 ? "block" : "none" }} />
                                                            <img alt="" className="w-[151px] h-[71px] lg:w-[10vw] lg:h-[10vh]" src={RedTractor2} style={{ display: showTractor === 5 ? "block" : "none" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="flex justify-between items-center mt-[0.8vh]">
                                                        <div className="">

                                                            <button className='flex items-center bg-[#449552] justify-center border-[2px] border-[#449552] rounded-[5px] text-[#fff] py-[7px] px-[2vw] text-[2vh] lg:text-[0.9vw] font-[600] lg:px-[1vw] lg:py-[0.8vh] transition duration-300 hover:bg-opacity-70 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={() => depositTypeChoose(1)}>
                                                                <img src={CreditIcon} alt="" className='w-[15px] mr-[5px]' />
                                                                Credit Card
                                                                <span className='ml-[10px]'>
                                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
                                                                </span>
                                                            </button>


                                                        </div>
                                                        <div className="">
                                                            <button className='flex items-center bg-[#449552] justify-center border-[2px] border-[#449552] rounded-[5px] text-[#fff] py-[7px] px-[18px] text-[2vh] lg:text-[0.9vw] font-[600] lg:px-[2vw] lg:py-[0.8vh] transition duration-300 hover:bg-opacity-70 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={() => depositTypeChoose(2)}>
                                                                <img src={BitcoinIcon2} alt="" className='w-[18px] lg:w-[1.3vw] mr-[5px]' />
                                                                Bitcoin
                                                                <span className='ml-[10px]'>
                                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
                                                                </span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='deposit_description w-full lg:w-[33vw] rounded-[15px] bg-[#C9E8BF] space-y-[14px] px-[20px] py-[20px] lg:py-[1.4vh] lg:pr-[1vw] lg:pl-[1vw] lg:space-y-[0.6vw] text-[#4B4B4B] lg:font-montserrat text-[15px] font-Rajdhani lg:text-[95%] leading-[19.5px]'>
                                        <div className='flex'>
                                            <p className='mr-[12px] text-[20px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                            <p className=''>Credit card or Bitcoins payment may be processed at Your own decision;</p>
                                        </div>

                                        <div className='flex'>
                                            <p className='mr-[12px] text-[20px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                            <p className=''>Choose an assosiated button to proceed;</p>
                                        </div>

                                        <div className='flex'>
                                            <p className='mr-[12px] text-[20px]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                            <p className=''>No extra fees will be charged on our end;</p>
                                        </div>
                                    </div>

                                    <div className='lg:absolute sticky lg:right-[35.5px] lg:bottom-[18px]'>
                                        <p className='text-[18px] lg:text-left text-right lg:text-[1vw] font-[700] text-[#4B4B4B] mb-[0px] font-rajdhani'>We Accept</p>
                                        <div className="flex justify-end items-center">
                                            <img className='w-[8vh]' src={Visa} alt="Visa" />
                                            <img className='w-[6vh] mx-[16px]' src={Master} alt="Master" />
                                            <img className='w-[3.5vh]' src={Bitcoin} alt="Bitcoin" />
                                        </div>
                                    </div>
                                </div>


                                <div className="checkout-truck">
                                    <img src={CheckoutTruck} alt="truck" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:block hidden items-center justify-end hover:text-[#429763]'>
                        <div className="bg-[#429763] rounded-[10px] text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                            <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                <p className='mb-0'>{firstName} {lastName}</p>
                                <BiUserCircle className='w-[1.8vw] h-[2.5vh]' />
                            </Link>
                        </div>
                    </div>
                </div>

                <img className='lg:hidden block mt-[-45px] bottom-0 left-0 w-[100vw]' src={MobilePagesBack} />
            </div>
            <div>
                {logoutModalStatus && <Logout />}
            </div>
            {depositModalShow &&
                <DepositSlider
                    depositType={depositType}
                    closeDepositModal={() => setDepositModalShow(false)
                    }
                />
            }

            {MobileSidebar &&
                <MobSidebar SidbarTitle="Deposit" NavigationLink="/deposit" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
        </>
    )
}

export default Deposit