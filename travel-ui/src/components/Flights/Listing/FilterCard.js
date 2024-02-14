import { Card, Checkbox, Slider } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import './filterCard.css';
import Button from '../../AppButton';
import { AuthContext } from '../../../context/AuthProvider';
import { FilterOutlined } from '@ant-design/icons';
import AppModal from '../../AppModal';

const FilterCard = ({ handleFilterValues, selectedFlightOption, filterModalOpen, setFilterModalOpen }) => {

    const FilterButton = ({ btnHeading, options, handleClick }) => {
        return (
            <div>
                <h3 className={`subHeading ${((selectedFlightOption === 'oneway') && 'subHeadingow')}`}>{btnHeading}</h3>
                <div className='flexWrap'>
                    {options.map((btn) => (
                        <>
                            <Button
                                key={btn.id}
                                style={{ marginBottom: '4%' }}
                                size='large'
                                className={`checkButtonClass ${((selectedFlightOption === 'oneway') && 'checkButtonClassow')} ${btn.isChecked ? 'clicked' : ''}`}
                                onClick={() => handleClick(btn.id)}
                                label={btn.btnValue}
                            />
                        </>
                    ))}
                </div>
            </div>
        );
    };

    const departureButtonData = [
        {
            btnValue: 'Before 6AM',
            id: 1,
            isChecked: false
        },
        {
            btnValue: '6AM - 12PM',
            id: 2,
            isChecked: false
        },
        {
            btnValue: '12PM - 6PM',
            id: 3,
            isChecked: false
        },
        {
            btnValue: 'After 6PM',
            id: 4,
            isChecked: false
        },
    ];
    const stopsButtonData = [
        {
            btnValue: 'Direct',
            id: 1,
            isChecked: false
        },
        {
            btnValue: '1 Stop',
            id: 2,
            isChecked: false
        },
        {
            btnValue: '2+ Stops',
            id: 3,
            isChecked: false
        }
    ];
    const airlinesCheckboxData = [
        {
            airline: 'Air India',
            price: '₹ 8,931',
            id: 1,
            isChecked: false
        },
        {
            airline: 'IndiGo',
            price: '₹ 8,339',
            id: 2,
            isChecked: false
        },
        {
            airline: 'Vistara',
            price: '₹ 11,460',
            id: 3,
            isChecked: false
        },
    ];

    const { rsWidths: { is1100 }, isTablet } = useContext(AuthContext)??{};
    const [airlinesCheckbox, setAirlinesCheckbox] = useState(airlinesCheckboxData);
    const [isButtonClickedForDeparture, setButtonClickedForDeparture] = useState(departureButtonData);
    const [isButtonClickedForReturn, setButtonClickedForReturn] = useState(departureButtonData);
    const [isButtonClickedForStops, setButtonClickedForStops] = useState(stopsButtonData);
    const [isButtonClickedForReturnStops, setButtonClickedForReturnStops] = useState(stopsButtonData);
    const [hideChecked, setHideChecked] = useState(false);
    const [priceRangeSlider, setPriceRangeSlider] = useState([5000, 50000]);
    const [returnPriceRangeSlider, setReturnPriceRangeSlider] = useState([4000, 40000]);
    const [durationRangeSlider, setDurationRangeSlider] = useState([15, 1440]);
    const [durationValue, setDurationValue] = useState(durationRangeSlider);
    const [returnDurationRangeSlider, setReturnDurationRangeSlider] = useState([30, 1410]);
    const [returnDurationValue, setReturnDurationValue] = useState(durationRangeSlider);

    useEffect(() => {
        minuteHours();
        minuteHoursForReturn();
    }, [durationRangeSlider, returnDurationRangeSlider]);

    const priceMarks = {
        5000: {
            style: {
                left: 0,
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: `₹ ${priceRangeSlider[0]}`
        },
        50000: {
            style: {
                left: 'auto',
                right: 0,
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: `₹ ${priceRangeSlider[1]}`
        },
    };
    const returnPriceMarks = {
        4000: {
            style: {
                left: 0,
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: `₹ ${returnPriceRangeSlider[0]}`
        },
        40000: {
            style: {
                left: 'auto',
                right: 0,
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: `₹ ${returnPriceRangeSlider[1]}`
        },
    };

    const durationMarks = {
        15: {
            style: {
                left: 0,
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: durationValue[0]
        },
        1440: {
            style: {
                left: 'auto',
                right: 0,
                transform: 'translateX(0%)',
                color: 'black',
            },
            label: durationValue[1]
        },
    };
    const returnDurationMarks = {
        30: {
            style: {
                left: 0,
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: returnDurationValue[0]
        },
        1410: {
            style: {
                left: 'auto',
                right: 0,
                transform: 'translateX(0%)',
                color: 'black',
            },
            label: returnDurationValue[1]
        },
    };

    const minutesToHoursAndMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    const minuteHours = () => {
        const hoursMinutes = durationRangeSlider.map(minutesToHoursAndMinutes);
        setDurationValue(hoursMinutes);
    };

    const minuteHoursForReturn = () => {
        const hoursMinutes = returnDurationRangeSlider.map(minutesToHoursAndMinutes);
        setReturnDurationValue(hoursMinutes);
    };

    const handleButtonClick = (id, setFunc) => {
        setFunc((prevCheckboxes) =>
            prevCheckboxes.map((btn) =>
                btn.id === id ? { ...btn, isChecked: !btn.isChecked } : btn
            )
        );
    };
    
    const resetCheckByFunc = (setFunc) => {
        setFunc((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false })));
    };

    const handleChangeHide = (e) => {
        setHideChecked(e.target.checked);
    };
    const handleResetAll = () => {
        setHideChecked(false);
        resetCheckByFunc(setButtonClickedForDeparture);
        resetCheckByFunc(setButtonClickedForReturn);
        resetCheckByFunc(setButtonClickedForStops);
        resetCheckByFunc(setButtonClickedForReturnStops);
        resetCheckByFunc(setAirlinesCheckbox);
        setPriceRangeSlider([5000, 50000]);
        setReturnPriceRangeSlider([4000, 40000]);
        setDurationRangeSlider([15, 1440]);
        setReturnDurationRangeSlider([30, 1410]);
    };

    const handleChangeHideForAirlines = (id) => {
        setAirlinesCheckbox((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
            )
        );
    };
    const handleResetForAirlines = () => {
        setAirlinesCheckbox((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false }))
        );
    };

    const handleChangeSlider = (type, values, setFunc) => {
        handleFilterValues(type, values);
        setFunc(values);
    };

    const handleResetForPriceSlider = () => {
        setPriceRangeSlider([5000, 50000]);
    };
    const handleResetForReturnPriceSlider = () => {
        setReturnPriceRangeSlider([4000, 40000]);
    };
    const handleResetForDurationSlider = () => {
        setDurationRangeSlider([15, 1440]);
    };
    const handleResetForReturnDurationSlider = () => {
        setReturnDurationRangeSlider([30, 1410]);
    };

    const handleFilterModal = () => {
		setFilterModalOpen(!filterModalOpen);
	};

    const filterData = <>
        <div className={`filterFModal ${((selectedFlightOption === 'roundtrip') && 'filterFModalRT')}`}>
            <div className={`modal-header ${((selectedFlightOption === 'roundtrip') && 'modal-headerRT')}`}>
                <div className='headerPadding'>
                    <div>
                        {/* {!isTablet && <div className='headingStyle'>Filters</div>} */}
                        {((selectedFlightOption === 'oneway') ? !isTablet : (selectedFlightOption === 'roundtrip') ? !is1100 : '') && 
                            <div className={`headingStyle ${((selectedFlightOption === 'oneway') && 'headingStyleow')}`}>Filters</div>
                        }
                        <div className={`headingStyles ${((selectedFlightOption === 'oneway') && 'headingStylesow')}`}>showing 12 flights</div>
                    </div>
                    <span className={`resetStyleShow ${((selectedFlightOption === 'oneway') && 'resetStyleShowOw')}`} onClick={handleResetAll}>Reset All</span>
                </div><br />

                <div className='justifyBetweens'>
                    <span className='labelClass'>
                        <Checkbox className={`checkBoxFHideLabel ${((selectedFlightOption === 'oneway') && 'checkBoxFHideLabelow')}`} onChange={handleChangeHide} checked={hideChecked}>Hide multi check-in flights</Checkbox>
                    </span>
                </div>
            </div>

            <div className='borderBottom'></div>

            <div className={`modal-body ${((selectedFlightOption === 'roundtrip') && 'modal-bodyRT')}`}>
                <FilterButton
                    btnHeading='Departure'
                    options={isButtonClickedForDeparture}
                    handleClick={(id) => handleButtonClick(id, setButtonClickedForDeparture)}
                />
                {selectedFlightOption === 'roundtrip' &&
                    <FilterButton
                        btnHeading='Return'
                        options={isButtonClickedForReturn}
                        handleClick={(id) => handleButtonClick(id, setButtonClickedForReturn)}
                    />
                }

                <div className='borderBottom'></div>

                <FilterButton
                    btnHeading={selectedFlightOption !== 'roundtrip' ? 'Stops' : 'Onward Stops'}
                    options={isButtonClickedForStops}
                    handleClick={(id) => handleButtonClick(id, setButtonClickedForStops)}
                />
                {selectedFlightOption === 'roundtrip' &&
                    <FilterButton
                        btnHeading='Return Stops'
                        options={isButtonClickedForReturnStops}
                        handleClick={(id) => handleButtonClick(id, setButtonClickedForReturnStops)}
                    />
                }

                <div className='borderBottom'></div>

                <div className='subDiv'>
                    <div>
                        <div className='flex-between'>
                            <div className={`subHeadingStyle ${((selectedFlightOption === 'oneway') && 'subHeadingStyleow')}`}>Price</div>
                            {/* <span className='resetStyleShow d-flex' onClick={handleResetForPriceSlider}>Reset</span> */}
                            <span className={`resetStyleShow d-flex ${((selectedFlightOption === 'oneway') && 'resetStyleShowOw')}`} onClick={handleResetForPriceSlider}>Reset</span>
                        </div>
                        <Slider
                            range
                            marks={priceMarks}
                            min={5000}
                            max={50000}
                            defaultValue={priceRangeSlider}
                            value={priceRangeSlider}
                            onChange={(val) => handleChangeSlider('price', val, setPriceRangeSlider)}
                            tooltip={{ formatter: null }}
                            className={`${(selectedFlightOption === 'oneway') && 'sliderFontStyle'}`}
                        />
                    </div>
                    {selectedFlightOption === 'roundtrip' &&
                        <div>
                            <div className='flex-between'>
                                <div className={`subHeadingStyle ${((selectedFlightOption === 'oneway') && 'subHeadingStyleow')}`}>Return Price</div>
                                <span className={`resetStyleShow d-flex ${((selectedFlightOption === 'oneway') && 'resetStyleShowOw')}`} onClick={handleResetForReturnPriceSlider}>Reset</span>
                            </div>
                            <Slider
                                range
                                marks={returnPriceMarks}
                                min={4000}
                                max={40000}
                                defaultValue={returnPriceRangeSlider}
                                value={returnPriceRangeSlider}
                                onChange={(val) => handleChangeSlider('price', val, setReturnPriceRangeSlider)}
                                tooltip={{ formatter: null }}
                                className={`${(selectedFlightOption === 'oneway') && 'sliderFontStyle'}`}
                            />
                        </div>
                    }
                </div>

                <div className='borderBottom'></div>

                <div className='subDiv'>
                    <div>
                        <div className='flex-between'>
                            <div className={`subHeadingStyle ${((selectedFlightOption === 'oneway') && 'subHeadingStyleow')}`}>Onward Duration</div>
                            <span className={`resetStyleShow d-flex ${((selectedFlightOption === 'oneway') && 'resetStyleShowOw')}`} onClick={handleResetForDurationSlider}>Reset</span>
                        </div>
                        <Slider
                            range
                            marks={durationMarks}
                            min={15}
                            max={1440}
                            defaultValue={durationRangeSlider}
                            value={durationRangeSlider}
                            onChange={(val) => handleChangeSlider('duration', val, setDurationRangeSlider)}
                            tooltip={{ formatter: null }}
                            className={`${(selectedFlightOption === 'oneway') && 'sliderFontStyle'}`}
                        />
                    </div>
                    {selectedFlightOption === 'roundtrip' &&
                        <div>
                            <div className='flex-between'>
                                <div className={`subHeadingStyle ${((selectedFlightOption === 'oneway') && 'subHeadingStyleow')}`}>Return Duration</div>
                                <span className={`resetStyleShow d-flex ${((selectedFlightOption === 'oneway') && 'resetStyleShowOw')}`} onClick={handleResetForReturnDurationSlider}>Reset</span>
                            </div>
                            <Slider
                                range
                                marks={returnDurationMarks}
                                min={30}
                                max={1410}
                                defaultValue={returnDurationRangeSlider}
                                value={returnDurationRangeSlider}
                                onChange={(val) => handleChangeSlider('duration', val, setReturnDurationRangeSlider)}
                                tooltip={{ formatter: null }}
                                className={`${(selectedFlightOption === 'oneway') && 'sliderFontStyle'}`}
                            />
                        </div>
                    }
                </div>

                <div className='borderBottom'></div>

                <div className='subDiv'>
                    <div>
                        <div className='flex-between'>
                            <div className={`subHeadingStyle ${((selectedFlightOption === 'oneway') && 'subHeadingStyleow')}`}>Preferred Airlines</div>
                            <span className={`resetStyleShow d-flex ${((selectedFlightOption === 'oneway') && 'resetStyleShowOw')}`} onClick={handleResetForAirlines}>Reset</span>
                        </div>

                        <div className={`subHeading ${((selectedFlightOption === 'oneway') && 'subHeadingow')}`}>
                            {airlinesCheckbox.map(o => (
                                <div className='checkList' key={o.id}>
                                    <div>
                                        <Checkbox className={`checkFBoxLabel ${((selectedFlightOption === 'oneway') && 'checkFBoxLabelow')}`} onChange={() => handleChangeHideForAirlines(o.id)} checked={o.isChecked}>{o.airline}</Checkbox>
                                    </div>
                                    <div>
                                        {/* <span className='subPriceCheck color'>{o.price}</span> */}
                                        <span className={`color ${((selectedFlightOption === 'oneway') && 'subPriceCheck')}`}>{o.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

    return (
        <>
            {((selectedFlightOption === 'oneway') ? isTablet : (selectedFlightOption === 'roundtrip') ? is1100 : '') &&
                <div className='filterFTitle filterRoudTripTitle textAlignEnd'>
                    {(selectedFlightOption === 'oneway') && 
                        <div>
                            <span 
                                onClick={() => {
                                    setFilterModalOpen(true);
                                }}
                                className='moreFFilter cursorP'
                            >More Filters <FilterOutlined /></span>
                        </div>
                    }
                    <AppModal
                        title='Filters'
                        // className='modalFStyle'
                        className={`modalFStyle ${((selectedFlightOption === 'roundtrip') && 'modalFStyleRT')}`}
                        open={filterModalOpen}
                        children={filterData}
                        onOk={handleFilterModal}
                        onCancel={handleFilterModal}
                    />                    
                </div>
            }
            {((selectedFlightOption === 'oneway') ? !isTablet : (selectedFlightOption === 'roundtrip') ? !is1100 : '') &&
                <Card className='filterCard'> 
                    {filterData}
                </Card>
            }
        </>
    );
}

export default FilterCard;