import React, { useEffect, useState } from 'react';
import '../../../styles/train/Header.css';
import { Card, Col, DatePicker, Form, Row, Select } from 'antd';
import { trainStaionList } from '../../../Constants';
import Selectable from '../../Selectable';
import Button from '../../AppButton';
import dayjs from 'dayjs';
import { SwapOutlined } from '@ant-design/icons';

const Header = ({ searchDetails }) => {

    const [defTrainForm] = Form.useForm();

    useEffect(() => {
        defTrainForm.setFieldValue('defTrainFrom', searchDetails?.trainFrom);
        defTrainForm.setFieldValue('defTrainTo', searchDetails?.trainTo);
        defTrainForm.setFieldValue('defJourneyTrainDate', dayjs(new Date(searchDetails?.trainDeptDate?.$d).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
    }, [JSON.stringify(searchDetails)]);

    const handleSwapClick = () => {
        let from = defTrainForm.getFieldValue('defTrainFrom'), to = defTrainForm.getFieldValue('defTrainTo');
        defTrainForm.setFieldValue('defTrainFrom', to);
        defTrainForm.setFieldValue('defTrainTo', from);
    };

    return (
        <div>
            <Card className='cardHeaderStyleT'>
                <Form
                    name='defTrainDetailForm'
                    // preserve={false}
                    form={defTrainForm}
                >
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
                                name='defTrainFrom'
                                className='backgroundTStyle'
                                initialValue={searchDetails?.trainFrom}
                            >
                                <Select
                                    showSearch
                                    size="large"
                                    // value={fromValue}
                                    // onChange={(value) => setFromValue(value)}
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
                                name='defTrainTo'
                                className='backgroundTStyle'
                                initialValue={searchDetails?.trainTo}
                            >
                                <Select
                                    showSearch
                                    size="large"
                                    // value={toValue}
                                    // onChange={(value) => setToValue(value)}
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
                                name='defJourneyTrainDate'
                                className=""
                                // initialValue={dayjs(new Date().toLocaleDateString('en-GB'), 'DD/MM/YYYY')}
                                initialValue={dayjs(new Date(searchDetails?.trainDeptDate?.$d).toLocaleDateString('en-GB'), 'DD/MM/YYYY')}
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
                </Form>
            </Card>
        </div>
    );
}

export default Header;