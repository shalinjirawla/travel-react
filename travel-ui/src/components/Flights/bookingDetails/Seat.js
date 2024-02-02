import { Card, Col, Row, Tabs } from 'antd';
import React from 'react';
import Button from '../../AppButton';
import Meals from './Meals';
import Baggage from './Baggage';
import AddOns from './AddOns';

const Seat = ({ isAddons, travellers }) => {
  const items = [
    {
      key: '1',
      label: <h3>Seats</h3>,
      children: <AddOns travellers={travellers} />,
    },
    {
      key: '2',
      label: <h3>Meals</h3>,
      children: <Meals />,
    },
    {
      key: '3',
      label: <h3>Baggage</h3>,
      children: <Baggage />,
    },
  ];

  return (
    <>
      {!isAddons && (
        <Card className='card'>
          <div className='hide-ticket'>
            <p className='pin'>ADDONS</p>
          </div>
        </Card>
      )}
      {isAddons && (
        <div className='main-addons'>
          <Card className='card'>
            <div className='seatFCard'>
              <Tabs defaultActiveKey={items[0].key} className='addOndFTabsStyle'>
                {items.map((item) => (
                  <Tabs.TabPane tab={item.label} key={item.key}>
                    {item.children}
                  </Tabs.TabPane>
                ))}
              </Tabs>
              <Button
                className='button-payment appPrimaryButton'
                type='primary'
                size='large'
                label='Proceed To Payment'
              />
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Seat;