import React, { useContext, useEffect, useState } from 'react';
import './FlightDetailsCard.css';
import { Badge, Card, Col, Divider, Radio, Row, Space } from 'antd';
import { DownCircleFilled, DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import Button from '../../AppButton';
import { useNavigate } from 'react-router-dom';
import { getIndianMoneyFormat, sortByDuration, sortedListForField } from '../../../helper';
import { airportData } from '../../../JSON/airports';
import FlightSubDetails from './FlightSubDetails';
import FlightSubFareDetails from './FlightSubFareDetails';
import { AuthContext } from '../../../context/AuthProvider';

const FlightDetailsCard = ({ currSearchFlightList, travellers }) => {

    const navigate = useNavigate();
    const { rsWidths: { is620, is930, is1100 } } = useContext(AuthContext)??{};
    const [is1412, setIs1412] = useState(window.innerWidth <= 1412);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [todayDate, setTodayDate] = useState(null);
    const [isAscendingSortColumn, setIsAscendingSortColumn] = useState(true);
    const [isFlightDetailsShow, setIsFlightDetailsShow] = useState(false);
    const [isFareDetailsShow, setIsFareDetailsShow] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('PRICE');
    const [selectedCardTab, setSelectedCardTab] = useState(0);
    const [allFlightList, setAllFlightList] = useState([]);
    const [cheapestPrice, setCheapestPrice] = useState(null);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    useEffect(() => {
        if (currSearchFlightList && currSearchFlightList?.trips) {
            formatListFunc(currSearchFlightList);
        }
    }, [JSON.stringify(currSearchFlightList)]);
    
    const handleWindowSizeChange = () => {
        setIs1412(window.innerWidth <= 1412);
    };

    const formatListFunc = async (list) => {
        let formatArr = list?.trips?.map((o) => {
            if (list?.legs.filter(l => l.id === o.legIds[0])[0]?.duration.endsWith('h')) {
                // list?.legs.filter(l => l.id === o.legIds[0])[0]?.duration = list?.legs.filter(l => l.id === o.legIds[0])[0]?.duration + ' 00m';
            }
            return {
                legsDetails: list?.legs.filter(l => l.id === o.legIds[0])[0],
                fareDetails: list?.fares.filter(f => f.tripId === o.id)[0],
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
        setAllFlightList(formatArr);
    };
    
    const convertTimeStringToSortable = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    };

    const sortedListForDeparture = (arr, sortBy) => {
        arr.sort((a, b) => {
            const timeA = convertTimeStringToSortable(a?.legsDetails?.departureTime);
            const timeB = convertTimeStringToSortable(b?.legsDetails?.departureTime);
            return sortBy === 'asc' ? timeB - timeA : timeA - timeB;
        });
        return arr;
    };

    const checkForAscending = (column) => {
        if (column == 'PRICE') {
            setAllFlightList(allFlightList.sort((a, b) => a?.fareDetails?.price?.totalAmount - b?.fareDetails?.price?.totalAmount));
        }
        if (column === 'DURATION') {
            let temp = sortByDuration(allFlightList, allFlightList?.length, 'asc', 'legsDetails', 'duration');
            setAllFlightList(temp);
        }
        if (column === 'DEPARTURE' || column === 'ARRIVAL') {
            let temp = sortedListForField(allFlightList, 'asc', 'legsDetails', (column === 'ARRIVAL') ? 'arrivalTime' : 'departureTime');
            setAllFlightList(temp);
        }
    };

    const checkForDecending = (column) => {
        if (column == 'PRICE') {
            setAllFlightList(allFlightList.sort((a, b) => b?.fareDetails?.price?.totalAmount - a?.fareDetails?.price?.totalAmount));
        }
        if (column === 'DURATION') {
            let temp = sortByDuration(allFlightList, allFlightList?.length, 'dsc', 'legsDetails', 'duration');
            setAllFlightList(temp);
        }
        if (column === 'DEPARTURE' || column === 'ARRIVAL') {
            let temp = sortedListForField(allFlightList, 'dsc', 'legsDetails', (column === 'ARRIVAL') ? 'arrivalTime' : 'departureTime');
            setAllFlightList(temp);
        }
    };
    
    const handleSortClick = (column) => {
        if (column !== selectedColumn) {
            setIsAscendingSortColumn(true);
            checkForAscending(column);
        } else if (!isAscendingSortColumn) {
            setIsAscendingSortColumn((prevIsAscending) => !prevIsAscending);
            checkForAscending(column);
        } else {
            setIsAscendingSortColumn((prevIsAscending) => !prevIsAscending);
            checkForDecending(column);
        }
        setSelectedColumn(column);
    };

    const handleFlightDetailsClick = (index) => {
        if (index !== selectedCardTab) {
            setIsFlightDetailsShow((prevIsAscending) => prevIsAscending);
        } else {
            setIsFlightDetailsShow((prevIsAscending) => !prevIsAscending);
        }
        setSelectedCardTab(index);
    };

    const handleViewFares = (index) => {
        if (index !== selectedCardTab) {
            // setIsFareDetailsShow(true);
            setIsFareDetailsShow((prevIsAscending) => prevIsAscending);
        } else {
            setIsFareDetailsShow((prevIsAscending) => !prevIsAscending);
        }
        setSelectedCardTab(index);
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
    
    const handleLeftClick = () => {
        const dateOfToday = new Date();
        if (startDate > dateOfToday) {
            const newStartDate = new Date(startDate);
            newStartDate.setDate(startDate.getDate() - 7);
            setStartDate(newStartDate);
        }
    };
    const handleRightClick = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        setStartDate(newStartDate);
    };
    // const dynamicDates = generateDynamicDates(startDate, 12);
    const dynamicDates = generateDynamicDates(startDate, (is620 ? 6 : is930 ? 7 : is1412 ? 10 : 12));
    
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

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
    
    return (
        <div className='detailsCard'>
            <Card className='cardStyle dateSelectedCard'>
                <Row align='middle' justify='space-between'>
                    <Col><LeftOutlined className='dateIcon' onClick={handleLeftClick} /></Col>
                    <Col xl={{ span: 22 }} lg={{ span: 22 }} md={{ span: 22 }} sm={{ span: 22 }} xs={{ span: 22 }}>
                        <Row align='middle' justify='space-between'>
                            {dynamicDates.map((date, index) => (
                                <>
                                    <Col key={index} xl={{ span: 1.5 }} lg={{ span: 1.5 }} md={{ span: 1.5 }} sm={{ span: 1.5 }} xs={{ span: 1.5 }}
                                        className='dateFlightCol'
                                        style={{
                                            color: selectedDate === date ? 'rgb(45, 103, 178)' : '',
                                            backgroundColor: selectedDate === date ? 'rgb(235 235 235)' : 'transparent',
                                            // fontSize: selectedDate === date ? '15px' : '13px',
                                            fontWeight: selectedDate === date ? '500' : '',
                                            fontSize: (is1100)
                                                ? (selectedDate === date ? '13px' : '11px')
                                                : (selectedDate === date ? '15px' : '13px'),
                                        }}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        <label className='cursorP'>{date}</label><br />
                                        <label className='cursorP' style={{ color: isPriceBelow40000(getPriceForDate(date)) ? 'green' : '' }}>{getPriceForDate(date)}</label>
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </Col>
                    <Col><RightOutlined className='dateIcon' onClick={handleRightClick} /></Col>
                </Row>
            </Card><br />

            <Card className='cardFLine'>
                <Row align={is1412 ? 'top' : 'middle'} justify='space-between'>
                    <div></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('DEPARTURE')} className='divCenter textAlignCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'DEPARTURE' ? 'colorChange' : ''} `}>
                                DEPARTURE {selectedColumn === 'DEPARTURE' && (isAscendingSortColumn ? <DownOutlined className='sortFIcon' /> : <UpOutlined className='sortFIcon' />)}
                            </h4>
                            <label className='labelFont'>earliest @ 17:35</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('DURATION')} className='divCenter textAlignCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'DURATION' ? 'colorChange' : ''} `}>
                                DURATION {selectedColumn === 'DURATION' && (isAscendingSortColumn ? <DownOutlined className='sortFIcon' /> : <UpOutlined className='sortFIcon' />)}
                            </h4>
                            <label className='labelFont'>fastest @ 1hrs 20m</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('ARRIVAL')} className='divCenter textAlignCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'ARRIVAL' ? 'colorChange' : ''} `}>
                                ARRIVAL {selectedColumn === 'ARRIVAL' && (isAscendingSortColumn ? <DownOutlined className='sortFIcon' /> : <UpOutlined className='sortFIcon' />)}
                            </h4>
                            <label className='labelFont'>today @ 19:05</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('PRICE')} className='divCenter textAlignCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'PRICE' ? 'colorChange' : ''} `}>
                                PRICE {selectedColumn === 'PRICE' && (isAscendingSortColumn ? <DownOutlined className='sortFIcon' /> : <UpOutlined className='sortFIcon' />)}
                            </h4>
                            {/* <label className='labelFont'>cheapest @ {items[0].price}</label> */}
                            <label className='labelFont'>cheapest @ 10,439</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('BEST')} className='divCenter textAlignCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'BEST' ? 'colorChange' : ''} `}>
                                BEST 
                                {/* {selectedColumn === 'BEST' && (isAscendingSortColumn ? <DownOutlined className='sortFIcon' /> : <UpOutlined className='sortFIcon' />)} */}
                            </h4>
                            <label className='labelFont'>1hrs 25m, 0 stops - 10,439</label>
                        </div>
                    </Col>
                    <div></div>
                </Row>
            </Card>
            <br />

            {allFlightList.map((data, index) => (
                <>
                    <Badge.Ribbon
                        style={{
                            display: (data?.fareDetails?.price?.totalAmount === cheapestPrice) ? null : 'none',
                            backgroundImage: 'linear-gradient(134.97deg, rgb(27, 149, 100) 0%, rgb(57, 213, 70) 100%)',
                            // fontSize: '12px', 
                            padding: '0.2% 2%'
                        }}
                        text="Cheapest"
                        className='fontLabelStyle'
                    >
                        <Card className='cardStyle mapCard' key={index}>
                            <Row className='FlightListCardRow' align='top' justify={is1412 ? 'start' : 'space-between'}>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                    <Row><label className='fontSmallStyle'><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label></Row>
                                    <Row><label className='fontSmallStyle'>{data?.legsDetails?.segments[0]?.departureAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</label></Row>
                                    <Row><h2 className='FlightListCardRowH2'>{data?.legsDetails?.departureTime}</h2></Row>
                                </Col>
                                <Col className='flightListCardDurationLabel' xl={5} lg={5} md={5} sm={5} xs={5}>
                                    {/* <Row><h2 className='FlightListCardRowH2'>{data?.legsDetails?.duration}</h2></Row> */}
                                    <div className="d-flex arrowCenter">
                                        <div className="arrow-start"></div>
                                        <hr className="dashed-hr" />
                                        <span className="bold-text">{data?.legsDetails?.duration}</span>
                                        <hr className="dashed-hr" />
                                        <div className="arrow-end"></div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                    <Row><label className='visibilityHide fontSmallStyle'><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label></Row>
                                    <Row><label className='fontSmallStyle'>{data?.legsDetails?.segments[0]?.arrivalAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</label></Row>
                                    <Row><h2 className='FlightListCardRowH2'>{data?.legsDetails?.arrivalTime}</h2></Row>
                                </Col>
                                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                    <Radio.Group className='priceListRadioGrp' onChange={(val) => console.log(val)} >
                                        <Space direction="vertical">
                                            <Radio name='price' value={1}>
                                                <div className='fareDetailListInsideDiv'>
                                                    <Row><label className='FlightListCardRowLabel'><b>5421321</b></label></Row>
                                                    <Row><h2 className='fontLabelStyle'>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2></Row>
                                                    <Row><label className='FlightListCardRowLabel'><b>Economy</b>, Refundable</label></Row>
                                                </div>
                                            </Radio>
                                            <Divider className='fareDetailListDivider' />
                                            <Radio name='price' value={2}>
                                                <div className='fareDetailListInsideDiv'>
                                                    <Row><label className='FlightListCardRowLabel'><b>5421321</b></label></Row>
                                                    <Row><h2 className='fontLabelStyle'>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2></Row>
                                                    <Row><label className='FlightListCardRowLabel'><b>Economy</b>, Refundable</label></Row>
                                                </div>
                                            </Radio>
                                            <Divider className='fareDetailListDivider' />
                                            <Radio name='price' value={3}>
                                                <div className='fareDetailListInsideDiv'>
                                                    <Row><label className='FlightListCardRowLabel'><b>5421321</b></label></Row>
                                                    <Row><h2 className='fontLabelStyle'>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2></Row>
                                                    <Row><label className='FlightListCardRowLabel'><b>Economy</b>, Refundable</label></Row>
                                                </div>
                                            </Radio>
                                            <Divider className='fareDetailListDivider' />
                                            <DownCircleFilled className='viewFareFUpDown' onClick={() => handleViewFares(index)} />
                                        </Space>
                                    </Radio.Group>
                                </Col>
                                <Col className='marginVerticalAuto' xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <Button
                                        className='viewBtn'
                                        onClick={() => handleViewFares(index)}
                                        label={(selectedCardTab === index && isFareDetailsShow) ? 'HIDE FARES' : 'VIEW FARES'}
                                    />
                                </Col>
                            </Row>
                            <Row align='middle' justify='start'>
                                <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>
                                    <label className='labelColor fontSmallStyle' onClick={() => handleFlightDetailsClick(index)}>Flight Details {(selectedCardTab !== index && <DownOutlined className='sortIcon' />) || (selectedCardTab === index && (isFlightDetailsShow ? <UpOutlined className='sortIcon' /> : <DownOutlined className='sortIcon' />))}</label>
                                </Col>
                                <Col xl={{ span: 18 }} lg={{ span: 18 }} md={{ span: 18 }} sm={{ span: 18 }} xs={{ span: 18 }}>
                                    <label className='labelStyle fontSmallStyle'>Get Rs.149 OFF on GISUPER; Extra 25 OFF on UPI</label>
                                </Col>
                            </Row>

                            {selectedCardTab === index && isFlightDetailsShow &&
                                <div className='flightDetailsFTab'>
                                    <FlightSubDetails type={'OneWayTrip'} data={data} index={index} />
                                </div>
                            }

                            {selectedCardTab === index && isFareDetailsShow &&
                                <div className='flightDetailsFTab'>
                                    <FlightSubFareDetails travellers={travellers} flightData={data} searchData={currSearchFlightList} />
                                </div>
                            }
                            
                        </Card><br />
                    </Badge.Ribbon>
                </>
            ))}
        </div>
    );
}

export default FlightDetailsCard;