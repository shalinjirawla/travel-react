import React from 'react';
import '../../../../styles/flight/MultiCity/TicketCard.css';
import { Card, Col, Row } from 'antd';
import Button from '../../../AppButton';

const TicketCard = () => {

    const ticketCardDetails = [
        {
            airLine: 'Air India',
            from: 'AMD',
            to: 'BOM',
            date: 'Fri 5 Jan 2024',
            departure: '16:50',
            duration: '1h 20m',
            stop: 'Nonstop',
            arrival: '18:10',
            price: '₹10,444',
        },
        {
            airLine: 'Air India',
            from: 'BOM',
            to: 'DEL',
            date: 'Thu 28 Mar 2024',
            departure: '23:45',
            duration: '4h 10m',
            stop: 'Nonstop',
            arrival: '03:35',
            price: '₹4,913',
        },
    ];

    return (
        <div className='multiCityRightCard stickyYourTicketTCard'>

            <Card className='multiCityTicketCardStyle' hoverable>
                <div className='yourTicketHeading'>Your Ticket</div>

                {ticketCardDetails.map((data, index) => (
                    <div className='multiCityFromDiv' key={index}>
                        <Row align='middle' justify='space-between'>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                <span className='multiCityAirLine'>{data.airLine}</span>
                            </Col>
                            <Col xl={20} lg={20} md={20} sm={20} xs={20} className='multyCitySecCol'>
                                <div>
                                    <div className='ticketDataFRow'>
                                        <span>{data.from} - {data.to}, </span>
                                        <span>{data.date}</span>
                                    </div>
                                    <div className='ticketDataSRow'>
                                        <Row align='middle' justify='space-between'>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <span className='ticketDataSColumn'><span>{data.departure}</span></span>
                                            </Col>
                                            <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                                                <span className='ticketDataSColumn d-flex'><span>{data.duration}</span><span className='multiTicketStopColor'>( {data.stop} )</span></span>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <span className='ticketDataSColumn'><span>{data.arrival}</span></span>
                                            </Col>
                                            <Col xl={5} lg={5} md={5} sm={5} xs={5} className='textAlignR'>
                                                <span className='ticketDataSColumn'><b>{data.price}</b></span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Card>

            <Card className='multiCityYouPayDetails' hoverable>
                <Row align='middle' justify='space-between'>
                    <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                        <span className='youPayFHeading'>You Pay</span>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                        <span className='youPayFPrice'>₹15,357</span>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Button className='youPayFBtn' label='BOOK' />
                    </Col>
                </Row>
            </Card>

        </div>
    );
}

export default TicketCard;