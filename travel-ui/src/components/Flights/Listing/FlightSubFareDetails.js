import { Table } from 'antd';
import React from 'react';
import AppButton from '../../AppButton';
import { useNavigate } from 'react-router-dom';

const FlightSubFareDetails = ({ travellers, flightData }) => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Fares',
            dataIndex: 'fare',
            key: 'fare',
            className: 'fontSmallStyle',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Cabin Bag',
            dataIndex: 'cabinBag',
            key: 'cabinBag',
            className: 'fontSmallStyle',
        },
        {
            title: 'Check-In',
            dataIndex: 'checkIn',
            key: 'checkIn',
            className: 'fontSmallStyle',
        },
        {
            title: 'Cancellation',
            dataIndex: 'cancellation',
            key: 'cancellation',
            className: 'fontSmallStyle',
        },
        {
            title: 'Date Change',
            dataIndex: 'dateChange',
            key: 'dateChange',
            className: 'fontSmallStyle',
        },
        {
            title: 'Seat',
            dataIndex: 'seat',
            key: 'seat',
            width: '12%',
            className: 'fontSmallStyle',
        },
        {
            title: 'Meal',
            dataIndex: 'meal',
            key: 'meal',
            className: 'fontSmallStyle',
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            className: 'fontSmallStyle',
            render: (_, record) => (
                <div className='textAlignCenter'>
                    <h3 className='fontLabelStyle'>{record.price}</h3>
                    <AppButton
                        className='appPrimaryButton bookBtnInFareList fontSmallStyle'
                        label='Book'
                        onClick={() => {
                            navigate('/flight-booking-details', {
                                state: {
                                    travellers: travellers,
                                    flightData: flightData
                                }
                            });
                        }}
                    />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            fare: 'Saver',
            cabinBag: '7 KGS',
            checkIn: '15 KGS',
            cancellation: 'Starting from ₹3550',
            dateChange: 'Starting from ₹3250',
            seat: 'Limited free',
            meal: 'Chargeable',
            price: '₹ 4,262'
        },
        {
            key: '2',
            fare: 'FLEXI PLUS',
            cabinBag: '7 KGS',
            checkIn: '15 KGS',
            cancellation: 'Starting from ₹3550',
            dateChange: 'Starting from ₹3250',
            seat: 'Window/Aisle - FREE',
            meal: 'FREE meal',
            price: '₹ 5,816'
        },
        {
            key: '3',
            fare: 'SUPER 6E',
            cabinBag: '7 KGS',
            checkIn: '15 KGS',
            cancellation: 'Starting from ₹3550',
            dateChange: 'Starting from ₹3250',
            seat: 'FREE (including Emergency seats)',
            meal: 'Chargeable',
            price: '₹ 6,865'
        },
    ];

    return (
        <div>
            <Table className='tableFareDetails' columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}

export default FlightSubFareDetails;