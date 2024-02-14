import { Card, Descriptions, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import AppTable from '../../AppTable';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import BookingFilter from './BookingFilter';
import '../../../styles/flight/bookingHistory.css';
import { getIndianMoneyFormat } from '../../../helper';

const BookingHistory = ({ selectedBooking }) => {

    const [pageCount, setPageCount] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginationTotal, setPaginationTotal] = useState(0);
    const [skipCount, setSkipCount] = useState(0);
    const [allBookingList, setAllBookingList] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const tempData = [
        {
            key: 1,
            index: 1,
            refNumber: '11',
            bookingDate: '24/08/2023',
            bookedByUser: 'Admin',
            passengerName: 'Test Person 1',
            fareDetails: '4250',
            ticketType: 'Economy',
            status: 'Confirmed',
            description: 'Testing data description',
            flightNumber: '2013-Indigo',
            flightClass: 'Economy',
            from: 'DEL',
            to: 'BOM',
            departure: '27/08/2023',
            arriaval: '27/08/2023',
            flightType: 'One-way',
            totalFlightAmount: '6260',
            remark: 'Testing',
            personList: [
                { name: 'Test Person 1', personType: 'Adult', birthDate: '01/Jan/1988', gender: 'Male' },
                { name: 'Test Person 2', personType: 'Adult', birthDate: '11/May/1988', gender: 'Female' },
            ]
        },
        { key: 2, index: 2, refNumber: '12', bookingDate: '05/11/2023', bookedByUser: 'Admin', passengerName: 'Test Person 2', fareDetails: '7250', ticketType: 'Economy', status: 'Confirmed', description: 'Testing data description' },
        { key: 3, index: 3, refNumber: '13', bookingDate: '11/01/2023', bookedByUser: 'Admin', passengerName: 'Test Person 3', fareDetails: '5250', ticketType: 'Economy', status: 'Confirmed', description: 'Testing data description' },
    ];

    const fetchBookings = async () => {
        setAllBookingList(tempData);
    };

    const bookingsColumns = [
        {
            key: "index",
            title: "No.",
            dataIndex: "index",
            sorter: false,
            width: '5%',
            render: (val) => val ? <h3>{val}</h3> : <div>-</div>
        },
        {
            key: "refNumber",
            title: "Ref No.",
            dataIndex: "refNumber",
            sorter: false,
            // width: '5%',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "bookingDate",
            title: "Booking Date",
            dataIndex: "bookingDate",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "bookedByUser",
            title: "Booked By User",
            dataIndex: "bookedByUser",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "passengerName",
            title: "Passenger Name",
            dataIndex: "passengerName",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "fareDetails",
            title: "Fare Details",
            dataIndex: "fareDetails",
            sorter: false,
            render: (val) => val ? <a>Fare Details</a> : <div>-</div>
        },
        {
            key: "ticketType",
            title: "Ticket Type",
            dataIndex: "ticketType",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "actions",
            title: "Actions",
            dataIndex: "action",
            width: '7%',
            render: (index, record) => <div className='d-flex-between'>
                <EyeOutlined className='tableEditIcon' onClick={() => onEditRow(record)} />
                <EditOutlined className='tableEditIcon' onClick={() => onEditRow(record)} />
                <DeleteOutlined className='tableDeleteIcon' onClick={() => onEditRow(record, true)} />
            </div>
        }
    ];

    const onEditRow = (record, isDelete) => { };

    const handleSizeChange = (currentPage, size) => {
        setPageCount(size);
        fetchBookings();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        let count = 0;
        for (let i = 1; i < page; i++) {
            count = count + pageCount;
        }
        setSkipCount(count);
    };

    const handleSort = () => { };

    const getDescriptionItems = (record) => {
        const descriptionItems = [
            {
                flightNumber: record.flightNumber,
                flightClass: record.flightClass,
                from: record.from,
                to: record.to,
                departure: record.departure,
                arriaval: record.arriaval,
                flightType: record.flightType,
                totalFlightAmount: record.totalFlightAmount,
                remark: record.remark,
            },
        ];

        return descriptionItems;
    };

    const descriptionColumns = [
        {
            key: "flightNumber",
            title: "Flight No./Name",
            dataIndex: "flightNumber",
            sorter: false,
            // width: '5%',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "flightClass",
            title: "Flight Class",
            dataIndex: "flightClass",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "from",
            title: "From",
            dataIndex: "from",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "to",
            title: "To",
            dataIndex: "to",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "departure",
            title: "Departure",
            dataIndex: "departure",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "arrival",
            title: "Arrival",
            dataIndex: "arrival",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "flightType",
            title: "Type",
            dataIndex: "flightType",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "totalFlightAmount",
            title: "Total Flight Amount",
            dataIndex: "totalFlightAmount",
            sorter: false,
            render: (val) => val ? <div>{getIndianMoneyFormat(val)}</div> : <div>-</div>
        },
        {
            key: "remark",
            title: "Remark",
            dataIndex: "remark",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
    ];

    const travellerColumns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
            sorter: false,
            // width: '5%',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "personType",
            title: "Type",
            dataIndex: "personType",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "gender",
            title: "Gender",
            dataIndex: "gender",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "birthDate",
            title: "Birth Date",
            dataIndex: "birthDate",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "passportNumber",
            title: "Passport No.",
            dataIndex: "passportNumber",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "expiryDate",
            title: "Expiry Date",
            dataIndex: "expiryDate",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "nationality",
            title: "Nationality",
            dataIndex: "nationality",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: "premium",
            title: "Premium",
            dataIndex: "premium",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>Rs. 0</div>
        },
        {
            key: "remark",
            title: "Remark",
            dataIndex: "remark",
            sorter: false,
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
    ];

    return (
        <div className="bookingHistoryDiv">
            <h1>Booking History</h1>
            <br />
            <Card className='bookingFilterCard'>
                <BookingFilter
                    selectedBooking={selectedBooking}
                    handleBookingFilterFormValues={() => { }}
                />
            </Card>
            <br />
            <AppTable
                handleSort={handleSort}
                dataSource={allBookingList}
                columns={bookingsColumns}
                pageSize={pageCount}
                size={'middle'}
                expandable={{
                    // expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    expandedRowRender: (record) => (
                        <>
                            {/* <Descriptions title="" layout="vertical" bordered items={getDescriptionItems(record)} /> */}
                            <Table size='small' columns={descriptionColumns} dataSource={getDescriptionItems(record)} pagination={false} />
                            <Table size='small' columns={travellerColumns} dataSource={record.personList} pagination={false} />
                        </>
                    )
                    // rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                paginationTotal={paginationTotal}
                showSizeChanger={true}
                onShowSizeChange={handleSizeChange}
            />
        </div>
    )
};

export default BookingHistory;