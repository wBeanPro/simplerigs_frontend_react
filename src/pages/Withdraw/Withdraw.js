import React, { useEffect, useState } from 'react'
import Sidebar from '../../compnents/Sidebar/Sidebar';
import MobSidebar from '../../compnents/MobSidebar/MobSidebar'
import './withdraw.css'
import Logout from '../../compnents/Logout/Logout';
import WithdrawConfirmModal from '../../compnents/WithdrawConfirmModal/WithdrawConfirmModal';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutTruck from '../../assets/images/checkout-truck.png'
import WithdrawScrollIcon from '../../assets/images/withdraw_scroll.png'
import RightArrow from '../../assets/images/right.png'
import NoAssets from '../../assets/images/no_assets.png'
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getLogoutModal } from '../../store/reducer';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from "react-icons/ai";
const Withdraw = () => {
    const navigate = useNavigate();
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const [totalBalance, setTotalBalance] = useState(0);
    const [referalBalance, setReferalBalance] = useState(0);
    // const [walletAddress, setWalletAddress] = useState();
    const [BTCPrice, setBTCPrice] = useState(0);
    const [MobileSidebar, setMobileSidebar] = useState(false);
    const loginStatus = localStorage.getItem('logged_in');
    const [withdrawHistory, setWithdrawHistory] = useState([]);
    const [withdrawModalShow, setWithdrawModalShow] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const user_id = Number(localStorage.getItem('user_id'));
    const access_token = localStorage.getItem('access_token');
    const data = { "user_id": user_id, "accessToken": access_token };

    useEffect(() => {
        if(!loginStatus){
          navigate('/');
        }
      },[loginStatus, navigate]);

    const toFixed = (x) => {
        var e = null;
        if (Math.abs(x) < 1.0) {
            e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10, e - 1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } else {
            e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                x += (new Array(e + 1)).join('0');
            }
        }
        return x;
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_API_HOST + 'api/getWithdrawBalance', data)
            .then((response) => {
                if (response.data.total_balance >= 0) {
                    setTotalBalance(response.data.total_balance);
                    setReferalBalance(response.data.referral_balance);
                }

            })
            .catch((error) => {
                if (error.response.status === 500) {

                }
            });

        // axios.get(process.env.REACT_APP_API_HOST + 'api/getWalletAddress/' + user_id)
        //     .then((response) => {
        //         if(response.data.result) {
        //             setWalletAddress(response.data.address);
        //         } else {
        //             toast.warn(response.data.message, {
        //                 position: "top-right",
        //                 autoClose: 2000,
        //                 closeOnClick: true,
        //                 hideProgressBar: true,
        //             }); 
        //         }
        //     }).catch((error) => {
        //         console.log(error);
        //         ;
        //     })

        axios.get(process.env.REACT_APP_API_HOST + 'api/getBtcPrice')
            .then((response) => {
                if (response.data.value) {
                    setBTCPrice(response.data.value);
                }
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
    }, [user_id])

    // const CloseMobSidebar = () => {
    //     setMobileSidebar(!MobileSidebar);
    // };

    const withdrawSliderShow = () => {
        setWithdrawModalShow(true);
    }

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }


    return (
        <>
            <div className="dashboard-root-container h-full relative lg:h-[100vh] lg:flex-row flex-col">
                <div className={`${withdrawModalShow? "h-[50vh]" : "h-full" } flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]`} >

                    {!MobileSidebar &&
                        <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[15px]'>
                                <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} />
                                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Withdraw</p>
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
                            <div className="flex flex-col justify-between lg:h-[93vh]">

                                <div className="mt-[20px] lg:mt-[4vh] ml-[1.8vw]">
                                    <h1 className='text-[28px] lg:text-[1.2vw] font-[500] lg:font-[600] font-Rajdhani lg:font-montserrat mb-[0]'>Balance & <span className='text-[#449552]'>Withdrawal</span></h1>
                                </div>

                                <div className='flex flex-col space-y-[5vh] h-full w-full lg:w-[68vw] mt-[2vh] relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] lg:pt-[7vh] lg:pl-[3vw] lg:pb-[4vh] lg:pr-[3vw] py-[20px] px-[20px] shadow-[0px_0px_44px_rgba(0,0,0,0.1)]'>
                                    <div className="flex lg:flex-row flex-col lg:space-x-[2vw] font-montserrat">
                                        <div className="flex flex-col space-y-[20px] lg:w-[50%]">

                                            <div className='shadow-[0px_0px_14px_rgba(0,0,0,0.1)] flex justify-between bg-[#fff] rounded-[5px] w-full py-[8px] pl-[18px] pr-[4px] lg:py-[1.1vh] lg:pr-[0.5vw] lg:pl-[1vw] text-[#919191] font-Rajdhani'>
                                                <input className='lg:text-[0.9vw] text-[18px] font-[600] focus:outline-none' value={totalBalance} readOnly />
                                                <div className='flex items-center justify-center text-[#595A5B] text-[90%] font-[600] lg:px-[0] lg:py-[0] px-[20px] py-[7px] lg:w-[4vw] lg:h-[4vh] bg-[#D9D9D9] rounded-[3px]'>BTC</div>
                                            </div>

                                            <div className='shadow-[0px_0px_14px_rgba(0,0,0,0.1)] flex justify-between bg-[#fff] rounded-[5px] w-full py-[8px] pl-[18px] pr-[4px] lg:py-[1.1vh] lg:pr-[0.5vw] lg:pl-[1vw] text-[#919191] font-Rajdhani'>
                                                <input className='lg:text-[0.9vw] text-[18px] font-[600] focus:outline-none' value={Number((totalBalance * BTCPrice).toFixed(3))} readOnly />
                                                <div className='flex items-center justify-center text-[#595A5B] text-[90%] font-[600] lg:px-[0] lg:py-[0] px-[20px] py-[7px] lg:w-[4vw] lg:h-[4vh] bg-[#D9D9D9] rounded-[3px]'>USD</div>
                                            </div>

                                            <div className='flex w-full lg:w-[40%]'>
                                                <button className='flex w-full items-center justify-center bg-[#449552] text-[#fff] py-[1vh] px-[1.5vw] font-Rajdhani font-[600] text-[18px] lg:text-[1vw] rounded-[8px] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={withdrawSliderShow}>Withdraw <img src={RightArrow} alt="right arrow" className='ml-[10px] w-[17px] lg:w-[1vw] h-[1.5vh]' /></button>
                                            </div>

                                        </div>
                                        <div className='flex flex-col lg:mt-[0px] mt-[30px] space-y-[3vh] w-full lg:w-[70%]'>
                                            <div className='shadow-[0px_5px_14px_rgba(0,0,0,0.15)] w-full lg:w-[80%] flex flex-col space-y-[1vh] bg-[#C9E8BF] rounded-[10px] py-[12px] px-[17px] lg:pt-[1.5vh] lg:pb-[1.5vh] lg:pl-[1.5vw] text-[#4B4B4B] lg:font-montserrat font-Rajdhani text-[15px] lg:text-[0.7vw] font-[600] lg:font-[700] leading-[2.5vh] lg:leading-[1.8vh]'>
                                                <p className='mb-0'>Total Balance: {toFixed(Number(Number(totalBalance).toFixed(3)))} BTC</p>
                                                <p>Referral Balance: {toFixed(Number(Number(referalBalance).toFixed(3)))} BTC</p>
                                                <p>1 BTC = $ {toFixed(Number(Number(BTCPrice).toFixed(3)))}</p>
                                                <p className='text-[13px] lg:text-[90%] font-[400]'>Bitcoin price has all conversation rate fees included</p>
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
                        <div className="bg-[#429763] rounded-[10px] text-[#fff] font-[500] font-Rajdhani md:font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                            <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                <p className='mb-0'>{firstName} {lastName}</p>
                                <BiUserCircle className='w-[1.8vw] h-[2.5vh]' />
                            </Link>
                        </div>
                    </div>
                </div>
                <img className='lg:hidden block mt-[-45px] bottom-0 left-0 w-[100vw]' alt='mobile page back' src={MobilePagesBack} />
            </div>

            {logoutModalStatus && <Logout />}

            {MobileSidebar &&
                <MobSidebar SidbarTitle="Withdraw" NavigationLink="/withdraw" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
            {withdrawModalShow &&
                <WithdrawConfirmModal
                    modalTile="Withdraw"
                    availableBalance={totalBalance}
                    closeWithdrawModal={() => setWithdrawModalShow(false)
                    }
                />
            }
        </>
    )
}

export default Withdraw