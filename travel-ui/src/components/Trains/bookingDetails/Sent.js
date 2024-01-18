import React from 'react'
import { Card, Row, Col, } from 'antd';
import TextInput from '../../TextInput';

const Sent = () => {
  return (
    <>
      <Card className='card0'>
        <div className='id'>
          <p className='id-1'>Your booking details will be sent to</p>
        </div>
        <Row align='middle' justify='space-between'>
            <Col xl={{ span: 11 }} lg={{ span: 11 }} md={{ span: 11 }} sm={{ span: 11 }} xs={{ span: 11 }}>
              <TextInput
                type='text'
                name='number'
                placeholder='Contact number'
                className='add'
              />
            </Col>
            <Col xl={{ span: 11 }} lg={{ span: 11 }} md={{ span: 11 }} sm={{ span: 11 }} xs={{ span: 11 }}>
              <TextInput
                type='text'
                name='email'
                placeholder='E-mail ID(optional)'
                className='add'
              />
            </Col>
          </Row>
      </Card>
      
    </>
  )
}

export default Sent