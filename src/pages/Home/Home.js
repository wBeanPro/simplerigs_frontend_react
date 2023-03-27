import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Slider } from "@mui/material"
import axios from 'axios';
import Carousel from "react-bootstrap/Carousel"
import LoginModal from '../../compnents/LoginModal/LoginModal';
import Navbar from '../../compnents/Navbar/Navbar';
import { StarterFactory, AdvanceFactory, PremiumFactory, ProfessionalFactory, BossFactory } from '../../compnents/FactorySlider/FactorySlider';
import 'bootstrap/dist/css/bootstrap.min.css';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import './home.css'

import CryptoDaily from '../../assets/images/cryptodaily.webp'
import CryptoPhotato from '../../assets/images/cryptophotato.webp'
import Yahoo from '../../assets/images/yahoo.png'
import BitcoinCom from '../../assets/images/bitcoin.com.png'

import HomeMobile from '../../assets/images/home_back_phone.webp'
import HomeScreenTractor from '../../assets/images/home_screen_tractor.png'
import MobileHomeBack from '../../assets/images/mobile_home_back.webp'
import Check from '../../assets/images/check.png'
import AboutUSMobile from '../../assets/images/checkout-truck.webp'

import HomeScreenCoins from '../../assets/images/home_screen_coins.png'
import Master from '../../assets/images/mastercard.webp'
import Mining from '../../assets/images/mining.png'
import InstructionTractor from '../../assets/images/instruction_tractor.png'
import InstructionCoin from '../../assets/images/instruction_coin.webp'
import Visa from '../../assets/images/visa.png'
import Bitcoin from '../../assets/images/bitcoin2.webp'
import CoinIcon from '../../assets/images/coin-icon.webp'
import Leave from '../../assets/images/leave.webp'
import GreenTractor from '../../assets/images/green-tractor.webp'
import YellowTractor from '../../assets/images/yellow-tractor1.webp'
import YellowTractor2 from '../../assets/images/yellow-tractor2.webp'
import RedTractor from '../../assets/images/red-tractor1.webp'
import RedTractor2 from '../../assets/images/red-tractor2.webp'
import CreditIcon from '../../assets/images/card.png'
import BitcoinIcon2 from '../../assets/images/bitcoin-icon-2.png'
import AboutTruck from "../../assets/images/about-truck.webp"
import GooglePlay from '../../assets/images/footer_googlePlay.webp'
import AppStore from '../../assets/images/footer_appStore.webp'

import { useDispatch } from 'react-redux'
import { setLogInModalShow, setSliderValueFor, setLoginModalStatus } from '../../store/action';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [slideValue, setSlideValue] = React.useState(125);
    const [showTractor, setShowTractor] = React.useState(1);
    const [investors, setInvestors] = React.useState(0);
    const [investAmount, setInvestAmount] = React.useState(0);
    const [BTCPrice, setBTCPrice] = React.useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedin = localStorage.getItem('logged_in');
    const openModal = () => {
        if(loggedin){
            navigate('/dashboard');
        }else{
            dispatch(setLogInModalShow(true));
            dispatch(setLoginModalStatus(true));
        }
    };
    const sliderValueChange = (e) => {
        let price = e.target.value;
        if(price.split(' ')[1]){
            setSlideValue(Number(price.split(' ')[1]))
        }else{
            setSlideValue(0)        
        }   
    }
    const sliderValueChanged = (e) => {
        let price = e.target.value;
        if(price.split(' ')[1] && Number(price.split(' ')[1]) >= 125 ){
            setSlideValue(Number(price.split(' ')[1]))        
            dispatch(setSliderValueFor(Number(price.split(' ')[1])));
        }else{
            setSlideValue(125)
            dispatch(setSliderValueFor(125));
        }
    }

    const sliderChange = (e) => {
        setSlideValue(e.target.value);
        dispatch(setSliderValueFor(e.target.value));
    }
    // const LearnMoreChange = (value) => {
    //     setSlideValue(value);
    //     dispatch(setSliderValueFor(value));
    // }
    
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
    useEffect(()=>{
        axios.get( process.env.REACT_APP_API_HOST+'api/getBtcPrice')
        .then((response) =>{
            setBTCPrice(response.data.value);
        })
        .catch((error) => {
            if(error.response.status === 500){
            }
        });
        axios.get( process.env.REACT_APP_API_HOST+'api/getTodayInvestors')
        .then((response) =>{
            setInvestors(response.data.count);
            setInvestAmount(response.data.amount);
        })
        .catch((error) => {
            if(error.response.status === 500){
            }
        });
    },[BTCPrice])
    
  return (
    <>
        {/* Hero Section */}
        
        <div className='bg-gradient-to-b from-[#CEEBEF] to-[#FED480]'>
            <Navbar />
            <div className="flex justify-between mx-[1.5vw] mt-[1vh]">
                <div className="hidden sm:block bg-[length:100%_100%] relative md:w-[65vw] md:h-[380px] lg:w-[48vw] lg:h-[591px] bg-[url('../src/assets/images/home_tractor_back.png')]">
                    <img src={HomeMobile} alt="cloud mining" className='absolute bottom-0 right-0 md:w-[10vw]  lg:w-[10vw]  mr-[-5px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]' />
                </div>

                <div className='sm:hidden flex relative justify-center items-center w-full'>
                    <img src={MobileHomeBack} width='540' height='387' alt="crypto cloud mining" className='w-[90%] drop-shadow-[0px_0px_44px_rgba(0,0,0,0.25)]' />
                    <p className='mb-0 leading-[22px] absolute text-center font-Rajdhani font-[600] mt-[-55px]'>
                    We offer the easiest <a href='https://simplerigs.com'>cloud mining</a><br /> process on cutting edge<br /> technology equipment
                    </p>
                </div>
                <div className="hidden sm:block pr-[5vw] pl-[1vw] w-[45%] font-montserrat">
                    <h2 className="text-[1.5vw] font-[700]"><span className='text-[#449552]'>Easy</span> way to start cryptomining</h2>
                    <h2 className="text-[1.5vw] font-[700]"> Your Key to <span className='text-[#449552]'>success</span></h2>
                    <p className='text-[0.8vw] mt-[0.5vh]'>Bitcoin and several other cryptocurrencies mining - the competitive process that verifies and adds new transactions to the blockchain for a cryptocurrency that uses the proof-of-work (PoW) method. The miner that wins the competition is rewarded with some amount of the currency and/or transaction fees. Regular mining requires certain knowledge, know-how and large starting investments. Moreover, all these software and hardware settings are not that easy. That's why we've decided to make it simple with crypto cloud mining, a trusted cloud mining site that provides advanced <a href='https://simplerigs.com'>cloud mining</a> services. Our cloud mining provider offers real, safe, and trustworthy online solutions to simplify the mining process.</p>

                    <p className='text-[0.8vw] mt-[0.5vh]'>Overall, if you're looking for a legitimate and secure cloud mining provider, our cryptocurrency cloud mining services are a great choice. With our cloud-based crypto mining platform, users can mine cryptocurrencies without having to worry about the hassle and expense of managing hardware, making it a convenient and accessible option for anyone looking to get started with cryptocurrency mining.</p>

                    <div className='mt-[8vh]'>
                        <button type='button' className='flex items-center border-[#429763] hover:bg-opacity-70 border-[2px] transition duration-300 px-[2vw] py-[0.8vh] text-[1vw] bg-[#449552] text-[#fff] rounded-[10px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]' onClick={openModal}>Sign Up<span>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="ml-[10px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="bg-[url('../src/assets/images/feature_mobile_back.png')] sm:bg-[url('../src/assets/images/homepage_back.png')] md:bg-[length:138%_100%] lg:bg-[length:100%_100%] bg-cover h-[30vh] md:h-[30vh] sm:h-[45vh] flex items-center relative justify-evenly mt-[-15px] sm:mt-[3vh]">
                <img src={BitcoinCom} width='312' height='44' alt="market" className='hidden sm:block w-[12%]'/>
                <img src={Yahoo} width='171' height='63' alt="market" className='hidden sm:block w-[10%]' />
                <img src={CryptoPhotato} width='232' height='90' alt="market" className='hidden sm:block w-[12%]' />
                <img src={CryptoDaily} alt="market" width='292' height='68' className='hidden sm:block w-[12%]' />
                <img src={HomeScreenTractor} alt="market" className='hidden sm:block absolute md:top-[-4vh] md:right-[5vw] lg:top-[-5vh] lg:right-[4vw]' />
                <img src={HomeScreenCoins} alt="market" className='hidden sm:block absolute top-[-1.7vh] md:right-[1.8vw] lg:right-[2.2vw]' />
            </div>
        </div>
        
        
        {/* Home page */}
        <div className='md:pb-0 pb-[100px] bg-gradient-to-b from-[#CEEBEF] to-[#FED480]'>
            {/* Mint Section */}
            <div className="flex items-center justify-center">
                    {/* 3 Step instruction */}
                <div className="font-montserrat w-[90%] lg:w-[55%] md:w-[80%] mt-[-120px] md:mt-[-60px]  items-center text-center justify-center bg-[#fff] rounded-[20px] z-10 shadow-[0px_4px_44px_rgb(0,0,0,0.15)]">
                    <h1 className='text-[20px] md:text-[2vw] mt-[35px] md:mt-[1.8vh] font-[600]'>EASY 1-2-3 STEP INSTRUCTION</h1>
                    <div className='flex flex-col md:flex-row items-center justify-between mt-[3vh] px-[3vw] pb-[3vh]'>
                        <div className='w-full md:w-[30%] lg:w-[26%] flex flex-col items-center justify-between'>
                            <img src={Mining} width='138' height='142' alt="mining" />
                            <p className='mt-[2vh] font-[600] font-Rajdhani text-[24px] md:text-[15px] lg:text-[0.75vw] mb-[0]'>YOU’RE JUST 30 SEC AWAY</p>
                            <p className='font-[700] font-Rajdhani text-[33px] md:text-[20px] lg:text-[1vw]'>START <span className='text-[#429763]'>MINING </span>NOW</p>
                            <p className='mt-[1vh] text-[12px] w-[75%]'>Just fill out an easy registration form by entering Your data, such as an email, full name and Your phone number. Make sure that Your account is verified and login to finish further steps on Your way to passive income. </p>
                        </div>
                        <div className='w-full md:w-[30%] lg:w-[26%] flex flex-col items-center justify-between'>
                            <img src={InstructionTractor} alt="mining" width='156' height='129' />
                            <span className='mt-[2vh] font-[600] font-Rajdhani text-[33px] md:text-[20px] lg:text-[0.75vw]'>SELECT THE MOST</span>
                            <h2 className='font-[700] font-Rajdhani text-[33px] md:text-[20px] lg:text-[1vw]'><span className='text-[#429763]'>PROFITABLE</span> TRACTOR</h2>
                            <p className='mt-[1vh] text-[12px] w-[75%]'>Check out available packages or make Your own! Use an easy calculator to check Your possible daily income. The income stated is accurate and guaranteed, might only vary for a few Satoshi due to crypto nature.</p>
                        </div>
                        <div className='w-full md:w-[30%] lg:w-[26%] flex flex-col items-center justify-between'>
                            <img src={InstructionCoin} alt="mining" width='144' height='96' />
                            <h3 className='mt-[2vh] font-[600] font-Rajdhani text-[24px] md:text-[20px] lg:text-[0.75vw]'>STARTER $125</h3>
                            <h2 className='font-[700] font-Rajdhani text-[33px] md:text-[20px] lg:text-[1vw]'>IN <span className='text-[#429763]'>STOCK</span></h2>
                            <span className='mt-[20px] text-[14px] font-[700]'>Starter pack <span className='text-[#429763]'>$125</span> In STOCK</span>
                            <span className='text-[14px] font-[700]'>Monthly ROI starts from 12%</span>
                            <hr className='bg-[#449552] border-[#429763] border-[2px] w-[90%] md:w-[60%] h-[2px] mt-[3px] mb-[0.6vh]' />
                            <span className='text-[15px] font-[700]'>PAYOUTS DAILY IN <span className='text-[#429763]'>BTC</span></span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Truck Slider Section */}
            <div className="font-montserrat mt-[35px] md:mt-[7vh]">
                <div className="flex justify-center items-center flex-col">
                    <p className='font-[600] text-[20px] lg:text-[1.6vw] md:text-[18px] mb-[1.8vh]'>TAKE ACTION</p>
                    <p className='text-center text-[25px] md:text-[2.5vw] font-[600] mb-[4vh]'>SELECT THE MOST <span className='text-[#449552]'>PROFITABLE</span> TRACTOR</p>
                </div>
            </div>
            
            {/* <div className='chooseFactory'>
                <StarterFactory />
            </div> */}
            {/* Slider */}
            <div className="">
                {/* Select Factory */}
                <div className="flex factory justify-center items-center w-full"> 
                    <div className="w-full rounded-[20px] z-10">
                        <Carousel>
                            <Carousel.Item >
                                <Carousel.Caption>
                                    <div className='flex justify-center'>
                                        <StarterFactory />
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item  >

                            <Carousel.Item >
                                <Carousel.Caption>
                                    <div className='flex justify-center'>
                                        <AdvanceFactory />
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item  >

                            <Carousel.Item >
                                <Carousel.Caption>
                                    <div className='flex justify-center'>
                                        <PremiumFactory />
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item  >

                            <Carousel.Item >
                                <Carousel.Caption>
                                    <div className='flex justify-center'>
                                        <ProfessionalFactory />
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item  >

                            <Carousel.Item >
                                <Carousel.Caption>
                                    <div className='flex justify-center'>
                                        <BossFactory />
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item  >
                        </Carousel>
                    </div>
                </div>

                {/* Invest Section */}
                <div className="flex justify-center items-center relative w-full mt-[3vh] font-rajdhani">
                    <div className="flex md:flex-row flex-col relative bg-[#8BD66C] rounded-[20px] w-[90%] lg:w-[55%] md:w-[80%] md:pr-[1.2vw] md:pl-[2vw] md:py-[5vh] py-[41px] px-[24px] shadow-[0px_4px_44px_rgba(0,0,0,0.25)]">
                        <div className="flex relative justify-end basis-[100%] md:basis-[70%] lg:basis-[50%]">
                            <div className="self-center absolute lg:left-0 sm:left-[30px] left-0 top-[20px] md:w-[30%]">
                                <img src={CoinIcon} width='623' height='415' alt="coin" className='w-[100px]  sm:w-[14vw]  md:w-[10vw] '/>
                            </div>
                            <div className='flex justify-end lg:gap-4 gap-2 w-[70%] lg:h-auto md:h-[180px] h-[140px] lg:w-[70%]'>
                                <div className="flex flex-col justify-between place-items-end h-full text-[#fff] basis-[60%] lg:basis-[60%]">
                                    <h1 className='mb-0 text-[33px] lg:text-[2.2vw] font-[800] lg:font-[700]'>{investors}</h1>
                                    <h1 className='mb-0 text-[33px] lg:text-[2.2vw] font-[800] lg:font-[700]'>1.12X</h1>
                                    <h1 className='mb-0 text-[33px] lg:text-[2.2vw] font-[800] lg:font-[700]'>${investAmount}</h1>
                                </div>

                                <div className="flex flex-col justify-between text-left text-[#fff] h-full lg:basis-[40%] basis-[40%]">
                                    <p className='mb-0 text-[13px] font-[600]'>INVESTORS <br/>JOINED  TODAY</p>
                                    <p className='mb-0 text-[13px] font-[600]'>AVERAGE INCOME <br/>PER MONTH</p>
                                    <p className='mb-0 text-[13px] font-[600]'>TODAY <br /> PAYOUTS</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center md:ml-0 ml-[20px] md:justify-center basis-[45%] md:basis-[50%] md:mt-[20px] mt-[4vh]">
                            <div className="text-[#f2fff5]">
                                <h2 className='text-[20px] lg:text-[1.4vw] md:text-[18px] font-[600]'>DAILY BTC PAYOUTS.<br />NO DELAY. NO HOLDS.</h2>
                                <div className="">
                                    <button type='button' className='flex items-center font-rajdhani font-[600] bg-[#449552] md:mt-[6vh] border-[2px] border-[#449552] rounded-[10px] text-[14px] lg:text-[0.9vw] md:text-[15px] px-[39px] py-[12px] transition duration-300 hover:bg-opacity-70'  onClick={openModal}>Try Now <span className='ml-[10px]'>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" class="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></span></button>
                                </div>
                            </div>
                        </div>
                        <img src={Leave} alt="leave" className='absolute right-[22px] bottom-0 h-[121px] md:w-[110px] md:h-[193px]'/>
                    </div>
                </div>
                {/* Calculator Section */}
                <div className="flex mt-[6vh] w-full justify-center items-center" id="calculator">
                    <div className="flex justify-between md:flex-row flex-col bg-[#8BD66C] bg-opacity-[39%] md:bg-opacity-[44%] w-[90%] lg:w-[55%] md:w-[80%] rounded-[10px] font-rajdhani py-[14px] px-[23px] md:pt-[17px] md:pr-[18px] md:pb-[26px] lg:pl-[45px] pl-[18px] shadow-[0px_4px_44px_rgb(0,0,0,0.15)]" >
                        <div className="basis-[40%] lg:basis-[40%] md:basis-[35%] pt-[14px]">
                            <span className='text-[21px] lg:text-[24px] md:text-[20px] text-[#449552] font-[700]'>CHOOSE YOUR DESIRED TRACTOR</span>
                            <div className='flex md:flex-col gap-2'>
                                <div className="mt-[15px] md:mt-[24px]">
                                    <label htmlFor="" for="investment_price" className='text-[#595A5B] text-[19px] lg:text-[24px] md:text-[20px] font-[700] mb-[2px]'>INVESTMENT IN $</label>
                                    <input type="text" id="investment_price" className='bg-[#f1f2d7] border-0 font-montserrat text-[18px] lg:text-[24px] md:text-[20px] py-[11px] px-[11px] md:pt-[15px] md:pb-[13px] md:pl-[23px] text-[#757575] rounded-[5px] w-full' value={`$ `+slideValue} onChange={e => sliderValueChange(e)} onBlur={e => sliderValueChanged(e)}/>
                                </div>
                                <div className="mt-[15px] md:mt-[24px]">
                                    <label htmlFor="" for="power" className='text-[#595A5B] text-[19px] lg:text-[24px] md:text-[20px] font-[700] mb-[2px]'>POWER</label>
                                    <input type="text" id="power" className='bg-[#f1f2d7] border-0 font-montserrat text-[18px] lg:text-[24px] md:text-[20px] py-[11px] px-[11px] md:pt-[15px] md:pb-[13px] text-[#757575] rounded-[5px] w-full' value={slideValue * 16 + ` GH/s`} readOnly/>
                                </div>
                            </div>

                            <div className="mt-[20px] lg:mt-[55px] md:mt-[20px]">
                                <Slider value={slideValue} onChange={(e) => sliderChange(e)} min={125} max={100000} aria-label="Default" valueLabelDisplay="auto" />
                            </div>
                        </div>
                        <div className="lg:basis-[55%] md:basis-[55%]">
                            <div className="flex bg-[#8BD66C] bg-opacity-[39%] py-[20px] px-[20px] lg:pt-[27px] lg:pr-[32px] lg:pb-[30px] lg:pl-[42px] md:px-[20px] md:py-[20px] pl-[20px] pr-[10px] font-[700] font-rajdhani justify-between sm:h-auto h-[240px]">
                                <div className="">
                                    <div className="">
                                        <p className='text-[18px] md:text-[24px]'>CALCULATOR</p> 
                                        <div className="items-center text-[#5e5a5b] text-[14px] md:text-[17px] mt-[15px]">
                                            <span>Daily Income</span>
                                        </div>
                                        <span className='text-[24px] md:text-[30px] font-[700]'>${Number((slideValue * 0.004).toFixed(3))}</span>
                                    </div> 
                                    <div className="">
                                        <div className="items-center text-[#5e5a5b] text-[14px] md:text-[17px] mt-[12px]">
                                            <span>Monthly Income</span>
                                        </div>
                                        <span className='text-[24px] md:text-[30px] font-[700]'>${Number((slideValue * 0.12).toFixed(3))}</span>
                                    </div> 
                                    <div className="">
                                        <div className="items-center text-[#5e5a5b] text-[14px] md:text-[17px] mt-[12px]">
                                            <span>Yearly Income</span>
                                        </div>
                                        <span className='text-[24px] md:text-[30px] font-[700]'>${Number((slideValue * 0.12 * 12).toFixed(3))}</span>
                                    </div> 
                                </div>
                                <div className="self-end">
                                    <div>
                                        <img alt="" className="w-[130px]  lg:w-[210px]  md:w-[180px] " width='265' height='186' src={GreenTractor} style={{ display: showTractor === 1 ? "block" : "none" }} />
                                        <img alt="" className="w-[160px]  lg:w-[210px]  md:w-[190px] " width='336' height='157' src={YellowTractor} style={{ display: showTractor === 2 ? "block" : "none" }} />
                                        <img alt="" className="w-[198px]  lg:w-[200px]  md:w-[200px] " width='324' height='151' src={RedTractor} style={{ display: showTractor === 3 ? "block" : "none" }} />
                                        <img alt="" className="w-[160px]  lg:w-[200px]  md:w-[180px] " width='292' height='144' src={YellowTractor2} style={{ display: showTractor === 4 ? "block" : "none" }} />
                                        <img alt="" className="w-[160px] lg:w-[200px]  md:w-[180px] " width='292' height='136' src={RedTractor2} style={{ display: showTractor === 5 ? "block" : "none" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between mt-[16px]">
                                    <div className="">
                                        {
                                            loggedin
                                            ?
                                            <Link className='flex items-center bg-[#449552] justify-center border-[2px] border-[#449552] rounded-[5px] lg:rounded-[10px] text-white text-[10px] lg:text-[18px] md:text-[15px] font-[600] py-[8px] px-[15px] lg:px-[37px] lg:py-[12px] md:px-[15px] md:py-[10px] transition duration-300 hover:bg-opacity-70 no-underline cursor-pointer' to='/creditcardcheck'>
                                                <img src={CreditIcon} width='48' height='35' alt="" className='w-[15px] md:w-[23px] mr-[5px]'/> 
                                                Credit Card 
                                                <span className='ml-[5px]'>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
                                                </span>
                                            </Link>
                                            :
                                            <button className='flex items-center bg-[#449552] justify-center border-[2px] border-[#449552] rounded-[5px] lg:rounded-[10px] text-[#fff] text-[10px] lg:text-[18px] md:text-[15px] font-[600] py-[8px] px-[15px] lg:px-[37px] lg:py-[12px] md:px-[15px] md:py-[10px] transition duration-300 hover:bg-opacity-70' onClick={openModal}>
                                                <img src={CreditIcon} width='48' height='35' alt=""  className='w-[15px] md:w-[23px] mr-[5px]'/> 
                                                Credit Card
                                                <span className='ml-[5px]'>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
                                                </span>
                                            </button>
                                        }
                                        
                                    </div>
                                    <div className="lg:ml-[23px] md:ml-[10px]">
                                    {
                                            loggedin
                                            ?
                                            <Link to='/bitcoincheck' className='flex items-center bg-[#449552] justify-center border-[2px] border-[#449552] rounded-[5px] lg:rounded-[10px] text-white text-[10px] lg:text-[18px] md:text-[15px] font-[600] py-[8px] px-[15px] lg:px-[37px] lg:py-[12px] md:px-[15px] md:py-[10px] transition duration-300 hover:bg-opacity-70 no-underline cursor-pointer'>
                                                <img src={BitcoinIcon2} width='48' height='35' alt="" className='w-[23px] mr-[10px]' />
                                                Bitcoin
                                                <span className='ml-[10px]'>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
                                                </span>
                                            </Link>
                                            :
                                            <button className='flex items-center bg-[#449552] justify-center border-[2px] border-[#449552] rounded-[5px] lg:rounded-[10px] text-[#fff] text-[10px] lg:text-[18px] md:text-[15px] font-[600] py-[8px] px-[15px] lg:px-[37px] lg:py-[12px] md:px-[15px] md:py-[10px] transition duration-300 hover:bg-opacity-70'  onClick={openModal}>
                                                <img src={BitcoinIcon2} width='48' height='35' alt="" className='w-[23px] mr-[10px]' />
                                                Bitcoin
                                                <span className='ml-[10px]'>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
                                                </span>
                                            </button>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* Individual condition */}
                <div className='hidden md:flex justify-center items-center w-full mt-[55px] font-montserrat'>
                    <div className='lg:w-[55%] md:w-[80%] text-center'>
                        <p className='bg-[#fff] pt-[27px] pr-[29px] pb-[24px] pl-[21px] rounded-[22px] text-[#757575] lg:text-[21px] text-[15px] w-full shadow-[0px_4px_44px_rgb(0,0,0,0.15)]'>Investments over $5,000 are eligible for an individual conditions. Leave Your email to get a special offer</p>
                        <div className='flex justify-evenly mt-[25px]'>
                            <input type="text" placeholder='Enter Your Email' className='outline-none bg-[#fff] text-[18px] text-[#757575] py-[13px] rounded-[10px] text-center lg:w-[374px] md:w-[300px] shadow-[0px_4px_44px_rgb(0,0,0,0.15)]' />
                            <button className='font-Rajdhani font-[600] py-[13px] pr-[45px] pl-[54px] bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] transition duration-300 hover:bg-opacity-70 shadow-[0px_4px_44px_rgb(0,0,0,0.15)]'>Send me an offer</button>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="aboutus flex justify-center mt-[35px] md:mt-[77px] w-full items-center index-10 text-center">
                    <div className="w-[90%] md:grid grid-cols-2 gap-2 lg:w-[55%] md:w-[80%] text-left">
                        <div className="flex flex-col justify-between">
                            <div className="font-montserrat md:text-left text-center">
                                <span className="text-[48px] lg:text-[65px] md:text-[40px] font-[600]">SIMPLE<span className='text-[#449552]'>RIGS</span></span>
                                <p className='lg:text-[20px] md:text-[18px] text-[18px]'>THE CLOUD MINING COMPANY</p>
                            </div>
                            <div className="hidden md:flex justify-end items-end">
                                <img className="w-[400px] mb-[-10px] mr-[-40px]" src={AboutTruck} width='731' height='441' alt="tractor-drag" />
                            </div>
                        </div>
                        <div className="aboutus_list lg:mb-[79px] mb-[60px]">
                            <div className="w-full h-[340px] lg:h-[355px] md:h-[370px] bg-[#fff] rounded-[30px] px-[42px] pb-[30px] pt-[40px] md:pt-[18px] md:pb-[49px] font-montserrat shadow-[0px_4px_44px_rgb(0,0,0,0.15)]">
                                <h2 className='text-[#449552] text-[24px] md:text-[40px] font-[600] md:font-Montserrat font-Rajdhani'>ABOUT US</h2>

                                <Carousel>
                                    <Carousel.Item >
                                        <Carousel.Caption className='relative right-0 left-0 '>
                                            <div className='text-[#595A5B] text-left md:text-[15px] text-[12px] font-[500]'>
                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>Founded in 2017 in China. Firstly, designed as a private mining company;</p>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>Successful company development to one of the biggest mining farms in its region; </p>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>Hundreds of b2b contracts with investments companies;</p>
                                                </div>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item >
                                        <Carousel.Caption>
                                            <div className='text-[#595A5B] text-left md:text-[15px] text-[12px] font-[500] h-[80px]overflow-y-scroll'>
                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>In 2020, an Individual investor department have been founded;</p>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>After mining prohibition in China, mining farms been relocated;</p>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>New data centers in South Africa been equipped with the most technologically advanced rigs;
</p>
                                                </div>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item >
                                        <Carousel.Caption>
                                            <div className='text-[#595A5B] text-left md:text-[15px] text-[12px] font-[500]'>
                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>We do care about the environment;</p>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>Since late 2020, the whole company is running entirely on renewable energy;</p>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <img src={Check} alt='checked' className='w-[20px] h-[20px]' />
                                                    <p>Late 2022 brand – new website been designed for the most easy worldwide cloud mining service! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                                </div>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            {/* Footer */}
        <div className="bg-no-repeat bg-cover lg:bg-cover bg-[url('../src/assets/images/footer.webp')]">
            <footer className='flex relative items-center justify-center md:h-[35vh]'>
                <img className='absolute top-[-125px] right-[20px] w-[185px] h-[152px] md:hidden block' src={AboutUSMobile} alt="About us" />
                <div className="flex w-[90%] lg:w-[75%] md:items-center md:justify-center flex-col mt-[100px]">
                    <div className="block md:flex justify-between w-full">
                        <div className="">
                            <p className='text-[20px] font-[700] text-[#bac68e] mb-[8px] font-rajdhani'>We Accept</p>
                            <div className="flex items-center">
                                <a href="/"><img className='w-[8vh]' src={Visa} alt="Visa" width='306' height='93' /></a>
                                <a href="/"><img className='w-[6vh] mx-[16px]' width='191' height='112' src={Master} alt="Master" /></a>
                                <a href="/"><img className='w-[3.5vh]' width='157' height='158' src={Bitcoin} alt="Bitcoin" /></a>
                            </div>
                        </div>
                        <div className=" font-montserrat text-[#BAC68E] md:mt-0 mt-[30px]">
                            <span className='text-[25px] mb-0'>SIMPLE<span className='text-[#449552]'>RIGS</span></span>
                            <p className='text-[13px]'>THE <a href='https://simplerigs.com'>CLOUD MINING</a> COMPANY</p>
                            <p className='mb-[6px] text-[12px] md:mt-0 mt-[30px]'>Contact us 24/7 using</p>
                            <p className='mb-[6px] text-[12px]'>live chat or via support@simplerigs.com</p>
                            <p className='mb-[6px] text-[12px]'>CR NO. 2576021 date of incorporation: 2017-sep-07</p>
                        </div>
                        <div className=" text-[#bac68e] text-[23px] md:mt-0 mt-[30px]">
                            <Link to="/company" className='block underline mb-[18px] font-rajdhani hover:text-[#449952] duration-500'>Company &amp; Contacts</Link>
                            <Link to="/faqs" className='block underline mb-[18px] font-rajdhani hover:text-[#449952] duration-500'>Questions &amp; Answers</Link>
                            <Link to="/terms" className='block underline font-rajdhani hover:text-[#449952] duration-500'>Terms of use</Link>
                        </div>
                        <div className="md:mt-0 mt-[30px]">
                            <button type='button' className='flex items-center bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] font-[600] font-rajdhani lg:px-[36px] px-[36px] py-[10px] md:px-[15px] transition duration-300 hover:bg-opacity-70' onClick={openModal}>Start Mining <span className='block ml-[8px]'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></span></button>
                            <div className='flex lg:flex-row flex-col jusitfy-between mt-[20px]'>
                                <img className="md:w-[22vh] w-[240px]" width='244' height='75' src={GooglePlay} alt="Google Play" />
                                <img className="md:w-[22vh] w-[240px] lg:ml-[19px] lg:mt-0 mt-[10px]" src={AppStore} width='244' height='75' alt="App Store" />
                            </div>
                        </div> 
                    </div>
                    <div className="text-[#bac68e] font-montserrat mt-[36px]">
                        <p>© 2023 SimpleRigs. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
            
            <LoginModal/>
    </>
  )
}

export default Home