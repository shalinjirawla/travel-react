import { Card, Col, Descriptions, Row, Table, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react'
import { airportData } from '../../../JSON/airports';

const FlightSubDetails = ({ type, data, index }) => {

    const baggageInfoColumns = [
        {
            key: "baggageType",
            title: "Baggage Type",
            dataIndex: "baggageType",
            sorter: false,
            width: '10%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "checkIn",
            title: "Check-In",
            dataIndex: "checkIn",
            sorter: false,
            width: '10%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "cabin",
            title: "Cabin",
            dataIndex: "cabin",
            sorter: false,
            width: '10%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
    ];
    const baggageInfoList = [
        {   
            id: 1,
            baggageType: 'ADULT',
            checkIn: '15 Kgs',
            cabin: '7 Kgs',
        }
    ];

    const cancellationChargeColumns = [
        {
            key: "ifCancelled",
            title: "If cancelled",
            dataIndex: "ifCancelled",
            sorter: false,
            width: '10%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "charges",
            title: "Charges",
            dataIndex: "charges",
            sorter: false,
            width: '10%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
    ];
    const cancellationChargeList = [
        {   
            id: 1,
            ifCancelled: 'Goibibo Fee',
            charges: '₹300',
        },
        {   
            id: 2,
            ifCancelled: '0-2 hours',
            charges: 'Non Refundable',
        },
        {   
            id: 3,
            ifCancelled: '2-24 hours',
            charges: '₹3,675',
        },
        {   
            id: 4,
            ifCancelled: '>24 hours',
            charges: '₹3,150',
        },
    ];

    const rescheduleChargeColumns = [
        {
            key: "ifReschedule",
            title: "If rescheduled",
            dataIndex: "ifReschedule",
            sorter: false,
            width: '5%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "charges",
            title: "Charges",
            dataIndex: "charges",
            sorter: false,
            width: '5%',
            className: 'fontSmallStyle',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
    ];
    const rescheduleChargeList = [
        {   
            id: 1,
            ifReschedule: 'Goibibo Fee',
            charges: '₹300',
        },
        {   
            id: 2,
            ifReschedule: '0-2 hours',
            charges: 'Not Changeable',
        },
        {   
            id: 3,
            ifReschedule: '2-24 hours',
            charges: '₹3,150',
        },
        {   
            id: 4,
            ifReschedule: '>24 hours',
            charges: '₹2,625',
        },
    ];

    const flightInfoTab = (data, index) => (
        <div className='multiCityTabCardStyle' key={index}>
            <Card className='tabCardFStyle'>
                <Row align='middle' justify='space-between'>
                    <Col xl={type === 'RoundTrip' ? 4 : 3} lg={3} md={3} sm={3} xs={3}>
                        <Row align='middle' justify='space-between'><span className='fontSmallStyle'>{data?.legsDetails?.segments[0]?.airlineCode}</span></Row>
                        <Row align='middle' justify='space-between'><span className={type === 'RoundTrip' ? 'multiFSmallFont fontSmallStyle' : 'fontSmallStyle'}>{data?.code}</span></Row>
                        {/* <Row align='middle' justify='space-between'><span className='multiFTabAir'>(Aircraft:320)</span></Row> */}
                    </Col>

                    <Col xl={6} lg={8} md={8} sm={8} xs={8} className='textAlignEnd'>
                        {(type !== 'OneWayTrip' && type !== 'RoundTrip') && <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{dayjs(new Date(data?.legsDetails?.departureDateTime)).format('ddd DD MMM YYYY')}</span>
                            </Col>
                        </Row>}
                        <Row align='middle' justify='space-between'>
                            {/* <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiComboTime multiFlineHeight'> */}
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className={`multiFlineHeight ${(type === 'FlightCombinations') ? 'multiComboTime' : ((type === 'OwnFlights') ? 'multiFStationTime' : 'multiFStationTime')}`}>
                                <span className='multiFRight secondaryTitle fontThirdStyle'>{data?.legsDetails?.segments[0]?.departureAirportCode}</span>
                                <span className='fontThirdStyle'>{data?.legsDetails?.departureTime}</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</span>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={5} lg={5} md={5} sm={5} xs={5} className='textAlignCenter'>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div className='multyCityDistanceTLine'>
                                {/* <div className={`${(type === 'FlightCombinations') ? 'multyComboDistanceTLine' : ((type === 'OwnFlights') ? 'multyCityDistanceTLine' : '')}`}> */}
                                    <span className='multyCityDotDTLine'></span><span className='multyCityDSpanTLine fontSmallStyle'>{data?.legsDetails?.duration}</span><span className='multyCityArrowDTLine'></span>
                                </div>
                            </Col>
                        </Row>
                        {(type !== 'OneWayTrip' && type !== 'RoundTrip') && <Row align='middle' justify='space-between' className='multyCityFDuration'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <span className='fontSmallStyle'>Flight Duration</span>
                            </Col>
                        </Row>}
                    </Col>

                    <Col xl={6} lg={8} md={8} sm={8} xs={8}>
                        {(type !== 'OneWayTrip' && type !== 'RoundTrip') && <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{dayjs(new Date(data?.legsDetails?.arrivalDateTime)).format('ddd DD MMM YYYY')}</span>
                            </Col>
                        </Row>}
                        <Row align='middle' justify='space-between'>
                            {/* <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiComboTime multiFlineHeight'> */}
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className={`multiFlineHeight ${(type === 'FlightCombinations') ? 'multiComboTime' : ((type === 'OwnFlights') ? 'multiFStationTime' : 'multiFStationTime')}`}>
                                <span className='multiFRight secondaryTitle fontThirdStyle'>{data?.legsDetails?.segments[0]?.arrivalAirportCode}</span>
                                <span className='fontThirdStyle'>{data?.legsDetails?.arrivalTime}</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            {type === 'FlightCombinations' && <Card className='tabCardFStyle m-Top'>
                <Row align='middle' justify='space-between'>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Row align='middle' justify='space-between'><span className='fontSmallStyle'>{data?.legsDetails?.segments[0]?.airlineCode}</span></Row>
                        <Row align='middle' justify='space-between'><span className='fontSmallStyle'>{data?.code}</span></Row>
                        {/* <Row align='middle' justify='space-between'><span className='multiFTabAir'>(Aircraft:32A)</span></Row> */}
                    </Col>

                    <Col xl={6} lg={8} md={8} sm={8} xs={8} className='textAlignEnd'>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{dayjs(new Date(data?.legsDetails?.departureDateTime)).format('ddd DD MMM YYYY')}</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            {/* <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiComboTime multiFlineHeight'> */}
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className={`multiFlineHeight ${type === 'FlightCombinations' ? 'multiComboTime' : ''}`}>
                                <span className='multiFRight secondaryTitle fontThirdStyle'>{data?.legsDetails?.segments[0]?.departureAirportCode}</span>
                                <span className='fontThirdStyle'>{data?.legsDetails?.departureTime}</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{airportData.find(o => o.code === data?.legsDetails?.segments[0]?.departureAirportCode)?.label}</span>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={5} lg={5} md={5} sm={5} xs={5} className='textAlignCenter'>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div className='multyCityDistanceTLine'>
                                {/* <div className={`${type === 'FlightCombinations' ? 'multyComboDistanceTLine' : ''}`}> */}
                                    <span className='multyCityDotDTLine'></span><span className='multyCityDSpanTLine'>{data?.legsDetails?.duration}</span><span className='multyCityArrowDTLine'></span>
                                </div>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between' className='multyCityFDuration'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <span className='fontSmallStyle'>Flight Duration</span>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={6} lg={8} md={8} sm={8} xs={8}>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{dayjs(new Date(data?.legsDetails?.arrivalDateTime)).format('ddd DD MMM YYYY')}</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            {/* <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiComboTime multiFlineHeight'> */}
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className={`multiFlineHeight ${type === 'FlightCombinations' ? 'multiComboTime' : ''}`}>
                                <span className='multiFRight secondaryTitle fontThirdStyle'>{data?.legsDetails?.segments[0]?.arrivalAirportCode}</span>
                                <span className='fontThirdStyle'>{data?.legsDetails?.arrivalTime}</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>{airportData.find(o => o.code === data?.legsDetails?.segments[0]?.arrivalAirportCode)?.label}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>}
        </div>
    );

    const fareDetailItems = (data, index) => [
        {
            key: '1',
            label: 'Base Fare (1 Adult)',
            children: `₹${data?.fareDetails?.price?.amount}`,
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            key: '2',
            label: 'Taxes and Fees (1 Adult)',
            children: `₹${data?.fareDetails?.price?.taxAmount}`,
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            key: '3',
            label: 'Total Fare (1 Adult)',
            children: `₹${data?.fareDetails?.price?.totalAmount}`,
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
    ];

    const fairDetailTab = (data, index) => (
        <div className='multiCityTabCardStyle'>
            <Descriptions className='multiCFairDetail' bordered items={fareDetailItems(data, index)} />
        </div>
    );

    const baggageInfoTab = (
        <>
            <div className='multiCityTabCardStyle'>
                <Row align='middle' justify='space-between'>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div>
                            <span className='multiCFName'>AMD-BOM</span>
                            <span className='multiCFCode'>(UK 956)</span>
                        </div>
                    </Col>
                </Row>
                <Row align='middle' justify='space-between'>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div>
                            <Table 
                                bordered
                                columns={baggageInfoColumns}
                                dataSource={baggageInfoList}
                                pagination={false}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            {type === 'FlightCombinations' && <div className='multiCityTabCardStyle m-Top'>
                <Row align='middle' justify='space-between'>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div>
                            <span className='multiCFName'>BOM-DEL</span>
                            <span className='multiCFCode'>(AI 859)</span>
                        </div>
                    </Col>
                </Row>
                <Row align='middle' justify='space-between'>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div>
                            <Table 
                                bordered
                                columns={baggageInfoColumns}
                                dataSource={baggageInfoList}
                                pagination={false}
                            />
                        </div>
                    </Col>
                </Row>
            </div>}
        </>
    );

    const cancellationRuleTab = (
        <>
            <div className='multiCityTabCardStyle'>
                <Card className='multiFirCanRuleCard'>
                    <Row align='middle' justify='space-between'>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <span className='canRuleHeading'><b>Ahmedabad to Mumbai</b></span>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                            <Tag className='tagMTParRef'>Partially Refundable</Tag>
                        </Col>
                    </Row>
                </Card>

                {/* <Card className='multiSecCanRuleCard'> */}
                <Card className={`${(type === 'FlightCombinations') ? 'multiSecCanRuleComboCard' : ((type === 'OwnFlights') ? 'multiSecCanRuleCard' : 'flightDetailSecCanRuleCard')}`}>
                    <Row align='top' justify='space-between'>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='multiCityFTable'>
                                <div className='canChargeHeading'>Cancellation Charges</div>
                                <div>
                                    <Table
                                        bordered
                                        columns={cancellationChargeColumns}
                                        dataSource={cancellationChargeList}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='multiCityFTable'>
                                <div className='canChargeHeading'>Reschedule Charges</div>
                                <div>
                                    <Table
                                        bordered
                                        columns={rescheduleChargeColumns}
                                        dataSource={rescheduleChargeList}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>           
                </Card>
            </div>
            {type === 'FlightCombinations' && <div className='multiCityTabCardStyle m-Top'>
                <Card className='multiFirCanRuleCard'>
                    <Row align='middle' justify='space-between'>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <span className='canRuleHeading'><b>Mumbai to New Delhi</b></span>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                            <Tag className='tagMTParRef'>Partially Refundable</Tag>
                        </Col>
                    </Row>
                </Card>

                {/* <Card className='multiSecCanRuleCard'> */}
                <Card className={`${type === 'FlightCombinations' ? 'multiSecCanRuleComboCard' : ''}`}>
                    <Row align='top' justify='space-between'>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='multiCityFTable'>
                                <div className='canChargeHeading'>Cancellation Charges</div>
                                <div>
                                    <Table
                                        bordered
                                        columns={cancellationChargeColumns}
                                        dataSource={cancellationChargeList}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='multiCityFTable'>
                                <div className='canChargeHeading'>Reschedule Charges</div>
                                <div>
                                    <Table
                                        bordered
                                        columns={rescheduleChargeColumns}
                                        dataSource={rescheduleChargeList}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>           
                </Card>
            </div>}
        </>
    );

    const items = (data, index) => [
        {
            key: '1',
            label: 'Flight Information',
            children: flightInfoTab(data, index),
        },
        {
            key: '2',
            label: 'Fare Details',
            children: fairDetailTab(data, index),
        },
        {
            key: '3',
            label: 'Baggage Information',
            children: baggageInfoTab,
        },
        {
            key: '4',
            label: 'Cancellation Rules',
            children: cancellationRuleTab,
        },
    ];

    return (
        <div>
            <Tabs className='multicityTabColor' defaultActiveKey="1" items={items(data, index)} type='card' size='large' /><br />
        </div>
    );
}

export default FlightSubDetails;