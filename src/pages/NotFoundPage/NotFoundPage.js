import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/404.webp'
class NotFoundPage extends React.Component{
    render(){
        return <div className='h-[100vh] flex justify-center items-center flex-column'>
            <p className="mb-[0] text-[30px] lg:text-[3vw] font-[700] font-montserrat">SIMPLE&nbsp;<span className='text-[#449552]'>RIGS</span>&nbsp;</p>
            <img src={PageNotFound}  />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;