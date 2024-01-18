import React, { useState } from 'react';
import { Card, Col, Radio, Row, Segmented } from 'antd';
import '../../../../styles/flight/MultiCity/Header.css';
import Button from '../../../AppButton';

const Header = ({ selectedSegment, onSegmentChange }) => {

    const multiCityOptions = [
        {
            label: 'Flight Combinations',
            value: 'flightCombinations',
        },
        {
            label: 'Select your own Flights',
            value: 'ownFlights',
        }
    ];

    const multiCitySceduleOptions = [
        {
            label:  <>
                        <span>AMD - BOM</span><br />
                        <span>Thu, 04 Jan 2024</span>
                    </>,
            value: 'fromScedule',
        },
        {
            label:  <>
                        <span>BOM - DEL</span><br />
                        <span>Thu, 28 Mar 2024</span>
                    </>,
            value: 'toScedule',
        }
    ];

    const segmentsOptions = [
        { value: 'combo', label: 'Flight Combinations' },
        { value: 'own', label: 'Select Your Own Flights' },
    ];

    const [selectedFlightOption, setSelectedFlightOption] = useState('ownFlights');
    const [selectedFlightSceduleOption, setSelectedFlightSceduleOption] = useState('fromScedule');

    const onMultiCityChange = ({ target: { value } }) => {
        console.log('radio checked', value);
        setSelectedFlightOption(value);
    };
    const onMultiCitySceduleChange = ({ target: { value } }) => {
        console.log('radio checked', value);
        setSelectedFlightSceduleOption(value);
    };

    return (
        <div className='multiCityFStyle'>
            <Card className='multiCHeaderCard'>
                <div className='multiCFCardWidth'>

                    <div className='multiCFHeading'>Multicity Flights</div>

                    <div className='m-Top'>
                        <Segmented
                            options={segmentsOptions}
                            className='multicitySegment'
                            size='large'
                            value={selectedSegment}
                            onChange={onSegmentChange}
                        />
                        {/* <Radio.Group
                            // size='large'
                            className='multiFlightRadio'
                            options={multiCityOptions}
                            onChange={onMultiCityChange}
                            value={selectedFlightOption}
                            optionType="button"
                            buttonStyle="solid"
                        /> */}
                    </div>

                    <div className='secondMultiCFHeading m-Top'>
                        {selectedSegment === 'combo' ? 'Select any flight combination' : 'Create your own itinerary by selecting flights for each sector'}
                    </div>

                    <div className='m-Top'>
                        <Row align='middle' justify='space-between'>
                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Radio.Group
                                    className={selectedSegment === 'combo' ? 'readOnlyRadio multiFlightSceduleRadio multiFlightSceduleRadioCombo' : 'multiFlightSceduleRadio'}
                                    // style={{ color: selectedSegment === 'combo' ? '#fff !important' : null }}
                                    options={multiCitySceduleOptions}
                                    onChange={onMultiCitySceduleChange}
                                    value={selectedFlightSceduleOption}
                                    disabled={selectedSegment === 'combo' ? true : false}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} xs={12} className='textAlignEnd'>
                                <Button className='modifyTBtn' label='Modify Search' />
                            </Col>
                        </Row>
                    </div>
                    
                </div>
            </Card>
        </div>
    );
}

export default Header;