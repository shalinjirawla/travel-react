import { Card } from 'antd';
import React from 'react';
import './train.css';

const Payment = () => {
    return (
        <>
            <Card className='div'>
                <div className='card-3-main-1'>
                    <div className='card-3-main-2'>
                        <p className='basefare'><span className='span-1'>Base Fare</span> per person</p>
                        <p className='price'>₹320</p>
                    </div>
                    <button className='btn-5 '>
                        <p className='payment'>Proceed to Payment</p>
                    </button>
                </div>
                <div className='basefare-footer'>
                    <p className='agree'>By proceeding to payment, I confirm that I agree to the<a className='aa' href='Cancellation Policy'>Cancellation Policy</a> and <a className='aa' href='Terms of Service'>Terms of Service</a>.</p>
                </div>
            </Card>
        </>
    )
}

export default Payment;