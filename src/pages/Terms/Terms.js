import React, { useState, useEffect } from 'react'
import MobSidebar from '../../compnents/MobSidebar/MobSidebar';
import Sidebar from '../../compnents/Sidebar/Sidebar';
import Navbar from '../../compnents/Navbar/Navbar';
import Footer from '../../compnents/Footer/Footer';
import Logout from '../../compnents/Logout/Logout';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from 'react-redux'
import { getLogoutModal } from '../../store/reducer';
import CheckoutTruck from '../../assets/images/checkout-truck.png'
import MobilePagesBack from '../../assets/images/mobile_pages_back.png';

const Terms = () => {
    const navigate = useNavigate();
    const [MobileSidebar, setMobileSidebar] = useState(false);
    const loginStatus = localStorage.getItem('logged_in');
    const logoutModalStatus = useSelector(state => getLogoutModal(state));
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const user_id = Number(localStorage.getItem('user_id'));
    const access_token = localStorage.getItem('access_token');
    const data = { "user_id": user_id, "accessToken": access_token };

    // const CloseMobSidebar = () => {
    //     setMobileSidebar(!MobileSidebar);
    // };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (user_id) {
            axios.post(process.env.REACT_APP_API_HOST + 'api/getUserInfo', data)
                .then((response) => {
                    if (response.data) {
                        setFirstName(response.data.first_name);
                        setLastName(response.data.last_name);
                        console.log("Got the user's name");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [user_id]);

    const setMobileSidebarShow = () => {
        setMobileSidebar(true);
    }
    const CloseToIcon = () => {
        navigate('/');
    }
    return (
        <>
            {loginStatus ?
                <>
                    <div className="relative bg-no-repeat lg:h-[100vh] dashboard-root-container">
                        <div className='flex lg:flex-row flex-col justify-between pt-[12px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]' >
                            {!MobileSidebar &&
                                <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center space-x-[15px]'>
                                        <AiOutlineMenu className='w-[22px] h-[20px] text-[#000000]' onClick={setMobileSidebarShow} />
                                        <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Terms of use</p>
                                    </div>

                                    <div className='items-center justify-end hover:text-[#429763]'>
                                        <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                            <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                                <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                                <BiUserCircle className='w-[20px] h-[20px]' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }


                            <div className='flex lg:space-x-[24px]'>
                                <div className="sidebar">
                                    <Sidebar />
                                </div>
                                <div className="main-container">
                                    <div className="flex flex-col justify-between dashboard-container lg:h-[93vh]">

                                        <div className="mt-[4vh] ml-[1.8vw]">
                                            <h1 className='text-[28px] lg:text-[1.2vw] font-[500] lg:font-[600] font-Rajdhani lg:font-montserrat mb-[0] text-[#000000]'>Terms of <span className='text-[#449552]'>Use</span></h1>
                                        </div>

                                        <div className='lg:flex flex-col space-y-[1vh] h-full w-full lg:w-[68vw] mt-[2vh] relative bg-[#FFFFFF] bg-[length:100%_100%] bg-opacity-[60%] rounded-[20px] px-[20px] py-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] shadow-[0px_0px_44px_rgba(0,0,0,0.1)] leading-[25px] lg:leading-[3vh] font-Rajdhani lg:font-montserrat text-[22px] lg:text-[0.7vw] text-[#595A5B]'>
                                            <div className='overflow-y-scroll h-[580px] lg:h-[740px]'>
                                                <h6 className='font-bold'>TERMS OF USE</h6>
                                                <br />
                                                <h6 className='font-bold'>Introduction</h6>
                                                <br />
                                                <p className='lowercase'>THESE TERMS OF SERVICE APPLY TO THE USE OF THE SIMPLERIGS.COM CLOUD MINING SERVICE AND SIMPLERIGS WEBSITE LOCATED AT SIMPLERIGS.COM AND ITS SUBDOMAINS. THE WEBSITE AND THE SERVICE ARE THE PROPERTY OF MINING IT LIMITED HONG KONG.</p>
                                                <br />
                                                <p className='lowercase'>THEY SET OUT HOW THE SIMPLERIGS.COM CLOUD HOSTED CRYPTOCURRENCY MINING SERVICE WORKS AND DESCRIBE ANY ASSOCIATED RIGHTS AND RESPONSIBILITIES. THE SIMPLERIGS.COM TERMS OF SERVICE AND ANY INSTRUCTIONS, GUIDANCE AND SIMILAR INFORMATION FOUND ON THE WEBSITE (FROM TIME TO TIME) ALSO APPLY TO HOW YOU USE THE SIMPLERIGS.COM CLOUD MINING SERVICE (TOGETHER THE "AGREEMENT"). BY USING THE WEBSITE AND/OR THE SERVICE, YOU AGREE TO THESE TERMS OF SERVICE; IF YOU DO NOT AGREE, DO NOT USE THE SITE AND/OR THE SERVICE.</p>
                                                <br />
                                                <p className='lowercase'>SIMPLERIGS RESERVES THE RIGHT, AT ITS SOLE DISCRETION, TO AMEND, CHANGE, MODIFY, ADD OR REMOVE PORTIONS OF THESE TERMS OF SERVICE, AT ANY TIME. IT IS YOUR RESPONSIBILITY TO CHECK THESE TERMS PERIODICALLY FOR CHANGES. THE CURRENT VERSION OF THESE TERMS IS AVAILABLE AT HTTPS://SIMPLERIGS.COM/TERMS. YOUR CONTINUED USE OF THE WEBSITE AND/OR THE SERVICE FOLLOWING THE PUBLISHED UPDATES TO THE TERMS WILL MEAN THAT YOU ACCEPT AND AGREE TO THE CHANGES. AS LONG AS YOU AGREE AND COMPLY WITH THESE TERMS, SIMPLERIGS GRANTS YOU A PERSONAL, NON- EXCLUSIVE, NON-TRANSFERABLE, LIMITED PRIVILEGE TO ENTER AND USE THE WEBSITE AND THE SERVICE.</p><br />

                                                <p className='lowercase'>CLOUD MINING INVOLVES FINANCIAL RISKS AND MAY NOT BE APPROPRIATE FOR ALL PEOPLE. ANY INVESTMENT DECISIONS THAT YOU MAKE ARE SOLELY YOUR RESPONSIBILITY</p><br />

                                                <h6 className='font-bold'>1. ABOUT THE SERVICE, THE WEBSITE AND THESE TERMS OF SERVICE</h6><br />

                                                <p className='mb-[25px]'>1.1. This is an agreement (referred to as "Terms") between MINING IT LIMITED - CR No.: 2576021 Rm 1408, 14/F, 248 Queen’s Rd E Wan Chai, Hong Kong (also referred to in these Terms as "Simplerigs", "we", "us" or "our") and you (also referred to in these Terms as "Customer", "you", "your"), the person accessing and using the Simplerigs.com cloud mining service and accepting these Terms.
                                                    <br /><br /> 1.2. In these Terms:
                                                    <br /><br /> 1.2.1. a reference to "Cryptocurrency", "Cryptocurrencies" is a reference to the distributed, decentralised peer-to- peer digital currencies:
                                                    <br /><br /> 1.2.1.1. "Bitcoins" is a reference to a Cryptocurrency known as Bitcoin;
                                                    <br /><br /> 1.2.1.2. "Altcoins" is a reference to all Cryptocurrencies other than Bitcoin, such as Litecoin;
                                                    <br /><br /> 1.2.2. "Miners" are individuals who register to mine Bitcoins and/or Altcoins with a Cloud Machine. If you successfully apply to administer a Cloud Machine, you will be a Miner;
                                                    <br /><br /> 1.2.3. a "Mining Pool" is an organised association of Cryptocurrencies miners. The members of these associations work together to mine Cryptocurrencies and those Cryptocurrencies are distributed amongst the membership based on the contribution made to the mining by each member;
                                                    <br /><br /> 1.2.4. the "Mining Hardware" is the computer hardware, not owned but used as a source of mining efficiency and costs calculation by SIMPLERIGS;
                                                    <br /><br /> 1.2.5. "Hashrate" or "Hash rate" is the mining power of the Mining Hardware used to mine Cryptocurrencies. Hashrate is mining algorithm specific (SHA-256, Scrypt, X11 etc);
                                                    <br /><br /> 1.2.6. "Cloud Machine" is the virtual mining power of the Service purchased by a Miner and administered by a Miner using the Website. “Cloud Machine” is a derivative of a real mining machine;
                                                    <br /><br /> 1.2.7. "Service" is Simplerigs contract, which enables individuals to virtually mine Cryptocurrencies for themselves. Simplerigs contract performance is deriving from Mining Hardware efficiency and costs. Simplerigs “Service” in no way should be considered as a purchase of real mining equipment;
                                                    <br /><br /> 1.2.8. the "Support" or "Customer Support" or "Helpdesk" is the technical support service of Simplerigs that is provided via email/ticket system, available in the Simplerigs FAQ at http://Simplerigs.com/faq where Customers can find answers to general questions and request assistance by submitting a request;
                                                    <br /><br /> 1.2.9. the "Dashboard" is the graphical user interface of the Service, with which the Miner interacts to perform all actions related to the Service;
                                                    <br /><br /> 1.2.10. the "Website" is Simplerigs.com and any apps, software, emails or other websites which we use to provide the services of Simplerigs.com (which includes the Service);
                                                    <br /><br /> 1.2.11. a "Payout" is the periodic deposit to your Balance, dependent on your Cloud Machine. Simplerigs may change the periodicity of Payouts at any time, to a maximum of once per 24 hours;
                                                    <br /><br /> 1.2.12. "Fees" are maintenance and electricity fees, charged daily from the Balance;
                                                    <br /><br /> 1.2.13. "Account" is your personal access to the Service, described further in section 6;
                                                    <br /><br /> 1.2.14. "Balance" is your personal Account balance;
                                                    <br /><br /> 1.2.15. a "Contract" is the access to a Cloud Machine of specific Hash rate;
                                                    <br /><br /> 1.2.16. a "Contract Term" is the period of time for which a Miner has agreed to pay to administer a Cloud Machine, by default, Simplerigs provides 1-year contracts, unless stated otherwise;
                                                    <br /><br /> 1.2.17. "Hold" is the state an Account can be placed in that prevents the said Account to make any withdrawals, used as a security measure;
                                                    <br /><br /> 1.2.18. a "Pre-order" is a Contract with a start date in the future. Start date is estimated and is subject to change;
                                                    <br /><br /> 1.2.19. the "Referral Program" or "Partner Program" is the functionality that allows a Customer to receive financial rewards for Contracts purchased by other Customers;
                                                    <br /><br /> 1.2.20. a "Referral Code" is an alphanumerical sequence (at least 6 characters long) that is linked to a Customer's Account;
                                                    <br /><br /> 1.2.21. a "Referral Link" is the URL with a Referral Code, that allows a new Customer to register with Simplerigs;
                                                    <br /><br /> 1.2.22. a "Referral" is a Customer who registered by using another Customer's Referral Link;
                                                    <br /><br /> 1.2.23. a "Referrer" is a Customer who had another Customer register using their Referral Link;
                                                    <br /><br /> 1.2.24. a "Referral Purchase" or "Referred Purchase" is a purchase made by a Referral;
                                                    <br /><br /> 1.2.25. a "Referral Bonus" is the reward a Referrer receives for a Referral Purchase;
                                                    <br /><br /> 1.2.26. an "Affiliate Network" is a third-party website that allows any person (with or without a Simplerigs Account) to receive financial rewards for Simplerigs Contracts purchased by referred Customers.
                                                    <br /><br /> 1.3. These Terms apply to any mining you undertake by using the Service and Website and they form a legal agreement between you and Simplerigs on the acceptance of you application for an Account (as set out below).
                                                    <br /><br /> 1.4. If there is ever a conflict between these terms of service and the Simplerigs terms of use or the instructions, guidance and similar information found on the Website, these terms of service will take priority.
                                                    <br /><br /> 1.5. IT IS NOT POSSIBLE FOR US TO STATE DEFINITIVELY HOW MANY BITCOIN, LITECOIN AND/OR ANY OTHER CRYPTOCURRENCY UNITS WILL BE MINED BY ANY MINER AND/OR SPECIFIC CLOUD MACHINE.
                                                    <br /><br /> 1.6. By applying to register as a Miner you are confirming that you understand and accept (and are able to understand and accept) these terms of service and that you agree that you will be bound by them. You should regularly check the Website for changes to the terms of service, instructions, guidance and similar information found on the Website.
                                                    <br /><br /> 1.7. You may only apply to register as a Miner if:
                                                    <br /><br /> 1.7.1. You are 18 years old or over; and
                                                    <br /><br /> 1.7.2. It is lawful for you to do so.
                                                    <br /><br /> 1.8. To register as a Miner, we may require you to provide us with identification or other documentation in order to help us prevent fraud or money laundering. This may include photographic identification and a recent proof of address. We may also undertake our own identity, fraud and credit checks.
                                                    <br /><br /> 1.9. It is forbidden for Miners to visit the Website or use the Service through anonymous proxies (such as Tor) and other services or technologies that hide the real internet connection of the user.
                                                </p>

                                                <h6 className='font-bold'>2. RISK NOTICE</h6><br />
                                                <p>2.1. Actions with Cryptocurrencies carry inherent risks. Due to the fact that Cryptocurrencies are unregulated and decentralised, their value is not insured by any legal entities. The value of any Contract, any amount of any Cryptocurrency is subject to change by Simplerigs due to a number of factors out of Simplerigs’ control. These factors include but are not limited to changes of mining difficulty and/or other mining parameters/properties, fluctuating price (in fiat currency to Cryptocurrency exchange rate, such as USD/BTC) of Cryptocurrencies. You understand and agree that the worth of any Contact and any amount of mined Cryptocurrency may lose all worth at any moment of time due to the nature of Cryptocurrencies. You understand that you are solely responsible for management of the Cryptocurrencies in your balance as well as any losses or charges incurred by any third-party entity.
                                                    <br /><br /> 2.2. Any information related to Cryptocurrency and Cryptocurrency mining that is/was posted, published and/or provided by Simplerigs via any channel of communication (including but not limited to: on the Website, in the Dashboard, via the Support Service, via Email newsletter, in social media) is subject to change.
                                                </p>
                                                <h6 className='font-bold'>3. CRYPTOCURRENCIES</h6><br />
                                                <p>3.1. You must not mine, buy, sell, exchange, hold, own or otherwise use or exploit Cryptocurrencies in any way which is prohibited by the laws or regulations which apply to you.
                                                    <br /><br /> 3.2. Cryptocurrencies may not be appropriate for everyone. Before mining any Cryptocurrencies you should learn about them to ensure that they are appropriate for you. Like all currencies, there are disadvantages to using Cryptocurrencies. Some of the risks particular to Cryptocurrencies include:
                                                    <br /><br /> 3.2.1. Currency fluctuation - the price of Bitcoin and/or any other Cryptocurrency may fall sharply and may even fall to zero;
                                                    <br /><br /> 3.2.2. Transactions with Cryptocurrencies may be unconfirmed for a period of time. Although very unlikely, some Cryptocurrency transactions may never be confirmed - Cryptocurrency transactions which are unconfirmed are not completed;
                                                    <br /><br /> 3.2.3. Transactions with Cryptocurrencies are irreversible - if you send any amount of any Cryptocurrency to the wrong person, you may be unable to recover those funds;
                                                    <br /><br /> 3.2.4. Cryptocurrencies may be lost if you lose or forget any PINs or passwords necessary to access and spend those Cryptocurrencies;
                                                    <br /><br /> 3.2.5. unknown technical defects inherent in Cryptocurrencies; and
                                                    <br /><br /> 3.2.6. new regulation which impacts the use of Cryptocurrencies.
                                                    <br /><br /> 3.3. By agreeing to these terms of service or by mining Cryptocurrencies by using the Service, you are indicating that you understand, are capable of understanding and accept the risks associated with Cryptocurrencies.
                                                </p>
                                                <h6 className='font-bold'>4. REGISTRATION</h6><br />
                                                <p>4.1. By applying to register, you are making an offer to enter an agreement on these terms of service. Once submitted, you may not withdraw your offer.
                                                    <br /><br /> 4.2. Only we can decide whether applications will be accepted. If your application is accepted, a legal and enforceable agreement will be entered between you and us. Subject to any statutory rights you may have, you may not cancel the agreement covered by these terms of service and you will not be eligible for any refund.
                                                </p>
                                                <h6 className='font-bold'>5. CONTRACT TERM AND MINING TERM</h6><br />
                                                <p>5.1. These Terms of Service are valid indefinitely, even after Account termination.
                                                    <br /><br /> 5.2. The Contract Term for Simplerigs.com Cloud Machines is 1 year by default, unless stated otherwise. The Contract is valid while profitable, until expired or until terminated (refer to section 13), whichever comes first.
                                                    <br /><br /> 5.3. Contracts with a stated expiry date will end on the date of expiry and the Cloud Machine is stopped.
                                                    <br /><br /> 5.4. Pre-order Contracts that are not activated immediately on purchase will activate on the stated date.
                                                    <br /><br /> 5.5. The Mining process continues until said mining is profitable. This means the Mining process will stop if the Maintenance and Electricity Fees will become larger than the Payout. If mining remains unprofitable for 21 consecutive days the Service is permanently terminated (Hashrate type specific). During the consecutive 21 day period, Payouts will also be temporarily stopped. If during the suspension period, the Contract- related mining factors (such as the exchange rate and mining difficulty) that are outside of Simplerigs control will change favourably, making mining profitable again, the Service will be unsuspended and contracts reactivated. Initial cost is refunded after contract ends.
                                                    <br /><br /> 5.6. Simplerigs reserves the right to change the launch date, Contract Term and/or Mining Term of any Contract.
                                                </p>
                                                <h6 className='font-bold'>6. ACCOUNT</h6><br />
                                                <p>6.1. To register you will need to submit some personal information, a valid email address (that will be used as Username and for user identification) for your Website account ("Account"), a password ("Password"). To be able to withdraw funds you will need to enter at least one wallet for the Cryptocurrency you are mining. The Account may allow you to add more than one Cryptocurrency wallet.
                                                    <br /><br /> 6.2. You must ensure that all information about you that is held by us is true, complete, not misleading and up to date.
                                                    <br /><br /> 6.3. The Username and Password will be allocated to you if you successfully apply for registration as a Miner.
                                                    <br /><br /> 6.4. You will need your Username and Password to access some parts of the Website. Your Username and Password are personal to you and must not be disclosed to any other person.
                                                    <br /><br /> 6.5. The number of accounts is limited to 1 for each beneficiary.
                                                    <br /><br /> 6.6. When you register, you may submit an order to administer a Cloud Machine. This order will allow you to specify the processing power of the Cloud Machine. Only Simplerigs can decide whether orders will be successful and acceptance is subject to availability, amongst other things.
                                                    <br /><br /> 6.7. Your order is a request to acquire a Contract from us and does not represent a formed contract. If we accept your order, we will associate your Contract with your Account. Until then, an order is considered pending and Simplerigs reserves the right to decline your payment.
                                                    <br /><br /> 6.8. Subject to the payment of any fees which may be applied, Miners will be able to receive Cryptocurrencies on the basis of the processing power of the Cloud Machine and the period of time for which the Cloud Machine is mining. Miners will only be able to administer the Cloud Machine during the Contract Term. Those Cryptocurrencies will be transferred to your wallet upon your request, if such request is confirmed.
                                                    <br /><br /> 6.9. If you lose access to your Account, Simplerigs may ask you to provide certain types of data, including personally identifiable information, to determine ownership of the Account. This may include, but is not limited to: proof of identity; proof of residence; proof of telephone number/email ownership and any identifiable activity on the Website, such as transaction IDs, order numbers, withdrawal amounts and others.
                                                </p>
                                                <h6 className='font-bold'>7. USE OF YOUR ACCOUNT</h6><br />
                                                <p>7.1. You may only mine Cryptocurrencies for your own benefit. By using the Website and/or the Service you confirm that you are not acting for the benefit of any other person or entity.
                                                    <br /><br /> 7.2. We are entitled to assume that any use of your Account is made by you. You are solely responsible and liable for any use of the Website or the Service under your Account or any other use of your Username and Password.
                                                    <br /><br /> 7.3. You may only hold one Account. If you forget your Username or Password, you can use the password recovery option or contact Support.
                                                    <br /><br /> 7.4. DO NOT SHARE YOUR PASSWORD WITH ANY OTHER PERSON OR ALLOW ANY OTHER PERSON TO USE YOUR ACCOUNT. WE ARE NOT LIABLE FOR ANY IMPROPER USE OF YOUR PASSWORD OR ACCOUNT BY YOU OR ANY OTHER PERSON. IF YOU HAVE REASONS TO ASSUME THAT ANY OTHER PERSON KNOWS YOUR PASSWORD, OR THAT YOUR ACCOUNT HAS BEEN USED BY ANY OTHER PERSON, YOU MUST INFORM US IMMEDIATELY.
                                                    <br /><br /> 7.5. If you do not log into your Account for 12 months, we may terminate the Account. You will be, if possible, notified in advance. If we are unable to contact you, or you do not take any action to prevent account termination, your Balance will be nullified.
                                                </p>
                                                <h6 className='font-bold'>8. RESTRICTIONS AND OBLIGATIONS</h6><br />
                                                <p>8.1. You agree to comply with all applicable laws and regulations, these terms of service and all rules applicable to the use of the Website and the Service.
                                                    <br /><br /> 8.2. You agree not to falsely describe or otherwise misrepresent yourself in any dealings with Simplerigs.
                                                    <br /><br /> 8.3. You are not allowed to abuse any campaigns, discounts, referral bonuses and/or referral systems, provided from time to time by Simplerigs and/or its partners.
                                                    <br /><br /> 8.4. You are not allowed to use any means to mask your internet traffic and IP address (such as Proxy, Tor, VPN and others).
                                                    <br /><br /> 8.5. Multi-Level Marketing (MLM) and/or High-Yield Investment Projects (HYIP) systems are forbidden from providing any services to their users or partners based on Simplerigs and/or Simplerigs, including but not limited to Simplerigs and/or Simplerigs Products and/or Services.
                                                    <br /><br /> 8.6. You are strictly forbidden to use or exploit errors in design of the Website, the Service and/or all and any of their parts, features which have not been documented, and/or "program bugs" for commercial/personal gain or as means to disrupt and/or destabilise the Service and/or the Website. If you encounter such an error by accident, you are required to report your findings to support@simplerigs.com.
                                                </p>
                                                <h6 className='font-bold'>9. ADMINISTRATION OF MINING</h6><br />
                                                <p>9.1. During the Contract Term you can use the Website to:
                                                    <br /><br /> 9.1.1. amend or update your registration and contact details;
                                                    <br /><br /> 9.1.2. with the help of customer support deactivate or reactivate your Account as well as terminate an active Contract;
                                                    <br /><br /> 9.1.3. with the help of customer support change the login email address;
                                                    <br /><br /> 9.1.4. change some parameters of the mining of your Cloud Machine;
                                                    <br /><br /> 9.1.5. change your cryptocurrency-specific wallet addresses.
                                                    <br /><br /> 9.2. Subject to payment and additional Fees in advance, you can use the Website to:
                                                    <br /><br /> 9.2.1. add a new Cloud Machine;
                                                    <br /><br /> 9.2.2. increase the processing power of your Cloud Machine.
                                                </p>
                                                <h6 className='font-bold'>10. BALANCE</h6><br />
                                                <p>10.1. Your Balance in the Dashboard is your personal amount of funds available to use.
                                                    <br /><br /> 10.2. The Service may have multiple Balances. Currently available balances are:
                                                    <br /><br /> 10.2.1. BTC Balance is measured in BTC (Bitcoins), accurate to 0.00000001 BTC (1 satoshi, the minimum indivisible amount of BTC);
                                                    <br /><br /> 10.3. Other Cryptocurrency Balances may be introduced and/or removed at any time.
                                                    <br /><br /> 10.4. Funds mined will be transmitted directly to your Balance. This may take up to 24 hours from the date the coins are generated.
                                                    <br /><br /> 10.5. Balance can be used in the following ways:
                                                    <br /><br /> 10.5.1. You are able to withdraw your balance at any time if it meets the minimum requirement, unless stated otherwise (subject to change).
                                                    <br /><br /> 10.5.2. You are able to purchase additional Contract(s) for the Cloud Machine(s) to increase your total Hashrate.
                                                    <br /><br /> 10.6. Simplerigs reserves the right to make retroactive recalculations to Balance(s), Cloud Machines, Hash rate and logs, including but not limited to, in the case of any error occurring in the Service, to correct any mistakes or discrepancies.
                                                    <br /><br /> 10.7. Balance may be negative. In such case, the Balance must become positive above the minimum requirement before any withdrawals and/or purchases can be made using it.
                                                </p>
                                                <h6 className='font-bold'>11. FEES</h6><br />
                                                <p>11.1. We provide a platform which enables individuals to mine cryptocurrencies using cloud Machine. In return, we charge periodic maintenance and electricity fees ("Fees") that are deriving from the usage of electricity as well as the cost of maintenance of the Mining equipment. The maintenance costs of running the equipment include but are not limited to: hardware setup, data center rent, Mining Pool testing, staff salaries, future planning and proofing, software development, exchange of used and out of order parts and other expenditures required to render the service on a best-effort basis. Some Contract types are not subject to periodic Fees. The presence and specification of Fees for each Contract type can always be seen on the Website.
                                                    <br /><br /> 11.2. Simplerigs reserves the right to change the fees at any time without prior notice.
                                                </p>
                                                <h6 className='font-bold'>12. LIABILITY</h6><br />
                                                <p>12.1. We provide and maintain the Website and the Service on an "AS IS" and "AS AVAILABLE" basis and we are liable only to provide our services with reasonable skill and care.
                                                    <br /><br /> 12.2. We give no other warranty in connection with the Website or the Service and we disclaim all liability for:
                                                    <br /><br /> 12.2.1. to the extent allowed by these Terms and without affecting any other clauses within Section 12, that may apply, accuracy, currency or validity of information and material contained within and/or provided by the Website, the Dashboard, the Support Service, in email newsletters and social media. You hereby agree, that no radio, computer and internet communication equipment is completely free of fault, occasional technical disruptions may affect the service and so can human error, which may result in misrepresentation of content or miscommunication;
                                                    <br /><br /> 12.2.2. any change in the exchange rate of Bitcoins or any other Cryptocurrency;
                                                    <br /><br /> 12.2.3. any change in the difficulty of mining;
                                                    <br /><br /> 12.2.4. any changes in applicable law or regulation, or the acts of any legislator or regulator in any part of the world;
                                                    <br /><br /> 12.2.5. any interruptions to or error of the Website or the Service or other communications network;
                                                    <br /><br /> 12.2.6. the infringement by any other person of any copyright or other intellectual property rights of any third party through any User Content or use of the Website or the Service;
                                                    <br /><br /> 12.2.7. the availability, quality, content or nature of External Sites;
                                                    <br /><br /> 12.2.8. any amount or kind of loss or damage due to viruses or other malicious software that may infect a user's computer equipment, software, data or other property caused by any other person accessing, using or downloading the Website, the Service or any User Content; and
                                                    <br /><br /> 12.2.9. all representations, warranties, conditions and other terms and conditions which, but for this notice, would have effect.
                                                    <br /><br /> 12.3. We will not be liable in any amount for failure to perform any obligation under these terms of service if that failure is caused by the occurrence of an event beyond our reasonable control.
                                                    <br /><br /> 12.4. Except as provided above there are no other warranties, conditions or other terms and conditions, express or implied, statutory or otherwise, and all of those terms and conditions are hereby excluded to the maximum extent permitted by law.
                                                    <br /><br /> 12.5. To the maximum extent permitted by law, we exclude liability for any losses or damages which you may suffer, whether the same are suffered directly or indirectly or are immediate or consequential, which fall within any of the following categories:
                                                    <br /><br /> 12.5.1. special damage even though that party was aware of the circumstances in which such special damage could arise;
                                                    <br /><br /> 12.5.2. loss of anticipated savings;
                                                    <br /><br /> 12.5.3. loss of business opportunity and management time;
                                                    <br /><br /> 12.5.4. loss of goodwill;
                                                    <br /><br /> 12.5.5. loss of Cryptocurrency arising as a result of any of your acts or omissions of those of any third party;
                                                    <br /><br /> 12.5.5.1. loss arising out of or in connection with:
                                                    <br /><br /> 12.5.5.2. any defect or insecurity in any systems you use to store or transmit Cryptocurrency or to access or use the Website or the Service ;
                                                    <br /><br /> 12.5.5.3. any inaccurate or incomplete information you provide, including Cryptocurrency wallet addresses;
                                                    <br /><br /> 12.5.5.4. any changes to the amount of Cryptocurrency awarded to Miners;
                                                    <br /><br /> 12.5.5.5. any changes to the regulatory, legislative or technical environment applicable to Cryptocurrencies;
                                                    <br /><br /> 12.5.5.6. the acts or omissions of any bank or provider of banking services; or
                                                    <br /><br /> 12.5.5.7. any change in the value of Cryptocurrency howsoever arising (including as a result of the acts or omissions of Simplerigs).
                                                    <br /><br /> 12.6. To the maximum extent permitted by law, our aggregate liability in respect of any claims made in connection with or arising out of the use of the Website or the Service (whether in contract, tort (including negligence), breach of statutory duty, or otherwise) for direct losses will be limited to the Fees.
                                                    <br /><br /> 12.7. You agree not to use the Website or the Service in any way which:
                                                    <br /><br /> 12.7.1. is unlawful;
                                                    <br /><br /> 12.7.2. may give rise to civil or criminal liability for Simplerigs; or
                                                    <br /><br /> 12.7.3. may bring Simplerigs into disrepute.
                                                    <br /><br /> 12.8. You hereby agree to indemnify, defend and hold us and our officers, directors, owners, agents, information providers, affiliates, licensors and licensees (collectively, the "Indemnified Parties") harmless from and against any and all liability and costs (including reasonable legal fees) incurred by the Indemnified Parties in connection with any claim arising out of:
                                                    <br /><br /> 12.8.1. any fraud or fraudulent misrepresentation you commit;
                                                    <br /><br /> 12.8.2. any inaccuracy or defect of any of the information you have provided to us;
                                                    <br /><br /> 12.8.3. any breach of applicable law or regulation you commit;
                                                    <br /><br /> 12.8.4. any other person’s use of your Account;
                                                    <br /><br /> 12.8.5. any breach by you of these terms of service; and
                                                    <br /><br /> 12.8.6. third party claims arising from your use of the Website or the Service, any of Your Content or any use of your Account (whether or not such use was by you).
                                                    <br /><br /> 12.9. You shall cooperate with us in the defence of any claim. We reserve the right, at our own expense, to assume the exclusive defence and control of any matter otherwise subject to indemnification by you.
                                                </p>
                                                <h6 className='font-bold'>13. BREACH, SUSPENSION AND TERMINATION</h6><br />
                                                <p>13.1. Without limiting any other rights we have, we may suspend or terminate access to your Account, the Website and/or the Service, nullify your Account Balance and/or hold the ability to withdraw mined funds if you breach any of these Terms of Service.
                                                    <br /><br /> 13.2. If we have grounds to suspect that you are using the Website or the Service fraudulently or improperly, we will suspend your Account until you are able to demonstrate to our satisfaction:
                                                    <br /><br /> 13.2.1. your identity; and
                                                    <br /><br /> 13.2.2. that no fraud or impropriety has occurred or been attempted.
                                                    <br /><br /> 13.3. We will try to give you reasonable notice of any anticipated termination of the Website or the Service.
                                                    <br /><br /> 13.4. If you become aware of or suspect another user or Miner's breach of these terms of service, or any fraud or impropriety by another user, you must contact us immediately.
                                                    <br /><br /> 13.5. In case of any Credit Card purchase (refer to section 14.5.4.) Simplerigs has the right to place the Customer's Account on Hold (hold the ability to withdraw any mined funds from the Customer's Account Balance) for a period of up to 30 days as a security measure of anti-fraud related regulations and policies.
                                                </p>
                                                <h6 className='font-bold'>14. PAYMENT TERMS, ORDER CANCELLATION, ORDER CHANGES AND ORDER REFUNDS</h6><br />
                                                <p>14.1. All invoices are issued in USD (United States dollar) by default. Payments performed in any other currency must account for the exchange rate of said currency to USD at the moment of invoice generation and any commissions for currency exchange.
                                                    <br /><br /> 14.1.1. The Client will receive the original deposit back 365 days after the deposit is made. USD will be converted to Bitcoin at the end of the contract and will be refunded back to the Client’s Bitcoin wallet of choice.
                                                    <br /><br /> 14.2. A Customer is able to purchase a Contract using a variety of payment methods
                                                    <br /><br /> 14.3. A Customer has the right not to pay for the order in case the order has been created but not yet paid, if the Customer decides not to complete the order. The order will be expired after a given period of time (dependent on the payment method) and the Customer will not be obliged to proceed with the order. Simplerigs will not process requests to cancel unpaid orders, as it is intended the unpaid orders will be expired.
                                                    <br /><br /> 14.4. A Customer is solely responsible for the accuracy of payment, including but not limited to: the destination account, transferable amount and payment details:
                                                    <br /><br /> 14.4.1. If the transferred amount is below requested, Simplerigs reserves the right, at its sole discretion, to adjust the Contract accordingly to received funds or request the missing amount to be paid, before activating the Contract.
                                                    <br /><br /> 14.4.2. If the transferred amount is above requested, Simplerigs reserves the right, at its sole discretion, to adjust the Contract accordingly to received funds, add the excessive amount to Customer's Account Balance or return the excessive amount through the payment system the Customer has used to pay for the order initially.
                                                    <br /><br /> 14.4.3. If the Customer initiates the payment with incorrect/insufficient details and/or to the wrong destination account, Simplerigs will attempt, if possible, to process the order in a timely matter. If the destination address does not belong to Simplerigs (directly or via a third-party service) and/or is not related to Simplerigs in any way, Simplerigs will not be held responsible and will decline any claims.
                                                    <br /><br /> 14.4.4. Simplerigs is not obliged to proactively resolve payment related issues without a claim submitted by the Customer.
                                                    <br /><br /> 14.5. In case of payment related issues a claim must be raised:
                                                    <br /><br /> 14.5.1. A Customer has the right to raise a payment related claim/dispute by contacting support within 14 days from the creation of payment with proof of payment. Requests submitted after 14 days may not be processed.
                                                    <br /><br /> 14.5.2. Simplerigs reserves the right to request proof of payment, if there are suspicions or facts the payment was not received but the Contract was activated. The Customer is obliged to provide proof of payment within 14 days of reception of such request.
                                                    <br /><br /> 14.5.3. Proof of payment includes but is not limited to: Simplerigs order number, transaction ID or number, destination account, transferred amount, account statement from the payment system used.
                                                    <br /><br /> 14.5.4. Credit Card purchases may require proof of ownership of the payment method and an identification request.
                                                    <br /><br /> 14.5.5. If proof of payment is not provided within 14 days or provided proof is deemed insufficient and/or invalid:
                                                    <br /><br /> 14.5.5.1. if the claim was initiated by a Customer: Simplerigs reserves the right to decline Customer's claim(s);
                                                    <br /><br /> 14.5.5.2. if the claim was initiated by Simplerigs: Simplerigs reserves the right to adjust/cancel related Contracts and adjust Customer's Account Balance by amounts mined by related Contract.
                                                    <br /><br /> 14.6. Unless otherwise provided by law or by a particular offer, all purchases are final and non-refundable. Simplerigs reserves the right to issue refunds at Simplerigs sole discretion. If we issue a refund, we are under no obligation to issue the same or similar refund in the future. This refund policy does not affect any statutory rights that may apply.
                                                    <br /><br /> 14.7. In the case of a refund:
                                                    <br /><br /> 14.8.1. Customer will receive a reimbursement of spent funds to start the service, unless any funds were withdrawn from Customer's Account Balance. If any amount was successfully withdrawn from the Account Balance, no refund requests will be processed on said Account.
                                                    <br /><br /> 14.9.2. Simplerigs has the right to nullify or deduct any Hashrate and/or funds mined by the Hashrate of the refunded purchase from the Customer's Account Balance as well as any funds provided as a Referral Bonus for the refunded purchase from the Referrer's Account Balance.
                                                    <br /><br /> 14.9.3. Simplerigs is not obliged to reimburse any funds spent for the Maintenance and Electricity Fees.
                                                </p>
                                                <h6 className='font-bold'>15. COMMUNICATIONS</h6><br />
                                                <p>15.1. The Website may enable the display of third party content ("User Content").
                                                    <br /><br /> 15.2. Although we are not obliged to do so, we may remove or reject any User Content.
                                                    <br /><br /> 15.3. You agree that we may process and store any content you submit to the Website ("Your Content").
                                                    <br /><br /> 15.4. You may be able to send Your Content to other Miners of the Website, and other Miners of the Website may be able to send User Content to you.
                                                    <br /><br /> 15.5. You agree to the distribution of Your Content by us both internally and externally. Therefore, you should ensure that Your Content does not contain information, which you intend to keep confidential or private.
                                                    <br /><br /> 15.6. By making available, posting or transmitting Your Content to the Website, you are granting us a non-exclusive, transferable, sub-licensable, royalty-free, irrevocable, perpetual worldwide license to use and exploit Your Content for any purpose.
                                                    <br /><br /> 15.7. You agree that you are entitled to make available, post or transmit Your Content to the Website.
                                                    <br /><br /> 15.8. You will not make available, post or transmit to the Website any statement, material or other content, nor use the Website in any way, that:
                                                    <br /><br /> 15.8.1. is unlawful or may give rise to civil or criminal liability;
                                                    <br /><br /> 15.8.2. infringes any copyright or other intellectual property rights of any third party;
                                                    <br /><br /> 15.8.3. infringes any third party's rights of privacy or rights of publicity;
                                                    <br /><br /> 15.8.4. includes any computer virus or other malicious software;
                                                    <br /><br /> 15.8.5. is abusive, pornographic, defamatory, discriminatory or obscene;
                                                    <br /><br /> 15.8.6. harasses any other person;
                                                    <br /><br /> 15.8.7. interferes with another user's use and enjoyment of the Website;
                                                    <br /><br /> 15.8.8. impersonates any moderator, administrator or any staff or any other person connected with Simplerigs;
                                                    <br /><br /> 15.8.9. contains the confidential information of any other person;
                                                    <br /><br /> 15.8.10. solicits passwords or personal information;
                                                    <br /><br /> 15.8.11. contains video, photographs, or images of any other person without his or her permission (or in the case of a minor, the minor's legal guardian);
                                                    <br /><br /> 15.8.12. exploits any other person;
                                                    <br /><br /> 15.8.13. we consider inappropriate; or
                                                    <br /><br /> 15.8.14. encourages or provokes any other person to do any of the acts listed above.
                                                    <br /><br /> 15.9. The Website may provide means by which you can communicate with us. We will communicate with you at the email address you have provided or through other means of communication that may be provided by the Website. Notices that are applicable to all our Miners shall be made available on the Website publicly. You will be deemed to have received a notice at the time the email is sent or the time the notice is posted on the Website. We will be deemed to have received a notice when we issue a confirmation to you.
                                                    <br /><br /> 15.10. All emails (or other messages) we send are intended for the addressee only.
                                                </p>
                                                <h6 className='font-bold'>16 . Confidentiality</h6><br />
                                                <p>16.1 The customer should not disclose any information, related to the Company, including but not limited to information on accounts, operations, clients of the Company, accounts opened for the clients, balance and operations on the accounts of clients and any other information related to the clients of the Company and their activity, information on shareholders, managers, employees of the Company, its affiliates, partners and contractors, any agreements concluded between Company and any other party, its projects and products, marketing strategies and plans, financial information and statements, and any other information that should be reasonably recognised as confidential in accordance with applicable legislation.
                                                    <br /><br /> 16.2 In case of forced disclosure of the information listed here above on demand of governmental and regulating authorities, customer shall inform the Company on the day of receiving the appropriate request.
                                                    <br /><br /> 16.3 In case of unauthorised disclosure of the aforementioned information or any other violation of this confidentiality provision by the customer, the Company has the right to terminate the Agreement and to close the account without any prior notices and with immediate effect.
                                                </p>
                                                <h6 className='font-bold'>17. GENERAL</h6><br />
                                                <p>17.1. These terms of service are subject to your statutory and common law consumer rights and will not limit any rights you might have that cannot be excluded under applicable law. These terms of service will not exclude or limit our liability for death or personal injury resulting from our negligence nor any fraudulent acts or representations or for any statutory liability not capable of limitation.
                                                    <br /><br /> 17.2. We may deduct any monies you owe us from any monies we owe you.
                                                    <br /><br /> 17.3. These terms of service, together with the terms of use, privacy policy and any instructions, guidance and similar information found on the Website (from time to time), constitute the entire agreement between you and Simplerigs relating to your use of the Website and the Service and mining through the Website or the Service, to the exclusion of any other terms.
                                                    <br /><br /> 17.4. Our failure to enforce any term does not constitute our waiver of that term.
                                                    <br /><br /> 17.5. If any part of these Terms is found to be unenforceable, it will be amended to the minimum extent necessary to make it enforceable and the remainder of the provisions will remain in full force and effect.
                                                    <br /><br /> 17.6. No representation or warranty is made as to whether the Website or the Service complies with the laws of any jurisdiction other than SAR Hong Kong.
                                                    <br /><br /> 17.7. The parties submit to the exclusive jurisdiction of the SAR Hong Kong courts. These terms of service are subject to and interpreted in accordance with the laws of SAR Hong Kong, provided that these terms of service shall not be interpreted as conferring any statutory EU consumer protection laws, including any rights of withdrawal or cancellation under implementations of Directive 2011/83/EU on consumer rights, on any individual not ordinarily a resident of an EU Member State.
                                                    <br /><br /> 17.8. This Website the Dashboard are presented in multiple languages. In the case of a conflict between translations, the English version will prevail.
                                                    <br /><br /> 17.9. Simplerigs will be entitled to assign and otherwise transfer the agreement covered by these terms of service by giving you reasonable notice, which may include notice given via the Website.
                                                    <br /><br /> 17.10. All questions, comments or complaints should be directed to us via Customer Support and we will try to respond to within 48 hours.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='lg:block hidden items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[10px] font-montserrat text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                        <p className='mb-0'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[1.8vw] h-[2.5vh]' />
                                    </Link>
                                </div>
                            </div>
                            <div className="checkout-truck">
                                <img src={CheckoutTruck} alt="truck" />
                            </div>
                        </div>
                        <img className='lg:hidden block mt-[-45px] bottom-0 left-0 w-[100vw]' alt='Mobile page back' src={MobilePagesBack}/>
                    </div>
                    {logoutModalStatus && <Logout />}
                </>
                :
                <>
                    <div className="lg:block hidden bg-gradient-to-b from-[#CEEBEF] to-[#FED480]">
                        <Navbar />

                        <div className='w-full text-[#595A5B]'>
                            <div className='w-[66%] font-montserrat bg-[#fff] bg-opacity-[60%] rounded-[20px] mt-[66px] ml-[146px] pt-[28px] pr-[44px] pb-[42px] pl-[34px] relative'>
                                <div className='overflow-y-scroll h-[749px]'>
                                    <h6 className='font-bold'>TERMS OF USE</h6>
                                    <br />
                                    <h6 className='font-bold'>Introduction</h6>
                                    <br />
                                    <p className='lowercase'>THESE TERMS OF SERVICE APPLY TO THE USE OF THE SIMPLERIGS.COM CLOUD MINING SERVICE AND SIMPLERIGS WEBSITE LOCATED AT SIMPLERIGS.COM AND ITS SUBDOMAINS. THE WEBSITE AND THE SERVICE ARE THE PROPERTY OF MINING IT LIMITED HONG KONG.</p>
                                    <br />
                                    <p className='lowercase'>THEY SET OUT HOW THE SIMPLERIGS.COM CLOUD HOSTED CRYPTOCURRENCY MINING SERVICE WORKS AND DESCRIBE ANY ASSOCIATED RIGHTS AND RESPONSIBILITIES. THE SIMPLERIGS.COM TERMS OF SERVICE AND ANY INSTRUCTIONS, GUIDANCE AND SIMILAR INFORMATION FOUND ON THE WEBSITE (FROM TIME TO TIME) ALSO APPLY TO HOW YOU USE THE SIMPLERIGS.COM CLOUD MINING SERVICE (TOGETHER THE "AGREEMENT"). BY USING THE WEBSITE AND/OR THE SERVICE, YOU AGREE TO THESE TERMS OF SERVICE; IF YOU DO NOT AGREE, DO NOT USE THE SITE AND/OR THE SERVICE.</p>
                                    <br />
                                    <p className='lowercase'>SIMPLERIGS RESERVES THE RIGHT, AT ITS SOLE DISCRETION, TO AMEND, CHANGE, MODIFY, ADD OR REMOVE PORTIONS OF THESE TERMS OF SERVICE, AT ANY TIME. IT IS YOUR RESPONSIBILITY TO CHECK THESE TERMS PERIODICALLY FOR CHANGES. THE CURRENT VERSION OF THESE TERMS IS AVAILABLE AT HTTPS://SIMPLERIGS.COM/TERMS. YOUR CONTINUED USE OF THE WEBSITE AND/OR THE SERVICE FOLLOWING THE PUBLISHED UPDATES TO THE TERMS WILL MEAN THAT YOU ACCEPT AND AGREE TO THE CHANGES. AS LONG AS YOU AGREE AND COMPLY WITH THESE TERMS, SIMPLERIGS GRANTS YOU A PERSONAL, NON- EXCLUSIVE, NON-TRANSFERABLE, LIMITED PRIVILEGE TO ENTER AND USE THE WEBSITE AND THE SERVICE.</p><br />

                                    <p className='lowercase'>CLOUD MINING INVOLVES FINANCIAL RISKS AND MAY NOT BE APPROPRIATE FOR ALL PEOPLE. ANY INVESTMENT DECISIONS THAT YOU MAKE ARE SOLELY YOUR RESPONSIBILITY</p><br />

                                    <h6 className='font-bold'>1. ABOUT THE SERVICE, THE WEBSITE AND THESE TERMS OF SERVICE</h6><br />

                                    <p className='mb-[25px]'>1.1. This is an agreement (referred to as "Terms") between MINING IT LIMITED - CR No.: 2576021 Rm 1408, 14/F, 248 Queen’s Rd E Wan Chai, Hong Kong (also referred to in these Terms as "Simplerigs", "we", "us" or "our") and you (also referred to in these Terms as "Customer", "you", "your"), the person accessing and using the Simplerigs.com cloud mining service and accepting these Terms.
                                        <br /><br /> 1.2. In these Terms:
                                        <br /><br /> 1.2.1. a reference to "Cryptocurrency", "Cryptocurrencies" is a reference to the distributed, decentralised peer-to- peer digital currencies:
                                        <br /><br /> 1.2.1.1. "Bitcoins" is a reference to a Cryptocurrency known as Bitcoin;
                                        <br /><br /> 1.2.1.2. "Altcoins" is a reference to all Cryptocurrencies other than Bitcoin, such as Litecoin;
                                        <br /><br /> 1.2.2. "Miners" are individuals who register to mine Bitcoins and/or Altcoins with a Cloud Machine. If you successfully apply to administer a Cloud Machine, you will be a Miner;
                                        <br /><br /> 1.2.3. a "Mining Pool" is an organised association of Cryptocurrencies miners. The members of these associations work together to mine Cryptocurrencies and those Cryptocurrencies are distributed amongst the membership based on the contribution made to the mining by each member;
                                        <br /><br /> 1.2.4. the "Mining Hardware" is the computer hardware, not owned but used as a source of mining efficiency and costs calculation by SIMPLERIGS;
                                        <br /><br /> 1.2.5. "Hashrate" or "Hash rate" is the mining power of the Mining Hardware used to mine Cryptocurrencies. Hashrate is mining algorithm specific (SHA-256, Scrypt, X11 etc);
                                        <br /><br /> 1.2.6. "Cloud Machine" is the virtual mining power of the Service purchased by a Miner and administered by a Miner using the Website. “Cloud Machine” is a derivative of a real mining machine;
                                        <br /><br /> 1.2.7. "Service" is Simplerigs contract, which enables individuals to virtually mine Cryptocurrencies for themselves. Simplerigs contract performance is deriving from Mining Hardware efficiency and costs. Simplerigs “Service” in no way should be considered as a purchase of real mining equipment;
                                        <br /><br /> 1.2.8. the "Support" or "Customer Support" or "Helpdesk" is the technical support service of Simplerigs that is provided via email/ticket system, available in the Simplerigs FAQ at http://Simplerigs.com/faq where Customers can find answers to general questions and request assistance by submitting a request;
                                        <br /><br /> 1.2.9. the "Dashboard" is the graphical user interface of the Service, with which the Miner interacts to perform all actions related to the Service;
                                        <br /><br /> 1.2.10. the "Website" is Simplerigs.com and any apps, software, emails or other websites which we use to provide the services of Simplerigs.com (which includes the Service);
                                        <br /><br /> 1.2.11. a "Payout" is the periodic deposit to your Balance, dependent on your Cloud Machine. Simplerigs may change the periodicity of Payouts at any time, to a maximum of once per 24 hours;
                                        <br /><br /> 1.2.12. "Fees" are maintenance and electricity fees, charged daily from the Balance;
                                        <br /><br /> 1.2.13. "Account" is your personal access to the Service, described further in section 6;
                                        <br /><br /> 1.2.14. "Balance" is your personal Account balance;
                                        <br /><br /> 1.2.15. a "Contract" is the access to a Cloud Machine of specific Hash rate;
                                        <br /><br /> 1.2.16. a "Contract Term" is the period of time for which a Miner has agreed to pay to administer a Cloud Machine, by default, Simplerigs provides 1-year contracts, unless stated otherwise;
                                        <br /><br /> 1.2.17. "Hold" is the state an Account can be placed in that prevents the said Account to make any withdrawals, used as a security measure;
                                        <br /><br /> 1.2.18. a "Pre-order" is a Contract with a start date in the future. Start date is estimated and is subject to change;
                                        <br /><br /> 1.2.19. the "Referral Program" or "Partner Program" is the functionality that allows a Customer to receive financial rewards for Contracts purchased by other Customers;
                                        <br /><br /> 1.2.20. a "Referral Code" is an alphanumerical sequence (at least 6 characters long) that is linked to a Customer's Account;
                                        <br /><br /> 1.2.21. a "Referral Link" is the URL with a Referral Code, that allows a new Customer to register with Simplerigs;
                                        <br /><br /> 1.2.22. a "Referral" is a Customer who registered by using another Customer's Referral Link;
                                        <br /><br /> 1.2.23. a "Referrer" is a Customer who had another Customer register using their Referral Link;
                                        <br /><br /> 1.2.24. a "Referral Purchase" or "Referred Purchase" is a purchase made by a Referral;
                                        <br /><br /> 1.2.25. a "Referral Bonus" is the reward a Referrer receives for a Referral Purchase;
                                        <br /><br /> 1.2.26. an "Affiliate Network" is a third-party website that allows any person (with or without a Simplerigs Account) to receive financial rewards for Simplerigs Contracts purchased by referred Customers.
                                        <br /><br /> 1.3. These Terms apply to any mining you undertake by using the Service and Website and they form a legal agreement between you and Simplerigs on the acceptance of you application for an Account (as set out below).
                                        <br /><br /> 1.4. If there is ever a conflict between these terms of service and the Simplerigs terms of use or the instructions, guidance and similar information found on the Website, these terms of service will take priority.
                                        <br /><br /> 1.5. IT IS NOT POSSIBLE FOR US TO STATE DEFINITIVELY HOW MANY BITCOIN, LITECOIN AND/OR ANY OTHER CRYPTOCURRENCY UNITS WILL BE MINED BY ANY MINER AND/OR SPECIFIC CLOUD MACHINE.
                                        <br /><br /> 1.6. By applying to register as a Miner you are confirming that you understand and accept (and are able to understand and accept) these terms of service and that you agree that you will be bound by them. You should regularly check the Website for changes to the terms of service, instructions, guidance and similar information found on the Website.
                                        <br /><br /> 1.7. You may only apply to register as a Miner if:
                                        <br /><br /> 1.7.1. You are 18 years old or over; and
                                        <br /><br /> 1.7.2. It is lawful for you to do so.
                                        <br /><br /> 1.8. To register as a Miner, we may require you to provide us with identification or other documentation in order to help us prevent fraud or money laundering. This may include photographic identification and a recent proof of address. We may also undertake our own identity, fraud and credit checks.
                                        <br /><br /> 1.9. It is forbidden for Miners to visit the Website or use the Service through anonymous proxies (such as Tor) and other services or technologies that hide the real internet connection of the user.
                                    </p>

                                    <h6 className='font-bold'>2. RISK NOTICE</h6><br />
                                    <p>2.1. Actions with Cryptocurrencies carry inherent risks. Due to the fact that Cryptocurrencies are unregulated and decentralised, their value is not insured by any legal entities. The value of any Contract, any amount of any Cryptocurrency is subject to change by Simplerigs due to a number of factors out of Simplerigs’ control. These factors include but are not limited to changes of mining difficulty and/or other mining parameters/properties, fluctuating price (in fiat currency to Cryptocurrency exchange rate, such as USD/BTC) of Cryptocurrencies. You understand and agree that the worth of any Contact and any amount of mined Cryptocurrency may lose all worth at any moment of time due to the nature of Cryptocurrencies. You understand that you are solely responsible for management of the Cryptocurrencies in your balance as well as any losses or charges incurred by any third-party entity.
                                        <br /><br /> 2.2. Any information related to Cryptocurrency and Cryptocurrency mining that is/was posted, published and/or provided by Simplerigs via any channel of communication (including but not limited to: on the Website, in the Dashboard, via the Support Service, via Email newsletter, in social media) is subject to change.
                                    </p>
                                    <h6 className='font-bold'>3. CRYPTOCURRENCIES</h6><br />
                                    <p>3.1. You must not mine, buy, sell, exchange, hold, own or otherwise use or exploit Cryptocurrencies in any way which is prohibited by the laws or regulations which apply to you.
                                        <br /><br /> 3.2. Cryptocurrencies may not be appropriate for everyone. Before mining any Cryptocurrencies you should learn about them to ensure that they are appropriate for you. Like all currencies, there are disadvantages to using Cryptocurrencies. Some of the risks particular to Cryptocurrencies include:
                                        <br /><br /> 3.2.1. Currency fluctuation - the price of Bitcoin and/or any other Cryptocurrency may fall sharply and may even fall to zero;
                                        <br /><br /> 3.2.2. Transactions with Cryptocurrencies may be unconfirmed for a period of time. Although very unlikely, some Cryptocurrency transactions may never be confirmed - Cryptocurrency transactions which are unconfirmed are not completed;
                                        <br /><br /> 3.2.3. Transactions with Cryptocurrencies are irreversible - if you send any amount of any Cryptocurrency to the wrong person, you may be unable to recover those funds;
                                        <br /><br /> 3.2.4. Cryptocurrencies may be lost if you lose or forget any PINs or passwords necessary to access and spend those Cryptocurrencies;
                                        <br /><br /> 3.2.5. unknown technical defects inherent in Cryptocurrencies; and
                                        <br /><br /> 3.2.6. new regulation which impacts the use of Cryptocurrencies.
                                        <br /><br /> 3.3. By agreeing to these terms of service or by mining Cryptocurrencies by using the Service, you are indicating that you understand, are capable of understanding and accept the risks associated with Cryptocurrencies.
                                    </p>
                                    <h6 className='font-bold'>4. REGISTRATION</h6><br />
                                    <p>4.1. By applying to register, you are making an offer to enter an agreement on these terms of service. Once submitted, you may not withdraw your offer.
                                        <br /><br /> 4.2. Only we can decide whether applications will be accepted. If your application is accepted, a legal and enforceable agreement will be entered between you and us. Subject to any statutory rights you may have, you may not cancel the agreement covered by these terms of service and you will not be eligible for any refund.
                                    </p>
                                    <h6 className='font-bold'>5. CONTRACT TERM AND MINING TERM</h6><br />
                                    <p>5.1. These Terms of Service are valid indefinitely, even after Account termination.
                                        <br /><br /> 5.2. The Contract Term for Simplerigs.com Cloud Machines is 1 year by default, unless stated otherwise. The Contract is valid while profitable, until expired or until terminated (refer to section 13), whichever comes first.
                                        <br /><br /> 5.3. Contracts with a stated expiry date will end on the date of expiry and the Cloud Machine is stopped.
                                        <br /><br /> 5.4. Pre-order Contracts that are not activated immediately on purchase will activate on the stated date.
                                        <br /><br /> 5.5. The Mining process continues until said mining is profitable. This means the Mining process will stop if the Maintenance and Electricity Fees will become larger than the Payout. If mining remains unprofitable for 21 consecutive days the Service is permanently terminated (Hashrate type specific). During the consecutive 21 day period, Payouts will also be temporarily stopped. If during the suspension period, the Contract- related mining factors (such as the exchange rate and mining difficulty) that are outside of Simplerigs control will change favourably, making mining profitable again, the Service will be unsuspended and contracts reactivated. Initial cost is refunded after contract ends.
                                        <br /><br /> 5.6. Simplerigs reserves the right to change the launch date, Contract Term and/or Mining Term of any Contract.
                                    </p>
                                    <h6 className='font-bold'>6. ACCOUNT</h6><br />
                                    <p>6.1. To register you will need to submit some personal information, a valid email address (that will be used as Username and for user identification) for your Website account ("Account"), a password ("Password"). To be able to withdraw funds you will need to enter at least one wallet for the Cryptocurrency you are mining. The Account may allow you to add more than one Cryptocurrency wallet.
                                        <br /><br /> 6.2. You must ensure that all information about you that is held by us is true, complete, not misleading and up to date.
                                        <br /><br /> 6.3. The Username and Password will be allocated to you if you successfully apply for registration as a Miner.
                                        <br /><br /> 6.4. You will need your Username and Password to access some parts of the Website. Your Username and Password are personal to you and must not be disclosed to any other person.
                                        <br /><br /> 6.5. The number of accounts is limited to 1 for each beneficiary.
                                        <br /><br /> 6.6. When you register, you may submit an order to administer a Cloud Machine. This order will allow you to specify the processing power of the Cloud Machine. Only Simplerigs can decide whether orders will be successful and acceptance is subject to availability, amongst other things.
                                        <br /><br /> 6.7. Your order is a request to acquire a Contract from us and does not represent a formed contract. If we accept your order, we will associate your Contract with your Account. Until then, an order is considered pending and Simplerigs reserves the right to decline your payment.
                                        <br /><br /> 6.8. Subject to the payment of any fees which may be applied, Miners will be able to receive Cryptocurrencies on the basis of the processing power of the Cloud Machine and the period of time for which the Cloud Machine is mining. Miners will only be able to administer the Cloud Machine during the Contract Term. Those Cryptocurrencies will be transferred to your wallet upon your request, if such request is confirmed.
                                        <br /><br /> 6.9. If you lose access to your Account, Simplerigs may ask you to provide certain types of data, including personally identifiable information, to determine ownership of the Account. This may include, but is not limited to: proof of identity; proof of residence; proof of telephone number/email ownership and any identifiable activity on the Website, such as transaction IDs, order numbers, withdrawal amounts and others.
                                    </p>
                                    <h6 className='font-bold'>7. USE OF YOUR ACCOUNT</h6><br />
                                    <p>7.1. You may only mine Cryptocurrencies for your own benefit. By using the Website and/or the Service you confirm that you are not acting for the benefit of any other person or entity.
                                        <br /><br /> 7.2. We are entitled to assume that any use of your Account is made by you. You are solely responsible and liable for any use of the Website or the Service under your Account or any other use of your Username and Password.
                                        <br /><br /> 7.3. You may only hold one Account. If you forget your Username or Password, you can use the password recovery option or contact Support.
                                        <br /><br /> 7.4. DO NOT SHARE YOUR PASSWORD WITH ANY OTHER PERSON OR ALLOW ANY OTHER PERSON TO USE YOUR ACCOUNT. WE ARE NOT LIABLE FOR ANY IMPROPER USE OF YOUR PASSWORD OR ACCOUNT BY YOU OR ANY OTHER PERSON. IF YOU HAVE REASONS TO ASSUME THAT ANY OTHER PERSON KNOWS YOUR PASSWORD, OR THAT YOUR ACCOUNT HAS BEEN USED BY ANY OTHER PERSON, YOU MUST INFORM US IMMEDIATELY.
                                        <br /><br /> 7.5. If you do not log into your Account for 12 months, we may terminate the Account. You will be, if possible, notified in advance. If we are unable to contact you, or you do not take any action to prevent account termination, your Balance will be nullified.
                                    </p>
                                    <h6 className='font-bold'>8. RESTRICTIONS AND OBLIGATIONS</h6><br />
                                    <p>8.1. You agree to comply with all applicable laws and regulations, these terms of service and all rules applicable to the use of the Website and the Service.
                                        <br /><br /> 8.2. You agree not to falsely describe or otherwise misrepresent yourself in any dealings with Simplerigs.
                                        <br /><br /> 8.3. You are not allowed to abuse any campaigns, discounts, referral bonuses and/or referral systems, provided from time to time by Simplerigs and/or its partners.
                                        <br /><br /> 8.4. You are not allowed to use any means to mask your internet traffic and IP address (such as Proxy, Tor, VPN and others).
                                        <br /><br /> 8.5. Multi-Level Marketing (MLM) and/or High-Yield Investment Projects (HYIP) systems are forbidden from providing any services to their users or partners based on Simplerigs and/or Simplerigs, including but not limited to Simplerigs and/or Simplerigs Products and/or Services.
                                        <br /><br /> 8.6. You are strictly forbidden to use or exploit errors in design of the Website, the Service and/or all and any of their parts, features which have not been documented, and/or "program bugs" for commercial/personal gain or as means to disrupt and/or destabilise the Service and/or the Website. If you encounter such an error by accident, you are required to report your findings to support@simplerigs.com.
                                    </p>
                                    <h6 className='font-bold'>9. ADMINISTRATION OF MINING</h6><br />
                                    <p>9.1. During the Contract Term you can use the Website to:
                                        <br /><br /> 9.1.1. amend or update your registration and contact details;
                                        <br /><br /> 9.1.2. with the help of customer support deactivate or reactivate your Account as well as terminate an active Contract;
                                        <br /><br /> 9.1.3. with the help of customer support change the login email address;
                                        <br /><br /> 9.1.4. change some parameters of the mining of your Cloud Machine;
                                        <br /><br /> 9.1.5. change your cryptocurrency-specific wallet addresses.
                                        <br /><br /> 9.2. Subject to payment and additional Fees in advance, you can use the Website to:
                                        <br /><br /> 9.2.1. add a new Cloud Machine;
                                        <br /><br /> 9.2.2. increase the processing power of your Cloud Machine.
                                    </p>
                                    <h6 className='font-bold'>10. BALANCE</h6><br />
                                    <p>10.1. Your Balance in the Dashboard is your personal amount of funds available to use.
                                        <br /><br /> 10.2. The Service may have multiple Balances. Currently available balances are:
                                        <br /><br /> 10.2.1. BTC Balance is measured in BTC (Bitcoins), accurate to 0.00000001 BTC (1 satoshi, the minimum indivisible amount of BTC);
                                        <br /><br /> 10.3. Other Cryptocurrency Balances may be introduced and/or removed at any time.
                                        <br /><br /> 10.4. Funds mined will be transmitted directly to your Balance. This may take up to 24 hours from the date the coins are generated.
                                        <br /><br /> 10.5. Balance can be used in the following ways:
                                        <br /><br /> 10.5.1. You are able to withdraw your balance at any time if it meets the minimum requirement, unless stated otherwise (subject to change).
                                        <br /><br /> 10.5.2. You are able to purchase additional Contract(s) for the Cloud Machine(s) to increase your total Hashrate.
                                        <br /><br /> 10.6. Simplerigs reserves the right to make retroactive recalculations to Balance(s), Cloud Machines, Hash rate and logs, including but not limited to, in the case of any error occurring in the Service, to correct any mistakes or discrepancies.
                                        <br /><br /> 10.7. Balance may be negative. In such case, the Balance must become positive above the minimum requirement before any withdrawals and/or purchases can be made using it.
                                    </p>
                                    <h6 className='font-bold'>11. FEES</h6><br />
                                    <p>11.1. We provide a platform which enables individuals to mine cryptocurrencies using cloud Machine. In return, we charge periodic maintenance and electricity fees ("Fees") that are deriving from the usage of electricity as well as the cost of maintenance of the Mining equipment. The maintenance costs of running the equipment include but are not limited to: hardware setup, data center rent, Mining Pool testing, staff salaries, future planning and proofing, software development, exchange of used and out of order parts and other expenditures required to render the service on a best-effort basis. Some Contract types are not subject to periodic Fees. The presence and specification of Fees for each Contract type can always be seen on the Website.
                                        <br /><br /> 11.2. Simplerigs reserves the right to change the fees at any time without prior notice.
                                    </p>
                                    <h6 className='font-bold'>12. LIABILITY</h6><br />
                                    <p>12.1. We provide and maintain the Website and the Service on an "AS IS" and "AS AVAILABLE" basis and we are liable only to provide our services with reasonable skill and care.
                                        <br /><br /> 12.2. We give no other warranty in connection with the Website or the Service and we disclaim all liability for:
                                        <br /><br /> 12.2.1. to the extent allowed by these Terms and without affecting any other clauses within Section 12, that may apply, accuracy, currency or validity of information and material contained within and/or provided by the Website, the Dashboard, the Support Service, in email newsletters and social media. You hereby agree, that no radio, computer and internet communication equipment is completely free of fault, occasional technical disruptions may affect the service and so can human error, which may result in misrepresentation of content or miscommunication;
                                        <br /><br /> 12.2.2. any change in the exchange rate of Bitcoins or any other Cryptocurrency;
                                        <br /><br /> 12.2.3. any change in the difficulty of mining;
                                        <br /><br /> 12.2.4. any changes in applicable law or regulation, or the acts of any legislator or regulator in any part of the world;
                                        <br /><br /> 12.2.5. any interruptions to or error of the Website or the Service or other communications network;
                                        <br /><br /> 12.2.6. the infringement by any other person of any copyright or other intellectual property rights of any third party through any User Content or use of the Website or the Service;
                                        <br /><br /> 12.2.7. the availability, quality, content or nature of External Sites;
                                        <br /><br /> 12.2.8. any amount or kind of loss or damage due to viruses or other malicious software that may infect a user's computer equipment, software, data or other property caused by any other person accessing, using or downloading the Website, the Service or any User Content; and
                                        <br /><br /> 12.2.9. all representations, warranties, conditions and other terms and conditions which, but for this notice, would have effect.
                                        <br /><br /> 12.3. We will not be liable in any amount for failure to perform any obligation under these terms of service if that failure is caused by the occurrence of an event beyond our reasonable control.
                                        <br /><br /> 12.4. Except as provided above there are no other warranties, conditions or other terms and conditions, express or implied, statutory or otherwise, and all of those terms and conditions are hereby excluded to the maximum extent permitted by law.
                                        <br /><br /> 12.5. To the maximum extent permitted by law, we exclude liability for any losses or damages which you may suffer, whether the same are suffered directly or indirectly or are immediate or consequential, which fall within any of the following categories:
                                        <br /><br /> 12.5.1. special damage even though that party was aware of the circumstances in which such special damage could arise;
                                        <br /><br /> 12.5.2. loss of anticipated savings;
                                        <br /><br /> 12.5.3. loss of business opportunity and management time;
                                        <br /><br /> 12.5.4. loss of goodwill;
                                        <br /><br /> 12.5.5. loss of Cryptocurrency arising as a result of any of your acts or omissions of those of any third party;
                                        <br /><br /> 12.5.5.1. loss arising out of or in connection with:
                                        <br /><br /> 12.5.5.2. any defect or insecurity in any systems you use to store or transmit Cryptocurrency or to access or use the Website or the Service ;
                                        <br /><br /> 12.5.5.3. any inaccurate or incomplete information you provide, including Cryptocurrency wallet addresses;
                                        <br /><br /> 12.5.5.4. any changes to the amount of Cryptocurrency awarded to Miners;
                                        <br /><br /> 12.5.5.5. any changes to the regulatory, legislative or technical environment applicable to Cryptocurrencies;
                                        <br /><br /> 12.5.5.6. the acts or omissions of any bank or provider of banking services; or
                                        <br /><br /> 12.5.5.7. any change in the value of Cryptocurrency howsoever arising (including as a result of the acts or omissions of Simplerigs).
                                        <br /><br /> 12.6. To the maximum extent permitted by law, our aggregate liability in respect of any claims made in connection with or arising out of the use of the Website or the Service (whether in contract, tort (including negligence), breach of statutory duty, or otherwise) for direct losses will be limited to the Fees.
                                        <br /><br /> 12.7. You agree not to use the Website or the Service in any way which:
                                        <br /><br /> 12.7.1. is unlawful;
                                        <br /><br /> 12.7.2. may give rise to civil or criminal liability for Simplerigs; or
                                        <br /><br /> 12.7.3. may bring Simplerigs into disrepute.
                                        <br /><br /> 12.8. You hereby agree to indemnify, defend and hold us and our officers, directors, owners, agents, information providers, affiliates, licensors and licensees (collectively, the "Indemnified Parties") harmless from and against any and all liability and costs (including reasonable legal fees) incurred by the Indemnified Parties in connection with any claim arising out of:
                                        <br /><br /> 12.8.1. any fraud or fraudulent misrepresentation you commit;
                                        <br /><br /> 12.8.2. any inaccuracy or defect of any of the information you have provided to us;
                                        <br /><br /> 12.8.3. any breach of applicable law or regulation you commit;
                                        <br /><br /> 12.8.4. any other person’s use of your Account;
                                        <br /><br /> 12.8.5. any breach by you of these terms of service; and
                                        <br /><br /> 12.8.6. third party claims arising from your use of the Website or the Service, any of Your Content or any use of your Account (whether or not such use was by you).
                                        <br /><br /> 12.9. You shall cooperate with us in the defence of any claim. We reserve the right, at our own expense, to assume the exclusive defence and control of any matter otherwise subject to indemnification by you.
                                    </p>
                                    <h6 className='font-bold'>13. BREACH, SUSPENSION AND TERMINATION</h6><br />
                                    <p>13.1. Without limiting any other rights we have, we may suspend or terminate access to your Account, the Website and/or the Service, nullify your Account Balance and/or hold the ability to withdraw mined funds if you breach any of these Terms of Service.
                                        <br /><br /> 13.2. If we have grounds to suspect that you are using the Website or the Service fraudulently or improperly, we will suspend your Account until you are able to demonstrate to our satisfaction:
                                        <br /><br /> 13.2.1. your identity; and
                                        <br /><br /> 13.2.2. that no fraud or impropriety has occurred or been attempted.
                                        <br /><br /> 13.3. We will try to give you reasonable notice of any anticipated termination of the Website or the Service.
                                        <br /><br /> 13.4. If you become aware of or suspect another user or Miner's breach of these terms of service, or any fraud or impropriety by another user, you must contact us immediately.
                                        <br /><br /> 13.5. In case of any Credit Card purchase (refer to section 14.5.4.) Simplerigs has the right to place the Customer's Account on Hold (hold the ability to withdraw any mined funds from the Customer's Account Balance) for a period of up to 30 days as a security measure of anti-fraud related regulations and policies.
                                    </p>
                                    <h6 className='font-bold'>14. PAYMENT TERMS, ORDER CANCELLATION, ORDER CHANGES AND ORDER REFUNDS</h6><br />
                                    <p>14.1. All invoices are issued in USD (United States dollar) by default. Payments performed in any other currency must account for the exchange rate of said currency to USD at the moment of invoice generation and any commissions for currency exchange.
                                        <br /><br /> 14.1.1. The Client will receive the original deposit back 365 days after the deposit is made. USD will be converted to Bitcoin at the end of the contract and will be refunded back to the Client’s Bitcoin wallet of choice.
                                        <br /><br /> 14.2. A Customer is able to purchase a Contract using a variety of payment methods
                                        <br /><br /> 14.3. A Customer has the right not to pay for the order in case the order has been created but not yet paid, if the Customer decides not to complete the order. The order will be expired after a given period of time (dependent on the payment method) and the Customer will not be obliged to proceed with the order. Simplerigs will not process requests to cancel unpaid orders, as it is intended the unpaid orders will be expired.
                                        <br /><br /> 14.4. A Customer is solely responsible for the accuracy of payment, including but not limited to: the destination account, transferable amount and payment details:
                                        <br /><br /> 14.4.1. If the transferred amount is below requested, Simplerigs reserves the right, at its sole discretion, to adjust the Contract accordingly to received funds or request the missing amount to be paid, before activating the Contract.
                                        <br /><br /> 14.4.2. If the transferred amount is above requested, Simplerigs reserves the right, at its sole discretion, to adjust the Contract accordingly to received funds, add the excessive amount to Customer's Account Balance or return the excessive amount through the payment system the Customer has used to pay for the order initially.
                                        <br /><br /> 14.4.3. If the Customer initiates the payment with incorrect/insufficient details and/or to the wrong destination account, Simplerigs will attempt, if possible, to process the order in a timely matter. If the destination address does not belong to Simplerigs (directly or via a third-party service) and/or is not related to Simplerigs in any way, Simplerigs will not be held responsible and will decline any claims.
                                        <br /><br /> 14.4.4. Simplerigs is not obliged to proactively resolve payment related issues without a claim submitted by the Customer.
                                        <br /><br /> 14.5. In case of payment related issues a claim must be raised:
                                        <br /><br /> 14.5.1. A Customer has the right to raise a payment related claim/dispute by contacting support within 14 days from the creation of payment with proof of payment. Requests submitted after 14 days may not be processed.
                                        <br /><br /> 14.5.2. Simplerigs reserves the right to request proof of payment, if there are suspicions or facts the payment was not received but the Contract was activated. The Customer is obliged to provide proof of payment within 14 days of reception of such request.
                                        <br /><br /> 14.5.3. Proof of payment includes but is not limited to: Simplerigs order number, transaction ID or number, destination account, transferred amount, account statement from the payment system used.
                                        <br /><br /> 14.5.4. Credit Card purchases may require proof of ownership of the payment method and an identification request.
                                        <br /><br /> 14.5.5. If proof of payment is not provided within 14 days or provided proof is deemed insufficient and/or invalid:
                                        <br /><br /> 14.5.5.1. if the claim was initiated by a Customer: Simplerigs reserves the right to decline Customer's claim(s);
                                        <br /><br /> 14.5.5.2. if the claim was initiated by Simplerigs: Simplerigs reserves the right to adjust/cancel related Contracts and adjust Customer's Account Balance by amounts mined by related Contract.
                                        <br /><br /> 14.6. Unless otherwise provided by law or by a particular offer, all purchases are final and non-refundable. Simplerigs reserves the right to issue refunds at Simplerigs sole discretion. If we issue a refund, we are under no obligation to issue the same or similar refund in the future. This refund policy does not affect any statutory rights that may apply.
                                        <br /><br /> 14.7. In the case of a refund:
                                        <br /><br /> 14.8.1. Customer will receive a reimbursement of spent funds to start the service, unless any funds were withdrawn from Customer's Account Balance. If any amount was successfully withdrawn from the Account Balance, no refund requests will be processed on said Account.
                                        <br /><br /> 14.9.2. Simplerigs has the right to nullify or deduct any Hashrate and/or funds mined by the Hashrate of the refunded purchase from the Customer's Account Balance as well as any funds provided as a Referral Bonus for the refunded purchase from the Referrer's Account Balance.
                                        <br /><br /> 14.9.3. Simplerigs is not obliged to reimburse any funds spent for the Maintenance and Electricity Fees.
                                    </p>
                                    <h6 className='font-bold'>15. COMMUNICATIONS</h6><br />
                                    <p>15.1. The Website may enable the display of third party content ("User Content").
                                        <br /><br /> 15.2. Although we are not obliged to do so, we may remove or reject any User Content.
                                        <br /><br /> 15.3. You agree that we may process and store any content you submit to the Website ("Your Content").
                                        <br /><br /> 15.4. You may be able to send Your Content to other Miners of the Website, and other Miners of the Website may be able to send User Content to you.
                                        <br /><br /> 15.5. You agree to the distribution of Your Content by us both internally and externally. Therefore, you should ensure that Your Content does not contain information, which you intend to keep confidential or private.
                                        <br /><br /> 15.6. By making available, posting or transmitting Your Content to the Website, you are granting us a non-exclusive, transferable, sub-licensable, royalty-free, irrevocable, perpetual worldwide license to use and exploit Your Content for any purpose.
                                        <br /><br /> 15.7. You agree that you are entitled to make available, post or transmit Your Content to the Website.
                                        <br /><br /> 15.8. You will not make available, post or transmit to the Website any statement, material or other content, nor use the Website in any way, that:
                                        <br /><br /> 15.8.1. is unlawful or may give rise to civil or criminal liability;
                                        <br /><br /> 15.8.2. infringes any copyright or other intellectual property rights of any third party;
                                        <br /><br /> 15.8.3. infringes any third party's rights of privacy or rights of publicity;
                                        <br /><br /> 15.8.4. includes any computer virus or other malicious software;
                                        <br /><br /> 15.8.5. is abusive, pornographic, defamatory, discriminatory or obscene;
                                        <br /><br /> 15.8.6. harasses any other person;
                                        <br /><br /> 15.8.7. interferes with another user's use and enjoyment of the Website;
                                        <br /><br /> 15.8.8. impersonates any moderator, administrator or any staff or any other person connected with Simplerigs;
                                        <br /><br /> 15.8.9. contains the confidential information of any other person;
                                        <br /><br /> 15.8.10. solicits passwords or personal information;
                                        <br /><br /> 15.8.11. contains video, photographs, or images of any other person without his or her permission (or in the case of a minor, the minor's legal guardian);
                                        <br /><br /> 15.8.12. exploits any other person;
                                        <br /><br /> 15.8.13. we consider inappropriate; or
                                        <br /><br /> 15.8.14. encourages or provokes any other person to do any of the acts listed above.
                                        <br /><br /> 15.9. The Website may provide means by which you can communicate with us. We will communicate with you at the email address you have provided or through other means of communication that may be provided by the Website. Notices that are applicable to all our Miners shall be made available on the Website publicly. You will be deemed to have received a notice at the time the email is sent or the time the notice is posted on the Website. We will be deemed to have received a notice when we issue a confirmation to you.
                                        <br /><br /> 15.10. All emails (or other messages) we send are intended for the addressee only.
                                    </p>
                                    <h6 className='font-bold'>16 . Confidentiality</h6><br />
                                    <p>16.1 The customer should not disclose any information, related to the Company, including but not limited to information on accounts, operations, clients of the Company, accounts opened for the clients, balance and operations on the accounts of clients and any other information related to the clients of the Company and their activity, information on shareholders, managers, employees of the Company, its affiliates, partners and contractors, any agreements concluded between Company and any other party, its projects and products, marketing strategies and plans, financial information and statements, and any other information that should be reasonably recognised as confidential in accordance with applicable legislation.
                                        <br /><br /> 16.2 In case of forced disclosure of the information listed here above on demand of governmental and regulating authorities, customer shall inform the Company on the day of receiving the appropriate request.
                                        <br /><br /> 16.3 In case of unauthorised disclosure of the aforementioned information or any other violation of this confidentiality provision by the customer, the Company has the right to terminate the Agreement and to close the account without any prior notices and with immediate effect.
                                    </p>
                                    <h6 className='font-bold'>17. GENERAL</h6><br />
                                    <p>17.1. These terms of service are subject to your statutory and common law consumer rights and will not limit any rights you might have that cannot be excluded under applicable law. These terms of service will not exclude or limit our liability for death or personal injury resulting from our negligence nor any fraudulent acts or representations or for any statutory liability not capable of limitation.
                                        <br /><br /> 17.2. We may deduct any monies you owe us from any monies we owe you.
                                        <br /><br /> 17.3. These terms of service, together with the terms of use, privacy policy and any instructions, guidance and similar information found on the Website (from time to time), constitute the entire agreement between you and Simplerigs relating to your use of the Website and the Service and mining through the Website or the Service, to the exclusion of any other terms.
                                        <br /><br /> 17.4. Our failure to enforce any term does not constitute our waiver of that term.
                                        <br /><br /> 17.5. If any part of these Terms is found to be unenforceable, it will be amended to the minimum extent necessary to make it enforceable and the remainder of the provisions will remain in full force and effect.
                                        <br /><br /> 17.6. No representation or warranty is made as to whether the Website or the Service complies with the laws of any jurisdiction other than SAR Hong Kong.
                                        <br /><br /> 17.7. The parties submit to the exclusive jurisdiction of the SAR Hong Kong courts. These terms of service are subject to and interpreted in accordance with the laws of SAR Hong Kong, provided that these terms of service shall not be interpreted as conferring any statutory EU consumer protection laws, including any rights of withdrawal or cancellation under implementations of Directive 2011/83/EU on consumer rights, on any individual not ordinarily a resident of an EU Member State.
                                        <br /><br /> 17.8. This Website the Dashboard are presented in multiple languages. In the case of a conflict between translations, the English version will prevail.
                                        <br /><br /> 17.9. Simplerigs will be entitled to assign and otherwise transfer the agreement covered by these terms of service by giving you reasonable notice, which may include notice given via the Website.
                                        <br /><br /> 17.10. All questions, comments or complaints should be directed to us via Customer Support and we will try to respond to within 48 hours.
                                    </p>

                                </div>

                                <br />
                                <p className='text-[#1A8731] text-[14px] font-[500] cursor-pointer'>Need help? Please visit our Help Center.</p>
                            </div>
                        </div>


                        {/* <div className='desktop-logout'>
                    <Logout/>
                </div> */}
                        <div className="mt-[35px]"></div>
                        <Footer />
                    </div>

                    <div className="lg:hidden block relative bg-no-repeat dashboard-root-container">
                        <div className='flex lg:flex-row flex-col justify-between pt-[32px] px-[12px] pb-[0px] lg:pt-[36px] lg:pr-[38px] lg:pb-[30px] lg:pl-[50px]' >
                            {!MobileSidebar &&
                                <div className='lg:hidden flex justify-between items-center py-[8px] pl-[24px] pr-[8px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_24px_rgba(0,0,0,0.1)]'>
                                    <div className='flex items-center space-x-[15px]'>
                                    <div onClick={CloseToIcon} className='block w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-[#292D32] rotate-[135deg]'></div>
                                        <p className='font-[500] text-[18px] font-Rajdhani mb-0'>Terms of use</p>
                                    </div>

                                    <div className='items-center justify-end hover:text-[#429763]'>
                                        <div className="bg-[#429763] rounded-[5px] font-Rajdhani text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                            <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                                <p className='mb-0 lg:font-montserrat font-Rajdhani'>{firstName} {lastName}</p>
                                                <BiUserCircle className='w-[20px] h-[20px]' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }


                            <div className='flex lg:space-x-[24px]'>
                                <div className="sidebar">
                                    <Sidebar />
                                </div>
                                <div className="main-container">
                                    <div className="flex flex-col justify-between dashboard-container">

                                        <div className="mt-[4vh] ml-[1.8vw]">
                                            <h1 className='text-[28px] lg:text-[1.2vw] font-[500] lg:font-[600] font-Rajdhani lg:font-montserrat mb-[0] text-[#000000]'>Terms of <span className='text-[#449552]'>Use</span></h1>
                                        </div>

                                        <div className='h-full w-full lg:w-[68vw] mt-[2vh] relative bg-[#FFFFFF] bg-[length:100%_100%] bg-opacity-[60%] rounded-[20px] px-[20px] py-[20px] lg:pt-[4vh] lg:pl-[2vw] lg:pb-[4vh] lg:pr-[3vw] shadow-[0px_0px_44px_rgba(0,0,0,0.1)] leading-[25px] lg:leading-[3vh] font-Rajdhani lg:font-montserrat text-[22px] lg:text-[0.7vw] text-[#595A5B]'>
                                            <div className='overflow-y-scroll h-[580px] lg:h-full'>
                                                <h6 className='font-bold'>TERMS OF USE</h6>
                                                <br />
                                                <h6 className='font-bold'>Introduction</h6>
                                                <br />
                                                <p className='lowercase'>THESE TERMS OF SERVICE APPLY TO THE USE OF THE SIMPLERIGS.COM CLOUD MINING SERVICE AND SIMPLERIGS WEBSITE LOCATED AT SIMPLERIGS.COM AND ITS SUBDOMAINS. THE WEBSITE AND THE SERVICE ARE THE PROPERTY OF MINING IT LIMITED HONG KONG.</p>
                                                <br />
                                                <p className='lowercase'>THEY SET OUT HOW THE SIMPLERIGS.COM CLOUD HOSTED CRYPTOCURRENCY MINING SERVICE WORKS AND DESCRIBE ANY ASSOCIATED RIGHTS AND RESPONSIBILITIES. THE SIMPLERIGS.COM TERMS OF SERVICE AND ANY INSTRUCTIONS, GUIDANCE AND SIMILAR INFORMATION FOUND ON THE WEBSITE (FROM TIME TO TIME) ALSO APPLY TO HOW YOU USE THE SIMPLERIGS.COM CLOUD MINING SERVICE (TOGETHER THE "AGREEMENT"). BY USING THE WEBSITE AND/OR THE SERVICE, YOU AGREE TO THESE TERMS OF SERVICE; IF YOU DO NOT AGREE, DO NOT USE THE SITE AND/OR THE SERVICE.</p>
                                                <br />
                                                <p className='lowercase'>SIMPLERIGS RESERVES THE RIGHT, AT ITS SOLE DISCRETION, TO AMEND, CHANGE, MODIFY, ADD OR REMOVE PORTIONS OF THESE TERMS OF SERVICE, AT ANY TIME. IT IS YOUR RESPONSIBILITY TO CHECK THESE TERMS PERIODICALLY FOR CHANGES. THE CURRENT VERSION OF THESE TERMS IS AVAILABLE AT HTTPS://SIMPLERIGS.COM/TERMS. YOUR CONTINUED USE OF THE WEBSITE AND/OR THE SERVICE FOLLOWING THE PUBLISHED UPDATES TO THE TERMS WILL MEAN THAT YOU ACCEPT AND AGREE TO THE CHANGES. AS LONG AS YOU AGREE AND COMPLY WITH THESE TERMS, SIMPLERIGS GRANTS YOU A PERSONAL, NON- EXCLUSIVE, NON-TRANSFERABLE, LIMITED PRIVILEGE TO ENTER AND USE THE WEBSITE AND THE SERVICE.</p><br />

                                                <p className='lowercase'>CLOUD MINING INVOLVES FINANCIAL RISKS AND MAY NOT BE APPROPRIATE FOR ALL PEOPLE. ANY INVESTMENT DECISIONS THAT YOU MAKE ARE SOLELY YOUR RESPONSIBILITY</p><br />

                                                <h6 className='font-bold'>1. ABOUT THE SERVICE, THE WEBSITE AND THESE TERMS OF SERVICE</h6><br />

                                                <p className='mb-[25px]'>1.1. This is an agreement (referred to as "Terms") between MINING IT LIMITED - CR No.: 2576021 Rm 1408, 14/F, 248 Queen’s Rd E Wan Chai, Hong Kong (also referred to in these Terms as "Simplerigs", "we", "us" or "our") and you (also referred to in these Terms as "Customer", "you", "your"), the person accessing and using the Simplerigs.com cloud mining service and accepting these Terms.
                                                    <br /><br /> 1.2. In these Terms:
                                                    <br /><br /> 1.2.1. a reference to "Cryptocurrency", "Cryptocurrencies" is a reference to the distributed, decentralised peer-to- peer digital currencies:
                                                    <br /><br /> 1.2.1.1. "Bitcoins" is a reference to a Cryptocurrency known as Bitcoin;
                                                    <br /><br /> 1.2.1.2. "Altcoins" is a reference to all Cryptocurrencies other than Bitcoin, such as Litecoin;
                                                    <br /><br /> 1.2.2. "Miners" are individuals who register to mine Bitcoins and/or Altcoins with a Cloud Machine. If you successfully apply to administer a Cloud Machine, you will be a Miner;
                                                    <br /><br /> 1.2.3. a "Mining Pool" is an organised association of Cryptocurrencies miners. The members of these associations work together to mine Cryptocurrencies and those Cryptocurrencies are distributed amongst the membership based on the contribution made to the mining by each member;
                                                    <br /><br /> 1.2.4. the "Mining Hardware" is the computer hardware, not owned but used as a source of mining efficiency and costs calculation by SIMPLERIGS;
                                                    <br /><br /> 1.2.5. "Hashrate" or "Hash rate" is the mining power of the Mining Hardware used to mine Cryptocurrencies. Hashrate is mining algorithm specific (SHA-256, Scrypt, X11 etc);
                                                    <br /><br /> 1.2.6. "Cloud Machine" is the virtual mining power of the Service purchased by a Miner and administered by a Miner using the Website. “Cloud Machine” is a derivative of a real mining machine;
                                                    <br /><br /> 1.2.7. "Service" is Simplerigs contract, which enables individuals to virtually mine Cryptocurrencies for themselves. Simplerigs contract performance is deriving from Mining Hardware efficiency and costs. Simplerigs “Service” in no way should be considered as a purchase of real mining equipment;
                                                    <br /><br /> 1.2.8. the "Support" or "Customer Support" or "Helpdesk" is the technical support service of Simplerigs that is provided via email/ticket system, available in the Simplerigs FAQ at http://Simplerigs.com/faq where Customers can find answers to general questions and request assistance by submitting a request;
                                                    <br /><br /> 1.2.9. the "Dashboard" is the graphical user interface of the Service, with which the Miner interacts to perform all actions related to the Service;
                                                    <br /><br /> 1.2.10. the "Website" is Simplerigs.com and any apps, software, emails or other websites which we use to provide the services of Simplerigs.com (which includes the Service);
                                                    <br /><br /> 1.2.11. a "Payout" is the periodic deposit to your Balance, dependent on your Cloud Machine. Simplerigs may change the periodicity of Payouts at any time, to a maximum of once per 24 hours;
                                                    <br /><br /> 1.2.12. "Fees" are maintenance and electricity fees, charged daily from the Balance;
                                                    <br /><br /> 1.2.13. "Account" is your personal access to the Service, described further in section 6;
                                                    <br /><br /> 1.2.14. "Balance" is your personal Account balance;
                                                    <br /><br /> 1.2.15. a "Contract" is the access to a Cloud Machine of specific Hash rate;
                                                    <br /><br /> 1.2.16. a "Contract Term" is the period of time for which a Miner has agreed to pay to administer a Cloud Machine, by default, Simplerigs provides 1-year contracts, unless stated otherwise;
                                                    <br /><br /> 1.2.17. "Hold" is the state an Account can be placed in that prevents the said Account to make any withdrawals, used as a security measure;
                                                    <br /><br /> 1.2.18. a "Pre-order" is a Contract with a start date in the future. Start date is estimated and is subject to change;
                                                    <br /><br /> 1.2.19. the "Referral Program" or "Partner Program" is the functionality that allows a Customer to receive financial rewards for Contracts purchased by other Customers;
                                                    <br /><br /> 1.2.20. a "Referral Code" is an alphanumerical sequence (at least 6 characters long) that is linked to a Customer's Account;
                                                    <br /><br /> 1.2.21. a "Referral Link" is the URL with a Referral Code, that allows a new Customer to register with Simplerigs;
                                                    <br /><br /> 1.2.22. a "Referral" is a Customer who registered by using another Customer's Referral Link;
                                                    <br /><br /> 1.2.23. a "Referrer" is a Customer who had another Customer register using their Referral Link;
                                                    <br /><br /> 1.2.24. a "Referral Purchase" or "Referred Purchase" is a purchase made by a Referral;
                                                    <br /><br /> 1.2.25. a "Referral Bonus" is the reward a Referrer receives for a Referral Purchase;
                                                    <br /><br /> 1.2.26. an "Affiliate Network" is a third-party website that allows any person (with or without a Simplerigs Account) to receive financial rewards for Simplerigs Contracts purchased by referred Customers.
                                                    <br /><br /> 1.3. These Terms apply to any mining you undertake by using the Service and Website and they form a legal agreement between you and Simplerigs on the acceptance of you application for an Account (as set out below).
                                                    <br /><br /> 1.4. If there is ever a conflict between these terms of service and the Simplerigs terms of use or the instructions, guidance and similar information found on the Website, these terms of service will take priority.
                                                    <br /><br /> 1.5. IT IS NOT POSSIBLE FOR US TO STATE DEFINITIVELY HOW MANY BITCOIN, LITECOIN AND/OR ANY OTHER CRYPTOCURRENCY UNITS WILL BE MINED BY ANY MINER AND/OR SPECIFIC CLOUD MACHINE.
                                                    <br /><br /> 1.6. By applying to register as a Miner you are confirming that you understand and accept (and are able to understand and accept) these terms of service and that you agree that you will be bound by them. You should regularly check the Website for changes to the terms of service, instructions, guidance and similar information found on the Website.
                                                    <br /><br /> 1.7. You may only apply to register as a Miner if:
                                                    <br /><br /> 1.7.1. You are 18 years old or over; and
                                                    <br /><br /> 1.7.2. It is lawful for you to do so.
                                                    <br /><br /> 1.8. To register as a Miner, we may require you to provide us with identification or other documentation in order to help us prevent fraud or money laundering. This may include photographic identification and a recent proof of address. We may also undertake our own identity, fraud and credit checks.
                                                    <br /><br /> 1.9. It is forbidden for Miners to visit the Website or use the Service through anonymous proxies (such as Tor) and other services or technologies that hide the real internet connection of the user.
                                                </p>

                                                <h6 className='font-bold'>2. RISK NOTICE</h6><br />
                                                <p>2.1. Actions with Cryptocurrencies carry inherent risks. Due to the fact that Cryptocurrencies are unregulated and decentralised, their value is not insured by any legal entities. The value of any Contract, any amount of any Cryptocurrency is subject to change by Simplerigs due to a number of factors out of Simplerigs’ control. These factors include but are not limited to changes of mining difficulty and/or other mining parameters/properties, fluctuating price (in fiat currency to Cryptocurrency exchange rate, such as USD/BTC) of Cryptocurrencies. You understand and agree that the worth of any Contact and any amount of mined Cryptocurrency may lose all worth at any moment of time due to the nature of Cryptocurrencies. You understand that you are solely responsible for management of the Cryptocurrencies in your balance as well as any losses or charges incurred by any third-party entity.
                                                    <br /><br /> 2.2. Any information related to Cryptocurrency and Cryptocurrency mining that is/was posted, published and/or provided by Simplerigs via any channel of communication (including but not limited to: on the Website, in the Dashboard, via the Support Service, via Email newsletter, in social media) is subject to change.
                                                </p>
                                                <h6 className='font-bold'>3. CRYPTOCURRENCIES</h6><br />
                                                <p>3.1. You must not mine, buy, sell, exchange, hold, own or otherwise use or exploit Cryptocurrencies in any way which is prohibited by the laws or regulations which apply to you.
                                                    <br /><br /> 3.2. Cryptocurrencies may not be appropriate for everyone. Before mining any Cryptocurrencies you should learn about them to ensure that they are appropriate for you. Like all currencies, there are disadvantages to using Cryptocurrencies. Some of the risks particular to Cryptocurrencies include:
                                                    <br /><br /> 3.2.1. Currency fluctuation - the price of Bitcoin and/or any other Cryptocurrency may fall sharply and may even fall to zero;
                                                    <br /><br /> 3.2.2. Transactions with Cryptocurrencies may be unconfirmed for a period of time. Although very unlikely, some Cryptocurrency transactions may never be confirmed - Cryptocurrency transactions which are unconfirmed are not completed;
                                                    <br /><br /> 3.2.3. Transactions with Cryptocurrencies are irreversible - if you send any amount of any Cryptocurrency to the wrong person, you may be unable to recover those funds;
                                                    <br /><br /> 3.2.4. Cryptocurrencies may be lost if you lose or forget any PINs or passwords necessary to access and spend those Cryptocurrencies;
                                                    <br /><br /> 3.2.5. unknown technical defects inherent in Cryptocurrencies; and
                                                    <br /><br /> 3.2.6. new regulation which impacts the use of Cryptocurrencies.
                                                    <br /><br /> 3.3. By agreeing to these terms of service or by mining Cryptocurrencies by using the Service, you are indicating that you understand, are capable of understanding and accept the risks associated with Cryptocurrencies.
                                                </p>
                                                <h6 className='font-bold'>4. REGISTRATION</h6><br />
                                                <p>4.1. By applying to register, you are making an offer to enter an agreement on these terms of service. Once submitted, you may not withdraw your offer.
                                                    <br /><br /> 4.2. Only we can decide whether applications will be accepted. If your application is accepted, a legal and enforceable agreement will be entered between you and us. Subject to any statutory rights you may have, you may not cancel the agreement covered by these terms of service and you will not be eligible for any refund.
                                                </p>
                                                <h6 className='font-bold'>5. CONTRACT TERM AND MINING TERM</h6><br />
                                                <p>5.1. These Terms of Service are valid indefinitely, even after Account termination.
                                                    <br /><br /> 5.2. The Contract Term for Simplerigs.com Cloud Machines is 1 year by default, unless stated otherwise. The Contract is valid while profitable, until expired or until terminated (refer to section 13), whichever comes first.
                                                    <br /><br /> 5.3. Contracts with a stated expiry date will end on the date of expiry and the Cloud Machine is stopped.
                                                    <br /><br /> 5.4. Pre-order Contracts that are not activated immediately on purchase will activate on the stated date.
                                                    <br /><br /> 5.5. The Mining process continues until said mining is profitable. This means the Mining process will stop if the Maintenance and Electricity Fees will become larger than the Payout. If mining remains unprofitable for 21 consecutive days the Service is permanently terminated (Hashrate type specific). During the consecutive 21 day period, Payouts will also be temporarily stopped. If during the suspension period, the Contract- related mining factors (such as the exchange rate and mining difficulty) that are outside of Simplerigs control will change favourably, making mining profitable again, the Service will be unsuspended and contracts reactivated. Initial cost is refunded after contract ends.
                                                    <br /><br /> 5.6. Simplerigs reserves the right to change the launch date, Contract Term and/or Mining Term of any Contract.
                                                </p>
                                                <h6 className='font-bold'>6. ACCOUNT</h6><br />
                                                <p>6.1. To register you will need to submit some personal information, a valid email address (that will be used as Username and for user identification) for your Website account ("Account"), a password ("Password"). To be able to withdraw funds you will need to enter at least one wallet for the Cryptocurrency you are mining. The Account may allow you to add more than one Cryptocurrency wallet.
                                                    <br /><br /> 6.2. You must ensure that all information about you that is held by us is true, complete, not misleading and up to date.
                                                    <br /><br /> 6.3. The Username and Password will be allocated to you if you successfully apply for registration as a Miner.
                                                    <br /><br /> 6.4. You will need your Username and Password to access some parts of the Website. Your Username and Password are personal to you and must not be disclosed to any other person.
                                                    <br /><br /> 6.5. The number of accounts is limited to 1 for each beneficiary.
                                                    <br /><br /> 6.6. When you register, you may submit an order to administer a Cloud Machine. This order will allow you to specify the processing power of the Cloud Machine. Only Simplerigs can decide whether orders will be successful and acceptance is subject to availability, amongst other things.
                                                    <br /><br /> 6.7. Your order is a request to acquire a Contract from us and does not represent a formed contract. If we accept your order, we will associate your Contract with your Account. Until then, an order is considered pending and Simplerigs reserves the right to decline your payment.
                                                    <br /><br /> 6.8. Subject to the payment of any fees which may be applied, Miners will be able to receive Cryptocurrencies on the basis of the processing power of the Cloud Machine and the period of time for which the Cloud Machine is mining. Miners will only be able to administer the Cloud Machine during the Contract Term. Those Cryptocurrencies will be transferred to your wallet upon your request, if such request is confirmed.
                                                    <br /><br /> 6.9. If you lose access to your Account, Simplerigs may ask you to provide certain types of data, including personally identifiable information, to determine ownership of the Account. This may include, but is not limited to: proof of identity; proof of residence; proof of telephone number/email ownership and any identifiable activity on the Website, such as transaction IDs, order numbers, withdrawal amounts and others.
                                                </p>
                                                <h6 className='font-bold'>7. USE OF YOUR ACCOUNT</h6><br />
                                                <p>7.1. You may only mine Cryptocurrencies for your own benefit. By using the Website and/or the Service you confirm that you are not acting for the benefit of any other person or entity.
                                                    <br /><br /> 7.2. We are entitled to assume that any use of your Account is made by you. You are solely responsible and liable for any use of the Website or the Service under your Account or any other use of your Username and Password.
                                                    <br /><br /> 7.3. You may only hold one Account. If you forget your Username or Password, you can use the password recovery option or contact Support.
                                                    <br /><br /> 7.4. DO NOT SHARE YOUR PASSWORD WITH ANY OTHER PERSON OR ALLOW ANY OTHER PERSON TO USE YOUR ACCOUNT. WE ARE NOT LIABLE FOR ANY IMPROPER USE OF YOUR PASSWORD OR ACCOUNT BY YOU OR ANY OTHER PERSON. IF YOU HAVE REASONS TO ASSUME THAT ANY OTHER PERSON KNOWS YOUR PASSWORD, OR THAT YOUR ACCOUNT HAS BEEN USED BY ANY OTHER PERSON, YOU MUST INFORM US IMMEDIATELY.
                                                    <br /><br /> 7.5. If you do not log into your Account for 12 months, we may terminate the Account. You will be, if possible, notified in advance. If we are unable to contact you, or you do not take any action to prevent account termination, your Balance will be nullified.
                                                </p>
                                                <h6 className='font-bold'>8. RESTRICTIONS AND OBLIGATIONS</h6><br />
                                                <p>8.1. You agree to comply with all applicable laws and regulations, these terms of service and all rules applicable to the use of the Website and the Service.
                                                    <br /><br /> 8.2. You agree not to falsely describe or otherwise misrepresent yourself in any dealings with Simplerigs.
                                                    <br /><br /> 8.3. You are not allowed to abuse any campaigns, discounts, referral bonuses and/or referral systems, provided from time to time by Simplerigs and/or its partners.
                                                    <br /><br /> 8.4. You are not allowed to use any means to mask your internet traffic and IP address (such as Proxy, Tor, VPN and others).
                                                    <br /><br /> 8.5. Multi-Level Marketing (MLM) and/or High-Yield Investment Projects (HYIP) systems are forbidden from providing any services to their users or partners based on Simplerigs and/or Simplerigs, including but not limited to Simplerigs and/or Simplerigs Products and/or Services.
                                                    <br /><br /> 8.6. You are strictly forbidden to use or exploit errors in design of the Website, the Service and/or all and any of their parts, features which have not been documented, and/or "program bugs" for commercial/personal gain or as means to disrupt and/or destabilise the Service and/or the Website. If you encounter such an error by accident, you are required to report your findings to support@simplerigs.com.
                                                </p>
                                                <h6 className='font-bold'>9. ADMINISTRATION OF MINING</h6><br />
                                                <p>9.1. During the Contract Term you can use the Website to:
                                                    <br /><br /> 9.1.1. amend or update your registration and contact details;
                                                    <br /><br /> 9.1.2. with the help of customer support deactivate or reactivate your Account as well as terminate an active Contract;
                                                    <br /><br /> 9.1.3. with the help of customer support change the login email address;
                                                    <br /><br /> 9.1.4. change some parameters of the mining of your Cloud Machine;
                                                    <br /><br /> 9.1.5. change your cryptocurrency-specific wallet addresses.
                                                    <br /><br /> 9.2. Subject to payment and additional Fees in advance, you can use the Website to:
                                                    <br /><br /> 9.2.1. add a new Cloud Machine;
                                                    <br /><br /> 9.2.2. increase the processing power of your Cloud Machine.
                                                </p>
                                                <h6 className='font-bold'>10. BALANCE</h6><br />
                                                <p>10.1. Your Balance in the Dashboard is your personal amount of funds available to use.
                                                    <br /><br /> 10.2. The Service may have multiple Balances. Currently available balances are:
                                                    <br /><br /> 10.2.1. BTC Balance is measured in BTC (Bitcoins), accurate to 0.00000001 BTC (1 satoshi, the minimum indivisible amount of BTC);
                                                    <br /><br /> 10.3. Other Cryptocurrency Balances may be introduced and/or removed at any time.
                                                    <br /><br /> 10.4. Funds mined will be transmitted directly to your Balance. This may take up to 24 hours from the date the coins are generated.
                                                    <br /><br /> 10.5. Balance can be used in the following ways:
                                                    <br /><br /> 10.5.1. You are able to withdraw your balance at any time if it meets the minimum requirement, unless stated otherwise (subject to change).
                                                    <br /><br /> 10.5.2. You are able to purchase additional Contract(s) for the Cloud Machine(s) to increase your total Hashrate.
                                                    <br /><br /> 10.6. Simplerigs reserves the right to make retroactive recalculations to Balance(s), Cloud Machines, Hash rate and logs, including but not limited to, in the case of any error occurring in the Service, to correct any mistakes or discrepancies.
                                                    <br /><br /> 10.7. Balance may be negative. In such case, the Balance must become positive above the minimum requirement before any withdrawals and/or purchases can be made using it.
                                                </p>
                                                <h6 className='font-bold'>11. FEES</h6><br />
                                                <p>11.1. We provide a platform which enables individuals to mine cryptocurrencies using cloud Machine. In return, we charge periodic maintenance and electricity fees ("Fees") that are deriving from the usage of electricity as well as the cost of maintenance of the Mining equipment. The maintenance costs of running the equipment include but are not limited to: hardware setup, data center rent, Mining Pool testing, staff salaries, future planning and proofing, software development, exchange of used and out of order parts and other expenditures required to render the service on a best-effort basis. Some Contract types are not subject to periodic Fees. The presence and specification of Fees for each Contract type can always be seen on the Website.
                                                    <br /><br /> 11.2. Simplerigs reserves the right to change the fees at any time without prior notice.
                                                </p>
                                                <h6 className='font-bold'>12. LIABILITY</h6><br />
                                                <p>12.1. We provide and maintain the Website and the Service on an "AS IS" and "AS AVAILABLE" basis and we are liable only to provide our services with reasonable skill and care.
                                                    <br /><br /> 12.2. We give no other warranty in connection with the Website or the Service and we disclaim all liability for:
                                                    <br /><br /> 12.2.1. to the extent allowed by these Terms and without affecting any other clauses within Section 12, that may apply, accuracy, currency or validity of information and material contained within and/or provided by the Website, the Dashboard, the Support Service, in email newsletters and social media. You hereby agree, that no radio, computer and internet communication equipment is completely free of fault, occasional technical disruptions may affect the service and so can human error, which may result in misrepresentation of content or miscommunication;
                                                    <br /><br /> 12.2.2. any change in the exchange rate of Bitcoins or any other Cryptocurrency;
                                                    <br /><br /> 12.2.3. any change in the difficulty of mining;
                                                    <br /><br /> 12.2.4. any changes in applicable law or regulation, or the acts of any legislator or regulator in any part of the world;
                                                    <br /><br /> 12.2.5. any interruptions to or error of the Website or the Service or other communications network;
                                                    <br /><br /> 12.2.6. the infringement by any other person of any copyright or other intellectual property rights of any third party through any User Content or use of the Website or the Service;
                                                    <br /><br /> 12.2.7. the availability, quality, content or nature of External Sites;
                                                    <br /><br /> 12.2.8. any amount or kind of loss or damage due to viruses or other malicious software that may infect a user's computer equipment, software, data or other property caused by any other person accessing, using or downloading the Website, the Service or any User Content; and
                                                    <br /><br /> 12.2.9. all representations, warranties, conditions and other terms and conditions which, but for this notice, would have effect.
                                                    <br /><br /> 12.3. We will not be liable in any amount for failure to perform any obligation under these terms of service if that failure is caused by the occurrence of an event beyond our reasonable control.
                                                    <br /><br /> 12.4. Except as provided above there are no other warranties, conditions or other terms and conditions, express or implied, statutory or otherwise, and all of those terms and conditions are hereby excluded to the maximum extent permitted by law.
                                                    <br /><br /> 12.5. To the maximum extent permitted by law, we exclude liability for any losses or damages which you may suffer, whether the same are suffered directly or indirectly or are immediate or consequential, which fall within any of the following categories:
                                                    <br /><br /> 12.5.1. special damage even though that party was aware of the circumstances in which such special damage could arise;
                                                    <br /><br /> 12.5.2. loss of anticipated savings;
                                                    <br /><br /> 12.5.3. loss of business opportunity and management time;
                                                    <br /><br /> 12.5.4. loss of goodwill;
                                                    <br /><br /> 12.5.5. loss of Cryptocurrency arising as a result of any of your acts or omissions of those of any third party;
                                                    <br /><br /> 12.5.5.1. loss arising out of or in connection with:
                                                    <br /><br /> 12.5.5.2. any defect or insecurity in any systems you use to store or transmit Cryptocurrency or to access or use the Website or the Service ;
                                                    <br /><br /> 12.5.5.3. any inaccurate or incomplete information you provide, including Cryptocurrency wallet addresses;
                                                    <br /><br /> 12.5.5.4. any changes to the amount of Cryptocurrency awarded to Miners;
                                                    <br /><br /> 12.5.5.5. any changes to the regulatory, legislative or technical environment applicable to Cryptocurrencies;
                                                    <br /><br /> 12.5.5.6. the acts or omissions of any bank or provider of banking services; or
                                                    <br /><br /> 12.5.5.7. any change in the value of Cryptocurrency howsoever arising (including as a result of the acts or omissions of Simplerigs).
                                                    <br /><br /> 12.6. To the maximum extent permitted by law, our aggregate liability in respect of any claims made in connection with or arising out of the use of the Website or the Service (whether in contract, tort (including negligence), breach of statutory duty, or otherwise) for direct losses will be limited to the Fees.
                                                    <br /><br /> 12.7. You agree not to use the Website or the Service in any way which:
                                                    <br /><br /> 12.7.1. is unlawful;
                                                    <br /><br /> 12.7.2. may give rise to civil or criminal liability for Simplerigs; or
                                                    <br /><br /> 12.7.3. may bring Simplerigs into disrepute.
                                                    <br /><br /> 12.8. You hereby agree to indemnify, defend and hold us and our officers, directors, owners, agents, information providers, affiliates, licensors and licensees (collectively, the "Indemnified Parties") harmless from and against any and all liability and costs (including reasonable legal fees) incurred by the Indemnified Parties in connection with any claim arising out of:
                                                    <br /><br /> 12.8.1. any fraud or fraudulent misrepresentation you commit;
                                                    <br /><br /> 12.8.2. any inaccuracy or defect of any of the information you have provided to us;
                                                    <br /><br /> 12.8.3. any breach of applicable law or regulation you commit;
                                                    <br /><br /> 12.8.4. any other person’s use of your Account;
                                                    <br /><br /> 12.8.5. any breach by you of these terms of service; and
                                                    <br /><br /> 12.8.6. third party claims arising from your use of the Website or the Service, any of Your Content or any use of your Account (whether or not such use was by you).
                                                    <br /><br /> 12.9. You shall cooperate with us in the defence of any claim. We reserve the right, at our own expense, to assume the exclusive defence and control of any matter otherwise subject to indemnification by you.
                                                </p>
                                                <h6 className='font-bold'>13. BREACH, SUSPENSION AND TERMINATION</h6><br />
                                                <p>13.1. Without limiting any other rights we have, we may suspend or terminate access to your Account, the Website and/or the Service, nullify your Account Balance and/or hold the ability to withdraw mined funds if you breach any of these Terms of Service.
                                                    <br /><br /> 13.2. If we have grounds to suspect that you are using the Website or the Service fraudulently or improperly, we will suspend your Account until you are able to demonstrate to our satisfaction:
                                                    <br /><br /> 13.2.1. your identity; and
                                                    <br /><br /> 13.2.2. that no fraud or impropriety has occurred or been attempted.
                                                    <br /><br /> 13.3. We will try to give you reasonable notice of any anticipated termination of the Website or the Service.
                                                    <br /><br /> 13.4. If you become aware of or suspect another user or Miner's breach of these terms of service, or any fraud or impropriety by another user, you must contact us immediately.
                                                    <br /><br /> 13.5. In case of any Credit Card purchase (refer to section 14.5.4.) Simplerigs has the right to place the Customer's Account on Hold (hold the ability to withdraw any mined funds from the Customer's Account Balance) for a period of up to 30 days as a security measure of anti-fraud related regulations and policies.
                                                </p>
                                                <h6 className='font-bold'>14. PAYMENT TERMS, ORDER CANCELLATION, ORDER CHANGES AND ORDER REFUNDS</h6><br />
                                                <p>14.1. All invoices are issued in USD (United States dollar) by default. Payments performed in any other currency must account for the exchange rate of said currency to USD at the moment of invoice generation and any commissions for currency exchange.
                                                    <br /><br /> 14.1.1. The Client will receive the original deposit back 365 days after the deposit is made. USD will be converted to Bitcoin at the end of the contract and will be refunded back to the Client’s Bitcoin wallet of choice.
                                                    <br /><br /> 14.2. A Customer is able to purchase a Contract using a variety of payment methods
                                                    <br /><br /> 14.3. A Customer has the right not to pay for the order in case the order has been created but not yet paid, if the Customer decides not to complete the order. The order will be expired after a given period of time (dependent on the payment method) and the Customer will not be obliged to proceed with the order. Simplerigs will not process requests to cancel unpaid orders, as it is intended the unpaid orders will be expired.
                                                    <br /><br /> 14.4. A Customer is solely responsible for the accuracy of payment, including but not limited to: the destination account, transferable amount and payment details:
                                                    <br /><br /> 14.4.1. If the transferred amount is below requested, Simplerigs reserves the right, at its sole discretion, to adjust the Contract accordingly to received funds or request the missing amount to be paid, before activating the Contract.
                                                    <br /><br /> 14.4.2. If the transferred amount is above requested, Simplerigs reserves the right, at its sole discretion, to adjust the Contract accordingly to received funds, add the excessive amount to Customer's Account Balance or return the excessive amount through the payment system the Customer has used to pay for the order initially.
                                                    <br /><br /> 14.4.3. If the Customer initiates the payment with incorrect/insufficient details and/or to the wrong destination account, Simplerigs will attempt, if possible, to process the order in a timely matter. If the destination address does not belong to Simplerigs (directly or via a third-party service) and/or is not related to Simplerigs in any way, Simplerigs will not be held responsible and will decline any claims.
                                                    <br /><br /> 14.4.4. Simplerigs is not obliged to proactively resolve payment related issues without a claim submitted by the Customer.
                                                    <br /><br /> 14.5. In case of payment related issues a claim must be raised:
                                                    <br /><br /> 14.5.1. A Customer has the right to raise a payment related claim/dispute by contacting support within 14 days from the creation of payment with proof of payment. Requests submitted after 14 days may not be processed.
                                                    <br /><br /> 14.5.2. Simplerigs reserves the right to request proof of payment, if there are suspicions or facts the payment was not received but the Contract was activated. The Customer is obliged to provide proof of payment within 14 days of reception of such request.
                                                    <br /><br /> 14.5.3. Proof of payment includes but is not limited to: Simplerigs order number, transaction ID or number, destination account, transferred amount, account statement from the payment system used.
                                                    <br /><br /> 14.5.4. Credit Card purchases may require proof of ownership of the payment method and an identification request.
                                                    <br /><br /> 14.5.5. If proof of payment is not provided within 14 days or provided proof is deemed insufficient and/or invalid:
                                                    <br /><br /> 14.5.5.1. if the claim was initiated by a Customer: Simplerigs reserves the right to decline Customer's claim(s);
                                                    <br /><br /> 14.5.5.2. if the claim was initiated by Simplerigs: Simplerigs reserves the right to adjust/cancel related Contracts and adjust Customer's Account Balance by amounts mined by related Contract.
                                                    <br /><br /> 14.6. Unless otherwise provided by law or by a particular offer, all purchases are final and non-refundable. Simplerigs reserves the right to issue refunds at Simplerigs sole discretion. If we issue a refund, we are under no obligation to issue the same or similar refund in the future. This refund policy does not affect any statutory rights that may apply.
                                                    <br /><br /> 14.7. In the case of a refund:
                                                    <br /><br /> 14.8.1. Customer will receive a reimbursement of spent funds to start the service, unless any funds were withdrawn from Customer's Account Balance. If any amount was successfully withdrawn from the Account Balance, no refund requests will be processed on said Account.
                                                    <br /><br /> 14.9.2. Simplerigs has the right to nullify or deduct any Hashrate and/or funds mined by the Hashrate of the refunded purchase from the Customer's Account Balance as well as any funds provided as a Referral Bonus for the refunded purchase from the Referrer's Account Balance.
                                                    <br /><br /> 14.9.3. Simplerigs is not obliged to reimburse any funds spent for the Maintenance and Electricity Fees.
                                                </p>
                                                <h6 className='font-bold'>15. COMMUNICATIONS</h6><br />
                                                <p>15.1. The Website may enable the display of third party content ("User Content").
                                                    <br /><br /> 15.2. Although we are not obliged to do so, we may remove or reject any User Content.
                                                    <br /><br /> 15.3. You agree that we may process and store any content you submit to the Website ("Your Content").
                                                    <br /><br /> 15.4. You may be able to send Your Content to other Miners of the Website, and other Miners of the Website may be able to send User Content to you.
                                                    <br /><br /> 15.5. You agree to the distribution of Your Content by us both internally and externally. Therefore, you should ensure that Your Content does not contain information, which you intend to keep confidential or private.
                                                    <br /><br /> 15.6. By making available, posting or transmitting Your Content to the Website, you are granting us a non-exclusive, transferable, sub-licensable, royalty-free, irrevocable, perpetual worldwide license to use and exploit Your Content for any purpose.
                                                    <br /><br /> 15.7. You agree that you are entitled to make available, post or transmit Your Content to the Website.
                                                    <br /><br /> 15.8. You will not make available, post or transmit to the Website any statement, material or other content, nor use the Website in any way, that:
                                                    <br /><br /> 15.8.1. is unlawful or may give rise to civil or criminal liability;
                                                    <br /><br /> 15.8.2. infringes any copyright or other intellectual property rights of any third party;
                                                    <br /><br /> 15.8.3. infringes any third party's rights of privacy or rights of publicity;
                                                    <br /><br /> 15.8.4. includes any computer virus or other malicious software;
                                                    <br /><br /> 15.8.5. is abusive, pornographic, defamatory, discriminatory or obscene;
                                                    <br /><br /> 15.8.6. harasses any other person;
                                                    <br /><br /> 15.8.7. interferes with another user's use and enjoyment of the Website;
                                                    <br /><br /> 15.8.8. impersonates any moderator, administrator or any staff or any other person connected with Simplerigs;
                                                    <br /><br /> 15.8.9. contains the confidential information of any other person;
                                                    <br /><br /> 15.8.10. solicits passwords or personal information;
                                                    <br /><br /> 15.8.11. contains video, photographs, or images of any other person without his or her permission (or in the case of a minor, the minor's legal guardian);
                                                    <br /><br /> 15.8.12. exploits any other person;
                                                    <br /><br /> 15.8.13. we consider inappropriate; or
                                                    <br /><br /> 15.8.14. encourages or provokes any other person to do any of the acts listed above.
                                                    <br /><br /> 15.9. The Website may provide means by which you can communicate with us. We will communicate with you at the email address you have provided or through other means of communication that may be provided by the Website. Notices that are applicable to all our Miners shall be made available on the Website publicly. You will be deemed to have received a notice at the time the email is sent or the time the notice is posted on the Website. We will be deemed to have received a notice when we issue a confirmation to you.
                                                    <br /><br /> 15.10. All emails (or other messages) we send are intended for the addressee only.
                                                </p>
                                                <h6 className='font-bold'>16 . Confidentiality</h6><br />
                                                <p>16.1 The customer should not disclose any information, related to the Company, including but not limited to information on accounts, operations, clients of the Company, accounts opened for the clients, balance and operations on the accounts of clients and any other information related to the clients of the Company and their activity, information on shareholders, managers, employees of the Company, its affiliates, partners and contractors, any agreements concluded between Company and any other party, its projects and products, marketing strategies and plans, financial information and statements, and any other information that should be reasonably recognised as confidential in accordance with applicable legislation.
                                                    <br /><br /> 16.2 In case of forced disclosure of the information listed here above on demand of governmental and regulating authorities, customer shall inform the Company on the day of receiving the appropriate request.
                                                    <br /><br /> 16.3 In case of unauthorised disclosure of the aforementioned information or any other violation of this confidentiality provision by the customer, the Company has the right to terminate the Agreement and to close the account without any prior notices and with immediate effect.
                                                </p>
                                                <h6 className='font-bold'>17. GENERAL</h6><br />
                                                <p>17.1. These terms of service are subject to your statutory and common law consumer rights and will not limit any rights you might have that cannot be excluded under applicable law. These terms of service will not exclude or limit our liability for death or personal injury resulting from our negligence nor any fraudulent acts or representations or for any statutory liability not capable of limitation.
                                                    <br /><br /> 17.2. We may deduct any monies you owe us from any monies we owe you.
                                                    <br /><br /> 17.3. These terms of service, together with the terms of use, privacy policy and any instructions, guidance and similar information found on the Website (from time to time), constitute the entire agreement between you and Simplerigs relating to your use of the Website and the Service and mining through the Website or the Service, to the exclusion of any other terms.
                                                    <br /><br /> 17.4. Our failure to enforce any term does not constitute our waiver of that term.
                                                    <br /><br /> 17.5. If any part of these Terms is found to be unenforceable, it will be amended to the minimum extent necessary to make it enforceable and the remainder of the provisions will remain in full force and effect.
                                                    <br /><br /> 17.6. No representation or warranty is made as to whether the Website or the Service complies with the laws of any jurisdiction other than SAR Hong Kong.
                                                    <br /><br /> 17.7. The parties submit to the exclusive jurisdiction of the SAR Hong Kong courts. These terms of service are subject to and interpreted in accordance with the laws of SAR Hong Kong, provided that these terms of service shall not be interpreted as conferring any statutory EU consumer protection laws, including any rights of withdrawal or cancellation under implementations of Directive 2011/83/EU on consumer rights, on any individual not ordinarily a resident of an EU Member State.
                                                    <br /><br /> 17.8. This Website the Dashboard are presented in multiple languages. In the case of a conflict between translations, the English version will prevail.
                                                    <br /><br /> 17.9. Simplerigs will be entitled to assign and otherwise transfer the agreement covered by these terms of service by giving you reasonable notice, which may include notice given via the Website.
                                                    <br /><br /> 17.10. All questions, comments or complaints should be directed to us via Customer Support and we will try to respond to within 48 hours.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='lg:block hidden items-center justify-end hover:text-[#429763]'>
                                <div className="bg-[#429763] rounded-[10px] font-montserrat text-[#fff] font-[500] font-montserrat border-[2px] border-[#429763] hover:bg-opacity-70 transition duration-300">
                                    <Link to='/profile' className='profile_icon no-underline flex items-center py-[1vh] px-[1vw] text-[18px] font-[500] space-x-[10px]'>
                                        <p className='mb-0'>{firstName} {lastName}</p>
                                        <BiUserCircle className='w-[1.8vw] h-[2.5vh]' />
                                    </Link>
                                </div>
                            </div>
                            <div className="checkout-truck">
                                <img src={CheckoutTruck} alt="truck" />
                            </div>
                        </div>
                        <img className='lg:hidden block mt-[-45px] bottom-0 left-0 w-[100vw]' alt='Mobile page back' src={MobilePagesBack}/>
                    </div>
                </>
            }
            {MobileSidebar &&
                <MobSidebar SidbarTitle="Terms" NavigationLink="/terms" MobileSidebar={MobileSidebar} setMobileSidebar={setMobileSidebar} />
            }
        </>
    )
}

export default Terms