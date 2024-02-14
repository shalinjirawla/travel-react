import React from 'react'
import { Card } from 'antd';

const Cardd = () => {
    return (
        <>
            <div className='card'>
                <Card className='div'>
                    <div className='jay'>
                        <p className='offer'>Offers & Discounts</p>
                        <div className='add-1'>
                            <p className='p12'>Enter a coupon code<a className='' href='active'>Apply</a></p>
                            <a href='apply'>Apply</a>
                        </div>
                    </div>
                </Card>
                <Card className='div'>
                    <div className='card-3-main-1'>
                        <div className='card-3-main-2'>
                            <p className='p9'><span className='span-1'>Base Fare</span> per person</p>
                            <p className='p10'>320</p>
                        </div>
                        <button className='btn-5'>
                            <p className='p-11'>Proceed to Payment</p>
                        </button>
                    </div>
                    <div className='card-3-main-3'>
                        <p className='p-12'>By proceeding to payment, I confirm that I agree to the<a className='a' href='Cancellation Policy'>Cancellation Policy</a> and <a className='a' href='Terms of Service'>Terms of Service</a>.</p>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Cardd