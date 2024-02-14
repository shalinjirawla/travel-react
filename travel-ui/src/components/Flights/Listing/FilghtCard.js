import { Card, Col, Row, Form, DatePicker, Select, Checkbox, Divider, Collapse } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import './Flight.css';
import { fetchFlightList } from '../../../Constants';
import PopoverFlight from './PopoverFlight';
import { CloseOutlined, SwapOutlined } from '@ant-design/icons';
import Button from '../../AppButton';
import dayjs from 'dayjs';
import { airportData } from '../../../JSON/airports';
import { disabledFromToday } from '../../../helper';
import { AuthContext } from '../../../context/AuthProvider';

const FilghtCard = ({ currSearchFlightList, selectedFlightOption, searchDetails, travellers }) => {

    const { isTablet } = useContext(AuthContext)??{};
    const { Option } = Select;
    const [defFlightForm] = Form.useForm();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentSearchData, setCurrentSearchData] = useState(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (currSearchFlightList && currSearchFlightList?.search) {
            setCurrentSearchData(currSearchFlightList?.search);
        }
        if (selectedFlightOption === 'roundtrip' && currSearchFlightList?.search) {
            setShowDatePicker(true);
            defFlightForm.setFieldValue('defFlightReturnDate', dayjs(new Date(currSearchFlightList?.search?.legs[1]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
        }
    }, [JSON.stringify(currSearchFlightList), selectedFlightOption]);

    useEffect(() => {
        defFlightForm.setFieldValue('defFlightFrom', currentSearchData?.legs[0]?.departureCity?.code);
        defFlightForm.setFieldValue('defFlightTo', currentSearchData?.legs[0]?.arrivalCity?.code);
        defFlightForm.setFieldValue('defFlightDepartureDate', dayjs(new Date(currentSearchData?.legs[0]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
    }, [JSON.stringify(currentSearchData)]);

    useEffect(() => {
        defFlightForm.setFieldValue('defFlightFrom', searchDetails?.flightFrom);
        defFlightForm.setFieldValue('defFlightTo', searchDetails?.flightTo);
        defFlightForm.setFieldValue('defFlightDepartureDate', dayjs(new Date(searchDetails?.flightDeptDate?.$d).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
        if (searchDetails?.flightReturnDate) {
            defFlightForm.setFieldValue('defFlightReturnDate', dayjs(new Date(searchDetails?.flightReturnDate?.$d).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
            setShowDatePicker(true);
        }
    }, [JSON.stringify(searchDetails)]);

    const onChange = (e) => { setShowDatePicker(e.target.checked); };

    const handleSwapClick = () => {
        let from = defFlightForm.getFieldValue('defFlightFrom'), to = defFlightForm.getFieldValue('defFlightTo');
        defFlightForm.setFieldValue('defFlightFrom', to);
        defFlightForm.setFieldValue('defFlightTo', from);
    };

    const flightDetailForm = <>
        <Row align='middle' justify='space-between'>
            <Col xl={isTablet ? 8 : 4} lg={isTablet ? 8 : 4} md={isTablet ? 8 : 4} sm={isTablet ? 8 : 4} xs={isTablet ? 8 : 4}>
                <>
                    <label className='labelHeaderStyle'>FROM</label>
                    <Form.Item
                        name='defFlightFrom'
                        className='backgroundStyle'
                        // initialValue={searchDetails?.flightFrom}
                    >
                        <Select
                            showSearch
                            size={isTablet ? 'middle' : 'large'}
                            // style={{ width: 200 }}
                            placeholder="Search by location or airport"
                            className='defSelect'
                            popupClassName='defSelectOptionStyle'
                        >
                            {airportData && airportData.map((item, i) => {
                                return (
                                    <>
                                        <Option key={i} value={item._id}>
                                            {item.label} - {item.code}
                                        </Option>
                                    </>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </>
            </Col>
            <Col><SwapOutlined className='swapStyle labelHeaderStyle' onClick={handleSwapClick} /></Col>
            <Col xl={isTablet ? 8 : 4} lg={isTablet ? 8 : 4} md={isTablet ? 8 : 4} sm={isTablet ? 8 : 4} xs={isTablet ? 8 : 4}>
                <>
                    <label className='labelHeaderStyle'>TO</label>
                    <Form.Item
                        name='defFlightTo'
                        className='backgroundStyle'
                        // initialValue={currentSearchData?.legs[0]?.arrivalCity?.code}
                        initialValue={searchDetails?.flightTo}
                    >
                        <Select
                            showSearch
                            size={isTablet ? 'middle' : 'large'}
                            className='defSelect'
                            popupClassName='defSelectOptionStyle'
                            // style={{ width: 200 }}
                            // popupClassName='defSelectOptionStyle'
                            placeholder="Search by location or airport"
                            // defaultValue={currentSearchData?.legs[0]?.arrivalCity?.code}
                            // value={currentSearchData?.legs[0]?.arrivalCity?.code}
                            // onChange={(value) => setToValue(value)}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            // options={fetchFlightList}
                        >
                            {airportData && airportData.map((item, i) => {
                                return (
                                    <>
                                        <Option key={i} value={item._id}>
                                            {item.label} - {item.code}
                                        </Option>
                                    </>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </>
            </Col>
            <Col xl={isTablet ? 6 : 3} lg={isTablet ? 6 : 3} md={isTablet ? 6 : 3} sm={isTablet ? 67 : 3} xs={isTablet ? 6 : 3}>
                <>
                    <label className='labelHeaderStyle'>DEPARTURE DATE</label>
                    <Form.Item
                        name='defFlightDepartureDate'
                        // initialValue={currentSearchData ? dayjs(new Date(currentSearchData?.legs[0]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                        className="createUserTextInput"
                        rules={[{ required: true, message: 'Departure Date is required' }]}
                    >
                        <DatePicker
                            allowClear={false} 
                            className='datePicker backgroundStyle'
                            popupClassName='commonSubDateStyle'
                            size={isTablet ? 'middle' : 'large'}
                            placeholder='Departure Date'
                            format='DD/MM/YYYY'
                            disabledDate={disabledFromToday}
                        />
                    </Form.Item>
                </>
            </Col>
            {!isTablet && 
                <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                    <Checkbox checked={showDatePicker} className='returnDtCheckbox' onChange={onChange}><label className='labelHeaderStyle'>RETURN DATE</label></Checkbox>
                    <Form.Item
                        name='defFlightReturnDate'
                        className="createUserTextInput"
                        // initialValue={currentSearchData ? dayjs(new Date(currentSearchData?.legs[1]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                        rules={[{ required: true, message: 'Return Date is required' }]}
                    >
                        <DatePicker
                            allowClear={false}
                            className={`datePicker backgroundStyle ${!showDatePicker ? 'showDate' : ''}`}
                            popupClassName='commonSubDateStyle'
                            size={isTablet ? 'middle' : 'large'}
                            placeholder='Return Date'
                            format='DD/MM/YYYY'
                            disabled={!showDatePicker}
                        />
                    </Form.Item>
                </Col>
            }
            <Col xl={isTablet ? 8 : 4} lg={isTablet ? 8 : 4} md={isTablet ? 8 : 4} sm={isTablet ? 8 : 4} xs={isTablet ? 8 : 4}>
                <label className='labelHeaderStyle'>PASSENGER & CLASS</label>
                <Form.Item>
                    <PopoverFlight currentSearchData={currentSearchData} travellers={travellers} searchDetails={searchDetails} />
                </Form.Item>
            </Col>
            {isTablet &&
                <>
                    <Col><SwapOutlined className='visibilityHide' /></Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Checkbox checked={showDatePicker} className='returnDtCheckbox' onChange={onChange}><label className='labelHeaderStyle'>RETURN DATE</label></Checkbox>
                        <Form.Item
                            name='defFlightReturnDate'
                            className="createUserTextInput"
                            // initialValue={currentSearchData ? dayjs(new Date(currentSearchData?.legs[1]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                            rules={[{ required: true, message: 'Return Date is required' }]}
                        >
                            <DatePicker
                                allowClear={false}
                                className={`datePicker backgroundStyle ${!showDatePicker ? 'showDate' : ''}`}
                                popupClassName='commonSubDateStyle'
                                size={isTablet ? 'middle' : 'large'}
                                placeholder='Return Date'
                                format='DD/MM/YYYY'
                                disabled={!showDatePicker}
                            />
                        </Form.Item>
                    </Col>
                </>
            }
            <Col xl={isTablet ? 8 : 4} lg={isTablet ? 8 : 4} md={isTablet ? 8 : 4} sm={isTablet ? 8 : 4} xs={isTablet ? 8 : 4} className='textAlignEnd'>
                <Button className='updateSearchBtn' label='UPDATE SEARCH' />
            </Col>
        </Row>
    </>

    const labelData = <>
        <div className={`collapseLabel ${isActive ? 'activeLabel' : ''}`}>
            <span>{searchDetails?.flightFrom} to </span>
            <span>{searchDetails?.flightTo}</span><br />
            <span>{dayjs(new Date(searchDetails?.flightDeptDate?.$d)).format('ddd, MMM DD')} - </span>
            {searchDetails?.flightReturnDate && <span>{dayjs(new Date(searchDetails?.flightReturnDate?.$d)).format('ddd, MMM DD')} - </span>}
            <span>{travellers?.adult + travellers?.child + travellers?.infant} Traveller(s), {travellers?.currClass}</span>
        </div>
    </>

    const items = [
        {
            label: labelData,
            children: <p>{flightDetailForm}</p>,
        },
    ];

    return (
        <div className='flightCardStyle'>
            <Card className='cardHeaderStyle'>
                <Form
                    name='defFligthDetailForm'
                    // preserve={false}
                    form={defFlightForm}
                >
                    {isTablet &&
                        <>
                            <Collapse
                                className={`collapseFStyle ${isActive ? 'activeCollapse' : ''}`}
                                items={items} 
                                bordered={false}
                                expandIconPosition='end'
                                activeKey={isActive ? ['0'] : []}
                                onChange={(keys) => setIsActive(keys.includes('0'))}
                                expandIcon={({ isActive }) => isActive && <CloseOutlined className='collapseFIcon' />}
                            />
                        </>
                    }
                    {!isTablet && flightDetailForm}
                </Form>
            </Card>
        </div>
    );
}

export default FilghtCard;