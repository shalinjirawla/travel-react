import React from 'react';
import { Card, Checkbox, Col, Row } from 'antd';
import './bill.css';
import Selectable from '../../Selectable';
import TextInput from '../../TextInput';

const State = ({ isDetailsVisible, setIsDetailsVisible, setIsAddons }) => {
  const stateList = [
    { _id: 'gujarat', name: 'Gujarat', value: 'gujarat' },
    { _id: 'maharastra', name: 'Maharastra', value: 'maharastra' },
    { _id: 'rajasthan', name: 'Rajasthan', value: 'rajasthan' },
  ];
  const handleToggleCard = () => {
    setIsDetailsVisible(!isDetailsVisible);
    setIsAddons(false);
  };

  return (
    <>
      <div className='hide-state-1'>
      {!isDetailsVisible && (   
            // <Card className='cardPadding'>
            <Card className='card'>
              <div className='hide-ticket'>
                <p className='pin'>GOIBIBO EXCLUSIVE</p>
                <p className='hide-edit' onClick={handleToggleCard}>edit</p>
              </div>
            </Card>
        )}
        {isDetailsVisible && (
          // <div className='pincode'>
            // <Card className='card-cancle' >
            <Card className='card' >
              <div className='main1'>
                <p className='pin'>YOUR PINCODE AND STATE</p>
                <p className='gst'>(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section. )</p>
              </div>
              <div className='inbox'>
                <Row align='middle' justify='space-between'>
                  <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                    <TextInput
                      type='text'
                      name='billingAddress'
                      placeholder='Enter Billing Address'
                      className='add'
                      required={true}
                      requiredMsg='Please enter Address'
                    />
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                    <TextInput
                      type='text'
                      name='pincode'
                      placeholder='Enter Pincode'
                      className='add'
                      required={true}
                      requiredMsg='Please enter Pincode'
                    />
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={7} xs={7} className='selectDrop'>
                    <Selectable
                      firstName='name'
                      placeholder='State'
                      handleSelectChange={() => { }}
                      data={stateList}
                      className='add'
                      required={true}
                      requiredMsg='Please enter State'
                    />
                  </Col>
                </Row>
              </div>
              <div >
                <Checkbox><span className='checkbox'>Confirm and save billing details to your profile</span></Checkbox>
              </div>
            </Card>
          // </div>
        )}
      </div>
    </>
  );
}

export default State;