import { Card, Col, DatePicker, Divider, Form, Popover, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import TextInput from '../components/TextInput';
import '../styles/flight.css';
import OffersCard from '../components/Flights/OffersCard';
import AppButton from '../components/AppButton';
import { DownOutlined, MinusOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import TravelClassPopover from '../components/Flights/Listing/TravelClassPopover';
import Selectable from '../components/Selectable';
import { useNavigate } from 'react-router-dom';
import RecentSearches from '../components/Flights/RecentSearches';
import MultiCityForm from '../components/Flights/MultiCityForm';
import AppFooter from './Footer';
import { getAirportNames } from '../components/API/Api';
import { airportData } from '../JSON/airports';
import dayjs from 'dayjs';

const Flights = () => {

    const navigate = useNavigate();
    const [flightAddForm] = Form.useForm();
    const [selectedFlightOption, setSelectedFlightOption] = useState('oneway');
    const [selectedFare, setSelectedFare] = useState('regular');
    const [airportsList, setAirportsList] = useState([]);
    const [currTraveller, setCurrTraveller] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isValidateError, setIsValidateError] = useState(false);
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
        const { flightFrom, flightTo, flightDeptDate, flightReturnDate } = flightAddForm.getFieldsValue();
        if (!flightFrom || !flightTo || !flightDeptDate || (selectedFlightOption === 'roundtrip' && !flightReturnDate)) {
            let tempErr = [];
            setIsValidateError(true);
            if (!flightFrom) tempErr.push({ name: 'flightFrom', errors: ['Source Required!'] });
            if (!flightTo) tempErr.push({ name: 'flightTo', errors: ['Destination Required!'] });
            if (!flightDeptDate) tempErr.push({ name: 'flightDeptDate', errors: ['Departure Date Required!'] });
            if (selectedFlightOption === 'roundtrip' && !flightReturnDate) tempErr.push({ name: 'flightReturnDate', errors: ['Return Date Required!'] });
            if (tempErr?.length > 0) flightAddForm.setFields(tempErr);
            // return;
            // flightAddForm.setFields([
            //     { name: 'flightFrom', errors: ['Source Required!'] },
            //     { name: 'flightTo', errors: ['Destination Required!'] },
            //     { name: 'flightDeptDate', errors: ['Departure Date Required!'] }
            // ]);
        } else {
            if (selectedFlightOption === 'multicity') navigate('/flight-listing-multicity', { state: { selectedFlightOption: selectedFlightOption,searchDetails: flightAddForm.getFieldsValue(), travellers: currTraveller } });
            else navigate('/flight-listing', { state: { selectedFlightOption: selectedFlightOption, searchDetails: flightAddForm.getFieldsValue(), travellers: currTraveller } });
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

    const InitialSearchContent =  () => {
        return (
            <Row justify='space-between' align='top'>
                <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Col className='flightInput fromToSelectCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                        <Selectable
                            name="flightFrom"
                            size='large'
                            label='From'
                            showSearch={true}
                            placeholder='Enter City or Airport'
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
                        {/* <TextInput
                            name="flightFrom"
                            size='large'
                            type='text'
                            typeMsg='The input is not valid Name!'
                            required={false}
                            // placeholder='From :'
                            label='From'
                        /> */}
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
                <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Col className='flightInput fromToSelectCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                        <Selectable
                            name="flightTo"
                            size='large'
                            label='To'
                            showSearch={true}
                            className='searchSelect'
                            popupClassName='searchPopupSelect'
                            placeholder='Enter City or Airport'
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
                        {/* <TextInput
                            name="flightTo"
                            type='text'
                            size='large'
                            typeMsg='The input is not valid Name!'
                            required={false}
                            // placeholder='To :'
                            label='To'
                        /> */}
                    </Col>
                </Col>
                <Col className='flightInput' xl={selectedFlightOption === 'roundtrip' ? 3 : 4} lg={6} md={6} sm={6} xs={6}>
                    <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                            name='flightDeptDate1'
                            label='Departure'
                            className="createUserTextInput"
                            // initialValue={defaultPurchaseOrder ? dayjs(new Date(defaultPurchaseOrder?.PODate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                            initialValue={null}
                            // rules={[{ required: true, message: 'Departure Date is required' }]}
                            // rules={{
                                
                            // }}
                            // rules={
                            //     date: {
                            //       required: true,
                            //       dateISO: true
                            //     }
                            //   },
                            // messages: {
                            //     date: {
                            //       required: "Date required",
                            //       dateISO: "Invalid date. Must be formatted dd/mm/yy"
                            // }}
                        >
                            <DatePicker
                                className='deptReturnDatePicker'
                                popupClassName='commonDateStyle'
                                onChange={(d) => flightAddForm.setFields([{ name: 'flightDeptDate', errors: undefined }])}
                                // utcOffset={0}
                                size='large'
                                // placeholder='Departure Date'
                                format='DD/MM/YYYY'
                            />
                        </Form.Item>
                    </Col>
                </Col>
                {selectedFlightOption === 'roundtrip' &&
                    <Col className='flightInput' xl={3} lg={6} md={6} sm={6} xs={6}>
                        <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name='flightReturnDate1'
                                label='Return'
                                className="createUserTextInput"
                                initialValue={null}
                                // rules={[{ required: true, message: 'PO Date is required' }]}
                            >
                                <DatePicker
                                    className='deptReturnDatePicker'
                                    popupClassName='commonDateStyle'
                                    onChange={(d) => flightAddForm.setFields([{ name: 'flightReturnDate', errors: undefined }])}
                                    // utcOffset={0}
                                    size='large'
                                    // placeholder='Return Date'
                                    format='DD/MM/YYYY'
                                />
                            </Form.Item>
                        </Col>
                    </Col>
                }
                <Col className='flightInput' xl={selectedFlightOption === 'roundtrip' ? 6 : 8} lg={6} md={6} sm={6} xs={6}>
                    <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
                        {/* <Popover content={ClassPopover} arrow={false} placement='bottomLeft' trigger="click"> */}
                        <TravelClassPopover
                            flightForm={flightAddForm}
                            currTraveller={currTraveller}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            onDone={onDone}
                        />
                        {/* <Popover content={ClassPopover} arrow={false} placement='bottomLeft' trigger="click">
                            <TextInput
                                name="flightTraveller"
                                type='text'
                                size='large'
                                defaultVal={`${adultCounter} Adult, ${selectedClass} `}
                                typeMsg='The input is not valid Name!'
                                required={false}
                                // placeholder='To :'
                                label='Travellers & Class'
                            />
                        </Popover> */}
                    </Col>
                </Col>
            </Row>
        )
    };

    return (
        <div className='FlightMainContent'>
            <div className='flightBackgroud'></div>
            <h2 className='flightHeader'>Book Domestic and International Flight Tickets</h2>
            {/* <br /> */}
            <Card className='flightBookCard flightSearchCard'>
                <Form
                    preserve={true}
                    form={flightAddForm}
                    name="addFlightForm"
                    className="addFlightForm"
                    scrollToFirstError
                >
                    {/* <h2>Book Domestic and International Flight Tickets</h2> */}
                    <Row>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Radio.Group size='large' className='flightRadio' options={flightOptions} onChange={onChangeOptions} value={selectedFlightOption} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    {selectedFlightOption === 'multicity' ?
                        <MultiCityForm airportsList={airportsList} selectedFlightOption={selectedFlightOption} />
                        :
                        // <InitialSearchContent />
                        <Row justify='space-between' align='top'>
                            <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Col className='flightInput fromToSelectCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                                    <Selectable
                                        name="flightFrom"
                                        size='large'
                                        label='From'
                                        showSearch={true}
                                        placeholder='Enter City or Airport'
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
                                    {/* <TextInput
                                        name="flightFrom"
                                        size='large'
                                        type='text'
                                        typeMsg='The input is not valid Name!'
                                        required={false}
                                        // placeholder='From :'
                                        label='From'
                                    /> */}
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
                            <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Col className='flightInput fromToSelectCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                                    <Selectable
                                        name="flightTo"
                                        size='large'
                                        label='To'
                                        showSearch={true}
                                        className='searchSelect'
                                        popupClassName='searchPopupSelect'
                                        placeholder='Enter City or Airport'
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
                                    {/* <TextInput
                                        name="flightTo"
                                        type='text'
                                        size='large'
                                        typeMsg='The input is not valid Name!'
                                        required={false}
                                        // placeholder='To :'
                                        label='To'
                                    /> */}
                                </Col>
                            </Col>
                            <Col className='flightInput' xl={selectedFlightOption === 'roundtrip' ? 3 : 4} lg={6} md={6} sm={6} xs={6}>
                                <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
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
                                            onChange={(d, val) => {
                                                if (val) {
                                                    setSelectedDeptDate(val); 
                                                    flightAddForm.setFields([{ name: 'flightDeptDate', errors: undefined }]); 
                                                }
                                            }} 
                                            // utcOffset={0}
                                            size='large'
                                            // placeholder='Departure Date'
                                            format='DD/MM/YYYY'
                                        />
                                    </Form.Item>
                                </Col>
                            </Col>
                            {selectedFlightOption === 'roundtrip' &&
                                <Col className='flightInput' xl={3} lg={6} md={6} sm={6} xs={6}>
                                    <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
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
                            }
                            <Col className='flightInput' xl={selectedFlightOption === 'roundtrip' ? 6 : 8} lg={6} md={6} sm={6} xs={6}>
                                <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
                                    {/* <Popover content={ClassPopover} arrow={false} placement='bottomLeft' trigger="click"> */}
                                    <TravelClassPopover
                                        flightForm={flightAddForm}
                                        currTraveller={currTraveller}
                                        isVisible={isVisible}
                                        setIsVisible={setIsVisible}
                                        onDone={onDone}
                                    />
                                    {/* <Popover content={ClassPopover} arrow={false} placement='bottomLeft' trigger="click">
                                        <TextInput
                                            name="flightTraveller"
                                            type='text'
                                            size='large'
                                            defaultVal={`${adultCounter} Adult, ${selectedClass} `}
                                            typeMsg='The input is not valid Name!'
                                            required={false}
                                            // placeholder='To :'
                                            label='Travellers & Class'
                                        />
                                    </Popover> */}
                                </Col>
                            </Col>
                        </Row>
                    }
                    <br />
                    <Row style={{ marginTop: isValidateError ? '2%' : null }} justify='space-between' align='bottom'>
                        <Col xl={13} lg={11} md={11} sm={11} xs={11}>
                            <Row>
                                <Col xl={6} lg={4} md={4} sm={4} xs={4}>
                                    <h3>Select a Fare Type :</h3>
                                </Col>
                                <Col xl={18} lg={20} md={20} sm={20} xs={20}>
                                    <Radio.Group size='large' className='fareRadio' options={fareOptions} onChange={onFareChangeOptions} value={selectedFare} optionType="button" />
                                </Col>
                            </Row>
                        </Col>
                        {/* <Col xl={11} lg={11} md={11} sm={11} xs={11}></Col> */}
                    </Row>
                    <br /> 
                    <Row justify='space-between' align='bottom'>
                        <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                            {/* <Row align='middle'>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                    <h3>Travel Class :</h3>
                                </Col>
                                <Col xl={20} lg={20} md={20} sm={20} xs={20}>
                                    <Radio.Group className='classRadio' size='large' options={classOptions} onChange={onClassChangeOptions} value={selectedClass} optionType="button" />
                                </Col>
                            </Row> */}
                        </Col>
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
            {/* <AppFooter /> */}
        </div>
    )
}

export default Flights;