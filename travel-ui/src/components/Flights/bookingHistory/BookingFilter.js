import { Col, DatePicker, Form, Row } from 'antd';
import React from 'react';
import TextInput from '../../TextInput';
import Selectable from '../../Selectable';
import dayjs from 'dayjs';
import { ticketStatusList } from '../../../Constants';
import AppButton from '../../AppButton';

const BookingFilter = ({ selectedBooking, handleBookingFilterFormValues }) => {
    const [bookingFilterForm] = Form.useForm();

    return (
        <Form
            preserve={false}
            form={bookingFilterForm}
            name="addHistoryFilterForm"
            className="addHistoryFilterForm"
            scrollToFirstError
        >
            <Row align='middle' justify='space-between'>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <TextInput
                            name="historyRefNumber"
                            defaultVal={selectedBooking?.refNumber}
                            className="createUserTextInput"
                            type='text'
                            required={false}
                            requiredMsg='Number is required'
                            max={40}
                            maxMsg="cannot be longer than 40 characters"
                            typeMsg="Enter a valid Number!"
                            label="Ref Number"
                        />
                    </Col>
                </Col>
                <Col className='historyCol'  xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <TextInput
                            name="historyTicketNumber"
                            defaultVal={selectedBooking?.ticketNumber}
                            className="createUserTextInput"
                            type='text'
                            required={false}
                            requiredMsg='Number is required'
                            max={40}
                            maxMsg="cannot be longer than 40 characters"
                            typeMsg="Enter a valid Number!"
                            label="Ticket Number"
                        />
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <TextInput
                            name="historyPNRNumber"
                            defaultVal={selectedBooking?.PNRNumber}
                            className="createUserTextInput"
                            type='text'
                            required={false}
                            requiredMsg='Number is required'
                            max={40}
                            maxMsg="cannot be longer than 40 characters"
                            typeMsg="Enter a valid Number!"
                            label="Airline PNR No."
                        />
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <Form.Item
                            name='historyBookingDate'
                            label='Booking Date'
                            className="createUserTextInput"
                            // initialValue={null}
                            initialValue={selectedBooking ? dayjs(new Date(selectedBooking?.bookingDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                            // rules={[{ required: false, message: 'PO Date is required' }]}
                        >
                            <DatePicker
                                className='deptReturnDatePicker22 width100'
                                popupClassName='commonDateStyle'
                                // utcOffset={0}
                                // size='large'
                                // placeholder=''
                                format='DD/MM/YYYY'
                            />
                        </Form.Item>
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <Form.Item
                            name='historyDepartureDate'
                            label='Departure Date'
                            className="createUserTextInput"
                            initialValue={selectedBooking ? dayjs(new Date(selectedBooking?.deptDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                            // rules={[{ required: false, message: 'PO Date is required' }]}
                        >
                            <DatePicker
                                className='deptReturnDatePicker22 width100'
                                popupClassName='commonDateStyle'
                                // utcOffset={0}
                                // size='large'
                                // placeholder=''
                                format='DD/MM/YYYY'
                            />
                        </Form.Item>
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <Form.Item
                            name='historyArrivalDate'
                            label='Arrival Date'
                            className="createUserTextInput"
                            initialValue={selectedBooking ? dayjs(new Date(selectedBooking?.arraivalDate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                            // rules={[{ required: false, message: 'PO Date is required' }]}
                        >
                            <DatePicker
                                className='deptReturnDatePicker22 width100'
                                popupClassName='commonDateStyle'
                                // utcOffset={0}
                                // size='large'
                                // placeholder=''
                                format='DD/MM/YYYY'
                            />
                        </Form.Item>
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <TextInput
                            name="historyState"
                            defaultVal={selectedBooking?.state}
                            className="createUserTextInput"
                            type='text'
                            required={false}
                            requiredMsg='State is required'
                            max={40}
                            maxMsg="cannot be longer than 40 characters"
                            typeMsg="Enter a valid Name!"
                            label="State/Pincode"
                        />
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <TextInput
                            name="historyPassengerName"
                            defaultVal={selectedBooking?.passengerName}
                            className="createUserTextInput"
                            type='text'
                            required={false}
                            requiredMsg='Name is required'
                            max={40}
                            maxMsg="cannot be longer than 40 characters"
                            typeMsg="Enter a valid Name!"
                            label="Passenger Name"
                        />
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <Selectable
                            name="historyStatus"
                            // size='large'
                            label='Status'
                            placeholder='Status'
                            defaultVal={'All'}
                            // className='searchSelect'
                            suffixIcon={null}
                            handleSelectChange={() => { }}
                            firstName='label'
                            data={ticketStatusList}
                        />
                    </Col>
                </Col>
                <Col className='historyCol' xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Col xl={23} lg={23} md={23} sm={23} xs={23}>
                        <Selectable
                            name="historyBookingStatus"
                            // size='large'
                            label='Booking Status'
                            placeholder='Select Any'
                            defaultVal={'all'}
                            // className='searchSelect'
                            suffixIcon={null}
                            handleSelectChange={() => { }}
                            firstName='label'
                            data={[{ _id: 'all', label: 'All' }, { _id: 'normal', label: 'Normal Booking' }]}
                        />
                    </Col>
                </Col>
            </Row>
            <Row justify="end" className="formBtnRow">
                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="formBtnCol">
                    <AppButton
                        onClick={() => {
                            handleBookingFilterFormValues(bookingFilterForm);
                        }}
                        className='appPrimaryButton formWidth'
                        label='Search'
                    />
                </Col>
            </Row>
        </Form>
    )
};

export default BookingFilter;