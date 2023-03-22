import React, { useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { setTwoFAVerification, setLogoutModal } from '../../store/action';
import { getLogoutModal } from '../../store/reducer';
const Logout = () => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const showLogoutModal = useSelector(state => getLogoutModal(state));

  const animation = useSpring({
    config: {
      duration: 150
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const logout = () => {
    localStorage.clear();
    dispatch(setTwoFAVerification(false));
    dispatch(setLogoutModal(false));
    navigate("/");
  }

  const closeModal = e => {
    if (modalRef.current === e.target) {
      dispatch(setLogoutModal(false));
    }

  };

  const CloseToIcon = () => {
    dispatch(setLogoutModal(false));
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showLogoutModal) {
        dispatch(setLogoutModal(false));
      }
    },
    [showLogoutModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
  return (
    <div className="flex justify-center items-center z-[100] top-0 w-full h-full fixed bg-[#000] bg-opacity-[52%] lg:px-0 px-[20px]" id='scroll' onClick={closeModal} ref={modalRef}>
      <animated.div style={animation} className="w-full lg:w-[30%]">
        <div className='px-[15px] py-[15px] bg-[#fff] rounded-[10px]'>
          <div className="flex flex-col justify-center items-center space-y-[25px] bg-[url('../src/assets/images/logout_modal_back.png')] bg-no-repeat bg-[length:100%_70%] bg-bottom font-montserrat mt-[38px] pb-[30px]">
            <p className='text-[#4B4B4B] text-[26px] lg:text-[1.2vw] font-[600] mb-[0]'>Logout</p>
            <div className='w-[80%] py-[2vh] lg:bg-[#fff] lg:shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px] text-center'>
              <p className='mb-[0] text-[#4B4B4B] text-[95%] font-[400]'>You will be returned to the login <br /> screen</p>
            </div>
            <div className='flex justify-evenly w-full'>
              <button className='px-[35px] py-[12px] lg:px-[4vw] lg:py-[1.4vh] bg-[#449552] rounded-[10px] text-[#fff] font-[600] font-Rajdhani shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300' onClick={CloseToIcon}>Cancel</button>
              <button className='px-[35px] py-[12px] lg:px-[4vw] lg:py-[1.4vh] bg-[#449552] rounded-[10px] text-[#fff] font-[600] font-Rajdhani shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300' onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default Logout