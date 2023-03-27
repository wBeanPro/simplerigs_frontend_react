import React from 'react'
import LoginModal from '../../compnents/LoginModal/LoginModal'
import { Link } from 'react-router-dom'
import Master from '../../assets/images/mastercard.webp'
import Visa from '../../assets/images/visa.png'
import Bitcoin from '../../assets/images/bitcoin2.webp'
import GooglePlay from '../../assets/images/footer_googlePlay.webp'
import AppStore from '../../assets/images/footer_appStore.webp'
import FooterTractor from '../../assets/images/footer_tractor.png'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    // const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    // const loginStatus = localStorage.getItem('logged_in');
  return (
    <>
    <div className='relative'>
        <img className="absolute z-10 w-[170px] right-[100px] mt-[-92px]" src={FooterTractor} alt="Footer Tractor" />
    </div>
    <footer className='relative flex items-center justify-center h-[35vh] bg-[url("../src/assets/images/company-footer.png")]'>
        <div className="flex w-[75%] items-center justify-center flex-col mt-[100px]">
            <div className="flex justify-between w-full">
                <div className="">
                    <p className='text-[20px] font-[700] text-[#bac68e] mb-[8px] font-rajdhani'>We Accept</p>
                    <div className="flex items-center">
                        <a href="/"><img className='w-[8vh]' src={Visa} alt="Visa" /></a>
                        <a href="/"><img className='w-[6vh] mx-[16px]' src={Master} alt="Master" /></a>
                        <a href="/"><img className='w-[3.5vh]' src={Bitcoin} alt="Bitcoin" /></a>
                    </div>
                </div>
                <div className=" font-montserrat text-[#BAC68E]">
                    <h2 className='text-[25px] mb-0'>SIMPLE<span className='text-[#449552]'>RIGS</span></h2>
                    <p className='text-[13px]'>THE CLOUD MINING COMPANY</p>
                    <p className='mb-[6px] text-[12px]'>Contact us 24/7 using</p>
                    <p className='mb-[6px] text-[12px]'>live chat or via support@simplerigs.com</p>
                    <p className='mb-[6px] text-[12px]'>CR NO. 2576021 date of incorporation: 2017-sep-07</p>
                </div>
                <div className=" text-[#bac68e] text-[23px]">
                    <Link to="/company" className='block underline mb-[18px] font-rajdhani text-[#BAC68E] hover:text-[#449952] duration-500'>Company &amp; Contacts</Link>
                    <Link to="/faqs" className='block underline mb-[18px] font-rajdhani hover:text-[#449952] duration-500'>Questions &amp; Answers</Link>
                    <Link to="/terms" className='block underline font-rajdhani hover:text-[#449952] duration-500'>Terms of use</Link>
                </div>
                <div className="">
                    <button type='button' className='flex items-center bg-[#449552] border-[3px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] font-[600] font-rajdhani px-[36px] py-[10px] hover:bg-transparent duration-300' onClick={openModal}>Start Mining <span className='block ml-[8px]'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></span></button>
                    <div className='flex jusitfy-between mt-[20px]'>
                        <img className="w-[22vh]" src={GooglePlay} alt="tractor-drag-mobile" />
                        <img className="w-[22vh] ml-[19px]" src={AppStore} alt="tractor-drag-mobile" />
                    </div>
                </div> 
            </div>
            <div className="text-[#bac68e] font-montserrat mt-[36px]">
                <p>© 2023 SimpleRigs. All rights reserved.</p>
            </div>
        </div>
    </footer>
    <LoginModal showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
}

export default Footer