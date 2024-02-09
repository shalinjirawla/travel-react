import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Badge, Card, Col, Row } from 'antd';
import '../../../../styles/flight/MultiCity/combination.css';
import AppButton from '../../../AppButton';
import { getIndianMoneyFormat } from '../../../../helper';
import { useNavigate } from 'react-router-dom';
import { oneWayTripData } from '../../../../JSON/onewayTrip';
import { airportData } from '../../../../JSON/airports';
import FlightSubDetails from '../FlightSubDetails';
import { AuthContext } from '../../../../context/AuthProvider';

const MultiCityCombination = () => {

    const { rsWidths: { is930, is620 } } = useContext(AuthContext)??{};
    const navigate = useNavigate();
    const [isAscendingSortColumn, setIsAscendingSortColumn] = useState(true);
    const [isAscendingFlightDetails, setIsAscendingFlightDetails] = useState(true);
    const [selectedColumn, setSelectedColumn] = useState('PRICE');
    const [selectedCardTab, setSelectedCardTab] = useState(0);
    const [allFlightList, setAllFlightList] = useState([]);
    const [cheapestPrice, setCheapestPrice] = useState(null);

    useEffect(() => {
        if (oneWayTripData && oneWayTripData[1]?.trips) {
            formatListFunc(oneWayTripData[1]);
        }
    }, [JSON.stringify(oneWayTripData)]);

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

    const handleSortClick = (column) => {
        if (column !== selectedColumn) {
            setIsAscendingSortColumn(true);
            // checkForAscending(column);
        } 
        // else if (!isAscendingSortColumn) {
        //     setIsAscendingSortColumn((prevIsAscending) => !prevIsAscending);
        //     // checkForAscending(column);
        // }
        else {
            setIsAscendingSortColumn((prevIsAscending) => !prevIsAscending);
            // checkForDecending(column);
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

    return (
        <div>
            <Card className='cardLine headingCard'>
                <Row align='middle' justify='space-between'>
                    <div></div>
                    <Col className='multiHeadingCol flex-center' xl={5} lg={5} md={5} sm={5} xs={5}>
                        <div onClick={() => handleSortClick('DEPARTURE')} className='divCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'DEPARTURE' ? 'colorChange' : ''} `}>
                                DEPARTURE {selectedColumn === 'DEPARTURE' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            {/* <label className='labelFont'>earliest @ 17:35</label> */}
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col className='multiHeadingCol flex-center' xl={5} lg={5} md={5} sm={5} xs={5}>
                        <div onClick={() => handleSortClick('DURATION')} className='divCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'DURATION' ? 'colorChange' : ''} `}>
                                DURATION {selectedColumn === 'DURATION' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            {/* <label className='labelFont'>fastest @ 1hrs 20m</label> */}
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col className='multiHeadingCol flex-center' xl={5} lg={5} md={5} sm={5} xs={5}>
                        <div onClick={() => handleSortClick('ARRIVAL')} className='divCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'ARRIVAL' ? 'colorChange' : ''} `}>
                                ARRIVAL {selectedColumn === 'ARRIVAL' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            {/* <label className='labelFont'>today @ 19:05</label> */}
                        </div>
                    </Col>
                    <div className='divLine'></div>
                    <Col className='multiHeadingCol flex-center' xl={5} lg={5} md={5} sm={5} xs={5}>
                        <div onClick={() => handleSortClick('PRICE')} className='divCenter cursorP'>
                            <h4 className={`headingHeight ${selectedColumn === 'PRICE' ? 'colorChange' : ''} `}>
                                PRICE {selectedColumn === 'PRICE' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                            </h4>
                            {/* <label className='labelFont'>cheapest @ {items[0].price}</label> */}
                            {/* <label className='labelFont'>cheapest @ 10,439</label> */}
                        </div>
                    </Col>
                    <div></div>
                </Row>
            </Card>
            <br />

            {allFlightList && allFlightList?.length > 0 && allFlightList.map((data, index) => (
                <>
                    <Badge.Ribbon
                        style={{
                            // display: (data?.fareDetails?.price?.totalAmount === cheapestPrice) ? null : 'none',
                            display: 'none',
                            backgroundImage: 'linear-gradient(134.97deg, rgb(27, 149, 100) 0%, rgb(57, 213, 70) 100%)',
                            fontSize: '12px', padding: '0.2% 2%'
                        }}
                        text="Cheapest"
                    >
                        <Card className='cardStyle comboCard' key={index}>
                            {/* {data.price === cheapestPrice && (
                                <div className='dF justifyEnd'>
                                    <div className="dF">
                                        <Tag className='tagColor'><span className='tagFont'>Cheapest</span></Tag>
                                    </div>
                                </div>
                            )} */}
                            <Row align='bottom' className='comboCardFirstRow'>
                                <Col xl={is620 ? 18 : 20} lg={is620 ? 18 : 20} md={is620 ? 18 : 20} sm={is620 ? 18 : 20} xs={is620 ? 18 : 20}>
                                    {is620 && <Row><label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label></Row>}
                                    <Row align='middle' justify='space-between'>
                                        {!is620 && <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label>
                                        </Col>}
                                        <Col className='insideColLineheight' xl={is620 ? 9 : 6} lg={is620 ? 9 : 6} md={is620 ? 9 : 6} sm={is620 ? 9 : 6} xs={is620 ? 9 : 6}>
                                            <label>{data?.legsDetails?.segments[0]?.departureAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</label>
                                            <h2>{data?.legsDetails?.departureTime}</h2>
                                        </Col>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} className='divCenter textAlignCenter'>
                                            <h2>{data?.legsDetails?.duration}</h2>
                                        </Col>
                                        {!is620 && <Col xl={4} lg={4} md={4} sm={4} xs={4}></Col>}
                                        <Col className='insideColLineheight' xl={is620 ? 8 : 7} lg={is620 ? 8 : 7} md={is620 ? 8 : 7} sm={is620 ? 8 : 7} xs={is620 ? 8 : 7}>
                                            <label>{data?.legsDetails?.segments[0]?.arrivalAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</label>
                                            <h2>{data?.legsDetails?.arrivalTime}</h2>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='textAlignCenter' xl={is620 ? 6 : 4} lg={is620 ? 6 : 4} md={is620 ? 6 : 4} sm={is620 ? 6 : 4} xs={is620 ? 6 : 4}>
                                    {/* <Row align='middle' justify='center'>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='divCenter'> */}
                                            <h2>₹ {getIndianMoneyFormat(data?.fareDetails?.price?.totalAmount)}</h2>
                                        {/* </Col>
                                    </Row> */}
                                </Col>
                            </Row>
                            {/* <br/> */}
                            <Row align='top' className='comboCardFirstRow'>
                                <Col xl={is620 ? 18 : 20} lg={is620 ? 18 : 20} md={is620 ? 18 : 20} sm={is620 ? 18 : 20} xs={is620 ? 18 : 20}>
                                    {is620 && <Row><label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label></Row>}
                                    <Row align='middle' justify='space-between'>
                                        {!is620 && <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <label><b>{data?.legsDetails?.segments[0]?.airlineCode}</b></label>
                                        </Col>}
                                        <Col className='insideColLineheight' xl={is620 ? 9 : 6} lg={is620 ? 9 : 6} md={is620 ? 9 : 6} sm={is620 ? 9 : 6} xs={is620 ? 9 : 6}>
                                            <label>{data?.legsDetails?.segments[0]?.departureAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</label>
                                            <h2>{data?.legsDetails?.departureTime}</h2>
                                        </Col>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} className='divCenter textAlignCenter'>
                                            <h2>{data?.legsDetails?.duration}</h2>
                                        </Col>
                                        {!is620 && <Col xl={4} lg={4} md={4} sm={4} xs={4}></Col>}
                                        <Col className='insideColLineheight' xl={is620 ? 8 : 7} lg={is620 ? 8 : 7} md={is620 ? 8 : 7} sm={is620 ? 8 : 7} xs={is620 ? 8 : 7}>
                                            <label>{data?.legsDetails?.segments[0]?.arrivalAirportCode} - {airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</label>
                                            <h2>{data?.legsDetails?.arrivalTime}</h2>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='textAlignCenter' xl={is620 ? 6 : 4} lg={is620 ? 6 : 4} md={is620 ? 6 : 4} sm={is620 ? 6 : 4} xs={is620 ? 6 : 4}>
                                    {/* <Row align='middle' justify='center'>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}> */}
                                            <AppButton className='appPrimaryButton comboViewBtn' onClick={() => navigate('/flight-booking-details')} label='VIEW FARES' />
                                        {/* </Col>
                                    </Row> */}
                                </Col>
                            </Row>
                            {/* <br/> */}
                            <Row align='middle' justify='space-between'>
                                <Col xl={is620 ? 12 : 5} lg={is620 ? 12 : 5} md={is620 ? 12 : 5} sm={is620 ? 12 : 5} xs={is620 ? 12 : 5}>
                                    <label className='labelColor cursorP' onClick={() => handleFlightDetailsClick(index)}>Flight Details {(selectedCardTab !== index && <DownOutlined />) || (selectedCardTab === index && (!isAscendingFlightDetails ? <UpOutlined /> : <DownOutlined />))} </label>
                                </Col>
                                {/* <Col xl={15} lg={15} md={15} sm={15} xs={15}>
                                    <label className='labelStyle'>Get Rs.149 OFF on GISUPER; Extra 25 OFF on UPI</label>
                                </Col> */}
                            </Row>

                            {selectedCardTab === index && !isAscendingFlightDetails &&
                                <div className='multiCflightDetailsTab'>
                                    <FlightSubDetails type={'FlightCombinations'} data={data} index={index} />
                                </div>
                            }

                        </Card><br />
                    </Badge.Ribbon>
                </>
            ))}

        </div>
    )
}

export default MultiCityCombination;