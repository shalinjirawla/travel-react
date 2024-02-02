import React from 'react';
import { Card } from 'antd';
import './bill.css';
import { useLocation } from 'react-router-dom';
import { airportData } from '../../../JSON/airports';
import { DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const Ticket = ({ isDetailsVisible, setIsDetailsVisible, setIsAddons }) => {

  const location = useLocation();
  const { flightData, travellerData, flightDetails } = location?.state ?? {};

  const handleToggleCard = () => {
    setIsDetailsVisible(!isDetailsVisible);
    setIsAddons(false);
  };

  return (
    <>
      {!isDetailsVisible && (
        <Card className='card' >
          <div className='hide-header'>
            <p className='pin-1'>Ticket Details</p>
            <p className=
              {isDetailsVisible ? 'sign-up' : 'sign-down'}
              onClick={handleToggleCard}>
              <DownOutlined className='sign' />
            </p>
          </div>
          {!isDetailsVisible && (
            <Card className='inside-ticket-card all'>
              <div className='ticket-details'>
                <div className='hide-ticket'>
                  <p className='hide-left'>23 Feb, Fri 2024</p>
                  <div className='hide-div'>
                    <p className='hide-city all'>AMD</p>
                    <p className='hide-time all'>06:40</p>
                  </div>
                  <p className='time all'>1h 20m</p>
                  <div className='hide-div'>
                    <p className='hide-time all'>07:40</p>
                    <p className='hide-city all'>BOM</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      )}
      {isDetailsVisible && (
        <Card className='card'>
          <div className='logo'>
            <p className='flight all'>{flightData?.legsDetails?.segments[0]?.airlineCode} | {flightData?.code}</p>
            <p className='flight all'>
              ECONOMY | <span style={{ color: 'black', fontWeight: '700' }}>SAVER</span>
            </p>
          </div>
          <div className='date all'>
            <p className="colored-p">Starts on - <strong>{dayjs(new Date(flightData?.legsDetails?.departureDateTime)).format('ddd, DD MMM YYYY')}</strong></p>
            <p className="colored-p">Arrive on - <strong>{dayjs(new Date(flightData?.legsDetails?.arrivalDateTime)).format('ddd, DD MMM YYYY')}</strong></p>
          </div>
          <div className='date all'>
            <p className="colored-v all">
              <strong>{flightData?.legsDetails?.departureTime}</strong> <br />
              {flightData?.legsDetails?.segments[0]?.departureAirportCode}
            </p>
            <div className="arrew">
              <div className="arrow-start"></div>
              <hr className="dashed-hr" />
              <span className="bold-text">{flightData?.legsDetails?.duration}</span>
              <hr className="dashed-hr" />
              <div className="arrow-end"></div>
            </div>
            <hr style={{ display: 'none' }} />
            <p className="colored-v all">
              <strong>{flightData?.legsDetails?.arrivalTime}</strong> <br />
              {flightData?.legsDetails?.segments[0]?.arrivalAirportCode}
            </p>
          </div>
          <div className='date all'>
            <p className='all'><strong>{airportData.find(o => o.code === flightData?.legsDetails?.segments[0]?.departureAirportCode)?.label}</strong> <br /><span className='spanPara'>Sardar Vallabhbhai Patel International Airport, India</span> <br /><span className='terminal'>Terminal-1</span></p>
            <p className='all'><strong>{airportData.find(o => o.code === flightData?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</strong> <br /><span className='spanPara'>Chhatrapati Shivaji International Airport, India</span> <br /><span className='terminal'>Terminal-1</span></p>
          </div>
          <hr />
          <div>
            <p className='spanPara'>Baggage - <strong>7 Kgs</strong> Cabin <strong>15 Kgs(1 Piece x 15 Kgs)</strong> Check-In</p>
          </div>
        </Card>
      )}
    </>
  );
};

export default Ticket;