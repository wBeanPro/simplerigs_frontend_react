import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { BiUserCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { setLogInModalShow } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navbar.css'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = Number(localStorage.getItem('user_id'));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const access_token = localStorage.getItem('access_token');
    const data = {"user_id": user_id, "accessToken": access_token}
    const openModal = () => {
        if(loggedin){
            navigate('/dashboard')
        }else{
            dispatch(setLogInModalShow(true));
        }
    };

    useEffect(() => {
        if(user_id) {
            axios.post(process.env.REACT_APP_API_HOST + 'api/getUserInfo', data)
            .then((response) => {
                if(response.data){
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                    console.log("Got the user's name");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },[user_id])

  const loggedin = localStorage.getItem('logged_in');
  return (
    <>
        <div className="w-full">
            <div className='flex justify-between items-center ml-[7vw] mr-[7vw] sm:mr-[2.5vw] pt-[2vh] justify-between font-montserrat'>
                {/* Logo Letter */}
                <div className="mr-auto">
                    <p className="mb-[0] text-[30px] lg:text-[3vw] font-[700]">SIMPLE&nbsp;<span className='text-[#449552]'>RIGS</span>&nbsp;</p>
                    <div className='sm:text-left text-center'>
                        <p className='text-[15px] sm:text-[23px] font-Rajdhani mb-[0]'>THE <a href='https://simplerigs.com'>CLOUD MINING</a> COMPANY</p>
                    </div>
                </div>

                {/* Navigation bar */}
                <div className="flex justify-end sm:justify-between items-center sm:w-[53%]">
                    <nav className='hidden sm:flex navbar_active space-x-[2vw] text-[1.2vw]'>
                        <NavLink to='/' >HOME</NavLink>
                        <NavLink to='/faqs' >FAQ</NavLink>
                        <NavLink to='/terms' >TERMS OF USE</NavLink>
                        <NavLink to='/company'>ABOUT US</NavLink>
                    </nav>
                            {/* Login Button */}
                    <div className="items-center">
                        <div className="text-[#fff]">
                            {
                                loggedin
                                ?
                                <NavLink to='/profile' className='profile_icon bg-[#429763] hover:bg-opacity-70 rounded-[10px] text-[#fff] font-[600] font-Rajdhani border-[2px] border-[#429763] transition duration-300 no-underline flex items-center py-[10px] px-[23px] sm:py-[0.8vh] sm:px-[1.5vw] sm:text-[18px] text-[16px] font-[500] space-x-[0.8vw] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
                                    <p className='mb-[0] text-[#fff]'>{firstName} {lastName}</p>
                                    <BiUserCircle className='text-[#fff]' />
                                </NavLink>
                                :
                                <button type='button' className='bg-[#429763] hover:bg-opacity-70 rounded-[10px] text-[#fff] font-[500]  border-[2px] border-[#429763] transition duration-300 sm:text-[24px] text-[16px] py-[10px] px-[23px] sm:py-[0.8vh] sm:px-[1.5vw] flex items-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]' onClick={openModal}>Login <span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="ml-[8px]" height="23px" width="1em" xmlns="http://www.w3.org/2000/svg"><path width="100%" d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>    
                                </span></button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar