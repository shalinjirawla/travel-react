import React from 'react'
import Location from './Location'
import'./train.css';
import Details from './Details';
import Sent from './Sent';
import Refund from './Refund';
import Check from './Check';



const Bill = () => {
  return (
    <div>
        <Location />
        <Details />
        <Refund />
        <Sent />
        <Check />
    </div>
  )
}

export default Bill