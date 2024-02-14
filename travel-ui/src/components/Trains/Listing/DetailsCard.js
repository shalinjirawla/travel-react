import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../../styles/train/DetailsCard.css';
import { Card, Carousel, Col, Divider, Form, Row, Select, Tabs, Tag, Timeline } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import { sortedByOptions } from '../../../Constants';
import { AuthContext } from '../../../context/AuthProvider';
import AppModal from '../../AppModal';
import TrainRoutes from './TrainRoutes';

const DetailsCard = () => {

    const trainDetails = [
        {
            trainNumber: 12010,
            trainName: 'Mmct Shatabdi Ex',
            departureTime: '3:10 pm',
            departureStation: 'ADI',
            departureStationValue: '(Ahmedabad)',
            distanceTime: '6 hr 35 min',
            arrivalTime: '9:45 pm',
            arrivalStation: 'MMCT',
            arrivalStationValue: '(Mumbai C..)',
        },
        {
            trainNumber: 12932,
            trainName: 'Mmct Doubledecke',
            departureTime: '5:50 am',
            departureStation: 'ADI',
            departureStationValue: '(Ahmedabad)',
            distanceTime: '7 hr 15 min',
            arrivalTime: '1:05 pm',
            arrivalStation: 'BDTS',
            arrivalStationValue: '(Bandra T..)'
        },
        {
            trainNumber: 12915,
            trainName: 'Bdts Garib Rath',
            departureTime: '12:45 am',
            departureStation: 'ADI',
            departureStationValue: '(Ahmedabad)',
            distanceTime: '6 hr 50 min',
            arrivalTime: '7:35 am',
            arrivalStation: 'DDR',
            arrivalStationValue: '(Dadar)'
        },
    ];

    const classCardDetails = [
        {
            tierName: 'SL',
            classPrice: '₹ 320',
            className: 'RLWL 11',
            classTime: 'Moments ago',
            confirmed: 'goCONFIRMED'
        },
        {
            tierName: '3A',
            classPrice: '₹ 825',
            className: 'RLWL 3',
            classTime: 'Moments ago',
            confirmed: ''
        },
        {
            tierName: '2A',
            classPrice: '₹ 1155',
            className: 'RLWL 2',
            classTime: 'Moments ago',
            confirmed: 'goCONFIRMED'
        },
        {
            tierName: '1A',
            classPrice: '₹ 1930',
            className: 'RLWL 1',
            classTime: 'Moments ago',
            confirmed: ''
        }
    ];

    const navigate = useNavigate();
    const { rsWidths: { is620, is1200 }, isTablet } = useContext(AuthContext)??{};
    const [is1380, setIs1380] = useState(window.innerWidth <= 1380);
    const [currentIndex, setCurrentIndex] = useState(0);
	const [routeModalOpen, setRouteModalOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const handleWindowSizeChange = () => {
        setIs1380(window.innerWidth <= 1380);
    }

    const handleLeftCardClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : classCardDetails.length - 1));
    };

    const handleRightCardClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex < classCardDetails.length - 1 ? prevIndex + 1 : 0));
    };

    const viewAvailableCardDetails = [
        {
            day: 'TUE',
            dateMonth: '02 JAN',
            classAvailable: 'NOT AVAILABLE',
            tatkal: 'Tatkal',
            price: '₹ 0',
            bookNow: ''
        },
        {
            day: 'TUE',
            dateMonth: '02 JAN',
            classAvailable: 'RLWL 39',
            tatkal: 'Tatkal',
            price: '₹ 320',
            bookNow: 'Book Now'
        },
        {
            day: 'WED',
            dateMonth: '03 JAN',
            classAvailable: 'RLWL 35',
            tatkal: 'Tatkal',
            price: '₹ 320',
            bookNow: 'Book Now'
        },
        {
            day: 'THU',
            dateMonth: '04 JAN',
            classAvailable: 'RLWL 21',
            tatkal: '',
            price: '₹ 320',
            bookNow: 'Book Now'
        },
        {
            day: 'FRI',
            dateMonth: '05 JAN',
            classAvailable: 'RLWL 27',
            tatkal: 'Tatkal',
            price: '₹ 320',
            bookNow: 'Book Now'
        },
        {
            day: 'SAT',
            dateMonth: '06 JAN',
            classAvailable: 'RLWL 23',
            tatkal: 'goCONFIRMED',
            price: '₹ 320',
            bookNow: 'Book Now'
        },
        {
            day: 'SUN',
            dateMonth: '07 JAN',
            classAvailable: 'RLWL 30',
            tatkal: 'goCONFIRMED',
            price: '₹ 320',
            bookNow: 'Book Now'
        },
    ];

    const availableSeatDetails = [
        {
            available: 'LOW AVL'
        },
        {
            available: 'LOW AVL'
        },
        {
            available: ''
        },
        {
            available: ''
        },
        {
            available: ''
        },
        {
            available: 'MEDIUM AVL'
        }, 
        {
            available: ''
        } 
    ];

    const [startDate, setStartDate] = useState(new Date()); 
    const [selectedDate, setSelectedDate] = useState(null);
    const [isAscending, setIsAscending] = useState(true);
    const [selectedClass, setSelectedClass] = useState('popularity');
    const [activeTab, setActiveTab] = useState('1'); 
    const [selectedCardTab, setSelectedCardTab] = useState(0);

    useEffect(() => {
        setSelectedDate(getTodayDate());
    }, []);

    const handleSortClick = (index) => {
        if (index !== selectedCardTab) {
            setIsAscending(true);
            setIsAscending((prevIsAscending) => !prevIsAscending);
        } else {
            setIsAscending((prevIsAscending) => !prevIsAscending);
        }
        setSelectedCardTab(index);
    };
    
    const generateDynamicDates = (start, numberOfDays) => {
        return Array.from({ length: numberOfDays }, (_, index) => {
            const date = new Date(start);
            date.setDate(start.getDate() + index);
            return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
        });
    };
    
    const handleLeftClick = () => {
        const dateOfToday = new Date(); 
        if (startDate > dateOfToday) {
            const newStartDate = new Date(startDate);
            // newStartDate.setDate(startDate.getDate() - 7);
            newStartDate.setDate(startDate.getDate() - 5);
            setStartDate(newStartDate);
        }
    };
    const handleRightClick = () => {
        const newStartDate = new Date(startDate);
        // newStartDate.setDate(startDate.getDate() + 7);
        newStartDate.setDate(startDate.getDate() + 5);
        setStartDate(newStartDate);
    };
    // const dynamicDates = generateDynamicDates(startDate, 7);
    const dynamicDates = generateDynamicDates(startDate, (is620 ? 4 : is1200 ? 5 : is1380 ? 6 : 7));

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
    };

    const getAvailableForSeat = (date) => {
        const index = dynamicDates.findIndex((dynamicDate) => dynamicDate === date);
        return index !== -1 ? availableSeatDetails[index]?.available : 'N/A';
    };

    const getDotColorClass = (availability) => {
        switch (availability) {
            case 'LOW AVL':
                return 'dotLowAvl';
            case 'MEDIUM AVL':
                return 'dotMediumAvl';
            default:
                return ''; 
        }
    };

    const onChangeTab = (key) => {
        setActiveTab(key);
    };

    const tabCard = (
        <>
            {viewAvailableCardDetails.map((data, index) => (
                <>
                    <Card className='cardTabTLine' key={index}>
                        <Row align='middle' justify='space-between'>
                            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                                <div>
                                    <Row align='middle' justify='space-between'>
                                        <Col xl={10} lg={10} md={10} sm={10} xs={10} className='textAlignEnd'>
                                            <p className='fontT tabTDay'>{data.day}</p>
                                        </Col>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <p className='tabTDate'>{data.dateMonth}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                                <div className='textAlignCenter backgroundTVAStyle'>
                                    <Row align='middle' justify='space-between'>
                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                            <p className='fontT tabTDay'>{data.classAvailable}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                <div className='textAlignCenter'>
                                    <Row align='middle' justify='space-between'>
                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                            {data.tatkal && <Tag className='tagTTatkal'>{data.tatkal}</Tag>}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                                <div>
                                    <Row align='middle' justify='space-between'>
                                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                            <p className='fontTF tabTDay'>{data.price}</p>
                                        </Col>
                                        <Col xl={14} lg={14} md={14} sm={14} xs={14}>
                                            <span
                                                className='bookNowTBtn hoverTLink cursorP'
                                                onClick={() => navigate('/train-booking-details')}
                                            >
                                                <span>{data.bookNow}</span>
                                                {data.bookNow && <RightOutlined className='sortTBNIcon' />}
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </>
            ))}
        </>
    );
    
    const items = [
        {
            key: '1',
            label: <b>SLEEPER</b>,
            children: tabCard,
        },
        {
            key: '2',
            label: <b>3 TIER AC</b>,
            children: tabCard,
        },
        {
            key: '3',
            label: <b>2 TIER AC</b>,
            children: tabCard,
        },
        {
            key: '4',
            label: <b>1 TIER AC</b>,
            children: tabCard,
        },
    ];

    return (
        <div className='detailsTCard'>
            <div>
                <Row align='middle' justify='space-between'>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}><div className='divDateIcon' onClick={handleLeftClick}><LeftOutlined className='dateIcon' /></div></Col>
                    <Col xl={22} lg={22} md={22} sm={22} xs={22}>     
                        <Card className='cardTStyle'>
                            <Row align='middle' className='flexFlowRow' justify='space-between'>
                                {dynamicDates.map((date, index) => (
                                    <Col key={index} xl={3} lg={3} md={3} sm={3} xs={3}
                                        className='dateTColumn'
                                        style={{
                                            color: selectedDate === date ? 'white' : '',
                                            backgroundColor: selectedDate === date ? 'rgb(10, 48, 97)' : 'transparent',
                                            // padding: (selectedDate === date && !getAvailableForSeat(date)) ? '2% 1% 1% 1%' : '1%',
                                            padding: (selectedDate === date && !getAvailableForSeat(date)) 
                                                ? (is1200 ? '3% 1% 1% 1%' : '2% 1% 1% 1%')
                                                : '1%',
                                            display: (selectedDate && !getAvailableForSeat(date)) ? 'grid' : '',
                                            alignSelf: (selectedDate && !getAvailableForSeat(date)) ? 'end' : '',
                                        }}
                                        onClick={() => handleDateClick(date)}    
                                    >
                                        <div className='dotStyle'>
                                            <div className={`${getDotColorClass(getAvailableForSeat(date))}`}></div>
                                        </div>
                                        <label className='cursorP'>{date}</label><br />
                                        <label className='cursorP' style={{ color: selectedDate !== date && getAvailableForSeat(date) ? '#647a97' : 'white' }}>{getAvailableForSeat(date)}</label>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}><div className='divDateIcon' onClick={handleRightClick}><RightOutlined className='dateIcon' /></div></Col>
                </Row>
            </div>

            <div className='sortingDiv'>
                <Row align='middle' justify='space-between'>
                    <Col xl={isTablet ? 12 : 14} lg={isTablet ? 12 : 14} md={isTablet ? 12 : 14} sm={isTablet ? 12 : 14} xs={isTablet ? 12 : 14}>
                        <p className='paraTClass'>We have found 3 trains on or near this route</p>
                    </Col>
                    <Col xl={isTablet ? 5 : 3} lg={isTablet ? 5 : 3} md={isTablet ? 5 : 3} sm={isTablet ? 5 : 3} xs={isTablet ? 5 : 3} className='textAlignCenter'>
                        <label className='labelSortedByTStyle'>Sorted By</label>
                    </Col>
                    <Col xl={7} lg={7} md={7} sm={7} xs={7} className='sortedByTSelect'>
                        {/* <Selectable
                            label='Sorted By'
                            name="sortedBy"
                            defaultValue={selectedClass}
                            firstName='label'
                            data={sortedByOptions}
                            width={400}
                            showSearch={false}
                            handleSelectChange={(val) => { setSelectedClass(val); }}
                        /> */}
                        
                        <Form.Item
                            className='backgroundSortedByTStyle'
                        >
                            <Select
                                defaultValue={selectedClass}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={sortedByOptions}
                                popupClassName='sortedByTOptionStyle'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </div>

            {trainDetails.map((data, index) => (
                <>
                    <Card className='cardTLine' key={index}>
                        <Row align='middle' justify='space-between'>
                            <Col xl={is620 ? 4 : 3} lg={is620 ? 4 : 3} md={is620 ? 4 : 3} sm={is620 ? 4 : 3} xs={is620 ? 4 : 3}>
                                <p className='tripCardTNumber'>{data.trainNumber}</p>
                            </Col>
                            <Col xl={is620 ? 11 : 10} lg={is620 ? 11 : 10} md={is620 ? 11 : 10} sm={is620 ? 11 : 10} xs={is620 ? 11 : 10}>
                                <p className='tripCardTStation'>{data.trainName}</p>
                            </Col>
                            {!is620 && <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div className='viewRouteTLink' onClick={() => { setRouteModalOpen(true); }}>
                                    <span className='hoverTLink'>VIEW ROUTE</span>
                                </div>
                            </Col>}
                            <Col xl={is620 ? 9 : 7} lg={is620 ? 9 : 7} md={is620 ? 9 : 7} sm={is620 ? 9 : 7} xs={is620 ? 9 : 7}>
                                <p className='dayTWeek textAlignEnd'>Runs on: <span className='eachTDay'>M T W T F S S</span></p>
                                {is620 && <Row align='middle' justify='space-between'>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                        <div className='viewRouteTLink textAlignEnd' onClick={() => { setRouteModalOpen(true); }}>
                                            <span className='hoverTLink'>VIEW ROUTE</span>
                                        </div>
                                    </Col>
                                </Row>}
                            </Col>
                        </Row>

                        <Row align='middle' justify='space-between'>
                            <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                                <p className='stationTTime'>{data.departureTime}</p>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={6} xs={6} className='textAlignCenter'>
                                <p className='stationTName'>{data.departureStation} <span className='stationTSName'>{data.departureStationValue}</span></p>
                            </Col>
                            <Col xl={7} lg={7} md={7} sm={7} xs={7} className='textAlignWebkitCenter'>
                                <div className='distanceTLine'>
                                    <span className='dotDTLine'></span><span className='dSpanTLine'>{data.distanceTime}</span><span className='arrowDTLine'></span>
                                </div>
                            </Col>
                            <Col xl={3} lg={3} md={3} sm={3} xs={3}  className='textAlignCenter'>
                                <p className='stationTTime'>{data.arrivalTime}</p>
                            </Col>
                            <Col xl={5} lg={5} md={5} sm={5} xs={5} className='textAlignEnd'>
                                <p className='stationTName'>{data.arrivalStation} <span className='stationTSName'>{data.arrivalStationValue}</span></p>
                            </Col>
                        </Row>

                        <Row align='middle' justify='space-between'>
                            {/* <LeftOutlined onClick={handleLeftCardClick} style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', left: '0', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '50%', padding: '1% 1%', zIndex: '999', cursor: 'pointer' }} /> */}
                            {classCardDetails.map((data, index) => (
                                <>
                                    <Col xl={5} lg={5} md={5} sm={5} xs={5} key={index} className='alignSelf'>
                                        <div className='subTCard'>
                                            <Card className='backgoundTFirstCard'>
                                                <Row align='middle' justify='space-between'>
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <p className='classTName viewCardMTAvl'>{data.tierName}</p>
                                                    </Col>
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                                                        <p className='classTPrice viewCardMTAvl'>{data.classPrice}</p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Card className='backgoundTSecondCard'>
                                                <Row align='middle' justify='space-between'>
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <p className='gClassTName viewCardMTAvl'>{data.className}</p>
                                                    </Col>
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                                                        <p className='gClassTTime viewCardMTAvl'>{data.classTime}</p>
                                                    </Col>
                                                    {/* <Col xl={is1450 ? 24 : 12} lg={is1450 ? 24 : 12} md={is1450 ? 24 : 12} sm={is1450 ? 24 : 12} xs={is1450 ? 24 : 12}>
                                                        <p className='gClassTName viewCardMTAvl viewCardMTAvlLow'>{data.className}</p>
                                                    </Col>
                                                    <Col xl={is1450 ? 24 : 12} lg={is1450 ? 24 : 12} md={is1450 ? 24 : 12} sm={is1450 ? 24 : 12} xs={is1450 ? 24 : 12} className={is1450 ? '' : 'textAlignEnd'}>
                                                        <p className='gClassTTime viewCardMTAvl viewCardMTAvlLow'>{data.classTime}</p>
                                                    </Col> */}
                                                </Row>
                                            </Card>
                                            {data.confirmed && <Card className='backgoundTThirdCard'>
                                                <Row align='middle' justify='space-between'>
                                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                        <p className='gClassTConfirmed'>{data.confirmed}</p>
                                                    </Col>
                                                </Row>
                                            </Card>}
                                        </div>
                                    </Col>
                                </>
                            ))}
                            {/* <RightOutlined onClick={handleRightCardClick} style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', right: '0', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '50%', padding: '1% 1%', zIndex: '999', cursor: 'pointer' }} /> */}
                        </Row>

                        <Row align='middle' justify='space-between'>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div onClick={() => handleSortClick(index)}>
                                    <p className='availableTrain'>View 6 days availability {(selectedCardTab !== index && <DownOutlined />) || (selectedCardTab === index && (!isAscending ? <UpOutlined /> : <DownOutlined />))}</p>
                                </div>
                            </Col>
                        </Row>

                        {selectedCardTab === index && !isAscending && (
                            <>
                                <Tabs className='tabTTitle' defaultActiveKey="1" items={items} onChange={onChangeTab} /><br />
                            </>
                        )}
                    </Card><br />

                    <TrainRoutes routeModalOpen={routeModalOpen} setRouteModalOpen={setRouteModalOpen} />
                </>
            ))}

        </div>
    );
}

export default DetailsCard;