import React from 'react'
import { Modal } from "react-bootstrap"
import { Link } from 'react-router-dom';
import './plans.css'

const Plans = ({ data }) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const planClick = () => {
        setShow(true);
    }
  return (
    <>
        <div className="plan">
            <svg id="plan" viewBox="0 0 562 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" fill={data.color} d="M517.893 181.449H526.201C533.601 181.449 539.601 175.649 539.701 168.549L561.101 13.0489C561.101 5.94889 555.001 0.148926 547.601 0.148926H13.501C6.00098 0.148926 0.000976562 5.94889 0.000976562 13.0489L21.301 168.549C21.301 175.649 27.401 181.449 34.801 181.449H42.9308C108.028 165.167 190.631 155.449 280.501 155.449C370.289 155.449 452.823 165.194 517.893 181.449Z" />
            </svg>
            <div className="plan-content" onClick={planClick}>
                <div className="plan-text">
                    <p>{data.planTitle}</p>
                    {/* <p>{data.planNumber}</p> */}
                </div>
                <div className="plan-text">
                    <p>NO.AVL</p>
                    <p>{data.no}</p>
                </div>
            </div>
        </div>
        <Modal show={show} className="plan-modal" onHide={handleClose}>
            <Modal.Header closeButton>
                <div className="d-flex modal-header-inner">
                    <div className="modal-header-left">
                        <h4>{data.planTitle}</h4>
                        {/* <h4 className="number">{data.planNumber}</h4> */}
                    </div>
                    <div className="modal-header-right">
                        <h4>NO.AVL</h4>
                        <h4 className="number">{data.no}</h4>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>
                        <h5>Average Daily Income</h5>
                        <h4>{Number(((data.balance * data.daily_pro)/100).toFixed(6))} BTC</h4>
                    </li>
                    <li>
                        <h5>Average Monthly Income</h5>
                        <h4>{Number(((data.balance * data.monthly_pro)/100).toFixed(6))} BTC</h4>
                    </li>
                    <li>
                        <h5>Average Yearly Income</h5>
                        <h4>{Number(((data.balance * data.yearly_pro)/100).toFixed(6))} BTC</h4>
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer>    
                <div className="modal-footer-inner">
                    <div >
                        <h5>Balance</h5>
                        <h4>{data.balance} BTC</h4>
                    </div>
                    <div >
                        <h5>Power</h5>
                        <h4>{data.balance * 16} GH/s</h4>
                    </div>
                    <div>
                        <h5>Date of Purchase</h5>
                        <h4>{data.deposit_date}</h4>
                    </div>
                </div>
                <div className="plan-withdraw-btn-wrap">
                    <Link to="/withdraw">WITHDRAW<span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>    
                    </span></Link>
                </div>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default Plans