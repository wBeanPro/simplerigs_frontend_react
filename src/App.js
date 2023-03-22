import React, { useEffect } from 'react';
import { Routes, Route, useSearchParams, useNavigate  } from "react-router-dom";
import "@fontsource/montserrat";
import Landing from './pages/Landing/Landing';

import Dashboard from './pages/Dashboard/Dashboard';
import Referrals from './pages/Referrals/Referrals';
import Deposit from './pages/Deposit/Deposit';
import Withdraw from './pages/Withdraw/Withdraw';
import BitcoinCheck from './pages/BitcoinCheck/BitcoinCheck';
import CreditcardCheck from './pages/CreditcardCheck/CreditcardCheck';
import Company from './pages/Company/Company';
import Terms from './pages/Terms/Terms';
import Faq from './pages/Faq/Faq';
import Profile from './pages/Profile/Profile';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import axios from 'axios';
import {toast} from 'react-toastify';
function App() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const verify = searchParams.get("verify")
	if(verify === 'true'){
		toast.success('Successfully Registered! You can login now.', {
			position: "top-right",
			autoClose: 2000,
			closeOnClick: true,
			hideProgressBar: true,
		}); 
	}
  useEffect(() => {
	const path = window.location.pathname;
	const subPath = path.split('/');
	if(subPath[1] === 'refer'){
		const data = {'referral_code': subPath[2]};
		axios.post(process.env.REACT_APP_API_HOST + 'api/setReferralClick', data)
		.then((response) => {
			if (response.data) {
				localStorage.setItem('referral_code',subPath[2]);
				navigate('/');
			}
		})
		.catch((error) => {
			navigate('/');
		})
	}
	
  },[]);
  return (
    <div className="App overflow-hidden">
		<Routes>
			<Route path="/*" exact element={<Landing/>} />
			<Route path="bitcoincheck" exact element={<BitcoinCheck/>} />
			<Route path="creditcardcheck" exact element={<CreditcardCheck/>} />
			<Route path="dashboard" exact element={<Dashboard/>} />
			<Route path="deposit" exact element={<Deposit/>} />
			<Route path="withdraw" exact element={<Withdraw/>} />
			<Route path="referrals" exact element={<Referrals/>} />
			<Route path="company" exact element={<Company/>} />
			<Route path="faqs" exact element={<Faq/>} />
			<Route path="terms" exact element={<Terms/>} />
			<Route path="profile" exact element={<Profile/>} />
		</Routes>
		<ToastContainer theme="colored" />
    </div>
  );
}

export default App;
