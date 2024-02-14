import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button } from 'antd';
import AppButton from '../../AppButton';
const { Option } = Select;

const TravellerDetails = ({ onFormSubmit, editIndex, travellerData, onDelete, setConfirmModalOpen }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        nationality: '',
        birthPreference: ''
    });

    useEffect(() => {
        if (travellerData) {
            setFormData(travellerData);
        }
    }, [travellerData]);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCancle = () => {
        setConfirmModalOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
        console.log('foemData', formData)
    };

    const handleDelete = () => {
        onDelete(editIndex);
    };

    const formItemLayout = {
        labelCol: {
            flex: '110px',
            labelAlign: 'left',
            labelWrap: true
        },
        wrapperCol: {
            flex: 3
        },
        xs: {
            span: 20
        },
        sm: {
            span: 6
        },
        ...{
            name: "wrap",
            labelCol: {
                flex: '110px',
            },
            labelAlign: "left",
            labelWrap: true,
            wrapperCol: {
                flex: 1,
            },
            colon: false,
            style: {
                maxWidth: 600,
            }
        }
    };

    return (
        <>
            <div className='main-flight-details'>
                <h2 className='train-modal'>
                    Add Traveller
                </h2>
                <Form
                    {...formItemLayout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onSubmit={handleSubmit}
                    className='main-flight-details'
                >
                    <Form.Item
                        className='label'
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input
                            type="text"
                            className='add'
                            placeholder='Full name'
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        className='label'
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your Age!' }]}
                    >
                        <Input
                            type="number"
                            className='add'
                            placeholder='Age'
                            value={formData.age}
                            onChange={(e) => handleChange('age', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        className='label'
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Radio.Group
                            onChange={(e) => handleChange('gender', e.target.value)}
                            value={formData.gender}
                        >
                            <Radio className='radio' value="male">Male</Radio>
                            <Radio className='radio' value="female">Female</Radio>
                            <Radio className='radio' value="other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Nationality"
                        name="nationality"
                        className='label'
                        rules={[{ required: true, message: 'Please select your nationality!' }]}
                    >
                        <Select
                            onChange={(value) => handleChange('nationality', value)}
                            value={formData.nationality}
                            className='add'
                            placeholder="Select nationality"
                        >
                            <Option value="usa">USA</Option>
                            <Option value="uk">UK</Option>
                            <Option value="canada">Canada</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Birth Preference"
                        className='label'
                        name="birthPreference"
                        rules={[{ required: true, message: 'Please select your birth preference!' }]}
                    >
                        <Select
                            onChange={(value) => handleChange('birthPreference', value)}
                            className='add'
                            value={formData.birthPreference}
                            placeholder="No Berth Preference"
                        >
                            <Option value="Window Side Berth">Window Side Berth</Option>
                            <Option value="No Berth Preference">No Berth Preference</Option>
                        </Select>
                    </Form.Item>
                    <div className='pass-detail-button'>
                        {editIndex !== null && (
                            <AppButton type="danger" label='Delete' onClick={handleDelete} className="appButton pop-btn">Delete</AppButton>
                        )}
                        {editIndex === null && (
                            <AppButton type="danger" label='Cancle' onClick={handleDelete} className="appButton pop-btn">Delete</AppButton>
                        )}
                        <AppButton className='appPrimaryButton bttn' label='Save' type="primary" htmlType="submit" onClick={handleSubmit}>Save</AppButton>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default TravellerDetails;