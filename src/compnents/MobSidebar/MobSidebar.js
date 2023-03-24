import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLogoutModal, setTwoFAModalStatus } from '../../store/action'
import LogoutIcon from '../../assets/images/logout.png'
import { AiOutlineMenu } from "react-icons/ai";
import { BiUserCircle } from 'react-icons/bi';
import axios from 'axios';
import { useSpring, animated } from 'react-spring'
import './mobsidebar.css'

const MobSidebar = ({ SidbarTitle, NavigationLink, MobileSidebar, setMobileSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  // const loggedin = localStorage.getItem('logged_in');
  const user_id = Number(localStorage.getItem('user_id'));
  const access_token = localStorage.getItem('access_token');
  const data = {"user_id": user_id, "accessToken": access_token}

  const animation = useSpring({
    config: {
      duration: 150
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
    transform: MobileSidebar ? `translateY(0%)` : `translateY(-100%)`
  });

  const CloseSidebar = () => {
    setMobileSidebar((prev) => !prev);
    console.log("error");
  };

  const logoutModalShow = () => {
    dispatch(setLogoutModal(true));
  }

  const twoFAModalSetting = () => {
    dispatch(setTwoFAModalStatus(true));
    navigate('/profile');
  }

  useEffect(() => {
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
  }, [user_id])

  const navigatePage = () => {
    setMobileSidebar((prev) => !prev);
  }
  return (
    <>
      <div className="lg:hidden flex justify-center pt-[14px] px-[12px] z-50 top-0 w-full h-full fixed bg-[#000] bg-opacity-[30%]"  id='scroll'>
        <animated.div style={animation} className='flex items-center font-Rajdhani h-[90vh] w-full py-[1vh] px-[8px] lg:px-[0.5vw] lg:pb-[0.7vh] bg-[#ffffff] rounded-[10px]'>
          <div className="w-full h-full rounded-[20px] bg-[url('../src/assets/images/mobile_sidebar_back.png')] bg-[length:100%_35%] bg-no-repeat bg-bottom pl-[16px]">
            <div className='lg:hidden flex justify-between items-center bg-[#ffffff] rounded-[10px]'>
              <Link to={NavigationLink} onClick={CloseSidebar} className='flex items-center space-x-[18px] cursor-pointer no-underline'>
                <AiOutlineMenu className='w-[20px] h-[18  px] text-[#000000]' />
                <p className='font-[500] text-[18px] font-Rajdhani mb-0'>{SidbarTitle}</p>
              </Link>

              <div className='items-center justify-end hover:text-[#429763]'>
                <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                  <Link to='/profile' onClick={navigatePage} className='profile_icon no-underline flex items-center py-[0.8vh] px-[0.8vw] text-[18px] font-[500] space-x-[10px]'>
                    <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                    <BiUserCircle className='w-[20px] h-[20px]' />
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-[1.5vh] lg:pt-[3vh] pl-[1vw] leading-[2vh] lg:leading-[2.2vh]">
              {/* {
                loggedin
                ? */}
              <>
                <p className='text-[18px] font-[600] mb-[0]'>GENERAL</p>
                <div className='pt-[8px] pb-[8px]'>
                  <ul className="mobile_nav_link_wrap flex flex-col">
                    <li className='flex'><Link to="/dashboard" onClick={CloseSidebar} activeclassname="active">Dashboard</Link>
                    </li>
                    <li className='flex'><Link to="/deposit" onClick={CloseSidebar} activeclassname="active">New assets</Link></li>
                    <li className='flex'><Link to="/withdraw" onClick={CloseSidebar} activeclassname="active">Withdrawal</Link></li>
                    <li className='flex'><Link to="/referrals" onClick={CloseSidebar} activeclassname="active">Referrals</Link></li>
                  </ul>
                </div>

                <p className='text-[18px] font-[600] my-[0]'>SECURITY</p>
                <div className='pt-[8px] pb-[8px]'>
                  <ul className="mobile_nav_link_wrap flex flex-col">
                    <li className='flex'><a className='text-[0.7vw] font-[500] rounded-[8px] py-[1.3vh] px-[1vw]' onClick={twoFAModalSetting}>Security verification (2FA)</a></li>
                    <li className='flex'><Link to="/profile" onClick={CloseSidebar} activeclassname="active">Identity verification (KYC)</Link></li>
                  </ul>
                </div>
              </>
              {/* :
                <></>
              } */}
              <p className='text-[18px] font-[600] my-[0]'>OTHER</p>
              <div className='pt-[8px]'>
                <ul className="mobile_nav_link_wrap flex flex-col">
                  <li className='flex'><Link to="/company" onClick={CloseSidebar} activeclassname="active">Company</Link></li>
                  <li className='flex'><Link to="/terms" onClick={CloseSidebar} activeclassname="active">Terms Of Use</Link></li>
                  <li className='flex'><Link to="/faqs" onClick={CloseSidebar} activeclassname="active">FAQ</Link></li>
                </ul>
              </div>
            </div>
            <div className='flex items-center font-rajdhani font-[600] text-[20px] pl-[23px] mt-[2vh] space-x-[10px] cursor-pointer' onClick={logoutModalShow} >
              <img src={LogoutIcon} className='w-[24px] h-[24px]' alt='Logout Icon' />
              <span activeclassname="active">Logout</span>
            </div>
          </div>
        </animated.div>

      </div>
    </>
  )
}

export default MobSidebar