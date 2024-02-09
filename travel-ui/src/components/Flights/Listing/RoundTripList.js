import React, { useEffect, useState } from 'react';
import './FlightDetailsCard.css';
import { Badge, Card, Col, Radio, Row, Tag } from 'antd';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import Button from '../../AppButton';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getIndianMoneyFormat, sortByDuration, sortedListForField } from '../../../helper';
import { airportData } from '../../../JSON/airports';
import FlightSubDetails from './FlightSubDetails';

const RoundTripList = ({ currSearchFlightList, selectedFlightOption }) => {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [todayDate, setTodayDate] = useState(null);
    const [isAscendingFrom, setIsAscendingFrom] = useState(true);
    const [isAscendingTo, setIsAscendingTo] = useState(true);
    const [isAscendingFromFlightDetails, setIsAscendingFromFlightDetails] = useState(true);
    const [isAscendingToFlightDetails, setIsAscendingToFlightDetails] = useState(true);
    const [selectedFromColumn, setSelectedFromColumn] = useState('PRICE');
    const [selectedToColumn, setSelectedToColumn] = useState('PRICE');
    const [selectedCardFromTab, setSelectedCardFromTab] = useState(0);
    const [selectedCardToTab, setSelectedCardToTab] = useState(0);
    const [allFlightList, setAllFlightList] = useState([]);
    const [allReturnList, setAllReturnList] = useState([]);
    const [cheapestPrice, setCheapestPrice] = useState(null);
    const [selectedForBook, setSelectedForBook] = useState({ from: null, to: null });

    useEffect(() => {
        if (currSearchFlightList && currSearchFlightList?.trips) {
            formatListFunc(currSearchFlightList);
        }
    }, [JSON.stringify(currSearchFlightList)]);

    const formatListFunc = async (list) => {
        let returnArr = [];
        let formatArr = list?.trips?.map((o, i) => {
            if (list?.legs.filter(l => l.id === o.legIds[0])[0]?.duration.endsWith('h')) {
                // list?.legs.filter(l => l.id === o.legIds[0])[0]?.duration = list?.legs.filter(l => l.id === o.legIds[0])[0]?.duration + ' 00m';
            }
            return {
                legsDetails: list?.legs.filter(l => l.id === o.legIds[0])[0],
                fareDetails: list?.fares.filter(f => f.tripId === o.id)[0],
                isChecked: false,
                ...o
            }
        });

        let currCheap = await findCheapestPrice(formatArr);
        formatArr.forEach((o, i) => {
            if (o?.fareDetails?.price?.totalAmount === currCheap) {
                formatArr.splice(i, 1);
                formatArr.unshift(o);
            }
        });
        formatArr[0].isChecked = true;
        // setSelectedForBook({ from: formatArr[0], ...selectedForBook });
        setAllFlightList(formatArr);

        if (selectedFlightOption === 'roundtrip') {
            returnArr = list?.trips?.map((o) => {
                return {
                    legsDetails: list?.legs.filter(l => l.id === o.legIds[1])[0],
                    fareDetails: list?.fares.filter(f => f.tripId === o.id)[0],
                    isChecked: false,
                    ...o
                }
            });

            let currCheap = await findCheapestPrice(returnArr);
            returnArr.forEach((o, i) => {
                if (o?.fareDetails?.price?.totalAmount === currCheap) {
                    returnArr.splice(i, 1);
                    returnArr.unshift(o);
                }
            });
            returnArr[0].isChecked = true;
            setSelectedForBook({ from: formatArr[0], to: returnArr[0] });
            setAllReturnList(returnArr);
        }
    };

    const convertTimeStringToSortable = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    };

    // const sortedListForField = (arr, sortBy) => {
    //     arr.sort((a, b) => {
    //         const timeA = convertTimeStringToSortable(a?.legsDetails?.departureTime);
    //         const timeB = convertTimeStringToSortable(b?.legsDetails?.departureTime);
    //         return sortBy === 'asc' ? timeB - timeA : timeA - timeB;
    //     });
    //     return arr;
    // };

    const checkForAscending = (column, type) => {
        if (column == 'PRICE') {
            if (type === 'from') setAllFlightList(allFlightList.sort((a, b) => a?.fareDetails?.price?.totalAmount - b?.fareDetails?.price?.totalAmount));
            if (type === 'to') setAllReturnList(allReturnList.sort((a, b) => a?.fareDetails?.price?.totalAmount - b?.fareDetails?.price?.totalAmount));
        }
        if (column === 'DURATION') {
            if (type === 'from') {
                let temp = sortByDuration(allFlightList, allFlightList?.length, 'asc', 'legsDetails', 'duration');
                setAllFlightList(temp);
            }
            if (type === 'to') {
                let temp = sortByDuration(allReturnList, allReturnList?.length, 'asc', 'legsDetails', 'duration');
                setAllReturnList(temp);
            }
        }
        if (column === 'DEPARTURE' || column === 'ARRIVAL') {
            if (type === 'from') {
                let temp = sortedListForField(allFlightList, 'asc', 'legsDetails', (column === 'ARRIVAL') ? 'arrivalTime' : 'departureTime');
                setAllFlightList(temp);
            }
            if (type === 'to') {
                let temp = sortedListForField(allReturnList, 'asc', 'legsDetails', (column === 'ARRIVAL') ? 'arrivalTime' : 'departureTime');
                setAllReturnList(temp);
            }
        }
    };

    const checkForDecending = (column, type) => {
        if (column == 'PRICE') {
            if (type === 'from') setAllFlightList(allFlightList.sort((a, b) => b?.fareDetails?.price?.totalAmount - a?.fareDetails?.price?.totalAmount));
            if (type === 'to') setAllReturnList(allReturnList.sort((a, b) => b?.fareDetails?.price?.totalAmount - a?.fareDetails?.price?.totalAmount));
        }
        if (column === 'DURATION') {
            if (type === 'from') {
                let temp = sortByDuration(allFlightList, allFlightList?.length, 'dsc', 'legsDetails', 'duration');
                setAllFlightList(temp);
            }
            if (type === 'to') {
                let temp = sortByDuration(allReturnList, allReturnList?.length, 'dsc', 'legsDetails', 'duration');
                setAllReturnList(temp);
            }
        }
        if (column === 'DEPARTURE' || column === 'ARRIVAL') {
            if (type === 'from') {
                let temp = sortedListForField(allFlightList, 'dsc', 'legsDetails', (column === 'ARRIVAL') ? 'arrivalTime' : 'departureTime');
                setAllFlightList(temp);
            }
            if (type === 'to') {
                let temp = sortedListForField(allReturnList, 'dsc', 'legsDetails', (column === 'ARRIVAL') ? 'arrivalTime' : 'departureTime');
                setAllReturnList(temp);
            }
        }
    };

    const handleFromSortClick = async (column, type) => {
        if (column !== selectedFromColumn) {
            setIsAscendingFrom(true);
            checkForAscending(column, type);
        } else if (!isAscendingFrom) {
            setIsAscendingFrom((prevIsAscending) => !prevIsAscending);
            checkForAscending(column, type);
        } else {
            setIsAscendingFrom((prevIsAscending) => !prevIsAscending);
            checkForDecending(column, type);
        }
        setSelectedFromColumn(column);
    };

    const handleToSortClick = async (column, type) => {
        if (column !== selectedToColumn) {
            setIsAscendingTo(true);
            checkForAscending(column, type);
        } else if (!isAscendingTo) {
            setIsAscendingTo((prevIsAscending) => !prevIsAscending);
            checkForAscending(column, type);
        } else {
            setIsAscendingTo((prevIsAscending) => !prevIsAscending);
            checkForDecending(column, type);
        }
        setSelectedToColumn(column);
    };

    const handleFlightDetailsFromClick = (index) => {
        if (index !== selectedCardFromTab) {
            setIsAscendingFromFlightDetails(true);
            setIsAscendingFromFlightDetails((prevIsAscending) => !prevIsAscending);
        } else {
            setIsAscendingFromFlightDetails((prevIsAscending) => !prevIsAscending);
        }
        setSelectedCardFromTab(index);
    };

    const handleFlightDetailsToClick = (index) => {
        if (index !== selectedCardToTab) {
            setIsAscendingToFlightDetails(true);
            setIsAscendingToFlightDetails((prevIsAscending) => !prevIsAscending);
        } else {
            setIsAscendingToFlightDetails((prevIsAscending) => !prevIsAscending);
        }
        setSelectedCardToTab(index);
    };

    useEffect(() => {
        setTodayDate(getTodayDate());
        setSelectedDate(getTodayDate());
    }, []);

    const generateDynamicDates = (start, numberOfDays) => {
        return Array.from({ length: numberOfDays }, (_, index) => {
            const date = new Date(start);
            date.setDate(start.getDate() + index);
            return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
        });
    };
    const dynamicDates = generateDynamicDates(startDate, 12);

    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    };

    const priceDetails = [
        {
            price: '₹ 44500'
        },
        {
            price: '₹ 28500'
        },
        {
            price: '₹ 50000'
        },
        {
            price: '₹ 32250'
        },
        {
            price: '₹ 40000'
        },
        {
            price: '₹ 35000'
        },
        {
            price: '₹ 44500'
        },
        {
            price: '₹ 45500'
        },
        {
            price: '₹ 50000'
        },
        {
            price: '₹ 60000'
        },
        {
            price: '₹ 25000'
        },
        {
            price: '₹ 41000'
        }
    ];

    const getPriceForDate = (date) => {
        const index = dynamicDates.findIndex((dynamicDate) => dynamicDate === date);
        return index !== -1 ? priceDetails[index]?.price : 'N/A';
    };

    const isPriceBelow40000 = (price) => {
        const numericPrice = parseInt(price.replace('₹', '').trim().replace(/,/g, ''), 10);
        return numericPrice < 40000;
    };

    const findCheapestPrice = (details) => {
        if (details?.length > 0) {
            let price = details[0]?.fareDetails?.price?.totalAmount;
            for (let i = 1; i < details.length; i++) {
                const currentPrice = Number(details[i]?.fareDetails?.price?.totalAmount);
                if (Number(currentPrice) < Number(price)) {
                    price = Number(currentPrice);
                }
            }
            setCheapestPrice(price);
            return price;
        }
    };

    const flightData = [
        { price: '₹4434', airline: 'Indigo', imgSrc: 'https://imgak.goibibo.com/flights-gi-assets/images/v2/app-img/6E.png' },
        { price: '₹4524', airline: 'Akasa Air', imgSrc: 'https://imgak.goibibo.com/flights-gi-assets/images/v2/app-img/QP.png' },
        { price: '₹4370', airline: 'Vistara', imgSrc: 'https://imgak.goibibo.com/flights-gi-assets/images/v2/app-img/UK.png' },
        { price: '₹4464', airline: 'Air India', imgSrc: 'https://imgak.goibibo.com/flights-gi-assets/images/v2/app-img/AI.png' },
    ];

    const handleClickOnCard = (record, type) => {
        if (record) {
            let list = (type === 'oneway') ? allFlightList : allReturnList;
            list = list.map((o, i) => {
                if (o.id === record.id) {
                    // o.isChecked = true;
                    return { ...o, isChecked: true }
                } else {
                    return { ...o, isChecked: false }
                }
            });
            if (type === 'oneway') {
                setSelectedForBook({ from: record, to: selectedForBook.to });
                setAllFlightList(list);
            }
            if (type === 'roundtrip') {
                setSelectedForBook({ from: selectedForBook.from, to: record });
                setAllReturnList(list);
            }
        }
    };

    return (
        <div className='detailsCard'>
            {selectedForBook && selectedForBook?.from && selectedForBook?.to &&
                <>
                    <Card className='rTripCardStyle stickySelectCard'>
                        <div className='roundTripCard'>
                            <Row align='middle' justify='space-between'>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <Row align='middle' justify='space-between'>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                            <div className='iconHeading'>
                                                <span>{selectedForBook.from?.legsDetails?.airlineCodes[0]}</span>
                                            </div>
                                        </Col>
                                        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                            <Row align='middle' justify='space-between'><span className='spanSDate'>{dayjs(new Date(selectedForBook.from?.legsDetails?.departureDateTime)).format('ddd, DD MMM')}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook.from?.legsDetails?.departureAirportCode}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSTime'>{selectedForBook.from?.legsDetails?.departureTime}</span></Row>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook.from?.legsDetails?.duration}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook.from?.legsDetails?.stopoversCount > 0 ? `${selectedForBook?.from?.legsDetails?.stopoversCount} Stop` : 'Non-Stop'}</span></Row>
                                        </Col>
                                        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                            <Row align='middle' justify='space-between'><span className='spanSDate'>{dayjs(new Date(selectedForBook?.from?.legsDetails?.arrivalDateTime)).format('ddd, DD MMM')}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook?.from?.legsDetails?.arrivalAirportCode}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSTime'>{selectedForBook?.from?.legsDetails?.arrivalTime}</span></Row>
                                        </Col>
                                    </Row>
                                </Col>

                                <div className='divSelLine'></div>

                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <Row align='middle' justify='space-between'>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                            <div className='iconHeading'>
                                                <span>{selectedForBook?.from?.legsDetails?.airlineCodes[0]}</span>
                                            </div>
                                        </Col>
                                        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                            <Row align='middle' justify='space-between'><span className='spanSDate'>{dayjs(new Date(selectedForBook?.to?.legsDetails?.departureDateTime)).format('ddd, DD MMM')}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook?.to?.legsDetails?.departureAirportCode}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSTime'>{selectedForBook?.to?.legsDetails?.departureTime}</span></Row>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                            {/* <Row align='middle' justify='space-between'><span className='spanHDate'>Mon</span></Row> */}
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook?.to?.legsDetails?.duration}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook?.to?.legsDetails?.stopoversCount > 0 ? `${selectedForBook?.to?.legsDetails?.stopoversCount} Stop` : 'Non-Stop'}</span></Row>
                                        </Col>
                                        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                            {/* <Row align='middle' justify='space-between'><span className='spanSColor'>AMD<sup className='supStyle'>+1D</sup></span></Row> */}
                                            <Row align='middle' justify='space-between'><span className='spanSDate'>{dayjs(new Date(selectedForBook?.to?.legsDetails?.arrivalDateTime)).format('ddd, DD MMM')}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSColor'>{selectedForBook?.to?.legsDetails?.arrivalAirportCode}</span></Row>
                                            <Row align='middle' justify='space-between'><span className='spanSTime'>{selectedForBook?.to?.legsDetails?.arrivalTime}</span></Row>
                                        </Col>
                                    </Row>
                                </Col>

                                <div className='divBorderDashed'></div>

                                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                    <Row align='middle' justify='end'>
                                        {/* <Col xl={5} lg={5} md={5} sm={5} xs={5}></Col> */}
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <span className='spanSTime spanSFont'>₹ {getIndianMoneyFormat(Number(selectedForBook?.from?.fareDetails?.price?.totalAmount) + Number(selectedForBook?.to?.fareDetails?.price?.totalAmount))}</span>
                                        </Col>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Row align='middle' justify='end'>
                                                <Button className='rTripBtn appPrimaryButton' label='Book'></Button>
                                            </Row>
                                            {/* <Row align='middle' justify='space-between'>
                                            <Button className='rLockBtn' label='Lock Price'></Button>
                                        </Row> */}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Card><br />
                </>
            }

            <div className='roundTripOffersDiv'>
                <h4>Round Trip Offers</h4>
                <Row align='middle' justify='start'>
                    {/* <Col xl={17} lg={17} md={17} sm={17} xs={17}>
                    <Row align='middle' justify='space-between'> */}
                    {flightData.map((flight, index) => (
                        <Col key={index} xl={4} lg={4} md={4} sm={4} xs={5}>
                            <div className='card_1'>
                                <div className='in-box'>
                                    <span className='span' />
                                    <div className='main-2'>
                                        <div className='left'>
                                            <p className='p mAuto'><span>{flight.price}</span></p>
                                            <p className='pLabel'>{flight.airline}</p>
                                        </div>
                                        <img src={flight.imgSrc} className='img' alt={flight.airline} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                    {/* </Row>
                    </Col> */}
                </Row>
            </div>

            <div className='flex-between'>
                <div style={{ width: '49.5%' }}>
                    <Row justify='space-between' style={{ margin: '1%' }}>
                        <Col><h3>Sort by</h3></Col>
                        <Col><p className='secondaryP'>showing {allFlightList?.length} flights</p></Col>
                    </Row>
                    <Card className='cardLine roundTripHeaderCard'>
                        <Row align='top' justify='space-between'>
                            <div></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleFromSortClick('DEPARTURE', 'from')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedFromColumn === 'DEPARTURE' ? 'colorChange' : ''} `}>
                                        DEPARTURE {selectedFromColumn === 'DEPARTURE' && (isAscendingFrom ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>earliest @ 17:35</label>
                                </div>
                            </Col>
                            <div className='divLine'></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleFromSortClick('DURATION', 'from')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedFromColumn === 'DURATION' ? 'colorChange' : ''} `}>
                                        DURATION {selectedFromColumn === 'DURATION' && (isAscendingFrom ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>fastest @ 1hrs 20m</label>
                                </div>
                            </Col>
                            <div className='divLine'></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleFromSortClick('ARRIVAL', 'from')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedFromColumn === 'ARRIVAL' ? 'colorChange' : ''} `}>
                                        ARRIVAL {selectedFromColumn === 'ARRIVAL' && (isAscendingFrom ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>today @ 19:05</label>
                                </div>
                            </Col>
                            <div className='divLine'></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleFromSortClick('PRICE', 'from')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedFromColumn === 'PRICE' ? 'colorChange' : ''} `}>
                                        PRICE {selectedFromColumn === 'PRICE' && (isAscendingFrom ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    {/* <label className='labelFont'>cheapest @ {items[0].price}</label> */}
                                    <label className='labelFont'>cheapest @ 10,439</label>
                                </div>
                            </Col>
                            {/* <div className='divLine'></div>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleSortClick('BEST')} className='divCenter'>
                                    <h4 className={`headingHeight ${selectedColumn === 'BEST' ? 'colorChange' : ''} `}>
                                        BEST {selectedColumn === 'BEST' && (isAscending ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>1hrs 25m, 0 stops - 10,439</label>
                                </div>
                            </Col> */}
                            <div></div>
                        </Row>
                    </Card>
                    <br />

                    {allFlightList && allFlightList?.length > 0 && allFlightList.map((data, index) => (
                        <Badge.Ribbon
                            style={{
                                display: (data?.fareDetails?.price?.totalAmount === cheapestPrice) ? null : 'none',
                                backgroundImage: 'linear-gradient(134.97deg, rgb(27, 149, 100) 0%, rgb(57, 213, 70) 100%)',
                                fontSize: '12px', padding: '0.2% 2%'
                            }}
                            text="Cheapest"
                            key={index}
                        >
                            <Card className='cardStyle mapCard' onClick={() => handleClickOnCard(data, 'oneway')}>
                                <Row align='middle' justify='space-between'>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                        <label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label>
                                    </Col>
                                </Row>
                                <Row align='top' justify='space-between'>
                                    <Col xl={12} lg={4} md={4} sm={4} xs={4}>
                                        <label>{data?.legsDetails?.segments[0]?.departureAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</label>
                                    </Col>
                                    {/* <Col xl={6} lg={4} md={4} sm={4} xs={4}></Col> */}
                                    <Col xl={12} lg={4} md={4} sm={4} xs={4}>
                                        <label>{data?.legsDetails?.segments[0]?.arrivalAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</label>
                                    </Col>
                                    {/* <Col xl={6} lg={4} md={4} sm={4} xs={4}></Col> */}
                                    {/* <Col xl={4} lg={4} md={4} sm={4} xs={4}></Col> */}
                                </Row>
                                <Row align='middle' justify='space-between'>
                                    <Col xl={6} lg={4} md={4} sm={4} xs={4}>
                                        <h2 className='fontMedium'>{data?.legsDetails?.departureTime}</h2>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className='divCenter'>
                                        <h2 className='fontMedium'>{data?.legsDetails?.duration}</h2>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                        <h2 className='fontMedium'>{data?.legsDetails?.arrivalTime}</h2>
                                    </Col>
                                    <Col xl={6} lg={4} md={4} sm={4} xs={4} className='divCenter d-flex-between'>
                                        <h2 className='fontMedium'>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2>
                                        <Radio checked={data?.isChecked}></Radio>
                                    </Col>
                                    {/* <Col xl={4} lg={4} md={4} sm={4} xs={4} className='divCenter'>
                                        <div className='buttonCenter'>
                                            <Button className='viewBtn' onClick={() => navigate('/flight-booking-details')} label='VIEW FARES' />
                                        </div>
                                    </Col> */}
                                </Row>
                                <br />
                                <Row align='middle' justify='space-between'>
                                    <Col xl={12} lg={4} md={4} sm={4} xs={4}>
                                        <label className='labelColor' onClick={() => handleFlightDetailsFromClick(index)}>Flight Details {(selectedCardFromTab !== index && <DownOutlined className='sortIcon' />) || (selectedCardFromTab === index && (!isAscendingFromFlightDetails ? <UpOutlined className='sortIcon' /> : <DownOutlined className='sortIcon' />))}</label>
                                    </Col>
                                    {/* <Col xl={14} lg={14} md={14} sm={14} xs={14}>
                                        <label className='labelStyle'>Get Rs.149 OFF on GISUPER; Extra 25 OFF on UPI</label>
                                    </Col> */}
                                </Row>

                                {selectedCardFromTab === index && !isAscendingFromFlightDetails &&
                                    <div className='flightDetailsFTab'>
                                        <FlightSubDetails type='RoundTrip' data={data} index={index} />
                                    </div>
                                }

                            </Card><br />
                        </Badge.Ribbon>
                    ))}
                </div>
                <div style={{ width: '49.5%' }}>
                    <Row justify='space-between' style={{ margin: '1%' }}>
                        <Col><h3>Sort by</h3></Col>
                        <Col><p className='secondaryP'>showing {allReturnList?.length} flights</p></Col>
                    </Row>
                    <Card className='cardLine roundTripHeaderCard'>
                        <Row align='top' justify='space-between'>
                            <div></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleToSortClick('DEPARTURE', 'to')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedToColumn === 'DEPARTURE' ? 'colorChange' : ''} `}>
                                        DEPARTURE {selectedToColumn === 'DEPARTURE' && (isAscendingTo ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>earliest @ 17:35</label>
                                </div>
                            </Col>
                            <div className='divLine'></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleToSortClick('DURATION', 'to')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedToColumn === 'DURATION' ? 'colorChange' : ''} `}>
                                        DURATION {selectedToColumn === 'DURATION' && (isAscendingTo ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>fastest @ 1hrs 20m</label>
                                </div>
                            </Col>
                            <div className='divLine'></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleToSortClick('ARRIVAL', 'to')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedToColumn === 'ARRIVAL' ? 'colorChange' : ''} `}>
                                        ARRIVAL {selectedToColumn === 'ARRIVAL' && (isAscendingTo ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>today @ 19:05</label>
                                </div>
                            </Col>
                            <div className='divLine'></div>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleToSortClick('PRICE', 'to')} className='divCenter textAlignCenter cursorP'>
                                    <h4 className={`headingHeight ${selectedToColumn === 'PRICE' ? 'colorChange' : ''} `}>
                                        PRICE {selectedToColumn === 'PRICE' && (isAscendingTo ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    {/* <label className='labelFont'>cheapest @ {items[0].price}</label> */}
                                    <label className='labelFont'>cheapest @ 10,439</label>
                                </div>
                            </Col>
                            {/* <div className='divLine'></div> */}
                            {/* <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div onClick={() => handleSortClick('BEST')} className='divCenter'>
                                    <h4 className={`headingHeight ${selectedColumn === 'BEST' ? 'colorChange' : ''} `}>
                                        BEST {selectedColumn === 'BEST' && (isAscending ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                    </h4>
                                    <label className='labelFont'>1hrs 25m, 0 stops - 10,439</label>
                                </div>
                            </Col> */}
                            <div></div>
                        </Row>
                    </Card>
                    <br />

                    {allReturnList && allReturnList?.length > 0 && allReturnList.map((data, index) => (
                        <Badge.Ribbon
                            style={{
                                display: (data?.fareDetails?.price?.totalAmount === cheapestPrice) ? null : 'none',
                                backgroundImage: 'linear-gradient(134.97deg, rgb(27, 149, 100) 0%, rgb(57, 213, 70) 100%)',
                                fontSize: '12px', padding: '0.2% 2%'
                            }}
                            text="Cheapest"
                            key={index}
                        >
                            <Card className='cardStyle mapCard' onClick={() => handleClickOnCard(data, 'roundtrip')}>
                                <Row align='middle' justify='space-between'>
                                    <Col xl={6} lg={4} md={4} sm={4} xs={4}>
                                        <label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label>
                                    </Col>
                                </Row>
                                <Row align='top' justify='space-between'>
                                    <Col xl={12} lg={4} md={4} sm={4} xs={4}>
                                        <label>{data?.legsDetails?.segments[0]?.departureAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</label>
                                    </Col>
                                    {/* <Col xl={6} lg={4} md={4} sm={4} xs={4}></Col> */}
                                    <Col xl={12} lg={4} md={4} sm={4} xs={4}>
                                        <label>{data?.legsDetails?.segments[0]?.arrivalAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</label>
                                    </Col>
                                    {/* <Col xl={6} lg={4} md={4} sm={4} xs={4}></Col> */}
                                    {/* <Col xl={4} lg={4} md={4} sm={4} xs={4}></Col> */}
                                </Row>
                                <Row align='middle' justify='space-between'>
                                    <Col xl={6} lg={4} md={4} sm={4} xs={4}>
                                        <h2 className='fontMedium'>{data?.legsDetails?.departureTime}</h2>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4} className='divCenter'>
                                        <h2 className='fontMedium'>{data?.legsDetails?.duration}</h2>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                        <h2 className='fontMedium'>{data?.legsDetails?.arrivalTime}</h2>
                                    </Col>
                                    <Col xl={6} lg={4} md={4} sm={4} xs={4} className='divCenter d-flex-between'>
                                        <h2 className='fontMedium'>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2>
                                        <Radio checked={data?.isChecked}></Radio>
                                    </Col>
                                    {/* <Col xl={4} lg={4} md={4} sm={4} xs={4} className='divCenter'>
                                        <div className='buttonCenter'>
                                            <Button className='viewBtn' onClick={() => navigate('/flight-booking-details')} label='VIEW FARES' />
                                        </div>
                                    </Col> */}
                                </Row>
                                <br />
                                <Row align='middle' justify='space-between'>
                                    <Col xl={12} lg={4} md={4} sm={4} xs={4}>
                                        <label className='labelColor' onClick={() => handleFlightDetailsToClick(index)}>Flight Details {(selectedCardToTab !== index && <DownOutlined className='sortIcon' />) || (selectedCardToTab === index && (!isAscendingToFlightDetails ? <UpOutlined className='sortIcon' /> : <DownOutlined className='sortIcon' />))}</label>
                                    </Col>
                                    {/* <Col xl={14} lg={14} md={14} sm={14} xs={14}>
                                        <label className='labelStyle'>Get Rs.149 OFF on GISUPER; Extra 25 OFF on UPI</label>
                                    </Col> */}
                                </Row>

                                {selectedCardToTab === index && !isAscendingToFlightDetails &&
                                    <div className='flightDetailsFTab'>
                                        <FlightSubDetails type='RoundTrip' data={data} index={index} />
                                    </div>
                                }

                            </Card><br />
                        </Badge.Ribbon>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoundTripList;