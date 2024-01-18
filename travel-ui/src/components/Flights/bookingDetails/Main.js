import React from 'react'
import Ticket from './Ticket'
import Cancellation from './Cancellation'
import State from './State'

import Details from './Details'
import './bill.css';

const Main = () => {
  return (
    <>
      <Ticket />
      <div className='main-2'>
        <Cancellation />
        <State />
        <Details />
      </div>
    </>
  )
}

export default Main
