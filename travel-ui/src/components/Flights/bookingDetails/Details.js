import React, { useRef, useState } from 'react';
import { Card, Input, Form, Collapse, Col, Row, message } from 'antd';
import Button from '../../AppButton';
import TextInput from '../../TextInput';
import Selectable from '../../Selectable';
import axios from 'axios';
import AppModal from '../../AppModal';
import ConfirmModal from './ConfirmModal';

const Details = ({ isDetailsVisible, setIsDetailsVisible, setIsAddons, travellers }) => {
  const [isProceedClicked, setIsProceedClicked] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState([]);

  const [form] = Form.useForm();

  const panelStyle = {
    marginBottom: 24,
    background: '#f5f5f5',
    borderRadius: '8px',
    border: 'none',
  };

  const handleConfirmModal = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const sendEmail = async (values) => {
    try {
      const formData = new FormData();
      formData.append('subject', 'Your email subject');
      formData.append('email', values.email);
      formData.append('mobile', values.mobile);

      const response = await axios.post('https://localhost:7056/api/Email/Send', formData);

      if (response.status === 200) {
        setIsProceedClicked(true);
        message.success('Email sent successfully. Press OK to continue.');
      } else {
        console.error('Failed to send email. Server responded with:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  const genderOptions = [
    { _id: 'male', name: 'Male', value: 'male' },
    { _id: 'female', name: 'Female', value: 'female' },
    { _id: 'other', name: 'Other', value: 'other' },
  ];

  const createTravelerItems = () => {
    if (!travellers || typeof travellers !== 'object') {
      console.error('Error: Invalid or missing travellers data.');
      return [];
    }

    const { adult, child, infant } = travellers;
    const types = ['adult', 'child', 'infant'];
    const travelerItems = [];

    const generateTravelerItem = (index, type) => {
      return (
        <p key={index}>
          <Form form={form}>
            <div className='details-collapse'>
              <Row align='middle' justify='space-between'>
                <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                  <TextInput
                    type='text'
                    placeholder='First & Middle Name'
                    className='add'
                    name={`${type}-fname-${index}`}
                    required={true}
                    requiredMsg='Please enter first name'
                  />
                </Col>
                <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                  <TextInput
                    type='text'
                    placeholder='Last Name'
                    className='add'
                    name={`${type}-lname-${index}`}
                    required={true}
                    requiredMsg={'Please enter last name'}
                  />
                </Col>
                <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }} className='selectDrop'>
                  <Selectable
                    firstName='name'
                    placeholder='Gender'
                    handleSelectChange={() => { }}
                    name={`${type}-detail-gender-${index}`}
                    data={genderOptions}
                    className='add'
                    required='true'
                    requiredMsg='Please enter gender'
                  />
                </Col>
              </Row>
            </div>
          </Form>
        </p>
      );
    };

    for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
      const type = types[typeIndex];
      const count = type === 'adult' ? adult : type === 'child' ? child : infant;

      for (let i = 0; i < count; i++) {
        travelerItems.push({
          key: `${type} ${i + 1}`,
          label: <b>{`${capitalizeFirstLetter(type)} ${i + 1}`}</b>,
          fields: [
            { label: 'First Name', children: formValues[`${type}-fname-${i}`] || '' },
            { label: 'Last Name', children: formValues[`${type}-lname-${i}`] || '' },
            { label: 'Gender', children: formValues[`${type}-detail-gender-${i}`] || '' },
          ],
          children: generateTravelerItem(i, type),
          style: panelStyle,
        });
      }
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return travelerItems;
  };


  const items = createTravelerItems();

  const onChange = (key) => {
    console.log(key);
  };

  const handleToggleCard = () => {
    setIsDetailsVisible(!isDetailsVisible);
    setIsAddons(false);
  };

  const handleProceedClick = async () => {
    try {
      const values = await form.validateFields();
      setFormValues(values);
      setConfirmModalOpen(true);
    } catch (errorInfo) {
      console.error('Form validation failed:', errorInfo);
    }
  };

  const handleAppModalOk = () => {
    // setConfirmModalOpen(false);
    setIsProceedClicked(false);
    setIsDetailsVisible(false);
    setIsAddons(true);
  };

  return (
    <>
      {!isDetailsVisible && (
        <div className='hide-state'>
          <Card className='card'>
            <div className='hide-ticket'>
              <p className='pin'>TRAVELLER DETAILS</p>
              <p className='hide-edit' onClick={handleToggleCard}>
                edit
              </p>
            </div>
          </Card>
        </div>
      )}
      {isDetailsVisible && (
        <Card className='card'>
          <p className='pin'>
            <strong>TRAVELLER DETAILS</strong>
          </p>
          <hr />
          <div className='note'>
            <p className='email'>
              <strong>NOTE : </strong>Please make sure you enter the Name as per your govt. photo id.
            </p>
          </div>
          <div className='card2'>
            <Collapse
              accordion
              bordered={false}
              size='large'
              defaultActiveKey={items.map((item) => item.key)}
              items={items}
              onChange={onChange}
              className='collapse'
            />
          </div>
          <Form form={form}>
            <Form.Item
              name='email'
              label='Email Address'
              className='form-item-label'
              rules={[
                { required: true, message: 'Please enter your email address' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <div className='input-email'>
                <Input className='input-email-address' placeholder='abc@gmail.com' />
                <p className='email'>Your ticket will be sent to this email address</p>
              </div>
            </Form.Item>
            <Form.Item
              name='mobile'
              label='Mobile Number'
              className='input-field11'
              rules={[
                { required: true, message: 'Please enter your mobile number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}
            >
              <Input className='input-mobile' addonBefore='+91' placeholder='Mobile Number' />
            </Form.Item>
            <hr />
            <Button
              className='button appPrimaryButton'
              type='primary'
              size='large'
              label='Proceed'
              onClick={handleProceedClick}
            />
          </Form>
        </Card>
      )}
      <AppModal
        open={confirmModalOpen}
        className="confirmModal"
        // title='Review Traveller’s Details'
        children={<ConfirmModal
          onConfirm={handleAppModalOk}
          travelerDetails={items}
          setConfirmModalOpen={setConfirmModalOpen}
          formValues={formValues}
        />}
        onOk={() => { }}
        onCancel={handleConfirmModal}
      />
    </>
  );
};

export default Details;