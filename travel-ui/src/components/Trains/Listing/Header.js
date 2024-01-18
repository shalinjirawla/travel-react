import React, { useState } from 'react';
import '../../../styles/train/Header.css';
import { Card, Col, DatePicker, Form, Row, Select } from 'antd';
import { trainStaionList } from '../../../Constants';
import Selectable from '../../Selectable';
import Button from '../../AppButton';
import dayjs from 'dayjs';
import { SwapOutlined } from '@ant-design/icons';

const Header = () => {

    const [fromValue, setFromValue] = useState('Ahmedabad, India');
    const [toValue, setToValue] = useState('Mumbai, India');

    const handleSwapClick = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    };

    return (
        <div>
            <Card className='cardHeaderStyleT'>
                <Row align='middle' justify='space-between'>
                    <Col xl={{ span: 5 }} lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 5 }}>
                        <label className='labelHeaderTStyle'>FROM</label>
                        {/* <Selectable
                            size='large'
                            name="sourceTrainSelect"
                            // required={true}
                            // requiredMsg='Source is required'
                            // defaultValue={selectedClass}
                            firstName='name'
                            data={trainStaionList}
                            width={400}
                            showSearch={true}
                            defaultValue={fromValue}
                            // value={fromValue}
                            handleSelectChange={(value) => setFromValue(value)}
                        /> */}
                        <Form.Item
                            className='backgroundTStyle'
                        >
                            <Select
                                showSearch
                                size="large"
                                value={fromValue}
                                onChange={(value) => setFromValue(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={trainStaionList}
                                popupClassName='trainOptionStyle'
                            />
                        </Form.Item>
                    </Col>
                    <Col><SwapOutlined className='swapSelectTStyle' onClick={handleSwapClick} /></Col>
                    <Col xl={{ span: 5 }} lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 5 }}>
                        <label className='labelHeaderTStyle'>To</label>
                        {/* <Selectable
                            size='large'
                            name="destinationTrainSelect"
                            // required={true}
                            // requiredMsg='Destination is required'
                            // defaultValue={selectedClass}
                            firstName='name'
                            data={trainStaionList}
                            width={400}
                            showSearch={true}
                            defaultValue={toValue}
                            // value={toValue}
                            handleSelectChange={(value) => setToValue(value)}
                        /> */}
                        <Form.Item
                            className='backgroundTStyle'
                        >
                            <Select
                                showSearch
                                size="large"
                                value={toValue}
                                onChange={(value) => setToValue(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={trainStaionList}
                                popupClassName='trainOptionStyle'
                            />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 5 }} lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 5 }}>
                        <label className='labelHeaderTStyle'>DATE</label>
                        <Form.Item
                            name='journeyTrainDate'
                            className=""
                            initialValue={dayjs(new Date().toLocaleDateString('en-GB'), 'DD/MM/YYYY')}
                            rules={[{ required: true, message: 'Journey Date is required' }]} 
                        >
                            <DatePicker
                                allowClear={false} 
                                className='datePicker backgroundTStyle'
                                popupClassName='commonSubDateStyle'
                                size='large'
                                placeholder='Journey Date'
                                format='DD/MM/YYYY'
                            />
                        </Form.Item>
                    </Col>
                    <Col xl={{ span: 5 }} lg={{ span: 5 }} md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 5 }}>
                        <Button className='updateSearchTBtn' label='UPDATE SEARCH' />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Header;