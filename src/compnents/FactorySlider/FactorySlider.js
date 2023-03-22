import React, { useEffect } from 'react'
import GreenTractor from '../../assets/images/green-tractor.png'
import YellowTractor from '../../assets/images/yellow-tractor1.png'
import YellowTractor2 from '../../assets/images/yellow-tractor2.png'
import RedTractor from '../../assets/images/red-tractor1.png'
import RedTractor2 from '../../assets/images/red-tractor2.png'

const StarterFactory = () => {
    return (
        <>
            {/* Calculator Section */}
            <div className="w-[90%] lg:w-[55%] md:w-[80%] font-rajdhani shadow-[0px_4px_44px_rgb(0,0,0,0.2)]">
                <div className="flex md:flex-row flex-col space-y-[20px] md:justify-between py-[14px] px-[23px] md:py-[2vh] md:pr-[2vh] md:pl-[2.5vw] rounded-[10px] bg-[#F5F2C4]" >
                    <div className="basis-[40%] pt-[0.8vh]">
                        <h2 className='text-[#449552] md:text-[24px] font-[700] font-Rajdhani'>Choose your Desired Tractor</h2>
                        <div className='flex md:flex-col  gap-4'>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">Investment in $</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="$250" readOnly/>
                            </div>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">POWER</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="4000 GH/s" readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[55%]">
                        <div className="relative flex bg-[#EFE04B] bg-opacity-[39%] py-[20px] pl-[20px] pr-[10px] md:py-[3vh] md:pr-[1.6vw] md:pl-[2.5vw]">
                            <div className="">
                                <div className="font-rajdhani">
                                    <p className='font-[700] text-[18px] md:text-[24px] mb-[17px]'>CALCULATOR</p> 
                                    <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Daily Income</p>
                                    <p className='font-[700] md:text-[24px]'>$1</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Monthly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$30</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Yearly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$360</p>
                                </div> 
                            </div>
                            <div className="absolute right-[16px] bottom-[16px]">
                                <img alt="" className="w-[128px] h-[90px] lg:w-[15vw] lg:h-[18vh] md:w-[150px] md:h-[130px]" src={GreenTractor}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AdvanceFactory = () => {
    return (
        <>
            {/* Calculator Section */}
            
            <div className="w-[90%] lg:w-[55%] md:w-[80%] font-rajdhani shadow-[0px_4px_44px_rgb(0,0,0,0.2)]">
                <div className="flex md:flex-row flex-col space-y-[20px] md:justify-between py-[14px] px-[23px] md:py-[2vh] md:pr-[2vh] md:pl-[2.5vw] rounded-[10px] bg-[#F5F2C4]" >
                    <div className="basis-[40%] pt-[0.8vh]">
                        <h2 className='text-[#449552] md:text-[24px] font-[700] font-Rajdhani'>Choose your Desired Tractor</h2>
                        <div className='flex md:flex-col  gap-4'>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">Investment in $</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="$1000" readOnly/>
                            </div>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">POWER</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="16000 GH/s" readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[55%]">
                        <div className="relative flex bg-[#EFE04B] bg-opacity-[39%] py-[20px] pl-[20px] pr-[10px] md:py-[3vh] md:pr-[1.6vw] md:pl-[2.5vw]">
                            <div className="">
                                <div className="font-rajdhani">
                                    <p className='font-[700] text-[18px] md:text-[24px] mb-[17px]'>CALCULATOR</p> 
                                    <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Daily Income</p>
                                    <p className='font-[700] md:text-[24px]'>$4</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Monthly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$120</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Yearly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$1440</p>
                                </div> 
                            </div>
                            <div className="absolute right-[16px] bottom-[16px]">
                                <img alt="" className="w-[160px] h-[95px] lg:w-[15vw] lg:h-[18vh] md:w-[170px] md:h-[130px]" src={YellowTractor}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const PremiumFactory = () => {
    return (
        <>
            {/* Calculator Section */}

            <div className="w-[90%] lg:w-[55%] md:w-[80%] font-rajdhani shadow-[0px_4px_44px_rgb(0,0,0,0.2)]">
                <div className="flex md:flex-row flex-col space-y-[20px] md:justify-between py-[14px] px-[23px] md:py-[2vh] md:pr-[2vh] md:pl-[2.5vw] rounded-[10px] bg-[#F5F2C4]" >
                    <div className="basis-[40%] pt-[0.8vh]">
                        <h2 className='text-[#449552] md:text-[24px] font-[700] font-Rajdhani'>Choose your Desired Tractor</h2>
                        <div className='flex md:flex-col gap-4'>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">Investment in $</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="$5000" readOnly/>
                            </div>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">POWER</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="80000 GH/s" readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[55%]">
                        <div className="relative flex bg-[#EFE04B] bg-opacity-[39%] py-[20px] pl-[20px] pr-[10px] md:py-[3vh] md:pr-[1.6vw] md:pl-[2.5vw]">
                            <div className="">
                                <div className="font-rajdhani">
                                    <p className='font-[700] text-[18px] md:text-[24px] mb-[17px]'>CALCULATOR</p> 
                                    <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Daily Income</p>
                                    <p className='font-[700] md:text-[24px]'>$20</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Monthly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$600</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Yearly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$7200</p>
                                </div> 
                            </div>
                            <div className="absolute right-[16px] bottom-[16px]">
                                <img alt="" className="w-[193px] h-[90px] lg:w-[18vw] lg:h-[15vh] md:w-[170px] md:h-[130px]" src={RedTractor}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ProfessionalFactory = () => {
    return (
        <>
            {/* Calculator Section */}

            <div className="w-[90%] lg:w-[55%] md:w-[80%] font-rajdhani shadow-[0px_4px_44px_rgb(0,0,0,0.2)]">
                <div className="flex md:flex-row flex-col space-y-[20px] md:justify-between py-[14px] px-[23px] md:py-[2vh] md:pr-[2vh] md:pl-[2.5vw] rounded-[10px] bg-[#F5F2C4]" >
                    <div className="basis-[40%] pt-[0.8vh]">
                        <h2 className='text-[#449552] md:text-[24px] font-[700] font-Rajdhani'>Choose your Desired Tractor</h2>
                        <div className='flex md:flex-col  gap-4'>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">Investment in $</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="$10000" readOnly/>
                            </div>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">POWER</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="160000 GH/s" readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[55%]">
                        <div className="relative flex bg-[#EFE04B] bg-opacity-[39%] py-[20px] pl-[20px] pr-[10px] md:py-[3vh] md:pr-[1.6vw] md:pl-[2.5vw]">
                            <div className="">
                                <div className="font-rajdhani">
                                    <p className='font-[700] text-[18px] md:text-[24px] mb-[17px]'>CALCULATOR</p> 
                                    <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Daily Income</p>
                                    <p className='font-[700] md:text-[24px]'>$40</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Monthly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$1200</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Yearly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$14400</p>
                                </div> 
                            </div>
                            <div className="absolute right-[16px] bottom-[16px]">
                                <img alt="" className="w-[167px] h-[82px] lg:w-[15vw] lg:h-[15vh] md:w-[170px] md:h-[130px]" src={YellowTractor2}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const BossFactory = () => {
    return (
        <>
            {/* Calculator Section */}

            <div className="w-[90%] lg:w-[55%] md:w-[80%] font-rajdhani shadow-[0px_4px_44px_rgb(0,0,0,0.2)]">
                <div className="flex md:flex-row flex-col space-y-[20px] md:justify-between py-[14px] px-[23px] md:py-[2vh] md:pr-[2vh] md:pl-[2.5vw] rounded-[10px] bg-[#F5F2C4]" >
                    <div className="basis-[40%] pt-[0.8vh]">
                        <h2 className='text-[#449552] md:text-[24px] font-[700] font-Rajdhani'>Choose your Desired Tractor</h2>
                        <div className='flex md:flex-col  gap-4'>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">Investment in $</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="$50000" readOnly/>
                            </div>
                            <div className="mt-[1.8vh]">
                                <label className='text-[#595A5B] md:text-[24px] font-[700] mb-[5px]' htmlFor="">POWER</label>
                                <input type="text" className="bg-[#fff] border-[0px] font-montserrat md:text-[18px] py-[14px] px-[11px] md:py-[1.7vh] md:px-[1.4vw] opacity-70 rounded-[5px] w-full focus:outline-none" value="800000 GH/s" readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[55%]">
                        <div className="relative flex bg-[#EFE04B] bg-opacity-[39%] py-[20px] pl-[20px] pr-[10px] md:py-[3vh] md:pr-[1.6vw] md:pl-[2.5vw]">
                            <div className="">
                                <div className="font-rajdhani">
                                    <p className='font-[700] text-[18px] md:text-[24px] mb-[17px]'>CALCULATOR</p> 
                                    <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Daily Income</p>
                                    <p className='font-[700] md:text-[24px]'>$200</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px]lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Monthly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$6000</p>
                                </div> 
                                <div className="font-rajdhani">
                                <p className='text-[#595A5B] text-[14px] lg:text-[0.8vw] md:text-[15px] font-[600] font-montserrat mb-0'>Yearly Income</p>
                                <p className='font-[700] text-[18px] md:text-[24px]'>$72000</p>
                                </div> 
                            </div>
                            <div className="absolute md:right-[16px] bottom-[16px] right-[8px]">
                                <img alt="" className="w-[160px] h-[75px] lg:w-[16vw] lg:h-[15vh] md:w-[170px] md:h-[130px]" src={RedTractor2}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {StarterFactory, AdvanceFactory, PremiumFactory, ProfessionalFactory, BossFactory}