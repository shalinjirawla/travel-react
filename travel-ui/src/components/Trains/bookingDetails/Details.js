import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import AppButton from '../../AppButton';

const Details = () => {
  return (
    <>
      <Card className='card0'>
        <div className='detail'>
          <Row align='middle' justify='space-between'>
            <Col xl={{ span: 14 }} lg={{ span: 14 }} md={{ span: 14 }} sm={{ span: 14 }} xs={{ span: 14 }}>
              <div className='datails'>
                <div className='details-1'>
                  <div className='id'>
                    <p className='id-1'>Passenger Details</p><br />
                  </div>
                  <div>
                    <p className='small-1'>No travellers added, please add & select to continue</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
              <AppButton className='btn-2 appPrimaryButton' label='Add new Traveller' />
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default Details;
