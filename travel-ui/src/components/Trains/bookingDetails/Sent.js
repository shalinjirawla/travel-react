import React from 'react';
import { Card, Row, Col, } from 'antd';
import TextInput from '../../TextInput';

const Sent = () => {
  return (
    <>
      <Card className='card15'>
        <div className='id'>
          <p className='id-1 all'>Your booking details will be sent to</p>
        </div>
        <Row align='middle' justify='space-between'>
          <Col xl={{ span: 11 }} lg={{ span: 11 }} md={{ span: 11 }} sm={{ span: 11 }} xs={{ span: 11 }}>
            <div className='sent-input'>
              <TextInput
                type='text'
                name='number'
                placeholder='Contact number'
                className='add'
              />
            </div>
          </Col>
          <Col xl={{ span: 11 }} lg={{ span: 11 }} md={{ span: 11 }} sm={{ span: 11 }} xs={{ span: 11 }}>
            <div className='sent-input'>
              <TextInput
                type='text'
                name='email'
                placeholder='E-mail ID(optional)'
                className='add'
              />
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Sent;