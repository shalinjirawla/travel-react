import React from 'react';
import { Card, Checkbox, Col, Form, Input, Row } from 'antd';
import './bill.css';
import Selectable from '../../Selectable';
import TextInput from '../../TextInput';

const State = () => {

  const stateList = [
    { _id: 'gujarat', name: 'Gujarat', value: 'gujarat' },
    { _id: 'maharastra', name: 'Maharastra', value: 'maharastra' },
    { _id: 'rajasthan', name: 'Rajasthan', value: 'rajasthan' },
  ];

  return (
    <>
      <Card className='card' >
        <div>
          <div className='main2'>
            <p className='pin'>YOUR PINCODE AND STATE</p>
            <p className='gst'>(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section. )</p>
          </div>
            <div>
                <Row align='middle' justify='space-between'>
                    <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                      <TextInput 
                        type='text'
                        name='billingAddress'
                        placeholder='Enter Billing Address' 
                        className='add'
                      />
                    </Col>
                    <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                      <TextInput 
                        type='text'
                        name='pincode'
                        placeholder='Enter Pincode' 
                        className='add'
                        // width='100%'
                      />
                    </Col>  
                    <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }} className='selectDrop'>
                      <Selectable 
                        firstName='name'
                        placeholder='State' 
                        handleSelectChange={() => {}}
                        data={stateList}
                        // className='add'
                        className='add'
                      />
                    </Col>
                </Row>         
            </div>       
          </div>
          <div >
            <Checkbox><span className='checkbox'>Confirm and save billing details to your profile</span></Checkbox>
          </div>
      </Card>
    </>
  );
}

export default State;
