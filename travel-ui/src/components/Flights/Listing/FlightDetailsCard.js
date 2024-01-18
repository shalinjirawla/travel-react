import React, { useEffect, useState } from 'react';
import './FlightDetailsCard.css';
import { Badge, Card, Col, Row } from 'antd';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import Button from '../../AppButton';
import { useNavigate } from 'react-router-dom';
import { getIndianMoneyFormat, sortByDuration, sortedListForField } from '../../../helper';
import { airportData } from '../../../JSON/airports';
import FlightSubDetails from './FlightSubDetails';

const FlightDetailsCard = ({ currSearchFlightList }) => {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [todayDate, setTodayDate] = useState(null);
    const [isAscendingSortColumn, setIsAscendingSortColumn] = useState(true);
    const [isAscendingFlightDetails, setIsAscendingFlightDetails] = useState(true);
    const [selectedColumn, setSelectedColumn] = useState('PRICE');
    const [selectedCardTab, setSelectedCardTab] = useState(0);
    const [allFlightList, setAllFlightList] = useState([]);
    const [cheapestPrice, setCheapestPrice] = useState(null);

    useEffect(() => {
        if (currSearchFlightList && currSearchFlightList?.trips) {
            formatListFunc(currSearchFlightList);
        }
    }, [JSON.stringify(currSearchFlightList)]);

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
            setIsAscendingFlightDetails(true);
            setIsAscendingFlightDetails((prevIsAscending) => !prevIsAscending);
        } else {
            setIsAscendingFlightDetails((prevIsAscending) => !prevIsAscending);
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
    const dynamicDates = generateDynamicDates(startDate, 12);
    
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
    
    const flightDetails = [
        {
            airLine: 'Air India',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '17:35',
            duration: '1h 30m',
            arrival: '19:05',
            price: '₹ 10,439',
        },
        {
            airLine: 'Vistara',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:40',
            duration: '1h 30m',
            arrival: '20:10',
            price: '₹ 11,460',
        },
        {
            airLine: 'IndiGo',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:15',
            duration: '1h 30m',
            arrival: '19:35',
            price: '₹ 12,224',
        },
        {
            airLine: 'Vistara',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:40',
            duration: '1h 30m',
            arrival: '20:10',
            price: '₹ 11,460',
        },
        {
            airLine: 'IndiGo',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:15',
            duration: '1h 30m',
            arrival: '19:35',
            price: '₹ 12,224',
        },
        {
            airLine: 'Vistara',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:40',
            duration: '1h 30m',
            arrival: '20:10',
            price: '₹ 11,460',
        },
        {
            airLine: 'IndiGo',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:15',
            duration: '1h 30m',
            arrival: '19:35',
            price: '₹ 12,224',
        },
        {
            airLine: 'Vistara',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:40',
            duration: '1h 30m',
            arrival: '20:10',
            price: '₹ 11,460',
        },
        {
            airLine: 'IndiGo',
            from: 'AMD Ahmedabad, India',
            to: 'BOM Mumbai, India',
            departure: '18:15',
            duration: '1h 30m',
            arrival: '19:35',
            price: '₹ 12,224',
        },
    ];
    
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
                                        style={{
                                            color: selectedDate === date ? 'rgb(45, 103, 178)' : '',
                                            backgroundColor: selectedDate === date ? 'rgb(235 235 235)' : 'transparent',
                                            cursor: 'pointer',
                                            // padding: '20px 6px 20px 6px',
                                            padding: '6px 6px 6px 6px',
                                            fontSize: selectedDate === date ? '15px' : '13px',
                                            fontWeight: selectedDate === date ? '500' : ''
                                        }}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        <label className='dynamicDate'>{date}</label><br />
                                        <label className='dynamicPrice' style={{ color: isPriceBelow40000(getPriceForDate(date)) ? 'green' : '' }}>{getPriceForDate(date)}</label>
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </Col>
                    <Col><RightOutlined className='dateIcon' onClick={handleRightClick} /></Col>
                </Row>
            </Card><br />

            <Card className='cardLine'>
                <Row align='middle' justify='space-between'>
                    <div></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('DEPARTURE')} className='divCenter textAlignCenter'>
                            <h4 className={`headingHeight ${selectedColumn === 'DEPARTURE' ? 'colorChange' : ''} `}>
                                DEPARTURE {selectedColumn === 'DEPARTURE' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            <label className='labelFont'>earliest @ 17:35</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('DURATION')} className='divCenter textAlignCenter'>
                            <h4 className={`headingHeight ${selectedColumn === 'DURATION' ? 'colorChange' : ''} `}>
                                DURATION {selectedColumn === 'DURATION' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            <label className='labelFont'>fastest @ 1hrs 20m</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('ARRIVAL')} className='divCenter textAlignCenter'>
                            <h4 className={`headingHeight ${selectedColumn === 'ARRIVAL' ? 'colorChange' : ''} `}>
                                ARRIVAL {selectedColumn === 'ARRIVAL' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            <label className='labelFont'>today @ 19:05</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('PRICE')} className='divCenter textAlignCenter'>
                            <h4 className={`headingHeight ${selectedColumn === 'PRICE' ? 'colorChange' : ''} `}>
                                PRICE {selectedColumn === 'PRICE' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            {/* <label className='labelFont'>cheapest @ {items[0].price}</label> */}
                            <label className='labelFont'>cheapest @ 10,439</label>
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <div onClick={() => handleSortClick('BEST')} className='divCenter textAlignCenter'>
                            <h4 className={`headingHeight ${selectedColumn === 'BEST' ? 'colorChange' : ''} `}>
                                BEST 
                                {/* {selectedColumn === 'BEST' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)} */}
                            </h4>
                            <label className='labelFont'>1hrs 25m, 0 stops - 10,439</label>
                        </div>
                    </Col>
                    <div></div>
                </Row>
            </Card>
            <br />

            {/* <Card className='cardStyle'> 
                <Row align='middle' justify='space-between'>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <h4 className='headingHeight'>DEPARTURE</h4>
                        <label className='labelFont'>earliest @ 17:35</label>
                    </Col>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <h4 className='headingHeight'>DURATION</h4>
                        <label className='labelFont'>fastest @ 1hrs 20m</label>
                    </Col>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <h4 className='headingHeight'>ARRIVAL</h4>
                        <label className='labelFont'>today @ 19:05</label>
                    </Col>
                    <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <h4 className='headingHeight'>PRICE</h4>
                        <label className='labelFont'>cheapest @ 10,439</label>
                    </Col>
                    <Col xl={{ span: 5 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <h4 className='headingHeight'>BEST</h4>
                        <label className='labelFont'>1hrs 25m, 0 stops - 10,439</label>
                    </Col>
                </Row>
            </Card><br /> */}


            {allFlightList.map((data, index) => (
                <>
                    <Badge.Ribbon
                        style={{
                            display: (data?.fareDetails?.price?.totalAmount === cheapestPrice) ? null : 'none',
                            backgroundImage: 'linear-gradient(134.97deg, rgb(27, 149, 100) 0%, rgb(57, 213, 70) 100%)',
                            fontSize: '12px', padding: '0.2% 2%'
                        }}
                        text="Cheapest"
                    >
                        <Card className='cardStyle mapCard' key={index}>
                            {/* {data.price === cheapestPrice && (
                                <div className='dF justifyEnd'>
                                    <div className="dF">
                                        <Tag className='tagColor'><span className='tagFont'>Cheapest</span></Tag>
                                    </div>
                                </div>
                            )} */}
                            <Row align='middle' justify='space-between'>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                    <label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label>
                                </Col>
                            </Row>
                            <Row align='top' justify='space-between'>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                    <label>{data?.legsDetails?.segments[0]?.departureAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</label>
                                </Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}></Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                    <label>{data?.legsDetails?.segments[0]?.arrivalAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</label>
                                </Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}></Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}></Col>
                            </Row>
                            <Row align='middle' justify='space-between'>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                    <h2>{data?.legsDetails?.departureTime}</h2>
                                </Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                    <h2>{data?.legsDetails?.duration}</h2>
                                </Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                    <h2>{data?.legsDetails?.arrivalTime}</h2>
                                </Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                    <h2>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2>
                                </Col>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                    {/* <div className='buttonCenter'> */}
                                        <Button className='viewBtn' onClick={() => navigate('/flight-booking-details')} label='VIEW FARES' />
                                    {/* </div> */}
                                </Col>
                            </Row>
                            <br/>
                            <Row align='middle' justify='space-between'>
                                <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                    <label className='labelColor' onClick={() => handleFlightDetailsClick(index)}>Flight Details {(selectedCardTab !== index && <DownOutlined className='sortIcon' />) || (selectedCardTab === index && (!isAscendingFlightDetails ? <UpOutlined className='sortIcon' /> : <DownOutlined className='sortIcon' />))}</label>
                                </Col>
                                <Col xl={{ span: 14 }} lg={{ span: 14 }} md={{ span: 14 }} sm={{ span: 14 }} xs={{ span: 14 }}>
                                    <label className='labelStyle'>Get Rs.149 OFF on GISUPER; Extra 25 OFF on UPI</label>
                                </Col>
                            </Row>

                            {selectedCardTab === index && !isAscendingFlightDetails &&
                                <div className='flightDetailsFTab'>
                                    <FlightSubDetails type={'OneWayTrip'} data={data} index={index} />
                                </div>
                            }

                        </Card><br />
                    </Badge.Ribbon>
                </>
            ))}

            {/* {flightDetails.map((data, index) => (
                <>
                    <Card className='cardStyle' key={index}>
                        {data.price === '₹ 10,439' && (
                            <div className='dF justifyEnd'>
                                <div className="dF">
                                    <Tag className='tagColor'><span className='tagFont1'>Cheapest</span></Tag>
                                </div>
                            </div>
                        )}
                        <Row align='middle' justify='space-between'>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                <label className='divMargin'><b>{data.airLine}</b></label>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                <label>{data.from}</label>
                            </Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}></Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                <label>{data.to}</label>
                            </Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}></Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}></Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                <h2 className='departureMargin'>{data.departure}</h2>
                            </Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                <h2>{data.duration}</h2>
                            </Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                <h2 className='arrivalMargin'>{data.arrival}</h2>
                            </Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                <h2>{data.price}</h2>
                            </Col>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }} className='divCenter'>
                                <div className='buttonCenter'>
                                    <Button className='viewBtn' onClick={() => navigate('/booking-details')} label='VIEW FARES' />
                                </div>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={{ span: 10 }} lg={{ span: 10 }} md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 10 }}></Col>
                            <Col xl={{ span: 14 }} lg={{ span: 14 }} md={{ span: 14 }} sm={{ span: 14 }} xs={{ span: 14 }} className='divCenter'>
                                <label className='labelStyle'>Get Rs.149 OFF on GISUPER; Extra 25 OFF on UPI</label>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                                <label className='labelColor'>Flight Details <DownOutlined className='sortIcon' /> </label>
                            </Col>
                        </Row>
                    </Card><br />
                </>
            ))} */}
        </div>
    );
}

export default FlightDetailsCard;