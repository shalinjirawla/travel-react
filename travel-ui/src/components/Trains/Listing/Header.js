import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/train/Header.css';
import { Card, Col, Collapse, DatePicker, Form, Row, Select } from 'antd';
import { trainStaionList } from '../../../Constants';
import Selectable from '../../Selectable';
import Button from '../../AppButton';
import dayjs from 'dayjs';
import { CloseOutlined, SwapOutlined } from '@ant-design/icons';
import { disabledFromToday } from '../../../helper';
import { AuthContext } from '../../../context/AuthProvider';

const Header = ({ searchDetails }) => {

    const { isTablet } = useContext(AuthContext)??{};
    const [defTrainForm] = Form.useForm();
    const [isActive, setIsActive] = useState(false);

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

    const trainDetailForm = <>
        <Row align='middle' justify='space-between'>
            <Col xl={isTablet ? 10 : 5} lg={isTablet ? 10 : 5} md={isTablet ? 10 : 5} sm={isTablet ? 10 : 5} xs={isTablet ? 10 : 5}>
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
                        size={isTablet ? 'middle' : 'large'}
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
            <Col xl={isTablet ? 10 : 5} lg={isTablet ? 10 : 5} md={isTablet ? 10 : 5} sm={isTablet ? 10 : 5} xs={isTablet ? 10 : 5}>
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
                        size={isTablet ? 'middle' : 'large'}
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
            <Col xl={isTablet ? 10 : 5} lg={isTablet ? 10 : 5} md={isTablet ? 10 : 5} sm={isTablet ? 10 : 5} xs={isTablet ? 10 : 5}>
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
                        size={isTablet ? 'middle' : 'large'}
                        placeholder='Journey Date'
                        format='DD/MM/YYYY'
                        disabledDate={disabledFromToday}
                    />
                </Form.Item>
            </Col>
            <Col xl={isTablet ? 10 : 5} lg={isTablet ? 10 : 5} md={isTablet ? 10 : 5} sm={isTablet ? 10 : 5} xs={isTablet ? 10 : 5} className='textAlignEnd'>
                <Button className='updateSearchTBtn' label='UPDATE SEARCH' />
            </Col>
        </Row>
    </>

    const labelData = <>
        <div className={`collapseLabel ${isActive ? 'activeLabel' : ''}`}>
            <span>{searchDetails?.trainFrom} to </span>
            <span>{searchDetails?.trainTo}</span><br />
            <span>{dayjs(new Date(searchDetails?.trainDeptDate?.$d)).format('ddd, MMM DD')}</span>
        </div>
    </>

    const items = [
        {
            label: labelData,
            children: <p>{trainDetailForm}</p>,
        },
    ];

    return (
        <div>
            <Card className='cardHeaderStyleT'>
                <Form
                    name='defTrainDetailForm'
                    // preserve={false}
                    form={defTrainForm}
                >
                    {isTablet &&
                        <>
                            <Collapse 
                                // className='collapseTStyle' 
                                className={`collapseTStyle ${isActive ? 'activeCollapse' : ''}`} 
                                items={items} 
                                bordered={false}
                                expandIconPosition='end'
                                activeKey={isActive ? ['0'] : []}
                                onChange={(keys) => setIsActive(keys.includes('0'))}
                                expandIcon={({ isActive }) => isActive && <CloseOutlined className='collapseFIcon' />}
                            />
                        </>
                    }
                    {!isTablet && trainDetailForm}
                </Form>
            </Card>
        </div>
    );
}

export default Header;