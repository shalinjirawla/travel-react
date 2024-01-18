import { Card, Col, Row, Form, DatePicker, Space, Select, Checkbox, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import './Flight.css';
import { fetchFlightList } from '../../../Constants';
import PopoverFlight from './PopoverFlight';
import { SwapOutlined } from '@ant-design/icons';
import Button from '../../AppButton';
import TravelClassPopover from './TravelClassPopover';
import dayjs from 'dayjs';
import { airportData } from '../../../JSON/airports';

const FilghtCard = ({ currSearchFlightList, selectedFlightOption, searchDetails }) => {

    const { Option, OptGroup } = Select;
    const [defFlightForm] = Form.useForm();
    // const [selectedFlightOption, setSelectedFlightOption] = useState('onewaytrip');
    // const [selectedFare, setSelectedFare] = useState('regular');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentSearchData, setCurrentSearchData] = useState(null);

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

    // const flightOptions = [
    //     { label: 'One Way Trip', value: 'onewaytrip' },
    //     { label: 'Round Trip', value: 'roundtrip' },
    // ];

    // const fareOptions = [
    //     { label: 'REGULAR', value: 'regular' },
    //     { label: 'Armed Forces', value: 'student' },
    //     { label: 'Senior Citizen', value: 'seniorCitizen' },
    //     { label: 'STUDENT', value: 'student' },
    //     { label: 'Doctors & Nurses', value: 'doctorsAndNurses' },
    // ];

    // const onChangeOptions = ({ target: { value } }) => { setSelectedFlightOption(value); };
    // const onFareChangeOptions = ({ target: { value } }) => { setSelectedFare(value); };

    const onChange = (e) => { setShowDatePicker(e.target.checked); };

    // const [filterTable, setFilterTable] = useState(fetchFlightList);
    // const onSearch = (value) => {
    //     const filterData = fetchFlightList.filter((o) => Object.keys(o).some((k) => String(o[k])
    //     .toLowerCase()
    //     .includes(value.toLowerCase())));
    //     setFilterTable(filterData);
    // };

    // const [disableOptions, setDisableOptions] = useState(true);
    // const onSearch = (inputValue) => {
    //     setDisableOptions(inputValue.trim() === '');
    // };

    // const [searchQuery, setSearchQuery] = useState('');
    // const [filterTable, setFilterTable] = useState(fetchFlightList);
    // const onSearch = (value) => {
    //     setSearchQuery(value);
    // };
    // const filteredOptions = filterTable.filter((option) =>
    //     option.label.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // const [fromValue, setFromValue] = useState('Ahmedabad, India');
    // const [toValue, setToValue] = useState('Mumbai, India');
    const handleSwapClick = () => {
        let from = defFlightForm.getFieldValue('defFlightFrom'), to = defFlightForm.getFieldValue('defFlightTo');
        defFlightForm.setFieldValue('defFlightFrom', to);
        defFlightForm.setFieldValue('defFlightTo', from);
        // setFromValue(toValue);
        // setToValue(fromValue);
    };

    return (
        <div className='flightCardStyle'>
            {/* <Descriptions bordered items={items} size='small' /> */}
            <Card className='cardHeaderStyle'>
                {/* <Row>
                    <Radio.Group options={flightOptions} onChange={onChangeOptions} value={selectedFlightOption} />
                </Row>
                <br /> */}
                <Form
                    name='defFligthDetailForm'
                    // preserve={false}
                    form={defFlightForm}
                >
                    <Row align='middle' justify='space-between'>
                        <Col xl={3} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                            <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                                {/* {currentSearchData && currentSearchData?.legs[0]?.departureCity?.code && */}
                                {/* {searchDetails && searchDetails?.flightFrom && */}
                                    <>
                                        <label className='labelHeaderStyle'>FROM</label>
                                        <Form.Item
                                            name='defFlightFrom'
                                            className='backgroundStyle'
                                            // initialValue={currentSearchData?.legs[0]?.departureCity?.code}
                                            // initialValue={searchDetails?.flightFrom}
                                        >
                                            {/* <Search
                                                placeholder="Search by location or airport"
                                                allowClear
                                                // enterButton
                                                size="large"
                                                onSearch={onSearch}
                                            /> */}
                                            <Select
                                                showSearch
                                                size="large"
                                                style={{ width: 200 }}
                                                placeholder="Search by location or airport"
                                                // value={fromValue}
                                                // onChange={(value) => setFromValue(value)}
                                                className='defSelect'
                                                popupClassName='defSelectOptionStyle'
                                                // optionFilterProp="children"
                                                // filterOption={(input, option) =>
                                                //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                // }
                                                // options={fetchFlightList} 

                                                // options={filterTable}

                                                // filterOption={false}
                                                // options={filteredOptions}
                                                // onSearch={onSearch}

                                                // options={fetchFlightList.map((option) => ({
                                                //     ...option,
                                                //     disabled: disableOptions,
                                                // }))}
                                                // notFoundContent={searchQuery && fetchFlightList.length === 0 ? "No matching results" : null}
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
                                {/* } */}
                            </Col>
                        </Col>
                        <Col xl={1} className='swapStyle labelHeaderStyle'><SwapOutlined onClick={handleSwapClick} /></Col>
                        <Col xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                            <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                                {/* {currentSearchData && currentSearchData?.legs[0]?.departureCity?.code && */}
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
                                                size="large"
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
                                {/* } */}
                            </Col>
                        </Col>
                        <Col xl={{ span: 3 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                            <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                                {/* {currentSearchData?.legs[0]?.outboundDate && */}
                                    <>
                                        <label className='labelHeaderStyle'>DEPARTURE DATE</label>
                                        <Form.Item
                                            name='defFlightDepartureDate'
                                            // initialValue={currentSearchData ? dayjs(new Date(currentSearchData?.legs[0]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                            // initialValue={dayjs(new Date(searchDetails?.flightDeptDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') || ''}
                                            className="createUserTextInput"
                                            rules={[{ required: true, message: 'Departure Date is required' }]}
                                        >
                                            <DatePicker
                                                allowClear={false} 
                                                className='datePicker backgroundStyle'
                                                popupClassName='commonSubDateStyle'
                                                size='large'
                                                placeholder='Departure Date'
                                                format='DD/MM/YYYY'
                                            />
                                        </Form.Item>
                                    </>
                                {/* } */}
                            </Col>
                        </Col>
                        <Col xl={{ span: 3 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                            <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                                <Checkbox checked={showDatePicker} className='returnDtCheckbox' onChange={onChange}><label className='labelHeaderStyle'>RETURN DATE</label></Checkbox>
                                {/* {(showDatePicker || !showDatePicker) && */}
                                    <Form.Item
                                        name='defFlightReturnDate'
                                        className="createUserTextInput"
                                        // initialValue={currentSearchData ? dayjs(new Date(currentSearchData?.legs[1]?.outboundDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                        // initialValue={dayjs(new Date(searchDetails?.flightReturnDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') || null}
                                        rules={[{ required: true, message: 'Return Date is required' }]}
                                    >
                                        <DatePicker
                                            allowClear={false}
                                            className={`datePicker backgroundStyle ${!showDatePicker ? 'showDate' : ''}`}
                                            popupClassName='commonSubDateStyle'
                                            size='large'
                                            placeholder='Return Date'
                                            format='DD/MM/YYYY'
                                            disabled={!showDatePicker}
                                        />
                                    </Form.Item>
                                {/* } */}
                            </Col>
                        </Col>
                        <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                            <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                                <label className='labelHeaderStyle'>PASSENGER & CLASS</label>
                                <Form.Item>
                                    {/* <Space wrap> */}
                                        <PopoverFlight currentSearchData={currentSearchData} searchDetails={searchDetails} />
                                        {/* <TravelClassPopover /> */}
                                    {/* </Space> */}
                                </Form.Item>
                            </Col>
                        </Col>
                        <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                            <Button className='updateSearchBtn' label='UPDATE SEARCH' />
                        </Col>
                    </Row>
                </Form>
                {/* <br />
                <Row>
                    <Radio.Group options={fareOptions} onChange={onFareChangeOptions} value={selectedFare} />
                </Row> */}

            </Card>
        </div>
    );
}

export default FilghtCard;