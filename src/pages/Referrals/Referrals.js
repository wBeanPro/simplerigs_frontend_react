import React, { useEffect, useState } from 'react'
import Sidebar from '../../compnents/Sidebar/Sidebar';
import MobSidebar from '../../compnents/MobSidebar/MobSidebar'
import WithdrawConfirmModal from '../../compnents/WithdrawConfirmModal/WithdrawConfirmModal';
import './referrals.css'
import Logout from '../../compnents/Logout/Logout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getLogoutModal } from '../../store/reducer';
import CheckoutTruck from '../../assets/images/checkout-truck.png'
import WithdrawScrollIcon from '../../assets/images/withdraw_scroll.png'
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';
import Copy from '../../assets/images/copy.png';
import RightArrow from '../../assets/images/right.png'
import NoAssets from '../../assets/images/no_assets.png'
import copyFunction from "copy-to-clipboard";
import { toast } from "react-toastify"
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from "react-icons/ai";

const Referrals = () => {
    const navigate = useNavigate();
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const [MobileSidebar, setMobileSidebar] = useState(false);
    const [referLink, setReferLink] = useState();
    const [walletAddress, setWalletAddress] = useState();
    const [withdrawModalShow, setWithdrawModalShow] = useState(false);
    const [withdrawHistory, setWithdrawHistory] = useState([]);
    const [clickCount, setClickCount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [referalBalance, setReferalBalance] = useState(0);
    const [signupCount, setSignUpCount] = useState(0);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [income, setIncome] = useState(0);
    const loginStatus = localStorage.getItem('logged_in');
    const user_id = Number(localStorage.getItem('user_id'));
    const access_token = localStorage.getItem('access_token');
    const data = { "user_id": user_id, "accessToken": access_token };
    useEffect(() => {
        if(!loginStatus){
          navigate('/');
        }
      },[loginStatus]);
    
    // const CloseMobSidebar = () => {
    //     setMobileSidebar(!MobileSidebar);
    // };

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

        axios.get(process.env.REACT_APP_API_HOST + 'api/getReferralInfo/' + localStorage.getItem('user_id'))
            .then((response) => {
                setClickCount(response.data.click);
                setSignUpCount(response.data.signup);
                setIncome(response.data.income);
            })
            .catch((error) => {
                if (error.response.status === 500) {

                }
            });

        axios.post(process.env.REACT_APP_API_HOST + 'api/getWithdrawTransaction', data)
            .then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    let amount = response.data[i].amount;
                    let address = response.data[i].address;
                    let date = new Date(response.data[i].date);
                    setWithdrawHistory(state => [...state, { 'amount': amount, "address": address, "date": date.toLocaleDateString() }])
                }
            })
            .catch((error) => {
                if (error.response.status === 500) {
                }
            });

        axios.get(process.env.REACT_APP_API_HOST + 'api/getWalletAddress/' + user_id)
            .then((response) => {
                if(response.data.result) {
                    setWalletAddress(response.data.address);
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
                ;
            })

        axios.get(process.env.REACT_APP_API_HOST + 'api/getReferralCode/' + user_id)
            .then((response) => {
                setReferLink(process.env.REACT_APP_HOST + 'refer/' + response.data)
            })
            .catch((error) => {
                console.log(error);
            })

        axios.post(process.env.REACT_APP_API_HOST + 'api/getWithdrawBalance', data)
            .then((response) => {
                setTotalBalance(response.data.total_balance);
                setReferalBalance(response.data.referral_balance)

            })
            .catch((error) => {
                if (error.response.status === 500) {

                }
            });
    }, [user_id]);

    const withdrawSliderShow = () => {
        console.log("calling")
        setWithdrawModalShow(true);
    }

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }

    return (
        <>
            <div className="dashboard-root-container h-full relative lg:h-[100vh] lg:flex-row flex-col">
                <div className={`${withdrawModalShow? "h-[50vh]" : "h-full" } flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]`}>

                    {!MobileSidebar &&
                        <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[15px]'>
                                <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} />
                                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Referral</p>
                            </div>

                            <div className='items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                        <p className='mb-0 md:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[20px] h-[20px]' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }

                    <div className='flex lg:space-x-[24px]'>
                        <div className="sidebar ">
                            <Sidebar />
                        </div>
                        <div className="main-container">
                            <div className="flex flex-col justify-between h-full lg:h-[93vh] dashboard-container">
                                <div className="mt-[4vh] ml-[1.8vw]">
                                    <h1 className='text-[28px] lg:text-[1.4vw] font-[500] lg:font-[600] font-Rajdhani md:font-montserrat mb-[0]'>Referal <span className='text-[#449552]'>Program</span></h1>
                                </div>

                                <div className='flex flex-col space-y-[5vh] h-full w-full lg:w-[68vw] mt-[2vh] relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] lg:pt-[7vh] lg:pl-[3vw] lg:pb-[4vh] lg:pr-[3vw] py-[20px] px-[20px] shadow-[0px_0px_44px_rgba(0,0,0,0.1)]'>
                                    <div className="flex lg:flex-row flex-col space-y-[2vh] lg:space-y-[0px] lg:space-x-[2vw] font-montserrat">
                                        <div className="flex flex-col space-y-[2vh] lg:w-[80%]">
                                            <div className="flex justify-between items-center w-full rounded-[5px] shadow-[0px_0px_14px_rgba(0,0,0,0.1)] py-[8px] pl-[18px] pr-[15px] lg:pl-[1.2vw] lg:py-[1vh] text-[#595A5B] bg-[#fff] text-[18px] lg:text-[1vw]">
                                                <input value={referLink} placeholder='Referal link' className='font-Rajdhani md:font-montserrat focus:outline-none w-full' readOnly />
                                                <span className='cursor-pointer lg:w-[2vw]' onClick={() => {
                                                    console.log("Copy");
                                                    copyFunction(referLink);
                                                    toast.success("Copied your referal link", {
                                                        position: "bottom-center",
                                                        autoClose: 2000,
                                                        closeOnClick: true,
                                                        hideProgressBar: true,
                                                    });
                                                }}> <img src={Copy} alt='copy' className='' />
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center w-full rounded-[5px] shadow-[0px_0px_14px_rgba(0,0,0,0.1)] py-[8px] pl-[18px] pr-[15px] lg:px-[1.2vw] lg:py-[1vh] text-[#595A5B] bg-[#fff] text-[16px] lg:text-[1vw]">
                                                <input value={signupCount} placeholder='Referal link' className='focus:outline-none w-[50%]' readOnly />
                                                <div className='flex h-full w-[40%] lg:w-[40%]'>
                                                    <div className='border-l-[1px] border-[#595A5B] h-full border-[#595A5B]'></div>
                                                    <p className='text-[#449552] text-[2vh] lg:text-[0.8vw] mb-[0] ml-[0.5vw] font-Rajdhani md:font-montserrat'>Total sign ups</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center w-full rounded-[5px] shadow-[0px_0px_14px_rgba(0,0,0,0.1)] py-[8px] pl-[18px] pr-[15px] lg:px-[1.2vw] lg:py-[1vh] text-[#595A5B] bg-[#fff] text-[16px] lg:text-[1vw]">
                                                <input value={Number(income.toFixed(6))} placeholder='Referal link' className='focus:outline-none w-[50%]' readOnly />
                                                <div className='flex h-full w-[40%] lg:w-[40%]'>
                                                    <div className='border-l-[1px] border-[#595A5B] h-full border-[#595A5B]'></div>
                                                    <p className='text-[#449552] text-[2vh] lg:text-[0.8vw] mb-[0] ml-[0.5vw] font-Rajdhani md:font-montserrat'>Total Income</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='flex flex-col space-y-[3vh]'>
                                            <div className="bg-[#C9E8BF] rounded-[10px] shadow-[0px_5px_14px_rgba(0,0,0,0.15)] w-full lg:w-[70%] py-[12px] px-[17px] lg:py-[2vh] lg:px-[1vw] lg:font-montserrat font-Rajdhani font-[600] text-[13px] lg:text-[0.5vw] text-[#595A5B]">
                                                <p>Tell your friends about the SIMPLERIGS and get a reward from the platform. SIMPLERIGS Referral Program gives you the opportunity to earn 10% from the deposits of people you have invited to the platform.</p>
                                                <p>You invited a friend who then bought a miner contract for $1,000, so you get a $100 reward.</p>
                                                <p className='mb-[0]'>Please, make sure that Your referrals accounts are registered with a specific link above. You will be eligible for a reward only in case of proper referral registration. Feel free to confirm it via live chat.</p>
                                            </div>

                                            <div className='flex lg:justify-end lg:w-[70%]'>
                                                <button className='flex items-center justify-center bg-[#449552] text-[#fff] w-full lg:w-auto py-[10px] px-[20px] lg:py-[1vh] lg:px-[1.5vw] font-Rajdhani font-[600] text-[18px] lg:text-[1vw] rounded-[8px] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={withdrawSliderShow}>Withdraw <img src={RightArrow} alt="right arrow" className='ml-[10px] w-[17px] lg:w-[1vw] h-[1.5vh]' /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='lg:block flex items-center justify-between lg:mb-[0px] mb-[20px]'>
                                            <p className='font-[600] lg:font-[400] text-[#595A5B] text-[22px] lg:text-[1vw] mb-[0px]'>Previous transactions</p>
                                            <img src={WithdrawScrollIcon} alt="Withdraw Scroll Icon" className='lg:hidden block w-[24px] h-[24px]' />
                                        </div>

                                        <div className='lg:bg-[#ffffff] bg-transparent lg:bg-opacity-[39%] lg:shadow-[0px_4px_44px_rgba(0,0,0,0.1)] w-full lg:w-[70%]'>
                                            <div className='revenue_header lg:block hidden font-Rajdhani text-[95%] font-[600] pl-[2.5vw] py-[1vh]'>
                                                <div className='w-[full] pr-[2.2vw] uppercase grid grid-cols-6'>
                                                    <p className='col-span-2'>DATE</p>
                                                    <p className='col-span-3'>Wallet Address</p>
                                                    <p className='col-span-1'>AMOUNT</p>
                                                </div>
                                            </div>

                                            {
                                                withdrawHistory.length
                                                    ?
                                                    <>
                                                        {/* Desktop Withdraw History */}
                                                        <div className='lg:flex hidden font-montserrat text-[95%] pr-[1vw] font-[600] pl-[2.5vw] py-[1vh]'>
                                                            <div className='overflow-y-scroll w-full pr-[1vw] h-[26vh] text-[#4B4B4B] text-[95%]'>
                                                                {
                                                                    withdrawHistory.map((item, i) => {
                                                                        return (
                                                                            <>
                                                                                <div className='revenue_mining_detail w-full py-[1.2vh] grid grid-cols-6' key={i}>
                                                                                    <p className='col-span-2 font-[300]'>{item.date}</p>
                                                                                    <p className='col-span-3 font-[500] text-[80%]'>{item.address}</p>
                                                                                    {/* <p className='col-span-1 font-[700]'>{toFixed(Number(Number(item.amount).toFixed(8)))} BTC</p> */}
                                                                                    <p className='col-span-1 font-[700]'>{item.amount} BTC</p>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='space-y-[20px] lg:hidden block'>
                                                            {
                                                                withdrawHistory.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            {/* Mobile Withdraw History */}

                                                                            <div className='' key={i}>
                                                                                <div className='lg:hidden flex font-montserrat bg-[#ffffff] bg-opacity-[40%] shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-10px text-[95%] font-[600] py-[16px] px-[16px]'>
                                                                                    <div className='overflow-y-scroll w-full text-[#4B4B4B]'>
                                                                                        <div className='flex justify-between font-[500] text-[11px] font-Rajdhani'>
                                                                                            <p className='mb-[0px]'>Date</p>
                                                                                            <p className='mb-[0px]'>Amount</p>
                                                                                        </div>
                                                                                        <div className='w-full'>
                                                                                            <div className='flex justify-between text-[13px] mb-[15px]'>
                                                                                                <p className='mb-[0px] font-[400]'>{item.date}</p>
                                                                                                <p className='mb-[0px] font-[700]'>{item.amount} BTC</p>
                                                                                            </div>
                                                                                            <p className='font-[500] text-[11px] font-Rajdhani mb-[5px]'>Wallet Address</p>
                                                                                            <p className='font-[500] text-[11px] mb-[0px]'>{item.address}</p>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    <div className='flex flex-col items-center text-center justify-center w-full mt-[20px] lg:mt-[0px] lg:h-[276.69px] font-montserrat'>
                                                        <img src={NoAssets} alt="No Assets" className='w-[45px] h-[60px] lg:w-[3.8vw] lg:h-[10vh]' />
                                                        <p className='text-[#7F7F7F] text-[18px] lg:text-[1vw] font-[500] mt-[2vh] mb-0'>You don’t have any previous<br />transactions yet</p>
                                                    </div>
                                            }
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
            {logoutModalStatus && <Logout />}
            {withdrawModalShow &&
                <WithdrawConfirmModal
                    modalTile="Referral"
                    availableBalance={totalBalance}
                    closeWithdrawModal={() => setWithdrawModalShow(false)
                    }
                />
            }
            {MobileSidebar &&
                <MobSidebar SidbarTitle="Referrals" NavigationLink="/referrals" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
        </>
    )
}

export default Referrals