import { Card, Col, DatePicker, Divider, Form, Popover, Radio, Row, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import '../styles/flight.css';
import OffersCard from '../components/Flights/OffersCard';
import AppButton from '../components/AppButton';
import { DownOutlined, MinusOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import TravelClassPopover from '../components/Flights/Listing/TravelClassPopover';
import Selectable from '../components/Selectable';
import { useNavigate } from 'react-router-dom';
import RecentSearches from '../components/Flights/RecentSearches';
import MultiCityForm from '../components/Flights/MultiCityForm';
import { getAirportNames } from '../components/API/Api';
import { airportData } from '../JSON/airports';
import dayjs from 'dayjs';
import { disabledFromToday } from '../helper';
import { AuthContext } from '../context/AuthProvider';

const Flights = () => {

    const navigate = useNavigate();
    const { rsWidths: { is1100, is930, is620 }, isTablet } = useContext(AuthContext)??{};
    const [multiCityAddForm] = Form.useForm();
    const [flightAddForm] = Form.useForm();
    const { RangePicker } = DatePicker;
    const [selectedFlightOption, setSelectedFlightOption] = useState('oneway');
    const [selectedFare, setSelectedFare] = useState('regular');
    const [airportsList, setAirportsList] = useState([]);
    const [currTraveller, setCurrTraveller] = useState({ adult: 1, child: 0, infant: 0, currClass: 'economy' });
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDeptDate, setSelectedDeptDate] = useState(dayjs(new Date()).format('DD/MM/YYYY'));

    const flightOptions = [
        { label: 'One Way', value: 'oneway' },
        { label: 'Round Trip', value: 'roundtrip' },
        { label: 'Multicity', value: 'multicity' },
    ];

    const fareOptions = [
        { label: 'Regular Fare', value: 'regular' },
        { label: 'Student Fare', value: 'student' },
        { label: 'Senior Citizen', value: 'senior' },
    ];

    useEffect(() => {
        // fetchAirportsList();
        setAirportsList(airportData);
    }, []);

    const onChangeOptions = ({ target: { value }}) => {
        setSelectedFlightOption(value);
    };
    const onFareChangeOptions = ({ target: { value }}) => { setSelectedFare(value); };

    const handleFromToSearch = (val) => {
        let temp = airportsList.filter((item) => item._id.toLowerCase().includes(val.toLowerCase()) || item.code.toLowerCase().includes(val.toLowerCase()) || item.name.toLowerCase().includes(val.toLowerCase()));
        // setAirportsList(temp);
    };
    const handleFromToChange = (val) => {};
    const handleFlightSearch = () => {
        if (selectedFlightOption === 'multicity') {
            const { multiCityList } = multiCityAddForm.getFieldsValue();
            // debugger
            // flightDeptDate,flightFrom,flightTo
            let tempArr = [];
            multiCityList.forEach((o, i) => {
                if (!o.flightFrom) tempArr.push({ name: ['multiCityList', i, 'flightFrom'], errors: ['Source Required!'] });
                if (!o.flightTo) tempArr.push({ name: ['multiCityList', i, 'flightTo'], errors: ['Destination Required!'] });
                if (!o.flightDeptDate) tempArr.push({ name: ['multiCityList', i, 'flightDeptDate'], errors: ['Date Required!'] });
            });
            if (tempArr?.length > 0 && !isTablet) multiCityAddForm.setFields(tempArr);
            if (tempArr?.length > 0 && isTablet) message.error('Please add all the fields!');
            else navigate('/flight-listing-multicity', { state: { selectedFlightOption: selectedFlightOption,searchDetails: flightAddForm.getFieldsValue(), travellers: currTraveller } });
        } else {
            const { flightFrom, flightTo, flightDeptDate, flightReturnDate } = flightAddForm.getFieldsValue();
            if (!flightFrom || !flightTo || !flightDeptDate || (selectedFlightOption === 'roundtrip' && !isTablet && !flightReturnDate) || (selectedFlightOption === 'roundtrip' && isTablet && flightDeptDate?.length < 2)) {
                let tempErr = [];
                if (!flightFrom) tempErr.push({ name: 'flightFrom', errors: ['Source Required!'] });
                if (!flightTo) tempErr.push({ name: 'flightTo', errors: ['Destination Required!'] });
                if (!flightDeptDate) tempErr.push({ name: 'flightDeptDate', errors: ['Date Required!'] });
                if (selectedFlightOption === 'roundtrip' && !flightReturnDate && !isTablet) tempErr.push({ name: 'flightReturnDate', errors: ['Date Required!'] });
                if (selectedFlightOption === 'roundtrip' && flightDeptDate?.length < 2 && isTablet) tempErr.push({ name: 'flightDeptDate', errors: ['Date Required!'] });
                if (tempErr?.length > 0 && !isTablet) flightAddForm.setFields(tempErr);
                if (tempErr?.length > 0 && isTablet) message.error('Please fill all fields!');
            } else {
                // if (selectedFlightOption === 'multicity') navigate('/flight-listing-multicity', { state: { selectedFlightOption: selectedFlightOption,searchDetails: flightAddForm.getFieldsValue(), travellers: currTraveller } });
                navigate('/flight-listing', { state: { selectedFlightOption: selectedFlightOption, searchDetails: flightAddForm.getFieldsValue(), travellers: currTraveller } });
            }
        }
    };
    const handleAirportSelect = (val) => {};

    const onSwapAirports = () => {
        let from = flightAddForm.getFieldValue('flightFrom'), to = flightAddForm.getFieldValue('flightTo');
        flightAddForm.setFieldValue('flightFrom', to);
        flightAddForm.setFieldValue('flightTo', from);
    };

    const onDone = (adult, child, infant, currClass) => {
        setCurrTraveller({ adult: adult, child: child, infant: infant, currClass: currClass });
    };

    const getColOfDatePicker = () => {
        return (is1100 && selectedFlightOption === 'roundtrip') ? 5 : (!is1100 && selectedFlightOption === 'roundtrip') ? 3 : (selectedFlightOption === 'oneway' && is930) ? 5 : 4;
    };

    const getColOfTravellerInput = () => {
        return (selectedFlightOption === 'roundtrip') ? 6 : (selectedFlightOption === 'oneway' && is930) ? 7 : 8;
    };

    const getColForFareOption = () => {
        // return (selectedFlightOption !== 'roundtrip' && isTablet) || (isTablet && selectedFlightOption !== 'multicity') ? 23 : 14;
        return ((selectedFlightOption === 'roundtrip' && is1100 && !isTablet) || (selectedFlightOption === 'multicity' && isTablet)) ? 14 : 23;
    };
    
    return (
        <div className='FlightMainContent'>
            <div className='flightBackgroud'></div>
            <h2 className='flightHeader'>Book Domestic and International Flight Tickets</h2>
            <br />
            <Card className='flightBookCard flightSearchCard'>
                <Form
                    preserve={true}
                    form={flightAddForm}
                    name="addFlightForm"
                    className="addFlightForm"
                    scrollToFirstError
                >
                    <Row>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Radio.Group size='large' className='flightRadio' options={flightOptions} onChange={onChangeOptions} value={selectedFlightOption} />
                        </Col>
                    </Row>
                    <br />
                    {!isTablet && <br />}
                    {(!isTablet || selectedFlightOption === 'multicity') &&
                        <>
                            {selectedFlightOption === 'multicity' ?
                                <MultiCityForm multiCityAddForm={multiCityAddForm} airportsList={airportsList} selectedFlightOption={selectedFlightOption} />
                                :
                                <Row justify='space-between' align='top'>
                                    <Col className='flightInput' xl={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} lg={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} md={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} sm={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} xs={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6}>
                                        <Col className='flightInput fromToSelectCol' xl={23} lg={23} md={23} sm={23} xs={23}>
                                            <Selectable
                                                name="flightFrom"
                                                size='large'
                                                label='From'
                                                showSearch={true}
                                                placeholder='Depart From'
                                                // value={value}
                                                // style={props.style}
                                                className='searchSelect'
                                                popupClassName='searchPopupSelect'
                                                defaultOpen={false}
                                                suffixIcon={null}
                                                handleSelectChange={handleAirportSelect}
                                                firstName='label'
                                                secondName='code'
                                                data={airportsList}
                                                // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                filterOption={(input, option) => {
                                                    return (
                                                    option._id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                    option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                    option.code.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    );
                                                }}
                                            />
                                            <SwapOutlined
                                                style={{
                                                    position: 'absolute',
                                                    top: '40%',
                                                    // top: '25%',
                                                    fontSize: '20px',
                                                    background: '#fff',
                                                    // background: 'transparent',
                                                    padding: '2.5%',
                                                    // border: '1px solid lightgray',
                                                    borderRadius: '7px',
                                                    right: '-8%',
                                                    zIndex: '999',
                                                    cursor: 'pointer',
                                                    color: '#003b95',
                                                    boxShadow: '0 0 4px 0 lightgray'
                                                }}
                                                onClick={onSwapAirports}
                                            />
                                        </Col>
                                    </Col>
                                    <Col className='flightInput' xl={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} lg={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} md={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} sm={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6} xs={is1100 && selectedFlightOption === 'roundtrip' ? 7 : 6}>
                                        <Col className='flightInput fromToSelectCol' xl={23} lg={23} md={23} sm={23} xs={23}>
                                            <Selectable
                                                name="flightTo"
                                                size='large'
                                                label='To'
                                                showSearch={true}
                                                className='searchSelect'
                                                popupClassName='searchPopupSelect'
                                                placeholder='Going To'
                                                // value={value}
                                                // style={props.style}
                                                defaultOpen={false}
                                                suffixIcon={null}
                                                filterOption={false}
                                                firstName='label'
                                                secondName='code'
                                                // onSearch={handleFromToSearch}
                                                // onChange={handleFromToChange}
                                                notFoundContent={null}
                                                data={airportsList}
                                                handleSelectChange={handleAirportSelect}
                                            />
                                        </Col>
                                    </Col>
                                    <Col className='flightInput inputHeight' xl={getColOfDatePicker()} lg={getColOfDatePicker()} md={getColOfDatePicker()} sm={getColOfDatePicker()} xs={getColOfDatePicker()}>
                                        <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                            <Form.Item
                                                name='flightDeptDate'
                                                label='Departure'
                                                className="createUserTextInput"
                                                initialValue={null}
                                                // initialValue={defaultPurchaseOrder ? dayjs(new Date(defaultPurchaseOrder?.PODate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                                // rules={[{ required: false, message: 'PO Date is required' }]}
                                            >
                                                <DatePicker
                                                    className='deptReturnDatePicker'
                                                    popupClassName='commonDateStyle'
                                                    disabledDate={disabledFromToday}
                                                    onChange={(d, val) => {
                                                        if (val) {
                                                            setSelectedDeptDate(val); 
                                                            flightAddForm.setFields([{ name: 'flightDeptDate', errors: undefined }]);
                                                        }
                                                    }} 
                                                    // utcOffset={0}
                                                    size='large'
                                                    placeholder='Departure On'
                                                    format='DD/MM/YYYY'
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Col>
                                    {selectedFlightOption === 'roundtrip' &&
                                        <Col className='flightInput inputHeight' xl={getColOfDatePicker()} lg={getColOfDatePicker()} md={getColOfDatePicker()} sm={getColOfDatePicker()} xs={getColOfDatePicker()}>
                                            <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                                <Form.Item
                                                    name='flightReturnDate'
                                                    label='Return'
                                                    className="createUserTextInput"
                                                    initialValue={null}
                                                    // initialValue={defaultPurchaseOrder ? dayjs(new Date(defaultPurchaseOrder?.PODate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                                    // rules={[{ required: true, message: 'PO Date is required' }]}
                                                >
                                                    <DatePicker
                                                        className='deptReturnDatePicker'
                                                        popupClassName='commonDateStyle'
                                                        disabledDate={(curr) => curr.isBefore(dayjs(new Date(selectedDeptDate)).format('DD/MM/YYYY'))}
                                                        onChange={(d) => d && flightAddForm.setFields([{ name: 'flightReturnDate', errors: undefined }])}
                                                        // utcOffset={0}
                                                        size='large'
                                                        placeholder='Return On'
                                                        format='DD/MM/YYYY'
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Col>
                                    }
                                    {((selectedFlightOption === 'roundtrip' && !is1100) || selectedFlightOption === 'oneway') &&
                                        <Col className='flightInput' xl={getColOfTravellerInput()} lg={getColOfTravellerInput()} md={getColOfTravellerInput()} sm={getColOfTravellerInput()} xs={getColOfTravellerInput()}>
                                            <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                                <TravelClassPopover
                                                    flightForm={flightAddForm}
                                                    currTraveller={currTraveller}
                                                    isVisible={isVisible}
                                                    setIsVisible={setIsVisible}
                                                    onDone={onDone}
                                                />
                                            </Col>
                                        </Col>
                                    }
                                </Row>
                            }
                        </>
                    }
                    {isTablet && selectedFlightOption !== 'multicity' &&
                        <Row>
                            <Col className='flightInput' xl={24} lg={24} md={24} sm={24} xs={24}>
                                <Col className='flightInput fromToSelectCol' xl={23} lg={23} md={23} sm={23} xs={23}>
                                    <Selectable
                                        name="flightFrom"
                                        size='large'
                                        label=''
                                        showSearch={true}
                                        placeholder='Depart From'
                                        // value={value}
                                        // style={props.style}
                                        className='searchSelect'
                                        popupClassName='searchPopupSelect'
                                        defaultOpen={false}
                                        suffixIcon={null}
                                        handleSelectChange={handleAirportSelect}
                                        firstName='label'
                                        secondName='code'
                                        data={airportsList}
                                        // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        filterOption={(input, option) => {
                                            return (
                                            option._id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            option.code.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <SwapOutlined
                                        style={{
                                            position: 'absolute',
                                            top: '58%',
                                            // top: '25%',
                                            fontSize: '18px',
                                            background: '#fff',
                                            transform: 'rotate(90deg)',
                                            // background: 'transparent',
                                            padding: '1.5%',
                                            // border: '1px solid lightgray',
                                            borderRadius: '7px',
                                            right: '8%',
                                            zIndex: '999',
                                            cursor: 'pointer',
                                            color: '#003b95',
                                            boxShadow: '0 0 4px 0 lightgray'
                                        }}
                                        onClick={onSwapAirports}
                                    />
                                </Col>
                            </Col>
                            <Col className='flightInput' xl={24} lg={24} md={24} sm={24} xs={24}>
                                <Col className='flightInput fromToSelectCol' xl={23} lg={23} md={23} sm={23} xs={23}>
                                    <Selectable
                                        name="flightTo"
                                        size='large'
                                        label=''
                                        showSearch={true}
                                        className='searchSelect'
                                        popupClassName='searchPopupSelect'
                                        placeholder='Going To'
                                        // value={value}
                                        // style={props.style}
                                        defaultOpen={false}
                                        suffixIcon={null}
                                        filterOption={false}
                                        firstName='label'
                                        secondName='code'
                                        // onSearch={handleFromToSearch}
                                        // onChange={handleFromToChange}
                                        notFoundContent={null}
                                        data={airportsList}
                                        handleSelectChange={handleAirportSelect}
                                    />
                                </Col>
                            </Col>
                            <Col className='flightInput inputHeight' xl={12} lg={12} md={12} sm={12} xs={12}>
                                {/* <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}> */}
                                    <Form.Item
                                        name='flightDeptDate'
                                        label=''
                                        className="createUserTextInput"
                                        initialValue={null}
                                        // initialValue={defaultPurchaseOrder ? dayjs(new Date(defaultPurchaseOrder?.PODate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                        // rules={[{ required: false, message: 'PO Date is required' }]}
                                    >
                                        {selectedFlightOption === 'roundtrip' ?
                                            <RangePicker
                                                className='deptReturnDatePicker'
                                                popupClassName='commonDateStyle'
                                                size='middle'
                                                onChange={(d, val) => {
                                                    // debugger
                                                    if (val) {
                                                        // setSelectedDeptDate(val);
                                                        flightAddForm.setFields([{ name: 'flightDeptDate', errors: undefined }]);
                                                    }
                                                }}
                                                placeholder={['Departure', 'Return']}
                                                format={['DD/MM/YYYY', 'DD/MM/YYYY']}
                                            />
                                            :
                                            <DatePicker
                                                className='deptReturnDatePicker'
                                                popupClassName='commonDateStyle'
                                                disabledDate={disabledFromToday}
                                                onChange={(d, val) => {
                                                    if (val) {
                                                        setSelectedDeptDate(val); 
                                                        flightAddForm.setFields([{ name: 'flightDeptDate', errors: undefined }]);
                                                    }
                                                }}
                                                // utcOffset={0}
                                                size='large'
                                                placeholder='Departure On'
                                                format='DD/MM/YYYY'
                                            />
                                        }
                                    </Form.Item>
                                {/* </Col> */}
                            </Col>
                            {/* {selectedFlightOption === 'roundtrip' &&
                                <Col className='flightInput inputHeight' xl={getColOfDatePicker()} lg={getColOfDatePicker()} md={getColOfDatePicker()} sm={getColOfDatePicker()} xs={getColOfDatePicker()}>
                                    <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                        <Form.Item
                                            name='flightReturnDate'
                                            label='Return'
                                            className="createUserTextInput"
                                            initialValue={null}
                                            // initialValue={defaultPurchaseOrder ? dayjs(new Date(defaultPurchaseOrder?.PODate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                            // rules={[{ required: true, message: 'PO Date is required' }]}
                                        >
                                            <DatePicker
                                                className='deptReturnDatePicker'
                                                popupClassName='commonDateStyle'
                                                disabledDate={(curr) => curr.isBefore(dayjs(new Date(selectedDeptDate)).format('DD/MM/YYYY'))}
                                                onChange={(d) => d && flightAddForm.setFields([{ name: 'flightReturnDate', errors: undefined }])}
                                                // utcOffset={0}
                                                size='large'
                                                // placeholder='Return Date'
                                                format='DD/MM/YYYY'
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                            } */}
                            {((selectedFlightOption === 'roundtrip' && !is1100) || selectedFlightOption === 'oneway' || isTablet) &&
                                <Col className='flightInput' xl={11} lg={11} md={11} sm={11} xs={11}>
                                    {/* <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}> */}
                                        <TravelClassPopover
                                            flightForm={flightAddForm}
                                            currTraveller={currTraveller}
                                            isVisible={isVisible}
                                            setIsVisible={setIsVisible}
                                            onDone={onDone}
                                        />
                                    {/* </Col> */}
                                </Col>
                            }
                        </Row>
                    }
                    {!isTablet && <br />}
                    <Row className='fareTypeRow' wrap={false} align='middle'>
                        <Col xl={getColForFareOption()} lg={getColForFareOption()} md={getColForFareOption()} sm={getColForFareOption()} xs={getColForFareOption()}>
                            {(selectedFlightOption === 'roundtrip' && is930 && !isTablet) || (selectedFlightOption === 'multicity' && isTablet) || is620 ?
                                <>
                                    <Row>{isTablet ? <h4>Select a Fare Type :</h4> : <h3>Select a Fare Type :</h3>}</Row>
                                    <Row><Radio.Group size='large' className='fareRadio' options={fareOptions} onChange={onFareChangeOptions} value={selectedFare} optionType="button" /></Row>
                                </>
                                :
                                <Row align='middle' justify='space-between' wrap={false}>
                                    <Col flex='none'>
                                        {isTablet ? <h4>Select a Fare Type :</h4> : <h3>Select a Fare Type :</h3>}
                                    </Col>
                                    <Col flex='auto'>
                                        <Radio.Group size='large' className='fareRadio' options={fareOptions} onChange={onFareChangeOptions} value={selectedFare} optionType="button" />
                                    </Col>
                                </Row>
                            }
                        </Col>
                        {((selectedFlightOption === 'roundtrip' && is1100 && !isTablet) || (selectedFlightOption === 'multicity' && isTablet)) &&
                            <Col className={`flightInput width100 ${(selectedFlightOption === 'multicity' && isTablet) ? 'multicityOnTablet' : ''}`}>
                                <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                    <TravelClassPopover
                                        flightForm={flightAddForm}
                                        selectedFlightOption={selectedFlightOption}
                                        currTraveller={currTraveller}
                                        isVisible={isVisible}
                                        setIsVisible={setIsVisible}
                                        onDone={onDone}
                                    />
                                </Col>
                            </Col>
                        }
                    </Row>
                    <br /> 
                    <Row justify='space-between' align='bottom'>
                        <Col xl={16} lg={16} md={16} sm={16} xs={16}></Col>
                        <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                            <AppButton
                                className='appPrimaryButton searchFlightBtn'
                                label='Search Flights'
                                onClick={handleFlightSearch}
                            />
                        </Col>
                    </Row>
                </Form>
            </Card>
            <RecentSearches />
            <OffersCard />
        </div>
    )
}

export default Flights;