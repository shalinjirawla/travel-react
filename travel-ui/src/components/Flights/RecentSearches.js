import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { BsPeople } from 'react-icons/bs';
import { PiAirplaneInFlightThin } from "react-icons/pi";
import { RiHotelLine } from "react-icons/ri";
import CommonCarousel from '../CommonCarousel';
import { AuthContext } from '../../context/AuthProvider';

const RecentSearches = () => {

    const { isTablet } = useContext(AuthContext)??{};
    const recentSearchData = [
        { type: 'Flight', person: 1, from: 'Ahmedabad', to: 'Mumbai', deptDate: new Date('12/22/2023'), returnDate: null },
        { type: 'Hotel', person: 2, name: 'Hotel Vintage', room: 1, fromDate: new Date('12/30/2023'), toDate: new Date('01/01/2024') },
        { type: 'Flight', person: 1, from: 'Ahmedabad', to: 'Mumbai', deptDate: new Date('12/22/2023'), returnDate: null },
        { type: 'Hotel', person: 2, name: 'Hotel Vintage', room: 1, fromDate: new Date('12/30/2023'), toDate: new Date('01/01/2024') },
        { type: 'Flight', person: 1, from: 'Ahmedabad', to: 'Mumbai', deptDate: new Date('12/22/2023'), returnDate: null },
        { type: 'Hotel', person: 2, name: 'Hotel Vintage', room: 1, fromDate: new Date('12/30/2023'), toDate: new Date('01/01/2024') },
        { type: 'Flight', person: 1, from: 'Ahmedabad', to: 'Mumbai', deptDate: new Date('12/22/2023'), returnDate: null },
        { type: 'Hotel', person: 2, name: 'Hotel Vintage', room: 1, fromDate: new Date('12/30/2023'), toDate: new Date('01/01/2024') },
    ];

    const getCarousalContent = (o, i) => {
        return (
            <Card key={i} className='recentSearchCard'>
                <Row justify='space-between'>
                    <Tag color="volcano">{o.type}</Tag>
                    <span><BsPeople /> {o.person}{(o.type === 'Hotel') ? ' | ' + o.room + ' Room' : ''}</span>
                </Row>
                <Row>
                    {o.type === 'Flight' && <h4>{o.from + ' '} {<PiAirplaneInFlightThin fontSize={16} />} {' ' + o.to}</h4>}
                    {o.type === 'Hotel' && <h4>{<RiHotelLine fontSize={14} />} {o.name}</h4>}
                </Row>
                <Row>
                    {o.type === 'Flight' && <p>{dayjs(new Date(o.deptDate)).format('ddd, DD MMM \'YY ')} {o.returnDate ? ' - ' + dayjs(new Date(o.deptDate)).format('ddd, DD MMM \'YY ') : ''}</p>}
                    {o.type === 'Hotel' && <p>{dayjs(new Date(o.fromDate)).format('ddd, DD MMM \'YY ')} - {dayjs(new Date(o.toDate)).format('ddd, DD MMM \'YY ')}</p>}
                </Row>
            </Card>
        )
    };

    return (
        <Card className='flightBookCard recentFlightSearchCard'>
            {isTablet ? <h3>Recent Searches</h3> : <h2>Recent Searches</h2>}
            <br />
            <CommonCarousel
                data={recentSearchData}
                contentDiv={getCarousalContent}
                customLeftArrow={<LeftOutlined style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', left: '-2%', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '5px', padding: '1% 1%', zIndex: '999' }} />}
                customRightArrow={<RightOutlined style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', right: '-2%', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '5px', padding: '1% 1%', zIndex: '999' }} />}
            />
        </Card>
    )
}

export default RecentSearches;