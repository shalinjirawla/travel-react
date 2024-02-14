import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import Cancellation from './Cancellation';
import State from './State';
import Details from './Details';
import Seat from './Seat';
import FareSummery from './FareSummary';
import { Row, Col, Button, Popover } from 'antd';
import { useLocation } from 'react-router-dom';
import './bill.css';

const Main = () => {
  const location = useLocation();
  const { travellers } = location?.state ?? {};
  const [isAddons, setIsAddons] = useState(false);
  const [showFareSummary, setShowFareSummary] = useState(window.innerWidth > 992);
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleResize = () => {
    setShowFareSummary(window.innerWidth > 992);
  };

  const handleShowFareSummary = () => {
    setPopoverVisible(!popoverVisible);
  };

  return (
    <>
      <div className={`flightBackgroud reviewBackground ${popoverVisible ? 'blur' : ''}`}></div>
      <h1 className={`backHeading1 ${popoverVisible ? 'blur' : ''}`}>Review your booking</h1>
      <div className={`flight-main-class ${popoverVisible ? 'blur' : ''}`}>
        <Row align='top'>
          <Col xl={showFareSummary ? 17 : 24} lg={showFareSummary ? 17 : 24} md={showFareSummary ? 17 : 24} sm={showFareSummary ? 17 : 24} xs={showFareSummary ? 17 : 24}>
            <Ticket setIsAddons={setIsAddons} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
            <Cancellation isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} setIsAddons={setIsAddons} />
            <State setIsAddons={setIsAddons} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
            <Details travellers={travellers} isAddons={isAddons} setIsAddons={setIsAddons} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
            <Seat travellers={travellers} isAddons={isAddons} setIsAddons={setIsAddons} />
          </Col>
          {showFareSummary && (
            <Col xl={7} lg={7} md={7} sm={7} xs={7}>
              <FareSummery />
            </Col>
          )}
        </Row>
      </div>

      {!showFareSummary && (
        <div className='fixedButtonContainer'>
          <div className='fare-summery-main'>
            <p className='total-price all'>Total-Price</p>
            <p className='price all'>₹1560</p>
          </div>
          <div className=''>
            <Popover
              content={<FareSummery />}
              trigger="click"
              open={popoverVisible}
              onOpenChange={setPopoverVisible}
              placement="topRight"
            >
              <Button type="primary" onClick={handleShowFareSummary}>Show Fare Summary</Button>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;