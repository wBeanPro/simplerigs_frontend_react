import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from '../../assets/images/logout.png'
import { useDispatch } from 'react-redux'
import { setLogoutModal, setTwoFAModalStatus } from '../../store/action'
import './sidebar.css'

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  // const loggedin = localStorage.getItem('logged_in');
  const twoFaStatus = localStorage.getItem('twoFAStatus');

  const logoutModalShow = () => {
    dispatch(setLogoutModal(true));
  }

  const twoFAModalSetting = () => {
    if(twoFaStatus) {
      navigate('/profile');
    } else {
      dispatch(setTwoFAModalStatus(true));
      navigate('/profile');
    }
  }

  return (
    <>
    <div className='h-[93vh] px-[0.5vw] pb-[0.7vh] bg-[#f9f9f9] rounded-[20px]'>
      <div className="w-full h-full rounded-[20px] bg-[url('../src/assets/images/sidebar_footer1.png')] bg-[length:100%_27%] bg-no-repeat bg-bottom">
          <div className="pt-[3vh] pl-[1vw] font-montserrat leading-[2.2vh]">
              {/* {
                loggedin
                ? */}
                <>
                  <p className='font-[600] mb-[0]'>GENERAL</p>
                    <div className='pt-[1vh] pb-[1vh]'>
                      <ul className="nav-link-wrap flex flex-col">
                        <li className='flex'><NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
                        </li>
                        <li className='flex'><NavLink to="/deposit" activeclassname="active">New assets</NavLink></li>
                        <li className='flex'><NavLink to="/withdraw" activeclassname="active">Withdrawal</NavLink></li>
                        <li className='flex'><NavLink to="/referrals" activeclassname="active">Referrals</NavLink></li>
                      </ul>
                    </div>
                  
                  <p className='font-[600] my-[0]'>SECURITY</p>
                  <div className='pt-[15px] pb-[15px]'>
                    <ul className="nav-link-wrap flex flex-col">
                      <li className='flex'><button className='text-[0.7vw] font-[500] rounded-[8px] py-[1.3vh] px-[1vw]' onClick={twoFAModalSetting}>Security verification (2FA)</button></li>
                      <li className='flex'><NavLink to="/profile" activeclassname="active">Identity verification (KYC)</NavLink></li>
                    </ul>
                  </div>
                </>
                {/* :
                <></>
              } */}
              <p className='font-[600] my-[0]'>OTHER</p>
              <div className='pt-[15px]'>
                <ul className="nav-link-wrap flex flex-col">
                  <li className='flex'><NavLink to="/company" activeclassname="active">Company</NavLink></li>
                  <li className='flex'><NavLink to="/terms" activeclassname="active">Terms Of Use</NavLink></li>
                  <li className='flex'><NavLink to="/faqs" activeclassname="active">FAQ</NavLink></li>
                </ul>
              </div>
          </div>
          <div className='flex justify-center items-center font-rajdhani font-[600] text-[1.1vw] mt-[2vh] space-x-[0.5vw] cursor-pointer' onClick={logoutModalShow} >
            {/* <BiLogOut className='w-[28px] h-[24px]' /> */}
            <img src={LogoutIcon} className='w-[1.2vw] h-[1.9vh]' alt='Logout Icon'/>
            <span activeclassname="active">Logout</span>
          </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar