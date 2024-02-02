import { Col, DatePicker, Form, Row } from 'antd';
import React, { useContext, useState } from 'react';
import Selectable from '../Selectable';
import { CloseOutlined, MinusCircleOutlined, PlusCircleOutlined, SwapOutlined, SwapRightOutlined } from '@ant-design/icons';
import TravelClassPopover from './Listing/TravelClassPopover';
import AppButton from '../AppButton';
import { AuthContext } from '../../context/AuthProvider';

const MultiCityForm = ({ airportsList, multiCityAddForm, selectedFlightOption }) => {

    const { isDesktop, isTablet, is930 } = useContext(AuthContext);
    const [multiCityList, setMultiCityList] = useState([
        {
            flightFrom: null,
            flightTo: null,
            flightDeptDate: null,
        },
        {
            flightFrom: null,
            flightTo: null,
            flightDeptDate: null,
        },
    ]);

    const handleFinish = () => { };

    return (
        <Form form={multiCityAddForm} onFinish={handleFinish}>
            <Form.List name="multiCityList" initialValue={multiCityList}>
                {(fields, { add, remove }) => (
                    // <Temp module='material' fields={fields} add={add} remove={remove} />
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row justify='space-between' align='middle' className='multiCityFormRow'>
                                <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Col className='flightInput fromToSelectCol multiCityInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                        <Selectable
                                            name={[name, "flightFrom"]}
                                            size='large'
                                            label='From'
                                            showSearch={true}
                                            className='searchSelect'
                                            popupClassName='searchPopupSelect'
                                            placeholder='Enter City or Airport'
                                            // value={value}
                                            // style={props.style}
                                            defaultOpen={false}
                                            suffixIcon={null}
                                            // handleSelectChange={handleAirportSelect}
                                            handleSelectChange={() => { }}
                                            firstName='label'
                                            secondName='code'
                                            data={airportsList}
                                            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            filterOption={(input, option) => {
                                                return (
                                                    option._id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                    option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                    option.code.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                        />
                                        <SwapRightOutlined
                                            style={{
                                                position: 'absolute',
                                                // top: '40%',
                                                top: '25%',
                                                fontSize: '20px',
                                                background: '#fff',
                                                // background: 'transparent',
                                                padding: '2.5%',
                                                // border: '1px solid lightgray',
                                                borderRadius: '7px',
                                                right: '-8%',
                                                zIndex: '999',
                                                cursor: 'pointer',
                                                color: '#003b95',
                                                boxShadow: '0 0 4px 0 lightgray'
                                            }}
                                        />
                                    </Col>
                                </Col>
                                <Col className='flightInput' xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Col className='flightInput fromToSelectCol' xl={23} lg={23} md={23} sm={23} xs={23}>
                                        <Selectable
                                            name={[name, "flightTo"]}
                                            size='large'
                                            label='To'
                                            showSearch={true}
                                            placeholder='Enter City or Airport'
                                            // value={value}
                                            className='searchSelect'
                                            popupClassName='searchPopupSelect'
                                            handleSelectChange={() => { }}
                                            // style={props.style}
                                            defaultOpen={false}
                                            suffixIcon={null}
                                            filterOption={false}
                                            firstName='label'
                                            secondName='code'
                                            // onSearch={handleFromToSearch}
                                            // onChange={handleFromToChange}
                                            notFoundContent={null}
                                            data={airportsList}
                                        // options={(data || []).map((d) => ({
                                        //     value: d.value,
                                        //     label: d.text,
                                        // }))}
                                        />
                                    </Col>
                                </Col>
                                <Col className='flightInput deptDateCol' xl={is930 ? 5 : 4} lg={is930 ? 5 : 4} md={is930 ? 5 : 4} sm={is930 ? 5 : 4} xs={is930 ? 5 : 4}>
                                    <Col className='flightInput' xl={23} lg={23} md={23} sm={23} xs={23}>
                                        <Form.Item
                                            name={[name, 'flightDeptDate']}
                                            label='Departure'
                                            className="createUserTextInput"
                                        // initialValue={defaultPurchaseOrder ? dayjs(new Date(defaultPurchaseOrder?.PODate).toLocaleDateString('en-GB'), 'DD/MM/YYYY') : null}
                                        // rulesew3={[{ required: false, message: 'PO Date is required' }]}
                                        >
                                            <DatePicker
                                                className='deptReturnDatePicker'
                                                popupClassName='commonDateStyle'
                                                onChange={(val) => val && multiCityAddForm.setFields([{ name: ['multiCityList', key, 'flightDeptDate'], errors: undefined }])}
                                                size='large'
                                                // placeholder='Departure Date'
                                                format='DD/MM/YYYY'
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                                <Col
                                    className='flightInput mAuto'
                                    xl={is930 ? 7 : 8} lg={is930 ? 7 : 8} md={is930 ? 7 : 8} sm={is930 ? 7 : 8} xs={is930 ? 7 : 8}
                                    // style={{ marginTop: (name === 0) ? '0.5%' : isTablet ? '2.7%' : null }}
                                    style={{ marginTop: (name === 0) ? '0.4rem' : '1rem' }}
                                >
                                    {name === 0 && <TravelClassPopover flightForm={multiCityAddForm} />}
                                    <Row justify='start'>
                                        {(name !== 0 && name <= 2) && <AppButton className='listAddBtn appButton' label='Add Another Flight' onClick={() => add()} />}
                                        {name > 1 && <CloseOutlined className="listAddIcon listRemoveIcon" onClick={() => remove(name)} />}
                                    </Row>
                                </Col>
                            </Row>
                        ))}
                    </>
                )}
            </Form.List>
        </Form>
    )
}

export default MultiCityForm;