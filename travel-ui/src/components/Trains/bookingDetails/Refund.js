import React from 'react'
import { Card,Radio } from 'antd';

const Refund = () => {
  return (
    <>
        <Card className='card-1'>
        <div className='cancle'>    
            <div className='header'>
                <div className='h1'>
                    <img src='https://gos3.ibcdn.com/getFullRefund-1676032541.svg' />
                </div>
                <div className='photo'>
                    <h3 className='h3'>Get full refund on cancellation</h3>
                    <p className='refund'>Cancel anytime and avail full refund</p>
                </div>
            </div>
            <div className='check1'>
                    <Radio className='radio'>Zero cancellation charges when the ticket is cancelled</Radio><span className='s'>(₹48 / person, Approx refund ₹320)</span>
                    <Radio className='radio'>No, I don't want free cancellation.</Radio>
                </div>
                <div className='footer-1'>
                    <p className='footer-p'>Free cancellation valid before chart preparation.<p className='know-more'>know more</p></p>
                </div>    
            </div>
    </Card>
    </>
  )
}

export default Refund