import React, { useState } from 'react';
import { Card, Radio, Space } from 'antd';

const Refund = () => {
    const [value, setValue] = useState(1);
    
    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Card className='card-refund'>
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
                    <div className='check1 '>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                <Radio value={1} ><p className='radio-1 all'>Zero cancellation charges when the ticket is cancelled</p><span className='cancelation-refund'>(₹116 / person, Approx refund ₹685)</span></Radio>
                                <Radio value={2}><p className='radio-1'>No, I don't want free cancellation.</p></Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='footer-cancelation'>
                        <p className='footer-cancellation-details'>Free cancellation valid before chart preparation.<p className='know-more'>know more</p></p>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Refund;