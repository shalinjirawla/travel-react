import React from 'react';
import { Card, Input, Select, Form, Collapse, Col, Row, theme } from 'antd';
import Button from '../../AppButton';
import TextInput from '../../TextInput';
import Selectable from '../../Selectable';

const Details = () => {

  const { Option } = Select;
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  
  const gender = [
    { _id: 'male', name: 'Male', value: 'male' },
    { _id: 'female', name: 'Female', value: 'female' },
    { _id: 'other', name: 'Other', value: 'other' },
  ];

  const text = <>
    {/* <p><strong>Adult 1</strong></p> */}
    <p>Adult name
      <div className=''>

        <Row align='middle' justify='space-between'>
          <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
            <TextInput
              type='text'
              name='fmname'
              placeholder='First & Middle Name'
              className='add'
            />
          </Col>
          <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
            <TextInput
              type='text'
              name='lname'
              placeholder='Last Name'
              className='add'
            />
          </Col>
          <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }} className='selectDrop'>
            <Selectable
              firstName='name'
              placeholder='Gender'
              handleSelectChange={() => { }}
              data={gender}
              className='add'
            />
          </Col>
        </Row>
      </div>
    </p>
  </>

  const items = (panelStyle) => [
    {
      key: '1',
      label: <b>Adult 1</b>,
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: <b>Adult 2</b>,
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: <b>Adult 3</b>,
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>

      <Card className='card'>
        <p className='pin'><strong>TRAVELLER DETAILS</strong></p>

        <hr />
        <div className='note'>
          <p style={{ marginTop: '1%' }}><strong>NOTE : </strong>Please make sure you enter the Name as per your govt. photo id.</p>
        </div>
        <div className='card2'>
          <Collapse accordion
            bordered={false}
            
            size='large'
            defaultActiveKey={['1']} 
            // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{
              background: token.colorBgContainer,
            }}
            items={items(panelStyle)} onChange={onChange} className='collapse' />
        </div>
        <Form>
          <Form.Item label="Email Address" className='form-item-label'>
            <div className='input-1'>
              <Input className="input-field" placeholder='abc@gmail.com' />
              <p style={{paddingLeft:'4%'}}>Your ticket will be sent to this email address</p>
            </div>
          </Form.Item>
          <Form.Item label="Mobile Number" className='input-field11'>
            <Input className="input-field1" addonBefore="+91" placeholder='Mobile Number' />
          </Form.Item>
        </Form> 
        <hr />
        <Button className='button appPrimaryButton' type="primary" size="large" label='Proceed' />
      </Card>
    </>
  )
}

export default Details