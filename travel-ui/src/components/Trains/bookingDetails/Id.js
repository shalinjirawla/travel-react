import { Card, Col, Row } from 'antd';
import React from 'react';
import TextInput from '../../TextInput';
import AppButton from '../../AppButton';

const Id = () => {
    return (
        <>
            <Card className='card15'>
                <div className='id'>
                    <p className='details-header all'>Your IRCTC ID</p>
                </div>
                <div className='id1'>
                    <p className='irctc-id-require'><span className='bold'>IRCTC ID is mandatory to complete a booking.</span>Your password will be required after payment.</p>
                </div>
                <div className='input-irctc'>
                    <Row align='middle' justify='space-between'>
                        <Col xl={{ span: 15 }} lg={{ span: 15 }} md={{ span: 15 }} sm={{ span: 15 }} xs={{ span: 15 }}>
                            <TextInput
                                type='text'
                                name='userName'
                                placeholder='IRCTC Username'
                                className='add'
                            />
                        </Col>
                        <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 8 }}>
                            <AppButton className='Id-btn appPrimaryButton' label='Validate & Save' />
                        </Col>
                    </Row>
                </div>
                <div className='footer-Details'>
                    <p className='id-footer'>Don't have an IRCTC account?</p>
                    <a href="#" className='btn-1'>
                        <p className='irctc-id'>Create IRCTC ID</p>
                    </a>
                </div>
            </Card>
        </>
    )
}

export default Id;