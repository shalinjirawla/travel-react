import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Ticket from './Ticket';
import State from './State';
import Details from './Details';
import './bill.css';
import Seat from './Seat';
import Cancellation from './Cancellation';
import { Col, Row } from 'antd';
import FareSummary from './FareSummary';

const Main = () => {
  const location = useLocation();
  const { travellers, flightData } = location?.state ?? {};
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [isAddons, setIsAddons] = useState(false);

  const handleProceedClick = () => {
    alert('Proceed button clicked. Hiding components now.');
  };

  return (
    <>
      <div className='flightBackgroud reviewBackground'></div>
      <h1 className='backHeading1'>Review your booking</h1>
      <div className='flight-main-class'>
        <Row align='top'>
          <Col xl={16} lg={16} md={16} sm={16} xs={16}>
            <Ticket setIsAddons={setIsAddons} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
            <Cancellation isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} setIsAddons={setIsAddons} />
            <State setIsAddons={setIsAddons} handleProceedClick={handleProceedClick} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
            <Details travellers={travellers} isAddons={isAddons} setIsAddons={setIsAddons} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} handleProceedClick={handleProceedClick} />
            <Seat travellers={travellers} isAddons={isAddons} setIsAddons={setIsAddons} />
          </Col>
          <Col xl={8} lg={8} md={8} sm={8} xs={8}>
            <FareSummary />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Main;