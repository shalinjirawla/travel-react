import React from 'react';
import { Card, Row, Col } from 'antd';
import './train.css';
import TextInput from '../../TextInput';
import AppButton from '../../AppButton';

const Location = () => {
    return (
        <>
            <div className='back1'>
                <div className='backHeading'>
                    <h1 className='h1'>12901, Gujrat Mail</h1>
                    <p className='header-p'>Sleeper (SL) | General Quota</p>
                </div>
            </div>
            <Row align='top' style={{ margin: '0 2%' }}>
                <Col xl={16} lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                    <Card className='card15'>
                        <div className='main-1'>
                            <div className='main-2'>
                                <div className='main-3'>
                                    <div className='left'>
                                        <div className='left-1'>
                                            <p className='train-boarding'>Boarding from</p>
                                        </div>
                                        <div className='left-2'>
                                            <div>
                                                <p className='dark'>4:40 PM</p>
                                                <p className='light'>19 Jan</p>
                                            </div>
                                            <div className='vertical-line'></div>
                                            <div className='left-r'>
                                                <p className='dark'>ADI</p>
                                                <p className='light'>Ahmedabad</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='logo11'>
                                        <img src="https://gos3.ibcdn.com/JrnyTime-1676032787.svg" alt="logo" />
                                        <p className='time'>1h 10m</p>
                                    </div>
                                    <div className='right'>
                                        <div className='left-1'>
                                            <p className='train-boarding'>Destination to</p>
                                        </div>
                                        <div className='left-2'>
                                            <div>
                                                <p className='dark'>5:58 PM</p>
                                                <p className='light'>19 Jan</p>
                                            </div>
                                            <div className='vertical-line'></div>
                                            <div className='left-r'>
                                                <p className='dark'>MSH</p>
                                                <p className='light'>Mahesana</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xl={8} lg={8}>
                    <Row align='top' justify='space-between' style={{ margin: '0 2%' }}>
                        <Col xl={22} lg={{ span: 22 }} md={{ span: 22 }} sm={{ span: 22 }} xs={{ span: 22 }}>
                            <Card className='div'>
                                <div className='add-1'>
                                    <p className='offers'>Offers & Discounts</p>
                                    <TextInput
                                        type='text'
                                        name='userName'
                                        placeholder='Enter a coupon code'
                                        className='add coupon-input'
                                    />
                                    <a className='a coupon-link' href='apply'>Apply</a>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row align='top' justify='space-between' style={{ margin: '0 2%' }}>
                        <Col xl={22} lg={{ span: 22 }} md={{ span: 22 }} sm={{ span: 22 }} xs={{ span: 22 }}>
                            <Card className='div1'>
                                <div className='card-3-main-1'>
                                    <div className='card-3-main-2'>
                                        <p className='basefare'><span className='span-1'>Base Fare</span> per person</p>
                                        <p className='price'>₹320</p>
                                    </div>
                                    <button className='btn-5 '>
                                        <p className='payment'>Proceed to Payment</p>
                                    </button>
                                </div>
                                <div className='card-3-main-3'>
                                    <p className='agree'>By proceeding to payment, I confirm that I agree to the<a className='aa' href='Cancellation Policy'>Cancellation Policy</a> and <a className='aa' href='Terms of Service'>Terms of Service</a>.</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row align='top' justify='space-between' style={{ margin: '0 2%' }}>
                <Col xl={16} lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                    <Card className='card11'>
                        <div className='id'>
                            <p className='id-1'>Your IRCTC ID</p>
                        </div>
                        <div className='id1'>
                            <p className='id-2'><span className='bold'>IRCTC ID is mandatory to complete a booking.</span>Your password will be required after payment.</p>
                        </div>
                        <Row align='middle' justify='space-between'>
                            <Col xl={{ span: 15 }} lg={{ span: 15 }} md={{ span: 15 }} sm={{ span: 15 }} xs={{ span: 15 }}>
                                <TextInput
                                    type='text'
                                    name='userName'
                                    placeholder='IRCTC Username'
                                    className='add'
                                />
                            </Col>
                            <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                                <AppButton className='btn-2 appPrimaryButton' label='Validate & Save' />
                            </Col>
                        </Row>
                        <div className='footer'>
                            <p className='id4'>Don't have an IRCTC account?</p>
                            <a href="#" className='btn-1'>
                                <p className='irctc-id'>Create IRCTC ID</p>
                            </a>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Location;
