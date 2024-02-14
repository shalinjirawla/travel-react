import React, { useEffect, useState } from 'react'
import Location from './Location'
import './train.css';
import Details from './Details';
import Sent from './Sent';
import Refund from './Refund';
import Check from './Check';
import { Button, Col, Form, Popover, Row } from 'antd';
import Id from './Id';
import TrainFair from './TrainFair';

const Bill = () => {
  const [showFareSummary, setShowFareSummary] = useState(window.innerWidth > 1174);
  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setShowFareSummary(window.innerWidth > 1174);
  };
  const handleShowFareSummary = () => {
    setPopoverVisible(!popoverVisible);
  };

  return (
    <>
      <div className={`back1 ${popoverVisible ? 'blur-train' : ''}`}>
        <div className='backHeading flightBackgroud-1 '>
          <h1 className='h1'>12901, Gujrat Mail</h1>
          <p className='header-p'>Sleeper (SL) | General Quota</p>
        </div>
      </div>
      <div className={`train-main ${popoverVisible ? 'blur-train' : ''}`}>
        <Row align='top'>
          <Col xl={showFareSummary ? 17 : 24} lg={showFareSummary ? 17 : 24} md={showFareSummary ? 17 : 24} sm={showFareSummary ? 17 : 24} xs={showFareSummary ? 17 : 24}>
            <Location />
            <Id />
            <Details />
            <Refund />
            <Sent />
            <Check />
          </Col>
          {showFareSummary && (
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <TrainFair />
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
              className='train-popover'
              content={<TrainFair />}
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
  )
}

export default Bill;