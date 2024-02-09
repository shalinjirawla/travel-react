import { Card } from 'antd';
import React, { useContext, useState } from 'react';
import AppButton from '../AppButton';
import { CarryOutOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CommonCarousel from '../CommonCarousel';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const OffersCard = () => {

  const navigate = useNavigate();
  const { isTablet } = useContext(AuthContext)??{};
  const tabBarOptions = [
    { title: "All", key: 1 },
    { title: "Bank Offers", key: 2 },
    { title: "Flights", key: 3 },
    { title: "Trains", key: 4 },
    { title: "Hotels", key: 5 },
  ];

  const offersList = [
    {
      url: 'https://gos3.ibcdn.com/img-1703069930.jpg',
      label: 'Flights',
      description: 'Book flights starting @ ₹1980',
      validDate: '12/24/2023',
      id: 1
    },
    {
      url: 'https://gos3.ibcdn.com/img-1703069930.jpg',
      label: 'Domestic Flights',
      description: 'Book domestic flights @ Up to 30% OFF*',
      validDate: '01/02/2024',
      id: 2
    },
    {
      url: 'https://gos3.ibcdn.com/img-1703069930.jpg',
      label: 'Trains',
      description: 'Enjoy GOCONFIRMED or FREE Cancellation',
      validDate: '02/01/2024',
      id: 3
    },
    {
      url: 'https://gos3.ibcdn.com/img-1703069930.jpg',
      label: 'Domestic Hotels',
      description: 'Get Upto 30% OFF on Radisson Hotels',
      validDate: '03/01/2024',
      id: 4
    },
  ];

  const [activeBarKey, setActiveBarKey] = useState(1);

  const CustomBar = ({ label, click, classNm }) => {
    return (
      <AppButton className={classNm} shape='round' onClick={click} label={label} />
    )
  };

  const CustomCard = ({ key, url, label, description, validDate }) => {
    return (
      <div className='insideOfferCardDiv' onClick={() => navigate(`/offer-detail/${key}`)}>
        <img src={url} alt='Image' />
        <div>
          <h2>{label}</h2>
          <h3>{description}</h3>
          <p><CarryOutOutlined style={{ fontSize: '16px' }} /> Valid till {dayjs(new Date(validDate)).format('DD MMM YYYY')}</p>
        </div>
        <RightOutlined />
      </div>
    )
  };

  const getCarousalContent = (o, i) => {
    return (
      <CustomCard
        key={i}
        url={o.url}
        swipeable={true}
        label={o.label}
        description={o.description}
        validDate={new Date(o.validDate).toISOString()}
      />
    )
  }

  return (
    <Card className='flightBookCard recentFlightSearchCard'>
      {isTablet ? <h3>Offers For You</h3> : <h2>Offers For You</h2>}
      <br />
      <div>
        {tabBarOptions && tabBarOptions?.length > 0 && tabBarOptions.map((o, i) => {
          return (
            <CustomBar
              key={i}
              classNm={activeBarKey === o.key ? 'offerCustomBarBtn offerCustomBarBtnActive' : 'offerCustomBarBtn'}
              label={o.title}
              click={() => setActiveBarKey(o.key)}
            />
          )
        })}
      </div>
      <br />
      <CommonCarousel
        customLeftArrow={<LeftOutlined style={{ backgroundColor: '#fff', position: 'absolute', top: '60%', left: '-2%', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '5px', padding: '1% 1%', zIndex: '999' }} />}
        customRightArrow={<RightOutlined style={{ backgroundColor: '#fff', position: 'absolute', top: '60%', right: '-2%', fontSize: '20px', boxShadow: '0 0 10px 0 gray', borderRadius: '5px', padding: '1% 1%', zIndex: '999' }} />}
        contentDiv={getCarousalContent}
        data={offersList}
      />
    </Card>
  )
}

export default OffersCard;