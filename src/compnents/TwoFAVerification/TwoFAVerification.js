import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogInModalShow, setTwoFAVerification } from '../../store/action'

const TwoFAVerification = ({closeTwoFAModal}) => {
    const [image, setImage] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=> {
        const user_id = Number(localStorage.getItem('user_id'));
        const access_token = localStorage.getItem('access_token');
        const data = {"user_id": user_id, "accessToken": access_token}
        axios.post( process.env.REACT_APP_API_HOST+'api/getQrcode', data)
        .then((res)=>{
            setImage(res.data.url);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[]);
    const checkQRCode = () => {
        const user_id = Number(localStorage.getItem('user_id'));
        const access_token = localStorage.getItem('access_token');
        const data = {"user_id" : user_id, "accessToken": access_token, "code" : code};
        axios.post( process.env.REACT_APP_API_HOST+'api/qrcodeVerify', data)
        .then(async(res)=>{
            if(res.data.result){
                localStorage.setItem('logged_in', true);
                dispatch(setTwoFAVerification(false));
                dispatch(setLogInModalShow(false));
                navigate('/dashboard');
            } else {
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    hideProgressBar: true,
                }); 
            }
        })
        .catch((error)=>{
            toast.error("Error occured while ", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                hideProgressBar: true,
            }); 
        });
    }

    const closeModal = () => {
        closeTwoFAModal();
    }

    return (
        <div className="">

            {/* <img src={image} alt='QRCode'/> */}
            
            <div className="shadow-[0px_0px_34px_rgba(0,0,0,0.15)] rounded-[10px] md:mt-[15px]">
                <input type="text" placeholder="Two-factor authentication code" className="w-full md:w-[366px] py-[13px] pl-[16px] text-[15px] font-[200] rounded-[10px] md:h-[66px] focus:outline-[#449552]" value={code} onChange={e => setCode(e.target.value)} required/>
            </div>

            <div className="w-full md:w-[355px] px-[3px] mt-[8px] text-[11px] font-[300]">
                <p>
                    Two-factor authentication (2FA) is enabled for Your account. Please enter a code to log-in. 
                </p>
            </div>

            <div className="mt-[80px] md:mt-[50px] md:mb-[16px] text-center items-center">
                <button className="bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[13px] font-Rajdhani w-full md:w-[366px] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]" onClick={checkQRCode}>Verify</button>
            </div>
            <div className="md:hidden block mt-[10px] md:mt-[50px] md:mb-[16px] text-center items-center">
                <button className="bg-[#449552] border-[#449552] border-[2px] rounded-[10px] text-[#fff] text-[20px] font-[600] py-[12px] md:py-[13px] font-Rajdhani w-full md:w-[366px] hover:bg-opacity-70 transition duration-300 shadow-[0px_4px_4px_rgb(0,0,0,0.25)]" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}
export default TwoFAVerification;