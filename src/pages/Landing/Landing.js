import React, { useEffect } from 'react'
import {  Routes, Route, Link } from 'react-router-dom'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import Company from '../Company/Company';
import Terms from '../Terms/Terms';
import Faq from '../Faq/Faq';
import Home from '../Home/Home';

import { useDispatch } from 'react-redux'
import { setLogInModalShow, setSliderValueFor } from '../../store/action';
import { useNavigate } from 'react-router-dom';
const Landing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedin = localStorage.getItem('logged_in');
    
    // const openModal = () => {
    //     if(loggedin){
    //         navigate('/dashboard')
    //     }else{
    //         dispatch(setLogInModalShow(true));
    //     }
    // };
  return (
    <>
    <div>
        <Routes>
            <Route path="/*" exact element={<Home />} />
            <Route path="company" exact element={<Company />} />
            <Route path="faqs" exact element={<Faq />} />
            <Route path="terms" exact element={<Terms />} />
        </Routes>
    </div>
    </>
  )
}

export default Landing