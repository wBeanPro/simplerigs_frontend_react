import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setForgotPassword, setLogInModalShow, setTwoFAVerification, setLoginModalStatus } from '../../store/action'
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = ({closeLoginModal}) => {
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const login = (e) => {
        const data = {"email": email, "password": password};
        axios.post( process.env.REACT_APP_API_HOST+'api/userLogin', data)
        .then((response) =>{
            console.log(response);
            if(response.data.result){
                localStorage.clear();
                localStorage.setItem('user_id', response.data.id);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('wallet_address',response.data.wallet_address);
                if(response.data.two_factor_verified === 1) {
                    dispatch(setTwoFAVerification(true));
                    localStorage.setItem('twoFAStatus', true);
                    toast.info(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
                } else{
                    localStorage.setItem('logged_in', true);
                    navigate("/dashboard");
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    }); 
                }
                // localStorage.setItem('logged_in', true);
                // navigate("/dashboard");
            }else{
                toast.warn(response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    hideProgressBar: true,
                });
            }
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.status === 500){
                dispatch(setLogInModalShow(false));
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    hideProgressBar: true,
                }); 
            }
        });
        // localStorage.setItem('logged_in', true);
        // navigate("/dashboard");
        e.preventDefault();
    }

    const changeModal = () => {
        console.log("calling change modal")
        dispatch(setLoginModalStatus(true));
        
    };

    const onForgotPassword = () => {
        dispatch(setForgotPassword(true));
    }

    const closeModal = () => {
        closeLoginModal();
    }
    
    return (
        <div className="px-[22px] font-Rajdhani md:font-montserrat mt-[30px] md:mt-[0]">
            <p className='text-[20px] font-[200] mb-0 font-Rajdhani md:font-montserrat'>Log In</p>
            <div className='flex flex-col md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-[40%]'>
                    <form id="login" autocomplete="off" onSubmit={login}>
                        <input autocomplete="false" name="hidden" type="text" className='hidden' />
                        <div className="mb-[8px] md:mt-0 mt-[10px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                            <input type="email" value={email} placeholder="Enter Your email" className='w-full px-[20px] py-[13px] md:py-[19px] text-[15px] font-[200] rounded-[10px] md:text-center text-left md:h-[66px] focus:outline-[#449552]' autocomplete="false" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="md:mt-0 mt-[20px] shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px]">
                            <input type="password" autocomplete="false" placeholder="Enter Your password"  value={password} className='w-full px-[20px] py-[13px] md:py-[19px] text-left md:text-center text-[15px] font-[200] rounded-[10px] md:h-[66px] focus:outline-[#449552]' onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className="flex justify-between items-center md:mt-0 mt-[2vh]">
                            <label htmlFor="forgetpassoword" onClick={onForgotPassword} className="font-Rajdhani text-[#1E9E39] font-[600] text-[15px] cursor-pointer">Forgot Password?</label>
                            <button type="submit" form="login" className='flex tex-center justify-center items-center md:hidden bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] w-[170px] hover:bg-opacity-70 transition duration-300 font-Rajdhani shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Login</button>
                        </div>
                    </form>
                </div>
                <div className='w-[20%] text-center'>
                    <p className='text-[20px] mb-0 md:mt-0 mt-[2vh] text-[#4B4B4B]'>or</p>
                </div>

                <div className='w-full md:mt-0 mt-[2vh] md:w-[40%]'>
                    <button onClick={changeModal} className='w-full items-center bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[17px] px-[40px] hover:bg-opacity-70 transition duration-300 font-Rajdhani shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Sign up for free</button>
                </div>

                <div className='md:hidden block w-full md:mt-0 mt-[2vh] md:w-[40%]'>
                    <button onClick={closeModal} className='w-full items-center bg-[#449552] border-[2px] border-[#449552] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[17px] px-[40px] hover:bg-opacity-70 transition duration-300 font-Rajdhani shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Cancel</button>
                </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
                <button type="submit" form="login" className='items-center bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] w-[210px] mb-[42px] font-Rajdhani hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)] shadow-[0px_4px_4px_rgb(0,0,0,0.25)]'>Login</button>
            </div>
        </div>
    )
}

export default Login