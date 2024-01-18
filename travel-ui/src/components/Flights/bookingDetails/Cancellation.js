import React from 'react';
import { Card, Checkbox } from 'antd';
import './bill.css'
import AppButton from '../../AppButton';

const Cancellation = () => {
  return (
    <>
      <Card className='card'>
        <div className='main1'>
          <div>
            <p className='erew'>Full refund with Zero Cancellation</p>
            <p className='ere'>Cancel for any reason, within 24 hrs of departure, ie. before <strong><u>20 Jan, 04:20</u></strong> to get a refund up to <strong>₹3246.</strong></p>
          </div>
          <AppButton className='appButton1' label='Buy for 1085₹' />
          <hr />
          <div>
            <p className='erew'>Buy Date Change Protect Plus </p>
            <p className='ere'>Save <strong>₹3546</strong> in penalties on rescheduling anytime up to <strong>2 hours</strong> before departure, with travel assistance.</p>
          </div>
          <div>
            <Checkbox className='checkbox' style={{marginTop : '1%',fontSize:'16px'}}>Buy for <strong>₹560</strong> (all passengers included)</Checkbox>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Cancellation;
