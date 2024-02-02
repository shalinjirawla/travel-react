import React from 'react';
import { Card, Checkbox } from 'antd';
import './bill.css'
import AppButton from '../../AppButton';

const Cancellation = ({ isDetailsVisible, setIsDetailsVisible, setIsAddons }) => {

  const handleToggleCard = () => {
    setIsDetailsVisible(!isDetailsVisible);
    setIsAddons(false);
  };

  return (
    <>
      <div className='hide-cancelation'>
        {!isDetailsVisible && (
          <Card className='card'>
            <div className='hide-ticket'>
              <p className='pin'>ZERO CANCELLATION & FREE DATE CHANGE</p>
              <p className='hide-edit' onClick={handleToggleCard}>edit</p>
            </div>
          </Card>
        )}
      </div>
      {isDetailsVisible && (
        <Card className='card'>
          <div className='main1'>
            <div>
              <p className='cancle-information'>Full refund with Zero Cancellation</p>
              <p className='cancle-charge'>Cancel for any reason, within 24 hrs of departure, ie. before <strong><u>20 Jan, 04:20</u></strong> to get a refund up to <strong>₹3246.</strong></p>
            </div>
            <AppButton className='appPrimaryButton cancelatiobn-button' label='Buy for 1085₹' />
            <hr />
            <div>
              <p className='cancle-information'>Buy Date Change Protect Plus </p>
              <p className='cancle-charge'>Save <strong>₹3546</strong> in penalties on rescheduling anytime up to <strong>2 hours</strong> before departure, with travel assistance.</p>
            </div>
            <div>
              <Checkbox className='checkbox' >Buy for <strong>₹560</strong> (all passengers included)</Checkbox>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

export default Cancellation;