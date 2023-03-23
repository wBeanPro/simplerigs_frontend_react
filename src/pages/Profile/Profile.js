import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { FaInfoCircle } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { toast } from "react-toastify"
import axios from 'axios';

import MobSidebar from '../../compnents/MobSidebar/MobSidebar';
import Sidebar from '../../compnents/Sidebar/Sidebar';
import TwofaSecurity from '../../compnents/TwofaSecurity/TwofaSecurity';
import Logout from '../../compnents/Logout/Logout';
import Verified from '../../assets/images/verified_avatar.png';
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';
import Unverified from '../../assets/images/unverified_avatar.png';
import CheckoutTruck from '../../assets/images/checkout-truck.png'
import './profile.css';

import { getLogoutModal, getTwoFAStatus } from '../../store/reducer';
import { setTwoFAModalStatus } from '../../store/action'


const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const twoFAModalStatus = useSelector(state => getTwoFAStatus(state));
    const [MobileSidebar, setMobileSidebar] = useState(false);
    
    const [verified, setVerified] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [image, setImage] = useState({ preview: '', raw: '' });
    const [lastLogin, setLastLogin] = useState();
    const loginStatus = localStorage.getItem('logged_in');
    const twoFaStatus = localStorage.getItem('twoFAStatus');

    useEffect(() => {
        if(!loginStatus){
          navigate('/');
        }
      },[loginStatus]);
    
    // const CloseMobSidebar = () => {
    //     setMobileSidebar(!MobileSidebar);
    // };

    // const verifyEmail = () => {
    //     const user_id = localStorage.getItem('user_id');
    //     axios.get(process.env.REACT_APP_API_HOST + 'api/sendEmailVerificationLink/' + user_id)
    //         .then((response) => {
    //             toast.info('Please check your Email.', {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 closeOnClick: true,
    //                 hideProgressBar: true,
    //             });
    //         })
    //         .catch((error) => {

    //         })
    // }

    const onImageChange = (event) => {
        if(verified) {
            return;
        } else if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
                preview: URL.createObjectURL(event.target.files[0]),
                raw: img
            });
            event.preventDefault()
            const formData = new FormData();
            const user_id = Number(localStorage.getItem('user_id'));
            const access_token = localStorage.getItem('access_token');
            formData.append('id', user_id)
            formData.append('id_card', img)
            formData.append('accessToken', access_token);
            axios.post(process.env.REACT_APP_API_HOST + 'api/uploadId', formData)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 500) {

                    }
                });
        }
    };

    useEffect(() => {
        if (twoFaStatus === "true") {
            setCheckingStatus(true);
        }
        const user_id = Number(localStorage.getItem('user_id'));
        const access_token = localStorage.getItem('access_token');
        const data = { "user_id": user_id, "accessToken": access_token };
        axios.post(process.env.REACT_APP_API_HOST + 'api/getUserInfo', data)
            .then((response) => {
                if (response.data) {
                    setEmail(response.data.email);
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                    setPhone('+' + response.data.phone);
                    let date = new Date(response.data.login_datetime);
                    setLastLogin(date.toLocaleDateString());
                    if (response.data.id_verified === 1) {
                        setVerified(true);
                    }
                    if (response.data.status === 1) {
                        setEmailStatus(true)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [twoFaStatus]);

    const twoFAModalSetting = () => {
        dispatch(setTwoFAModalStatus(true));
    }

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }

    return (
        <>
            <div className="dashboard-root-container lg:h-[100vh] lg:flex-row flex-col">
                
                <div className={` ${twoFAModalStatus? "md:h-[100vh] h-[50vh]" : "h-full" } flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]`} >
                    {!MobileSidebar && 
                        <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                            <div className='flex items-center space-x-[15px]'>
                                <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} /> 
                                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Profile</p>
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
                                    <h1 className='text-[28px] font-[500] font-Rajdhani lg:text-[1.2vw] lg:font-[600] lg:font-montserrat mb-[0]'>Your <span className='text-[#449552]'>Profile</span></h1>
                                </div>

                                <div className='lg:flex md:space-x-[5vw] h-full w-full lg:w-[68vw] lg:mt-[2vh] mt-[12px] relative bg-[#FFFFFF] bg-opacity-[60%] rounded-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] py-[20px] px-[20px] shadow-[0px_0px_44px_rgba(0,0,0,0.1)]'>
                                    <div className='lg:font-montserrat font-Rajdhani'>
                                        {verified ?
                                            <h2 className='text-[22px] font-[500] lg:text-[95%] lg:font-[600]'>YOUR IDENTITY IS <span className='text-[#449552]'>VERIFIED</span></h2>
                                            :
                                            <h2 className='text-[22px] font-[500] lg:text-[95%] lg:font-[600]'>YOUR IDENTITY NOT VERIFIED</h2>
                                        }
                                        <div className='flex flex-col items-center mt-[2vh]'>
                                            <div className='flex justify-center'>
                                                <img src={verified ? Verified : Unverified} alt='defaultPhoto' className='w-[60%] lg:w-[80%]' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col relative justify-center items-center text-center mt-[3vh] font-rajdhani'>
                                            <div className='flex relative justify-center items-center w-166px'>
                                                <label htmlFor='upload_image' className='cursor-pointer w-[170px] py-[12px] text-[95%] bg-[#449552] rounded-[10px] text-[#fff] font-[600] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>{verified ? <span>Documents Submitted</span> : <span>Submit Document</span>}</label>
                                                <input type="file" id='upload_image' name="myImage" onChange={onImageChange} />

                                                {verified && (
                                                        <BsFillCheckCircleFill className='absolute right-[-10px] top-[-12px] border-[2px] border-[#fff] rounded-[15px] w-[23px] h-[23px] text-[#449552]' />
                                                )}
                                            </div>

                                            <div className='w-[95%] lg:w-[250px] text-[#7F7F7F] text-[12px] lg:text-[95%] font-[600] mt-[0.8vh]'>
                                                <p className='mb-[2vh]'>Confirm Your Identity. You can upload and submit an approved document like a valid passport, driver's license, or non-driver's government ID.</p>
                                            </div>

                                            <div className='flex relative justify-center items-center w-166px'>
                                                {checkingStatus ?
                                                    <h2 className="cursor-pointer w-[170px] px-[1.5vw] py-[12px] text-[95%] bg-[#449552] rounded-[10px] text-[#fff] font-[600] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]">
                                                        <span>2FA is active</span>
                                                    </h2>
                                                    :
                                                    <h2 onClick={twoFAModalSetting} className="cursor-pointer w-[170px] px-[1.5vw] py-[12px] text-[95%] bg-[#449552] rounded-[10px] text-[#fff] font-[600] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]">
                                                        <span>Enable 2FA</span>
                                                    </h2>
                                                }

                                                {checkingStatus && (
                                                    <BsFillCheckCircleFill className='w-[23px] h-[23px] text-[#449552] absolute z-50 right-[-10px] top-[-12px] border-[2px] border-[#fff] rounded-[15px]' />
                                                )}
                                            </div>

                                            <div className='w-[95%] lg:w-[250px] text-[#7F7F7F] text-[12px] lg:text-[95%] font-[600] mt-[0.8vh]'>
                                                <p className=''>Ptotect Your account with an extra layer of security. Once onfigured You’ll be required to  enter both  Your password and  an auth  code from  Your mobile phone app in order to sign in.</p>
                                            </div>

                                        </div>
                                        {/* {
                                            emailStatus
                                            ?
                                            <></>
                                            :
                                            <button className='verify-email' onClick={verifyEmail}>Verify Email</button>
                                        } */}
                                    </div>
                                    <div className='profile-detail lg:w-[50%] space-y-[20px] md:space-y-[2.5vh] mt-[32px] lg:mt-[3vh] font-montserrat text-[95%]'>
                                        <div className='flex space-x-[16px] lg:space-x-[1.5vw] text-[#757575]'>
                                            <div className="w-full">
                                                <input type="text" value={firstName} className='w-full px-[20px] py-[14px] lg:px-[1vw] lg:py-[1.5vh] focus:outline-none' readOnly />
                                            </div>
                                            <div className="w-full">
                                                <input type="text" value={lastName} className='w-full px-[20px] py-[14px] lg:px-[1vw] lg:py-[1.5vh] focus:outline-none' readOnly />
                                            </div>
                                        </div>
                                        <div className='text-[#757575]'>
                                            <div className="bg-[#f1f2d7] border-none">
                                                <input type="text" value={phone} className='px-[20px] py-[14px] lg:px-[1vw] lg:py-[1.5vh] w-full focus:outline-none' readOnly />
                                            </div>
                                        </div>
                                        <div className="text-[#757575]">
                                            <input type="text" value={email} className='px-[20px] py-[14px] lg:px-[1vw] lg:py-[1.5vh] w-full focus:outline-none' readOnly />
                                        </div>
                                        <div className='flex items-center font-[600] font-rajdhani'>
                                            <h2 className='text-[#8BD66C] mr-[0.5vw] lg:text-[1.2vw] text-[15px] font-[600] mb-0'><FaInfoCircle /></h2>
                                            <h2 className='text-[15px] lg:text-[1.3vw] font-[500] lg:font-[600] mb-[0]'>LAST LOGIN ON {lastLogin}</h2>
                                        </div>
                                        <div className='associate-manage-group bg-[#C9E8BF] py-[16px] px-[16px] lg:pl-[35px] font-rajdhani w-full lg:w-[23vw] rounded-[10px]'>
                                            {/* <h2 className='text-[#54A169] text-[20px] lg:text-[1.2vw] font-[500] lg:font-[600]'>ASSOCIATED MANAGER</h2> */}
                                            <h4 className='mb-[10px] text-[#595A5B] text-[15px] font-[500] lg:text-[1vw] lg:font-[600]'>If you need any help , do not hesitate to contact your manager via live chat or support@simplerigs.com</h4>
                                            {/* <h4 className='flex mb-[16px] text-[#595A5B] text-[15px] font-[500] lg:text-[1vw] lg:font-[600]'>kevin.s@simplerigs.com
                                                <span className='ml-[5px] cursor-pointer' onClick={() => {
                                                    console.log("Copy");
                                                    copyFunction("kevin.s@simplerigs.com");
                                                    toast.success("Copied manager's email", {
                                                        position: "bottom-center",
                                                        autoClose: 2000,
                                                        closeOnClick: true,
                                                        hideProgressBar: true,
                                                    });
                                                }}> <img src={Copy} alt='copy' className='w-[80%]' />
                                                </span>
                                            </h4> */}
                                        </div>
                                    </div>
                                    <p className='lg:block hidden w-[451px] text-[#7F7F7F] font-rajdhani font-[600] text-[10px] uppercase absolute bottom-0 right-0'>* Personal information that we collect/use/store is confidential. Personal data is only for internal usage only on a necessary basis and won't be shared with a third-party companies.</p>

                                    <p className='lg:hidden block text-right mt-[40px] text-[#7F7F7F] font-rajdhani font-[500] text-[12px] uppercase'>* Personal information that we collect/use/ <br /> store is confidential. Personal data is only for<br /> internal usage only on a necessary basis and<br /> won't be shared with a third-party companies.</p>
                                </div>
                                <div className="checkout-truck">
                                    <img src={CheckoutTruck} alt="truck" />
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
            {MobileSidebar && 
                <MobSidebar SidbarTitle = "Profile" NavigationLink = "/profile" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
            
            <div>
                {twoFAModalStatus && <TwofaSecurity />}
            </div>
        </>
    )
}

export default Profile;