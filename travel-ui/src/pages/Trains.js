import { Card, Col, DatePicker, Form, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles/flight.css';
import '../styles/train.css';
import OffersCard from '../components/Flights/OffersCard';
import AppButton from '../components/AppButton';
import { SwapOutlined } from '@ant-design/icons';
import Selectable from '../components/Selectable';
import { useNavigate } from 'react-router-dom';
import RecentSearches from '../components/Flights/RecentSearches';
import { getAirportNames } from '../components/API/Api';
import { airportData } from '../JSON/airports';
import TextInput from '../components/TextInput';
import { onlyNumbers } from '../helper';
import dayjs from 'dayjs';

const Trains = () => {

    const navigate = useNavigate();
    const [trainAddForm] = Form.useForm();
    const [selectedTrainOption, setSelectedTrainOption] = useState('book');
    const [selectedTatkal, setSelectedTatkal] = useState('today');
    const [trainStationList, setTrainStationList] = useState([]);
    const [currFrom, setCurrFrom] = useState(null);
    const [currTo, setCurrTo] = useState(null);
    const [currClass, setCurrClass] = useState('all');

    const trainOptions = [
        { label: 'Book Train tickets', value: 'book' },
        { label: 'Check PNR Status', value: 'PNRstatus' },
        { label: 'Live Trains Status', value: 'trainStatus' },
    ];

    const tatkalOptions = [
        { label: 'Today', value: 'today' },
        { label: 'Tomorrow', value: 'tomorrow' },
        { label: 'Day After Tomorrow', value: 'dayAfterTomorrow' },
    ];

    const trainClassList = [
        { _id: 'all', name: 'All Class', value: 'all' },
        { _id: 'sleeper-class', name: 'Sleeper Class', value: 'sleeper-class' },
        { _id: 'thirdAC', name: 'Third AC', value: 'thirdAC' },
        { _id: 'secondAC', name: 'Second AC', value: 'secondAC' },
        { _id: 'firstAC', name: 'First AC', value: 'firstAC' },
        { _id: 'second-seating', name: 'Second Seating', value: 'second-seating' },
        { _id: 'first-class', name: 'First Class', value: 'first-class' },
        { _id: 'third-ac-economy', name: 'Third AC Economy', value: 'third-ac-economy' },
    ];

    useEffect(() => {
        // fetchTrainStationList();
        setTrainStationList(airportData);
    }, []);

    const onChangeOptions = ({ target: { value }}) => {
        setSelectedTrainOption(value);
    };
    const onTatkalChangeOptions = ({ target: { value }}) => {
        setSelectedTatkal(value);
        if (value === 'today') trainAddForm.setFieldValue('trainDeptDate', dayjs(new Date().toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
        if (value === 'tomorrow') trainAddForm.setFieldValue('trainDeptDate', dayjs(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
        if (value === 'dayAfterTomorrow') trainAddForm.setFieldValue('trainDeptDate', dayjs(new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString('en-GB'), 'DD/MM/YYYY'));
    };
    
    const handleDateChange = (val, date) => {
        if (date === dayjs().format('DD/MM/YYYY')) trainAddForm.setFieldValue('trainTatkal', 'today');
        else if (date === dayjs().add(1, 'day').format('DD/MM/YYYY')) trainAddForm.setFieldValue('trainTatkal', 'tomorrow');
        else if (date === dayjs().add(2, 'day').format('DD/MM/YYYY')) trainAddForm.setFieldValue('trainTatkal', 'dayAfterTomorrow');
        else { setSelectedTatkal(''); trainAddForm.setFieldValue('trainTatkal', ''); }
    };

    const handleFromToSearch = (val) => {
        let temp = trainStationList.filter((item) => item._id.toLowerCase().includes(val.toLowerCase()) || item.code.toLowerCase().includes(val.toLowerCase()) || item.name.toLowerCase().includes(val.toLowerCase()));
        // setTrainStationList(temp);
    };
    const handleFromToChange = (val) => {};
    const handleFlightSearch = () => {};
    const handleStationFromSelect = (val) => {
        setCurrFrom(val);
    };
    const handleStationToSelect = (val) => {
        setCurrTo(val);
    };
    const handleClassSelect = (val) => {
        setCurrClass(val);
    };
    const handleTrainStatusSelect = (val) => {};
    const onSwapAirports = () => {
        let from = trainAddForm.getFieldValue('trainFrom'), to = trainAddForm.getFieldValue('trainTo');
        trainAddForm.setFieldValue('trainFrom', to);
        trainAddForm.setFieldValue('trainTo', from);
    };

    return (
        <div className='FlightMainContent'>
            <div className='flightBackgroud trainBackgroud'></div>
            <h2 className='flightHeader'>Train Ticket Booking</h2>
            {/* <br /> */}
            <Card className='flightBookCard flightSearchCard'>
                <Form
                    preserve={false}
                    form={trainAddForm}
                    name="addFlightForm"
                    className="addFlightForm"
                    scrollToFirstError
                >
                    {/* <h2>Book Domestic and International Flight Tickets</h2> */}
                    <Row>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Radio.Group size='large' className='flightRadio' options={trainOptions} onChange={onChangeOptions} value={selectedTrainOption} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    {selectedTrainOption === 'book' &&
                        <>
                            {/* <InitialSearchContent /> */}
                            <Row justify='space-between' align='top'>
                                <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Col className='flightInput fromToSelectCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                                        <Selectable
                                            name="trainFrom"
                                            size='large'
                                            label='From'
                                            showSearch={true}
                                            placeholder='Enter Source Name'
                                            defaultVal={currFrom}
                                            // value={value}
                                            // style={props.style}
                                            className='searchSelect'
                                            popupClassName='searchPopupSelect'
                                            defaultOpen={false}
                                            suffixIcon={null}
                                            handleSelectChange={handleStationFromSelect}
                                            firstName='label'
                                            secondName='code'
                                            data={trainStationList}
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
                                            name="trainTo"
                                            size='large'
                                            label='To'
                                            showSearch={true}
                                            defaultVal={currTo}
                                            className='searchSelect'
                                            popupClassName='searchPopupSelect'
                                            placeholder='Enter Destination Name'
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
                                            data={trainStationList}
                                            handleSelectChange={handleStationToSelect}
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
                                <Col className='flightInput' xl={4} lg={6} md={6} sm={6} xs={6}>
                                    <Col className='flightInput' xl={23} lg={24} md={24} sm={24} xs={24}>
                                        <Form.Item
                                            name='trainDeptDate'
                                            label='Departure'
                                            className="createUserTextInput"
                                            initialValue={dayjs(new Date().toLocaleDateString('en-GB'), 'DD/MM/YYYY')}
                                            // rules={[{ required: false, message: 'PO Date is required' }]}
                                        >
                                            <DatePicker
                                                className='deptReturnDatePicker'
                                                popupClassName='commonDateStyle'
                                                size='large'
                                                onChange={handleDateChange}
                                                // placeholder='Departure Date'
                                                format='DD/MM/YYYY'
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                                <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                                    <Col className='flightInput fromToSelectCol' xl={16} lg={24} md={24} sm={24} xs={24}>
                                        <Selectable
                                            name="trainClass"
                                            size='large'
                                            label='Class'
                                            showSearch={true}
                                            className='searchSelect'
                                            popupClassName='searchPopupSelect'
                                            defaultVal={currClass}
                                            placeholder='Class'
                                            // value={value}
                                            // style={props.style}
                                            // defaultOpen={false}
                                            suffixIcon={null}
                                            filterOption={false}
                                            firstName='name'
                                            // secondName='code'
                                            // onSearch={handleFromToSearch}
                                            // onChange={handleFromToChange}
                                            notFoundContent={null}
                                            data={trainClassList}
                                            handleSelectChange={handleClassSelect}
                                        />
                                    </Col>
                                    {/* <Radio.Group size='large' className='trainTatkalRadio' options={tatkalOptions} onChange={onTatkalChangeOptions} value={selectedTatkal} /> */}
                                </Col>
                            </Row>
                            {/* <Radio.Group size='large' className='trainTatkalRadio' options={tatkalOptions} onChange={onTatkalChangeOptions} value={selectedTatkal} /> */}
                            <Form.Item
                                name='trainTatkal'
                                label=''
                                initialValue={selectedTatkal}
                                className="createUserTextInput"
                            >
                                <Radio.Group
                                    size='large'
                                    className='trainTatkalRadio'
                                    onChange={onTatkalChangeOptions}
                                    // value={selectedTatkal}
                                >
                                    <Radio value='today'>
                                        {/* <span className='openTatkalOnRadio'>Open Tatkal</span> */}
                                        Today
                                    </Radio>
                                    {/* <span className='openTatkalOnRadio'>Open Tatkal</span> */}
                                    <Radio value='tomorrow'>Tomorrow</Radio>
                                    {/* <span className='openTatkalOnRadio'>Open Tatkal</span> */}
                                    <Radio value='dayAfterTomorrow'>Day After Tomorrow</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </>
                    }
                    {selectedTrainOption === 'PNRstatus' &&
                        <Row justify='space-between' align='top'>
                            <Col className='flightInput' xl={12} lg={12} md={12} sm={12} xs={6}>
                                <Col className='flightInput fromToSelectCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                                    <TextInput
                                        name="trainPNR"
                                        type='text'
                                        size='large'
                                        onKeyPress={(event) => onlyNumbers(event)}
                                        typeMsg='The input is not valid Name!'
                                        required={false}
                                        placeholder='PNR'
                                        label='Enter 10 Digit PNR number'
                                    />
                                </Col>
                            </Col>
                        </Row>
                    }
                    {selectedTrainOption === 'trainStatus' &&
                        <Row justify='space-between' align='top'>
                            <Col className='flightInput' xl={12} lg={12} md={12} sm={12} xs={6}>
                                <Col className='flightInput fromToSelectCol trainStatusCol' xl={23} lg={24} md={24} sm={24} xs={24}>
                                    <Selectable
                                        name="trainNumberStatus"
                                        size='large'
                                        label='Train number or name'
                                        showSearch={true}
                                        className='searchSelect trainStatusSelect1'
                                        popupClassName='trainStatusPopupSelect searchPopupSelect1'
                                        placeholder='Enter Train number or name'
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
                                        data={trainStationList}
                                        handleSelectChange={handleTrainStatusSelect}
                                    />
                                </Col>
                            </Col>
                        </Row>
                    }
                    <br /><br />
                    <Row justify='space-between' align='bottom'>
                        <Col xl={16} lg={16} md={16} sm={16} xs={16}></Col>
                        <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                            <AppButton
                                className='appPrimaryButton searchFlightBtn'
                                label={selectedTrainOption === 'book' ? 'Search Trains' : 'Check Status'}
                                onClick={() => {
                                    handleFlightSearch();
                                    navigate('/train-listing', {
                                        state: {
                                            
                                        }
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                </Form>
            </Card>
            <RecentSearches />
            {/* <OffersCard /> */}
            {/* <AppFooter /> */}
        </div>
    )
}

export default Trains;