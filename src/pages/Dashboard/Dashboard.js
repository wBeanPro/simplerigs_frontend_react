import React, { useEffect, useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
} from "chart.js";

// import TradeViewChart from 'react-crypto-chart';

import Sidebar from '../../compnents/Sidebar/Sidebar';
import MobSidebar from '../../compnents/MobSidebar/MobSidebar';
import WithdrawConfirmModal from '../../compnents/WithdrawConfirmModal/WithdrawConfirmModal';
import './dashboard.css';
import Logout from '../../compnents/Logout/Logout';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CheckoutTruck from '../../assets/images/checkout-truck.webp'
import NoAssets from '../../assets/images/no_assets.png'
import RightArrow from '../../assets/images/right.png'
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';
import dashboardTractor from '../../assets/images/mobile_aboutus_tractor.png';
import Bitcoin from '../../assets/images/deposit_slider_bitoin.png'
import WithdrawScrollIcon from '../../assets/images/withdraw_scroll.png'
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from "react-icons/ai";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import axios from 'axios';
import { getLogoutModal } from '../../store/reducer';
import { useSelector } from 'react-redux'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const Dashboard = () => {
    const navigate = useNavigate();
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const [MobileSidebar, setMobileSidebar] = useState(false);
    const [plansData, setPlansData] = useState([]);
    const [planlist, setPlanList] = useState([]);
    const [referral, setReferral] = useState(0);
    const [selectedMiner, setSelectedMiner] = useState(-1);
    const [totalBalance, setTotalBalance] = useState(0);
    const [referalBalance, setReferalBalance] = useState(0);
    const [revenue, setRevenue] = useState([]);
    const [BTCPrice, setBTCPrice] = useState(0);
    // const [withdrawAmount, setWithdrawAmount] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [planlistModalShow, setPlanlistModalShow] = useState(false);
    const [planlistSliderShow, setPlanlistSliderShow] = useState(false);
    const [withdrawModalShow, setWithdrawModalShow] = useState(false);
    const [pricechartData, setPriceChartData] = useState();

    // Slider Value
    const [sliderValue, setSliderValue] = useState({});

    const modalRef = useRef();

    var chartData;

    const loginStatus = localStorage.getItem('logged_in');
    const user_id = Number(localStorage.getItem('user_id'));
    const access_token = localStorage.getItem('access_token');
    const planCardColordata = ['#198351', '#49925B', '#3DAF67', '#6ABE66', '#8BD66C'];

    useEffect(() => {
        if(!loginStatus){
          navigate('/');
        }
      },[loginStatus, navigate]);

    const animation = useSpring({
        config: {
            duration: 450
        },
        opacity: planlistModalShow ? 1 : 0,
        transform: planlistModalShow ? `translateY(0%)` : `translateY(-100%)`
    });

    const sliderAnimation = useSpring({
        config: {
            duration: 200
        },
        opacity: planlistSliderShow ? 1 : 0,
    });

    // const CloseMobSidebar = () => {
    //     setMobileSidebar(!MobileSidebar);
    // };
    const toFixed = (x) => {
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10, e - 1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } else {
            var e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                x += (new Array(e + 1)).join('0');
            }
        }
        return x;
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.zoom = "100%";
        const data = {"user_id": user_id, "accessToken": access_token}
        axios.post(process.env.REACT_APP_API_HOST + 'api/getWithdrawBalance', data )
            .then((response) => {
                setTotalBalance(response.data.total_balance);
                setReferalBalance(response.data.referral_balance)

            })
            .catch((error) => {
                if (error.response.status === 500) {

                }
            });
        axios.get(process.env.REACT_APP_API_HOST + 'api/payoutInfo/' + user_id)
            .then((response) => {
                setPlanList(response.data.plan_list);
                setReferral(response.data.referral);
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.status === 500) {

                }
            });
        axios.post(process.env.REACT_APP_API_HOST + 'api/revenueInfo', data)
            .then((response) => {
                if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        const amount = response.data[i].amount;
                        const date = new Date(response.data[i].date).toLocaleDateString();
                        const miner =  response.data[i].miner_index + 1;
                        setRevenue(state => [...state, { 'amount': amount, 'miner': miner, 'date': date }]);
                    }
                }
            })
            .catch((error) => {
                if (error.response.status === 500) {
                }
            });
        axios.get(process.env.REACT_APP_API_HOST + 'api/getBtcPrice')
            .then((response) => {
                setBTCPrice(response.data.value);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                }
            });
        
        axios.post(process.env.REACT_APP_API_HOST + 'api/getPlanList', data)
            .then((response) => {
                if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        const plan_name = response.data[i].plan_name;
                        const balance = response.data[i].deposit_price;
                        const power = response.data[i].power;
                        const yearly_pro = response.data[i].yearly_pro;
                        const monthly_pro = response.data[i].monthly_pro;
                        const daily_pro = response.data[i].daily_pro;
                        let date = new Date(response.data[i].deposit_date);
                        const deposit_date = date.toLocaleDateString();
                        const no = i + 1;
                        setPlansData(state => [...state, { 'color': planCardColordata[5 % no], 'planTitle': plan_name, 'balance': balance, 'power': power, 'yearly_pro': yearly_pro, 'monthly_pro': monthly_pro, 'daily_pro': daily_pro, 'no': no, 'deposit_date': deposit_date }])
                    }
                }
            })
            .catch((error) => {
                if (error.response.status === 500) {
                }
            });
    }, [user_id]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=24&api_key=eced2c41e42cd94123d04bd38013306759ce2cb1c8a25d04db251c8e7f7ce18f`)
            .then(res => res.json())
            .then(data => {                
                chartData = {
                    labels: data.Data.Data.map(d => new Date(Math.abs(d.time) * 1000).toISOString().substr(11, 8)),
                    datasets: [
                      {
                        label: 'Bitcoin Price',
                        data: data.Data.Data.map(d => d.close),
                        fill: true,
                        backgroundColor: "#449552",
                        borderColor: "#449552",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#449552",
                        pointHoverBorderColor: "#449552",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                      },
                    ]
                };
                setPriceChartData(chartData);
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const options = {
        plugins: {
            legend: {
              display: false,
            },           
        },
        tooltips: {
            enabled: false,
        },
        scales: {
            y: {
                ticks: {
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                }
            }
        },
        
      };

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

    const showPlanListModal = () => {
        setPlanlistModalShow(true);
    }

    const ClosePlanListModal = e => {
        if (modalRef.current === e.target) {
            setPlanlistModalShow(false);
        }
    }

    const CloseToIcon = () => {
        setPlanlistModalShow(false);
    };

    const withdrawSliderShow = () => {
        setWithdrawModalShow(true);
    }

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }

    const setPlanListShow = (index) => {
        setSliderValue({
            minerNo: plansData[index].no,
            plan_name: plansData[index].planTitle,
            daily: plansData[index].daily_pro,
            monthly: plansData[index].monthly_pro,
            yearly: plansData[index].yearly_pro,
            deposit_date: plansData[index].deposit_date,
            power: plansData[index].power,
            amount: plansData[index].balance
        });
        setPlanlistSliderShow(true);
        setSelectedMiner(index);
    }
    const handleClickEvent = (event) => {
        event.stopPropagation();
    }
    const setPlanListSliderSetting = (index) => {
        if(planlistSliderShow)setSelectedMiner(-1);
        setPlanlistSliderShow(!planlistSliderShow);
    }

    return (
        <>
            <div className="dashboard-root-container  w-screen lg:h-[100vh] lg:flex-row flex-col">
                <div className={`${planlistSliderShow? "md:h-full h-[50vh]" : "h-full" } ${planlistModalShow? "md:h-full h-[85vh]" : "h-full" } flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]`} >

                    {!MobileSidebar &&
                        <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[15px]'>
                                <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} />
                                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Dashboard</p>
                            </div>

                            <div className='items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon flex justify-center items-center no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
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
                            <div className="flex flex-col justify-between lg:h-[93vh] dashboard-container">

                                <div className='mt-[20px] lg:mt-[4vh] ml-[1.8vw]'>
                                    <h1 className='text-[28px] lg:text-[1.2vw] font-[500] lg:font-[600] font-Rajdhani lg:font-montserrat mb-[0]'>Welcome To <span className='text-[#449552]'>Dashboard</span></h1>
                                </div>

                                <div className="flex flex-col justify-between relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] py-[20px] px-[20px] shadow-[0px_0px_44px_rgba(0,0,0,0.1)]">
                                    <div className="plan-container font-montserrat rounded-[20px]">
                                        <div className='flex justify-between items-center font-montserrat lg:font-Rajdhani w-full lg:w-[23vw] pl-[0.5vw] pr-[0.8vw] mb-[1vh]'>
                                            <h3 className='lg:block hidden text-[#000000] lg:text-[#595A5B] text-[20px] lg:text-[95%] font-[500] lg:font-[400] mb-[0px]'>My Assets</h3>
                                            <h3 className='lg:hidden block text-[#000000] lg:text-[#595A5B] text-[20px] lg:text-[95%] font-[500] lg:font-[400] mb-[0px]'>MY ASSETS</h3>
                                            {plansData.length > 0 ?
                                                <h3 className='text-[#000000] lg:text-[#595A5B] text-[14px] lg:text-[95%] font-[500] lg:font-[400] underline cursor-pointer mb-[0px]' onClick={showPlanListModal}>View All</h3>
                                                :
                                                <h3 className='lg:block hidden text-[#000000] lg:text-[#595A5B] text-[14px] lg:text-[95%] font-[500] lg:font-[400] underline cursor-pointer mb-[0px]' onClick={showPlanListModal}>View All</h3>
                                            }
                                        </div>
                                        <div className='flex lg:flex-row flex-col lg:space-x-[1.5vw] space-y-[1.5vh]'>
                                            <div className="lg:shadow-[0px_0px_44px_rgba(0,0,0,0.1)] w-full h-full py-[5px] pr-[0.8vw] lg:w-[25vw] rounded-[20px] lg:bg-[#ffffff] lg:bg-opacity-[60%]">
                                                <div className="flex flex-col w-full pr-[10px] pl-[10px] lg:h-[29vh] py-[15px] lg:overflow-y-scroll">

                                                    {plansData.length > 0 ?
                                                        <>
                                                            <div className='lg:block hidden w-full space-y-[1vh]'>
                                                                {
                                                                    plansData.slice(0, 4).map((plan, index) =>
                                                                        <>
                                                                            {/* <Plans data={plan} key={index} /> */}
                                                                            <div className='flex items-center w-[50%] lg:w-full h-[6vh] px-[20px] grid grid-cols-10 rounded-[10px] lg:shadow-[0px_4px_44px_rgba(0,0,0,0.1)] lg:bg-[#ffffff] lg:bg-opacity-[30%] text-[11px]' style={{background: `${selectedMiner===index ? '#8bd66c' : 'white'}` }} key={index}>
                                                                                <p className='col-span-3 mb-0 font-[500]'>Miner {plan.no}</p>
                                                                                <p className='col-span-3 mb-0 font-[500]'>{plan.deposit_date}</p>
                                                                                <p className='col-span-3 mb-0 font-[700]'>{plan.balance}</p>
                                                                                <IoEllipsisHorizontalCircle className='cursor-pointer w-[20px] h-[20px]' onClick={() => setPlanListShow(index)} />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>

                                                            <div className='lg:hidden flex justify-between w-full gap-[10px] grid grid-cols-2 divide-x'>
                                                                {
                                                                    plansData.slice(0, 4).map((plan, index) =>
                                                                        <div className='items-center items-center space-y-[15px] border-none w-full py-[15px] px-[15px] rounded-[10px] shadow-[0px_0px_14px_rgba(0,0,0,0.2)] bg-[#ffffff] bg-opacity-[60%] text-[11px]' key={index}>
                                                                            <div className="flex justify-between items-center">
                                                                                <p className='mb-0 font-[500]'>Miner {plan.no}</p>
                                                                                <IoEllipsisHorizontalCircle className='cursor-pointer w-[20px] h-[20px] mt-[0px]' onClick={() => setPlanListShow(index)} />
                                                                            </div>
                                                                            <p className='mb-0 font-[500]'>{plan.deposit_date}</p>
                                                                            <p className='mb-0 font-[700]'>{plan.balance}</p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </>
                                                        :
                                                        <div className='flex flex-col justify-center h-full w-full items-center font-montserrat'>
                                                            <img src={NoAssets} alt="No Assets" className='w-[42px] h-[60px] lg:w-[3.2vw] lg:h-[8.5vh]' />
                                                            <p className='text-[#7F7F7F] text-[95%] font-[500] mt-[1.5vh] mb-0'>No Assets Yet</p>
                                                        </div>
                                                    }

                                                </div>
                                            </div>

                                            <div className="flex flex-col w-full lg:w-[60%]">
                                                <div className='shadow-[0px_5px_14px_rgba(0,0,0,0.15)] flex flex-col w-full lg:w-[26vw] space-y-[1vh] bg-[#C9E8BF] rounded-[10px] py-[12px] px-[17px] lg:pt-[1.5vh] lg:pb-[1.5vh] lg:pl-[1.5vw] text-[#4B4B4B] lg:font-montserrat font-Rajdhani text-[15px] lg:text-[90%] font-[600] lg:font-[700] leading-[2.5vh] lg:leading-[1.8vh]'>
                                                    <p className='mb-0'>Total Balance: {toFixed(Number(Number(totalBalance).toFixed(3)))} BTC</p>
                                                    <p>Referral Balance: {toFixed(Number(Number(referalBalance).toFixed(3)))} BTC</p>
                                                    <p>1 BTC = $ {toFixed(Number(Number(BTCPrice).toFixed(3)))}</p>
                                                    <p className='text-[13px] lg:text-[90%] font-[400]'>Bitcoin price has all conversation rate fees included</p>
                                                </div>
                                                <div className="payout flex flex-col justify-between space-y-[20px] mt-[18px]">
                                                    <div className='shadow-[0px_0px_14px_rgba(0,0,0,0.1)] flex justify-between bg-[#fff] rounded-[5px] w-full lg:w-[26vw] py-[8px] pl-[18px] pr-[4px] lg:py-[1.1vh] lg:pr-[0.5vw] lg:pl-[1vw] text-[#919191] font-Rajdhani'>
                                                        <input className='text-[90%] font-[600] focus:outline-none' value={totalBalance} readOnly />
                                                        <div className='flex items-center justify-center text-[#595A5B] text-[90%] font-[600] lg:px-[0] lg:py-[0] px-[20px] py-[7px] lg:w-[4vw] lg:h-[4vh] bg-[#D9D9D9] rounded-[3px]'>BTC</div>
                                                    </div>

                                                    <div className='shadow-[0px_0px_14px_rgba(0,0,0,0.1)] flex justify-between bg-[#fff] rounded-[5px] w-full lg:w-[26vw] py-[8px] pl-[18px] pr-[4px] lg:py-[1.1vh] lg:pr-[0.5vw] lg:pl-[1vw] text-[#919191] font-Rajdhani'>
                                                        <input className='text-[90%] font-[600] focus:outline-none' value={Number((totalBalance * BTCPrice).toFixed(3))} readOnly />
                                                        <div className='flex items-center justify-center text-[#595A5B] text-[90%] font-[600] lg:px-[0] lg:py-[0] px-[20px] py-[7px] lg:w-[4vw] lg:h-[4vh] bg-[#D9D9D9] rounded-[3px]'>USD</div>
                                                    </div>
                                                </div>
                                                <div className='mt-[1vh] w-full lg:w-[25%]'>
                                                    <button className='flex w-full items-center justify-center bg-[#449552] text-[#fff] py-[1.2vh] px-[1.8vw] font-Rajdhani font-[600] text-[18px] lg:text-[0.9vw] rounded-[8px] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={withdrawSliderShow}>Withdraw <img src={RightArrow} alt="right arrow" className='ml-[10px] w-[17px] lg:w-[1vw] h-[1.5vh]' /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* revenue */}
                                    <div className="revenue text-[#595A5B]">
                                        <div className='lg:block flex items-center justify-between lg:mb-[0px] mb-[20px]'>
                                            <p className='font-montserrat text-[95%] font-[600] lg:font-[400] uppercase mb-[1vh]'>Revenue Statistics & Graph</p>
                                            <img src={WithdrawScrollIcon} alt="Withdraw Scroll Icon" className='lg:hidden block w-[24px] h-[24px]' />
                                        </div>
                                        <div className='revenue_detail w-full lg:w-[63vw]'>
                                            <div className='lg:block hidden revenue_header font-Rajdhani text-[95%] font-[600] pl-[2.5vw] py-[1vh]'>
                                                <div className='w-[68%] pr-[2.2vw] uppercase grid grid-cols-6'>
                                                    <p className='col-span-2'>DATE</p>
                                                    <p className='col-span-3'>MINER</p>
                                                    <p className='col-span-1'>AMOUNT</p>
                                                </div>
                                            </div>

                                            {revenue.length > 0 ?
                                                <>
                                                    <div className='lg:flex hidden justify-between font-montserrat text-[95%] font-[600] pl-[2.5vw] pr-[1vw] py-[1vh] bg-[#ffffff] bg-opacity-[39%] rounded-[10px] shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'>
                                                        <div className='overflow-y-scroll w-[66%] h-[26vh] text-[#4B4B4B] text-[95%] pr-[1vw]'>
                                                            {
                                                                revenue.map((item, i) => {
                                                                    return (

                                                                        <div className='revenue_mining_detail w-full pt-[1.6vh] pb-[1.6vh] grid grid-cols-6' key={i}>
                                                                            <p className='col-span-2 font-[300]'>{item.date}</p>
                                                                            <p className='col-span-3 font-[500]'>Miner {item.miner}</p>
                                                                            <p className='col-span-1 font-[700] pl-[10px]'>{Number(item.amount.toFixed(6))}</p>
                                                                        </div>
                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                        {/* BTC Price Chart */}
                                                        <div className='flex justify-center items-center bg-[#ffffff] shadow-[0px_0px_14px_rgba(0,0,0,0.1)] rounded-[10px] px-[15px] py-[15px]'>
                                                            {pricechartData &&
                                                                <Line options={options} data={pricechartData} className="h-[70vh] w-[18vw]"/>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className=' mobile-revenue-list space-y-[10px] lg:space-y-[20px] lg:hidden block'>
                                                        {
                                                            revenue.map((item, i) => {
                                                                return (
                                                                    <>
                                                                        {/* Mobile Withdraw History */}

                                                                        <div className='' key={i}>
                                                                            <div className='lg:hidden flex font-montserrat bg-[#ffffff] bg-opacity-[40%] shadow-[0px_4px_24px_rgba(0,0,0,0.1)] rounded-[10px] text-[95%] font-[600] py-[16px] px-[16px]'>
                                                                                <div className='overflow-y-scroll w-full text-[#4B4B4B]'>
                                                                                    <div className='flex justify-between font-[500] text-[11px] font-Rajdhani'>
                                                                                        <p className='mb-[0px]'>Date</p>
                                                                                        <p className='mb-[0px]'>Amount</p>
                                                                                    </div>
                                                                                    <div className='w-full'>
                                                                                        <div className='flex justify-between text-[13px] mb-[15px]'>
                                                                                            <p className='mb-[0px] font-[400]'>{item.date}</p>
                                                                                            <p className='mb-[0px] font-[700]'>{Number(item.amount.toFixed(6))} BTC</p>
                                                                                        </div>
                                                                                        <p className='font-[500] text-[11px] font-Rajdhani mb-[5px]'>Miner</p>
                                                                                        <p className='font-[500] text-[11px] mb-[0px]'>Miner {item.miner}</p>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </div>
                                                    <div className='flex justify-center mt-[3vh] items-center bg-[#ffffff] shadow-[0px_0px_14px_rgba(0,0,0,0.1)] rounded-[10px] px-[15px] py-[15px]'>
                                                            {pricechartData &&
                                                                <Line options={options} data={pricechartData} className="h-[70vh] w-[18vw]"/>
                                                            }
                                                        </div>
                                                </>
                                                :
                                                <div className='flex flex-col items-center justify-center w-full h-[276.69px] font-montserrat'>
                                                    <img src={NoAssets} alt="No Assets" className='w-[13vw] h-[10vh] md:w-[3.8vw] md:h-[10vh]' />
                                                    <p className='text-[#7F7F7F] text-[22px] font-[500] mt-[19.89px] mb-0'>No Statistics Found</p>
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

            {
                planlistModalShow ?
                    <div className="flex justify-center items-center z-50 top-0 w-full h-full fixed bg-[#000] bg-opacity-[30%]" id='scroll' onClick={ClosePlanListModal} ref={modalRef}>
                        <animated.div style={animation} className="font-montserrat w-[95%] lg:w-[75%] h-[96%] lg:h-full flex lg:flex-row flex-col justify-between lg:justify-center items-center">

                            <div className='lg:hidden flex justify-between items-center w-full py-[8px] pl-[25px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                <div className='flex items-center space-x-[18px]'>
                                    <div onClick={CloseToIcon} className='block w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                    <p onClick={CloseToIcon} className='font-[500] text-[18px] font-Rajdhani mb-0'>Dashboard</p>
                                </div>

                                <div className='items-center justify-end hover:text-[#429763]'>
                                    <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                        <Link to='/profile' className='profile_icon flex justify-center items-center no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                            <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                            <BiUserCircle className='w-[20px] h-[20px]' />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='planListmodal relative w-full px-[22px] py-[20px] lg:pt-[85px] lg:pb-[50px] px-[2.5vw] bg-[#fff] rounded-[10px] lg:rounded-[20px]'>
                                <div className="lg:grid hidden planmodal_header px-[80px] grid-cols-11 mb-[20px]">
                                    <p className='col-span-3'>Miner #</p>
                                    <p className='col-span-3'>Date of Purchase</p>
                                    <p className='col-span-2'>Amount</p>
                                    <p className='col-span-3'>Gh/s</p>
                                </div>
                                <p className="mb-[0px] text-[20px] lg:hidden block font-[500] font-Rajdhani" >MY ASSETS</p>
                                {plansData.length > 0 ?
                                    <div className='shadow-[0px_0px_14px_rgba(0,0,0,0.1)] bg-no-repeat bg-[length:100%_80%] bg-bottom bg-[url("../src/assets/images/deposit_slider_back.png")] lg:bg-none lg:bg-[#ececec] bg-opacity-60 items-center px-[1vw] lg:px-[0.5vw] py-[1vh] rounded-[20px] text-[90%]'>
                                        <div className="h-[65vh] lg:h-[50vh] space-y-[2vh] overflow-y-scroll px-[1vw] lg:pr-[0.5vw]">
                                            {
                                                plansData.map((plan, index) =>
                                                    <>
                                                        <div className='lg:grid hidden items-center w-full h-[13%] px-[62px] grid-cols-11 rounded-[10px] bg-[#ffffff] shadow-[0px_4px_44px_rgba(0,0,0,0.1)] text-[#4B4B4B]' key={index}>
                                                            <p className='col-span-3 mb-[0px] font-[500]'>Miner {plan.no}</p>
                                                            <p className='col-span-3 mb-[0px] font-[500]'>{plan.deposit_date}</p>
                                                            <p className='col-span-2 mb-[0px] font-[700]'>{plan.balance}</p>
                                                            <p className='col-span-2 mb-[0px] font-[500]'>{plan.power}</p>
                                                            <IoEllipsisHorizontalCircle className='justify-end cursor-pointer col-span-1 w-[20px] h-[20px]' onClick={() => setPlanListShow(index)} />
                                                        </div>

                                                        <div className='lg:hidden block items-center w-full px-[12px] py-[12px] space-y-[12px] rounded-[10px] bg-opacity-[40%] lg:bg-opacity-none bg-[#ffffff] shadow-[0px_4px_44px_rgba(0,0,0,0.1)] text-[#4B4B4B]' key={index}>
                                                            <div className="flex justify-between">
                                                                <div className="space-y-[5px]">
                                                                    <p className='mb-[0px] text-[10px] font-[500] font-Rajdhani md:font-montserrat'>Miner #</p>
                                                                    <p className='mb-[0px] text-[12px] font-[500]'>Miner {plan.no}</p>
                                                                </div>
                                                                <div className="space-y-[5px]">
                                                                    <p className="mb-[0px] text-[10px] font-[500] font-Rajdhani md:font-montserrat">Purchase Date</p>
                                                                    <p className='mb-[0px] text-[12px] font-[500]'>{plan.deposit_date}</p>
                                                                </div>
                                                                
                                                                <IoEllipsisHorizontalCircle className='justify-end cursor-pointer w-[20px] h-[20px]' onClick={() => setPlanListShow(index)} />
                                                            </div>

                                                            <div className="flex justify-between">
                                                                <div className="space-y-[5px]">
                                                                    <p className='mb-[0px] text-[10px] font-[500] font-Rajdhani md:font-montserrat'>Amount</p>
                                                                    <p className='mb-[0px] text-[12px] font-[700]'>{plan.balance}</p>
                                                                </div>

                                                                <div className="space-y-[5px]">
                                                                    <p className='mb-[0px] text-[10px] font-[500] font-Rajdhani md:font-montserrat'>Power</p>
                                                                    <p className='mb-[0px] text-[12px] font-[500]'>{plan.power}</p>
                                                                </div>

                                                                <div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>

                                    </div>
                                    :
                                    <div className='shadow-[0px_0px_14px_rgba(0,0,0,0.1)] bg-[#ececec] bg-opacity-60 relative flex flex-col space-y-[2vh] justify-center items-center h-[50vh] overflow-y-scroll px-[1vw] py-[1vh] rounded-[20px]'>
                                        <div className='w-full h-[13%] rounded-[10px] bg-[#fff] bg-opacity-10 opacity-40 shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'></div>
                                        <div className='w-full h-[13%] rounded-[10px] bg-[#fff] bg-opacity-10 opacity-40 shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'></div>
                                        <div className='w-full h-[13%] rounded-[10px] bg-[#fff] bg-opacity-10 opacity-40 shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'></div>
                                        <div className='w-full h-[13%] rounded-[10px] bg-[#fff] bg-opacity-10 opacity-40 shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'></div>
                                        <div className='w-full h-[13%] rounded-[10px] bg-[#fff] bg-opacity-10 opacity-40 shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'></div>
                                        <div className='w-full h-[13%] rounded-[10px] bg-[#fff] bg-opacity-10 opacity-40 shadow-[0px_4px_44px_rgba(0,0,0,0.1)]'></div>

                                        <div className='absolute flex flex-col items-center mt-0'>
                                            <img src={NoAssets} alt="No Assets" className='w-[4vw]' />
                                            <p className='text-[#7F7F7F] text-[1.2vw] font-[500] mt-[1vh] mb-0'>No Assets Yet</p>
                                        </div>
                                    </div>
                                }

                                <div className="absolute lg:flex hidden justify-center items-center z-10 top-[30px] right-[30px] w-[45px] h-[45px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#ffffff] transition duration-300" onClick={CloseToIcon}>
                                    <div className="border-[1px] w-[30px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[10px] my-[4px] mx-[0]"></div>
                                    <div className="border-[1px] w-[30px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-10px] my-[4px] mx-[0]"></div>
                                </div>
                            </div>
                        </animated.div>
                    </div>
                    :
                    <></>
            }

            {planlistSliderShow &&
                <div className="flex justify-end items-center z-[100] top-0 w-full h-full fixed bg-[#000] bg-opacity-[30%]" onClick={setPlanListSliderSetting} id='scroll'>
                    <animated.div style={sliderAnimation} className="font-rajdhani h-[100vh]">
                        <div className='relative flex flex-col md:justify-between w-[100vw] h-[100vh] lg:w-[27vw] h-100 lg:overflow-y-scroll pt-[12px] pb-[1vh] px-[12px] lg:pl-[0.8vw] lg:pr-[0.5vw] lg:py-[1vh] md:px-[60px] bg-[#fff] lg:rounded-l-[20px] font-montserrat bg-[url("../src/assets/images/deposit_slider_back.png")] bg-no-repeat bg-bottom bg-[length:100%_45vh]' onClick={handleClickEvent}>

                            <div className='lg:hidden flex justify-between items-center py-[8px] pl-[25px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                <div className='flex items-center space-x-[18px]'>
                                    <div onClick={setPlanListSliderSetting} className='block w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                    <p onClick={setPlanListSliderSetting} className='font-[500] text-[18px] font-Rajdhani mb-0'>My Assets</p>
                                </div>

                                <div className='items-center justify-end hover:text-[#429763]'>
                                    <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                        <Link to='/profile' className='profile_icon flex justify-center items-center no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                            <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                            <BiUserCircle className='w-[20px] h-[20px]' />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center items-center space-x-[2%] w-full items-center text-center px-[1.5vw] mt-[10px] lg:pt-[2vh]">
                                <img src={Bitcoin} alt="Bitcoin" className='w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]' />
                                <p className='text-[90%] lg:font-montserrat font-Rajdhani lg:text-[1.2vw] font-[700] text-[#000000] mb-[0]'># Miner {sliderValue.minerNo}</p>
                            </div>

                            <div className="flex flex-col space-y-[2%] w-full items-center text-center px-[1.5vw] mt-[10px]">
                                <div className='flex justify-between items-center w-full px-[15px] py-[1vh] lg:py-[1.5vh] lg:pr-[1vw] lg:pl-[1vw] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center'>
                                        <img src={dashboardTractor} alt="Bitoin" className='w-[3vh] mr-[20px] lg:mr-[0.7vw]' />
                                        <p className='text-[#7F7F7F] font-[500] text-[2.5vh] lg:text-[0.9vw] mb-[0] font-rajdhani'>{sliderValue.plan_name}</p>
                                    </div>
                                    <div className='block w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-[#292D32] rotate-[135deg]'></div>
                                </div>
                            </div>

                            <div className='w-full px-[1.5vw] mt-[10px]'>
                                <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.8vw]'>Average income</p>

                                <div className='flex justify-between'>
                                    <div className='flex flex-col justify-center items-center basis-[30%] px-[18px] py-[16px] lg:py-[18px] rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)]'>
                                        <p className='text-[25px] lg:text-[33px] mb-[0] font-[600] font-Rajdhani'>{sliderValue.daily}</p>
                                        <p className='text-[14px] mb-[0] font-[500]'>Daily</p>
                                    </div>

                                    <div className='flex flex-col justify-center items-center basis-[30%] px-[18px] py-[1vh] lg:py-[18px] rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)]'>
                                        <p className='text-[25px] lg:text-[33px] mb-[0] font-[600] font-Rajdhani'>{sliderValue.monthly}</p>
                                        <p className='text-[14px] mb-[0] font-[500]'>Monthly</p>
                                    </div>

                                    <div className='flex flex-col justify-center items-center basis-[30%] px-[18px] py-[1vh] lg:py-[18px] rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)]'>
                                        <p className='text-[25px] lg:text-[33px] mb-[0] font-[600] font-Rajdhani'>{sliderValue.yearly}</p>
                                        <p className='text-[14px] mb-[0] font-[500]'>Yearly</p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='items-center w-full'>
                                    <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.8vw] md:font-montserrat font-Rajdhani'>Date of Purchase</p>
                                </div>

                                <div className='items-center w-full py-[1vh] lg:py-[1.5vh] pr-[20px] lg:pr-[0.8vw] pl-[20px] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)] bg-[#fff] text-[#7F7F7F]'>
                                    <div className='w-full md:font-montserrat font-Rajdhani text-[2vh] lg:text-[0.8vw]'>
                                        <p className='mb-[0]'>{sliderValue.deposit_date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='items-center w-full'>
                                    <p className='mb-[0] text-[#595A5B] font-[500] text-[2vh] lg:text-[0.8vw] md:font-montserrat font-Rajdhani'>Power (Gh/s)</p>
                                </div>

                                <div className='items-center w-full py-[1vh] lg:py-[1.5vh] pr-[20px] lg:pr-[0.8vw] pl-[20px] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)] bg-[#fff] text-[#7F7F7F]'>
                                    <div className='w-full md:font-montserrat font-Rajdhani text-[2vh] lg:text-[0.8vw]'>
                                        <p className='mb-[0]'>{sliderValue.power}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex items-center justify-between mt-[0] w-full'>
                                    <p className='mb-[0] text-[#595A5B] font-[500] text-[10px] lg:text-[14px] md:font-montserrat font-Rajdhani'>Withdrawable Amount {totalBalance} BTC</p>
                                    <NavLink to='/withdraw' className='dashboard_transfer flex items-center justify-center text-[2vh] lg:text-[14px] font-[500] no-underline cursor-pointer md:font-montserrat font-Rajdhani'>Transfer Now</NavLink>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='bg-[#fff] bg-opacity-[30%] w-full rounded-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] py-[8px] px-[6px] lg:py-[1vh] lg:px-[0.8vw] text-[#595A5B] text-[1.5vh] lg:text-[0.6vw] font-[500] leading-[2vh] text-left space-y-[1vh] md:font-montserrat font-Rajdhani'>
                                    <div className='flex items-center'>
                                        <p className='mr-[8px] text-[30px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>Daily Withdrawal Limit: 2 BTC</p>
                                        <AiOutlineQuestionCircle className='text-[#1E9E39] lg:ml-[0px] ml-[10px] w-[20px] h-[18px] lg:w-[2vw] lg:h-[2vh]' />
                                    </div>

                                    <div className='flex'>
                                        <p className='mr-[8px] text-[30px] mb-[0]'><svg style={{width:'5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#555555" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg></p>
                                        <p className='mb-[0]'>If you have made deposits before the withdrawal, please make sure they are complete. </p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex items-center justify-between mt-[0] w-full'>
                                    <p className='mb-[0] font-[500] text-[1.5vh] lg:text-[0.6vw] ml-[20px] lg:ml-[0px] text-[#1E9E39] cursor-pointer md:font-montserrat font-Rajdhani'>Need help? Please visit our Help Center.</p>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className='flex justify-evenly items-center font-Rajdhani w-full'>
                                    <button className='text-center w-full bg-[#449552] py-[1vh] px-[10px] rounded-[10px] cursor-pointer no-underline text-[#fff] border-[2px] border-[#449552] font-[600] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={setPlanListSliderSetting}>Close</button>
                                </div>
                            </div>

                            <div className='px-[1.5vw] mt-[10px]'>
                                <div className="absolute hidden lg:flex justify-center items-center z-10 top-[20px] left-[20px] w-[45px] h-[45px] text-[#000] border-[2px] border-solid rounded-[50px] border-[#449552] text-[30px] font-[500] cursor-pointer hover:bg-[#449552] hover:text-[#fff] transition duration-300" onClick={setPlanListSliderSetting}>
                                    <div className="border-[1px] w-[30px] border-[#000000] rotate-45 translate-y-[-1px] translate-x-[10px] my-[4px] mx-[0]"></div>
                                    <div className="border-[1px] w-[30px] border-[#000000] -rotate-45 translate-y-[-1px] translate-x-[-10px] my-[4px] mx-[0]"></div>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </div>
            }
            {logoutModalStatus && <Logout />}
            {withdrawModalShow &&
                <WithdrawConfirmModal
                    modalTile="Dashboard"
                    availableBalance={totalBalance}
                    closeWithdrawModal={() => setWithdrawModalShow(false)
                    }
                />
            }
            {MobileSidebar &&
                <MobSidebar SidbarTitle="Dashboard" NavigationLink="/dashboard" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
        </>
    )
}

export default Dashboard