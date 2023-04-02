import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css'
import './register.css'
import { useDispatch } from 'react-redux';
import { setLogInModalShow, setForgotPassword, setLoginModalStatus } from '../../store/action';
const Register = ({closeRegisterModal}) => {
    const [phoneValue, setPhoneValue] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [isChecked, setIsChecked] = useState(false);
    
    const dispatch = useDispatch();
    const registerHandler = (e) => {
        if(password === confirmPassword) {
            const referral_code = localStorage.getItem('referral_code');
            const data = {"first_name": firstName, "last_name": lastName, "email": email, "phone": phoneValue, "password": password, "referral_code":referral_code};
            axios.post(process.env.REACT_APP_API_HOST + 'api/userRegister', data)
            .then((response) => {
                if(response.data.result) {
                    dispatch(setLogInModalShow(false));
                    dispatch(setForgotPassword(false));
                    dispatch(setLoginModalStatus(false));
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('access_token', response.data.access_token);
                    toast.success("Successfully Registered. Please verify your email.", {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    }); 
                } else {
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    }); 
                }
            })
            .catch((error)=> {
                console.log("register error is here", error.response)
                dispatch(setLogInModalShow(false));
                toast.error(error.response.data, {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    hideProgressBar: true,
                });        
            });
            e.preventDefault();
        } else {
            toast.error("Confirm password doesn't match!", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                hideProgressBar: true,
            });
        }
    }

    const closeModal = () => {
        closeRegisterModal();
    }

    function handleCheckboxChange() {
        setIsChecked(!isChecked); // toggle the checked state
    }

  return (
    <>
    <div className="px-[22px] font-Rajdhani md:font-montserrat mt-[2vh] md:mt-[0]">
        <p className='text-[20px] font-[200] mb-0'>Registration</p>
        <form onSubmit={registerHandler} className='flex flex-col md:flex-row justify-between'>
            <div className='md:w-[45%] md:mb-0 mb-[20px] md:mt-0 mt-[10px]'>
                <div className='mb-[2vh] md:mb-[8px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]'>
                    <input type="text" value={firstName} placeholder="First name" onChange={e => setFirstName(e.target.value)} className='w-full px-[20px] py-[10px] md:py-[19px] md:text-center text-left text-[15px] font-[200] rounded-[10px] md:h-[66px] focus:outline-[#449552]' required/>
                </div>
                <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                    <input type="text" value={lastName}  placeholder="Last name" onChange={e => setLastName(e.target.value)} className='w-full px-[20px] py-[10px] md:py-[19px] md:text-center text-left text-[15px] font-[200] rounded-[10px] md:h-[66px] focus:outline-[#449552]' required/>
                </div>
                <div className='hidden md:flex items-center mt-[6px] mb-[15px] pl-[5px]'>
                    <input id='terms' type="checkbox" name='terms' checked={isChecked} value="accepted" onChange={handleCheckboxChange} class="rounded-[10px] appearance-none w-[20px] h-[13px] bg-[#fff] border-[#4B4B4B] bg-opacity-[70%] border-[1px] checked:bg-[#449552] indeterminate:bg-gray-300 focus:outline-[#449552]" required />
                    <label for="terms" className="text-[#1E9E39] font-[600] text-[10px] mb-0 ml-[5px] cursor-pointer">Check here to indicate that You’re at least 18 years old and You’ve read and greed out terms and conditions</label>
                </div>
                <div className="hidden md:flex">
                    <button type='submit' className='w-[186px] items-center bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] sm:text-[24px] text-[16px]  text-center py-[0.8vh] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Sign Up</button>
                </div>
            </div>
            <div className='md:w-[45%] space-y-[2vh] md:space-y-[4.62px] mb-[2vh]'>
                <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                    <input type="email" value={email} placeholder='Enter Your Email' className='w-full px-[20px] py-[10px] md:py-[19px] md:text-center text-left text-[15px] font-[200] rounded-[10px] md:h-[66px] focus:outline-[#449552]' onChange={e => setEmail(e.target.value)} required/>
                </div>
                
                <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                    <input type="password" id='password' autocomplete="new-password" name='password' value={password} placeholder='Enter Your Password' className='w-full px-[20px] py-[10px] md:py-[19px] md:text-center text-left text-[15px] font-[200] rounded-[10px] tracking-widest md:h-[66px] focus:outline-[#449552]' onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                    <input type="password" id='repassword' name='repassword' value={confirmPassword} placeholder='Confirm Your Password' className='w-full px-[20px] py-[10px] md:py-[19px] md:text-center text-left text-[15px] font-[200] rounded-[10px] tracking-widest md:h-[66px] focus:outline-[#449552]' onChange={e => setConfirmPassword(e.target.value)} required/>
                </div>
                

                <div className="items-center flex w-full pl-[24px] py-[5px] md:pl-[24px] text-center bg-[#fff] text-[20px] font-[200] shadow-[0px_0px_34px_rgb(0,0,0,0.15)] rounded-[10px] md:w-[346px] md:h-[66px]">
                    <PhoneInput
                        country={'us'}
                        value={phoneValue}
                        className='phone_input'
                        onChange={(e) => setPhoneValue(e)}
                        required
                    />
                </div>

                <div className='flex md:hidden items-center mt-[6px] mb-[15px] pl-[5px]'>
                    <input id='terms_checkbox' type="checkbox" name='terms_checkbox' value="accepted" checked={isChecked} onChange={handleCheckboxChange} class="rounded-[10px] appearance-none w-[20px] h-[14px] bg-[#fff] border-[#4B4B4B] bg-opacity-[70%] border-[1px] checked:bg-[#449552] indeterminate:bg-gray-300 focus:outline-[#449552]" required />
                    <label for="terms_checkbox" className="text-[#1E9E39] font-[600] text-[10px] mb-0 ml-[5px] cursor-pointer">Check here to indicate that You’re at least 18 years old and You’ve read and greed out terms and conditions</label>
                </div>

                <div className="flex justify-between">
                    <div className="md:hidden">
                        <button type='submit' className='w-full items-center bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[1vh] md:py-[17px] px-[40px] hover:bg-opacity-70 transition duration-300 font-Rajdhani shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Sign Up</button>
                    </div>

                    <div className="md:hidden">
                        <button type='submit' className='w-full items-center bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[1vh] md:py-[17px] px-[40px] hover:bg-opacity-70 transition duration-300 font-Rajdhani shadow-[0px_4px_4px_rgb(0,0,0,0.25)]' onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default Register