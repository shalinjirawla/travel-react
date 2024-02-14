import React, { useContext, useState } from 'react';
import '../../../../styles/flight/MultiCity/OwnFlightList.css';
import { Card, Checkbox, Col, Descriptions, Popover, Radio, Row, Table, Tabs, Tag } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import TicketCard from './TicketCard';
import { AuthContext } from '../../../../context/AuthProvider';

const OwnFlightList = () => {

    const FilterOption = ({ options, handleChange }) => {
        return (
            <div>
                {options.map((o) => (
                    <div key={o.id}>
                        <Checkbox
                            className='checkBoxLabelPopover'
                            onChange={() => handleChange(o.id)}
                            checked={o.isChecked}
                        >
                            {o.labelValue}
                        </Checkbox>
                    </div>
                ))}
            </div>
        );
    };

    const filterData = {
        stopCheckbox: [
            {
                labelValue: 'Nonstop',
                id: 1,
                isChecked: false
            },
            {
                labelValue: '1 Stop',
                id: 2,
                isChecked: false
            }
        ],
        departureCheckbox: [
            {
                labelValue: '11AM - 5PM',
                id: 1,
                isChecked: false
            },
            {
                labelValue: '5PM - 9PM',
                id: 2,
                isChecked: false
            },
            {
                labelValue: 'AFTER 9PM',
                id: 3,
                isChecked: false
            }
        ],
        prefferedAirlinesCheckbox: [
            {
                labelValue: 'IndiGo',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'Air India',
                id: 2,
                isChecked: false
            },
            {
                labelValue: 'Vistara',
                id: 3,
                isChecked: false
            }
        ]
    }
    const [filterOptions, setFilterOptions] = useState(filterData);

    const ownFlightDetailsData = [
        {
            id: 1,
            airLine: 'IndiGo',
            fromCode: 'AMD',
            fromTime: '18:15',
            fromStation: 'Ahmedabad, India',
            duration: '1h 20m',
            durationStop: 'Nonstop',
            toCode: 'BOM',
            toTime: '19:35',
            toStation: 'Mumbai, India',
            price: '₹9,128',
            isChecked: false
        },
        {
            id: 2,
            airLine: 'IndiGo',
            fromCode: 'AMD',
            fromTime: '22:45',
            fromStation: 'Ahmedabad, India',
            duration: '1h 25m',
            durationStop: 'Nonstop',
            toCode: 'BOM',
            toTime: '00:10',
            toStation: 'Mumbai, India',
            price: '₹11,925',
            isChecked: false
        },
        {
            id: 3,
            airLine: 'IndiGo',
            fromCode: 'AMD',
            fromTime: '19:35',
            fromStation: 'Ahmedabad, India',
            duration: '1h 30m',
            durationStop: 'Nonstop',
            toCode: 'BOM',
            toTime: '21:05',
            toStation: 'Mumbai, India',
            price: '₹12,891',
            isChecked: false
        },
        {
            id: 4,
            airLine: 'Vistara',
            fromCode: 'AMD',
            fromTime: '20:25',
            fromStation: 'Ahmedabad, India',
            duration: '20h',
            durationStop: 'Nonstop',
            toCode: 'BOM',
            toTime: '16:25',
            toStation: 'Mumbai, India',
            price: '₹13,131',
            isChecked: false
        },
        {
            id: 5,
            airLine: 'Air India',
            fromCode: 'AMD',
            fromTime: '20:30',
            fromStation: 'Ahmedabad, India',
            duration: '1h 35m',
            durationStop: 'Nonstop',
            toCode: 'BOM',
            toTime: '22:05',
            toStation: 'Mumbai, India',
            price: '₹16,617',
            isChecked: false
        },
    ];
    const [ownFlightDetails, setOwnFlightDetails] = useState(ownFlightDetailsData);

    const fairDetailTabData = [
        {
            id: 1,
            fare: 'Base Fare (1 Adult)',
            price: '₹10,279',
        },
        {
            id: 2,
            fare: 'Taxes and Fees (1 Adult)',
            price: '₹1,181',
        },
        {
            id: 3,
            fare: 'Total Fare (1 Adult)',
            price: '₹11,460',
        }
    ];

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

    const { rsWidths: { is1200 }, isTablet } = useContext(AuthContext);
    const [isAscendingSortColumn, setIsAscendingSortColumn] = useState(true);
    const [isAscendingFlightDetails, setIsAscendingFlightDetails] = useState(true);
    const [selectedColumn, setSelectedColumn] = useState('PRICE');
    const [selectedCardTab, setSelectedCardTab] = useState(0);

    const handleSortClick = (column) => {
        if (column !== selectedColumn) {
            setIsAscendingSortColumn(true);
        } else {
            setIsAscendingSortColumn((prevIsAscending) => !prevIsAscending);
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

    const handleChangeFilter = (filterName, id) => {
        const updatedOptions = filterOptions[filterName].map((o) =>
            o.id === id ? { ...o, isChecked: !o.isChecked } : o
        );
        setFilterOptions({ ...filterOptions, [filterName]: updatedOptions });
    };

    const stopContent = (
        <FilterOption
            options={filterOptions.stopCheckbox}
            handleChange={(id) => handleChangeFilter('stopCheckbox', id)}
        />
    );
    const departureContent = (
        <FilterOption
            options={filterOptions.departureCheckbox}
            handleChange={(id) => handleChangeFilter('departureCheckbox', id)}
        />
    );
    const prefferedAirlinesContent = (
        <FilterOption
            options={filterOptions.prefferedAirlinesCheckbox}
            handleChange={(id) => handleChangeFilter('prefferedAirlinesCheckbox', id)}
        />
    );

    const handleClickOnCard = (record) => {
        if (record) {
            let list = ownFlightDetails;
            list = list.map(o => {
                if (o.id === record.id) {
                    return { ...o, isChecked: true }
                } else {
                    return { ...o, isChecked: false }
                }
            });
            setOwnFlightDetails(list);
        }
    };

    const flightInfoTab = (
        <div className='multiCityTabCardStyle'>
            <Card className='tabCardFStyle'>
                <Row align='middle' justify='space-between'>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Row align='middle' justify='space-between'><span className='fontSmallStyle'>IndiGo</span></Row>
                        <Row align='middle' justify='space-between'><span className='fontSmallStyle'>6E5208</span></Row>
                        <Row align='middle' justify='space-between'><span className='fontSmallStyle'>(Aircraft:320)</span></Row>
                    </Col>

                    <Col xl={6} lg={8} md={8} sm={8} xs={8} className='textAlignEnd'>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>Fri 5 Jan 2024</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFStationTime multiFlineHeight'>
                                <span className='multiFRight secondaryTitle'>AMD</span>
                                <span>16:50</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>Sardar Vallabhbhai Patel International Airport, </span>
                                <span className='fontSmallStyle'>Ahmedabad, India</span>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={5} lg={5} md={5} sm={5} xs={5} className='textAlignCenter'>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div className='multyCityDistanceTLine'>
                                    <span className='multyCityDotDTLine'></span><span className='multyCityDSpanTLine'>1h 20m</span><span className='multyCityArrowDTLine'></span>
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
                                <span className='fontSmallStyle'>Fri 5 Jan 2024</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFStationTime multiFlineHeight'>
                                <span className='multiFRight secondaryTitle'>BOM</span>
                                <span>18:10</span>
                            </Col>
                        </Row>
                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} className='multiFlineHeight'>
                                <span className='fontSmallStyle'>Chhatrapati Shivaji International Airport, </span>
                                <span className='fontSmallStyle'>Mumbai, India</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );

    const fareDetailItems = [
        {
            key: '1',
            label: 'Base Fare (1 Adult)',
            children: '₹10,279',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            key: '2',
            label: 'Taxes and Fees (1 Adult)',
            children: '₹1,181',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            key: '3',
            label: 'Total Fare (1 Adult)',
            children: '₹11,460',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
    ];

    const fairDetailTab = (
        <div className='multiCityTabCardStyle'>
            {/* <Card className='multiFairDetailCard'> */}
            <Descriptions className='multiCFairDetail' bordered items={fareDetailItems} />
            {/* </Card> */}
        </div>
    );

    const baggageInfoTab = (
        <div className='multiCityTabCardStyle'>
            {/* <Card className='multiBaggageInfoCard'> */}
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
                        {/* <AppTable
                                bordered
                                columns={baggageInfoColumns}
                                dataSource={baggageInfoList}
                                pageSize={false}
                            /> */}
                        <Table
                            bordered
                            columns={baggageInfoColumns}
                            dataSource={baggageInfoList}
                            pagination={false}
                        />
                    </div>
                </Col>
            </Row>
            {/* </Card> */}
        </div>
    );

    const cancellationRuleTab = (
        <div className='multiCityTabCardStyle'>
            <Card className='multiFirCanRuleCard'>
                <Row align='middle' justify='space-between'>
                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                        <span className='canRuleHeading'><b>Ahmedabad to Mumbai</b></span>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}></Col>
                    <Col xl={8} lg={8} md={8} sm={8} xs={8} className='textAlignEnd'>
                        <Tag className='tagMTParRef'>Partially Refundable</Tag>
                    </Col>
                </Row>
            </Card>

            <Card className='multiSecCanRuleCard'>
                <Row align='top' justify='space-between'>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className='multiCityFTable'>
                            <div className='canChargeHeading'>Cancellation Charges</div>
                            <div>
                                {/* <AppTable
                                    bordered
                                    columns={cancellationChargeColumns}
                                    dataSource={cancellationChargeList}
                                    pageSize={false}
                                /> */}
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
                                {/* <AppTable
                                    bordered
                                    columns={rescheduleChargeColumns}
                                    dataSource={rescheduleChargeList}
                                    pageSize={false}
                                /> */}
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
    );

    const items = [
        {
            key: '1',
            label: 'Flight Information',
            children: flightInfoTab,
        },
        {
            key: '2',
            label: 'Fare Details',
            children: fairDetailTab,
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
        <>
            <Row justify='space-between'>
                {isTablet && (<><Col xl={24} lg={24} md={24} sm={24} xs={24} className='stickyTCardForTab'>
                    <TicketCard />
                </Col><br /></>)}

                <Col xl={isTablet ? 24 : 16} lg={isTablet ? 24 : 16} md={isTablet ? 24 : 16} sm={isTablet ? 24 : 16} xs={isTablet ? 24 : 16}>
                    {isTablet ? <br /> : ''}
                    <div>

                        <Card className='multiCityFirstSortCard'>
                            <Row align='middle' justify='space-between'>
                                <Col xl={is1200 ? 6 : 7} lg={is1200 ? 6 : 7} md={is1200 ? 6 : 7} sm={is1200 ? 6 : 7} xs={is1200 ? 6 : 7}>
                                    <Popover overlayClassName='multiCPopoverStyle' content={stopContent} placement="bottom">
                                        <div className='textAlignCenter cursorP'>
                                            <h3 className='popoverMTHeading'>Stop <DownOutlined className='sortIcon' /></h3>
                                        </div>
                                    </Popover>
                                </Col>
                                <div className='popoverLine'></div>
                                <Col xl={is1200 ? 11 : 9} lg={is1200 ? 11 : 7} md={is1200 ? 11 : 7} sm={is1200 ? 11 : 7} xs={is1200 ? 11 : 7}>
                                    <Popover overlayClassName='multiCPopoverStyle' content={departureContent} placement="bottom">
                                        <div className='textAlignCenter cursorP'>
                                            <h3 className='popoverMTHeading'>Departure from Ahmedabad <DownOutlined className='sortIcon' /></h3>
                                        </div>
                                    </Popover>
                                </Col>
                                <div className='popoverLine'></div>
                                <Col xl={is1200 ? 6 : 7} lg={is1200 ? 6 : 7} md={is1200 ? 6 : 7} sm={is1200 ? 6 : 7} xs={is1200 ? 6 : 7}>
                                    <Popover overlayClassName='multiCPopoverStyle' content={prefferedAirlinesContent} placement="bottom">
                                        <div className='textAlignCenter cursorP'>
                                            <h3 className='popoverMTHeading'>Preferred Airlines <DownOutlined className='sortIcon' /></h3>
                                        </div>
                                    </Popover>
                                </Col>
                            </Row>
                        </Card><br />

                        <Card className='multiCSortingStyle'>
                            <Row align='middle' justify='space-between'>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} className='textAlignCenter'>
                                    <div onClick={() => handleSortClick('DEPARTURE')} className='divCenter'>
                                        <h4 className={`headingHeight ${selectedColumn === 'DEPARTURE' ? 'colorChange' : ''} `}>
                                            DEPARTURE {selectedColumn === 'DEPARTURE' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                        </h4>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} className='textAlignCenter'>
                                    <div onClick={() => handleSortClick('DURATION')} className='divCenter'>
                                        <h4 className={`headingHeight ${selectedColumn === 'DURATION' ? 'colorChange' : ''} `}>
                                            DURATION {selectedColumn === 'DURATION' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                        </h4>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} className='textAlignCenter'>
                                    <div onClick={() => handleSortClick('ARRIVAL')} className='divCenter'>
                                        <h4 className={`headingHeight ${selectedColumn === 'ARRIVAL' ? 'colorChange' : ''} `}>
                                            ARRIVAL {selectedColumn === 'ARRIVAL' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                        </h4>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} className='textAlignCenter'>
                                    <div onClick={() => handleSortClick('PRICE')} className='divCenter'>
                                        <h4 className={`headingHeight ${selectedColumn === 'PRICE' ? 'colorChange' : ''} `}>
                                            PRICE {selectedColumn === 'PRICE' && (isAscendingSortColumn ? <DownOutlined className='sortIcon' /> : <UpOutlined className='sortIcon' />)}
                                        </h4>
                                    </div>
                                </Col>
                            </Row>
                        </Card><br />

                        {ownFlightDetails.map((data, index) => (
                            <>
                                <Card className='multiCDetailsCardStyle' key={index} onClick={() => handleClickOnCard(data)}>
                                    <Row align='middle' justify='space-between'>
                                        <div className='multiCLeftCard'>
                                            <Row align='top' justify='space-between' className='lineHeight'>
                                                <Col xl={9} lg={9} md={9} sm={9} xs={9}>
                                                    <Row align='middle' justify='space-between'>
                                                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                                            <span className='multiCity-Color fontSmallStyle'>{data.airLine}</span>
                                                        </Col>
                                                        <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                                                            <div className='d-flex-between'>
                                                                <span className='multiCity-Font'>{data.fromCode}</span>
                                                                <span className='multiCityDeparture-FontWight'>{data.fromTime}</span>
                                                            </div>
                                                            <span className='multiCity-Color fontSmallStyle '>{data.fromStation}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xl={8} lg={8} md={8} sm={8} xs={8} className='textAlignCenter alignSelfCenter'>
                                                    <span className='multiCity-Duration'>{data.duration}</span><span className='fontSmallStyle'> ({data.durationStop})</span>
                                                </Col>
                                                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                                    <div className='d-flex-between'>
                                                        <span className='multiCity-Font'>{data.toCode}</span>
                                                        <span className='multiCityArrival-FontWight'>{data.toTime}</span>
                                                    </div>
                                                    <span className='multiCity-Color fontSmallStyle'>{data.toStation}</span>
                                                </Col>
                                            </Row>
                                            <Row align='middle' justify='space-between'>
                                                <span className='multiCityFlightDetails' onClick={() => handleFlightDetailsClick(index)}>Flight Details {(selectedCardTab !== index && <DownOutlined className='sortIcon' />) || (selectedCardTab === index && (!isAscendingFlightDetails ? <UpOutlined className='sortIcon' /> : <DownOutlined className='sortIcon' />))} </span>
                                            </Row>
                                        </div>
                                        <div className='multiCVerticalLine'></div>
                                        <div className='multiCRightCard'>
                                            <Row align='middle' justify='space-between'>
                                                <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                                                    <span className='multiCityPrice-FontWight'>{data.price}</span>
                                                </Col>
                                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                                    <Radio className='radioBtnStyle' checked={data?.isChecked}></Radio>
                                                </Col>
                                            </Row>
                                            {/* <Row align='middle' justify='space-between'>
                                            </Row> */}
                                        </div>
                                    </Row>

                                    {/* <Row align='middle' justify='space-between'>
                                        <span className='multiCityFlightDetails' onClick={() => handleFlightDetailsClick(index)}>Flight Details {(selectedCardTab !== index && <DownOutlined />) || (selectedCardTab === index && (!isAscendingFlightDetails ? <UpOutlined /> : <DownOutlined />))} </span>
                                    </Row>  */}

                                    {selectedCardTab === index && !isAscendingFlightDetails &&
                                        <div className='multiCflightDetailsTab'>
                                            <Tabs className='multicityTabColor' defaultActiveKey="1" items={items} type='card' size='large' /><br />
                                        </div>
                                    }
                                    {/* <FlightSubDetails type='OwnFlights' data={data} index={index} /> */}
                                </Card><br />
                            </>
                        ))}
                    </div>
                </Col>
                {!isTablet && <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                    <TicketCard />
                </Col>}
            </Row>
        </>
    );
}

export default OwnFlightList;