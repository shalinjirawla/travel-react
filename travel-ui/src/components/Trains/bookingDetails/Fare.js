import { Card } from 'antd'
import React from 'react'
import './train.css';
import TextInput from '../../TextInput';

const Fare = () => {
  return (
    <>
      <Card className='div'>
        <div className='add-1'>
          <p className='offers'>Offers & Discounts</p>
          <div className='train-fair'>
            <TextInput
              type='text'
              name='userName'
              placeholder='Enter a coupon code'
              className='add coupon-input'
            />
          </div>
          <a className='apply coupon-link' href='apply'>Apply</a>
        </div>
      </Card>
    </>
  )
}

export default Fare;