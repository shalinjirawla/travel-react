import React from 'react';
import { Card } from 'antd';
import './bill.css';

const Ticket = () => {
  return (
    <>
      <div className='container'>
        <div className='back'>
          <h1 className='backHeading1'>Review your booking</h1>
        </div>
        <div className='main'>
          <Card className='cardPadding'>
            <div className='logo'>
              <p className='flight'>
                Indigo | 6E 5182
              </p>
              <p className='flight'>ECONOMY | <span style={{color: 'black',fontWeight: '700'}}>SAVER</span></p>
            </div>
            <div className='date'>
              <p className="colored-p">Starts on - <strong>21 Jan, Sun 2024</strong></p>
              <p className="colored-p">Arrive on - <strong>21 Jan, Sun 2024</strong></p>
            </div>
            <div className='date'>
              <p className="colored-v"><strong>04:20</strong><br />AMD</p>
              <div className="arrew">
                <div className="arrow-start"></div>
                <hr className="dashed-hr" />
                <span className="bold-text">1h 35m</span>
                <hr className="dashed-hr" />
                <div className="arrow-end"></div>
              </div>
              <hr style={{ display: 'none' }} />
              <p className="colored-v"><strong>05:35</strong><br />BOM</p>
            </div>
            <div className='date'>
              <p className='ahm'><strong>Ahmedabad</strong> <br /><span className='spanPara'>Sardar Vallabhbhai Patel International Airport, India</span> <br /><span className='terminal'>Terminal-1</span></p>
              <p className='ahm'><strong>Mumbai</strong> <br /><span className='spanPara'>Chhatrapati Shivaji International Airport, India</span> <br /><span className='terminal'>Terminal-1</span></p>
            </div>
            <hr />
            <div>
              <p className='spanPara'>Baggage - <strong>7 Kgs</strong> Cabin <strong>15 Kgs(1 Piece x 15 Kgs)</strong> Check-In</p>
            </div>
            <div className='empty' />
          </Card>
          <Card className='card1'>
            <div className='summery'>
            <div>
              <h2>FARE SUMMARY</h2>
              <p>1 ADULT</p>
            </div>
            <hr />
            <div className='logo1'>
              <div>
                <p className='txt'>Base fare</p>
                <p>Adult (1 x ₹1,818)</p>
                <p>Children (1 x ₹1,818)</p>
                {/* <p>Children (1 x ₹1,818)</p> */}

              </div>
              <div>
                <p className='num1'>₹1,818</p>
                <p>₹1,818</p>
                <p>₹1,818</p>
                {/* <p>₹1,818</p> */}

              </div>
            </div>
            <hr />
            <div className='logo1' >
              <p className='txt'>Taxes and Surcharges</p>
              <p className='num1'>₹1,068</p>
            </div>
            <hr />
            <div className='logo1'>
              <div>
                <p>Add Ons (1)</p>
                <p>Zero Cancellation</p>
              </div>
              <div>
                <p><strong>₹1,044</strong></p>
                <p>₹1,044</p>
              </div>
            </div>
            <hr />
            <div className='logo2'>
              <p className='total'>Grand Total</p>
              <p className='total1'>₹4704</p>
            </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Ticket;
