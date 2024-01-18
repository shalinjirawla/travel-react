import { Card, Checkbox, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import './filterCard.css';
import Button from '../../AppButton';

const FilterCard = ({ handleFilterValues, selectedFlightOption }) => {

    const FilterButton = ({ btnHeading, options, handleClick }) => {
        return (
            <div>
                <h3 className='subHeading'>{btnHeading}</h3>
                <div className='flexWrap'>
                    {options.map((btn) => (
                        <>
                            <Button
                                key={btn.id}
                                style={{ marginBottom: '4%' }}
                                size='large'
                                className={`checkButtonClass ${btn.isChecked ? 'clicked' : ''}`}
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
                left: '0%',
                transform: 'translateX(0%)'
            },
            label: `₹ ${priceRangeSlider[0]}`,
        },
        50000: {
            style: {
                left: '80%',
                transform: 'translateX(0%)'
            },
            label: `₹ ${priceRangeSlider[1]}`
        },
    };
    const returnPriceMarks = {
        4000: {
            style: {
                left: '0%',
                transform: 'translateX(0%)'
            },
            label: `₹ ${returnPriceRangeSlider[0]}`,
        },
        40000: {
            style: {
                left: '80%',
                transform: 'translateX(0%)'
            },
            label: `₹ ${returnPriceRangeSlider[1]}`
        },
    };

    const durationMarks = {
        15: {
            style: {
                left: '0%',
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: durationValue[0]
        },
        1440: {
            style: {
                left: '80%',
                transform: 'translateX(0%)',
                color: 'black',
                cursor: 'auto',
            },
            label: durationValue[1]
        },
    };
    const returnDurationMarks = {
        30: {
            style: {
                left: '0%',
                transform: 'translateX(0%)',
                color: 'black'
            },
            label: returnDurationValue[0]
        },
        1410: {
            style: {
                left: '80%',
                transform: 'translateX(0%)',
                color: 'black',
                cursor: 'auto',
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

    const minutesToHoursAndMinutesForReturn = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    const minuteHoursForReturn = () => {
        const hoursMinutes = returnDurationRangeSlider.map(minutesToHoursAndMinutesForReturn);
        setReturnDurationValue(hoursMinutes);
    };

    const handleButtonClickForDeparture = (id) => {
        setButtonClickedForDeparture((prevCheckboxes) =>
            prevCheckboxes.map((btn) =>
                btn.id === id ? { ...btn, isChecked: !btn.isChecked } : btn
            )
        );
    };
    const handleButtonClickForReturn = (id) => {
        setButtonClickedForReturn((prevCheckboxes) =>
            prevCheckboxes.map((btn) =>
                btn.id === id ? { ...btn, isChecked: !btn.isChecked } : btn
            )
        );
    };

    const handleButtonClickForStops = (id) => {
        setButtonClickedForStops((prevCheckboxes) =>
            prevCheckboxes.map((btn) =>
                btn.id === id ? { ...btn, isChecked: !btn.isChecked } : btn
            )
        );
    };
    const handleButtonClickForReturnStops = (id) => {
        setButtonClickedForReturnStops((prevCheckboxes) =>
            prevCheckboxes.map((btn) =>
                btn.id === id ? { ...btn, isChecked: !btn.isChecked } : btn
            )
        );
    };

    const handleChangeHide = (e) => {
        setHideChecked(e.target.checked);
    };
    const handleResetAll = () => {
        setHideChecked(false);
        setButtonClickedForDeparture((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false })));
        setButtonClickedForReturn((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false })));
        setButtonClickedForStops((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false })));
        setButtonClickedForReturnStops((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false })));
        setPriceRangeSlider([5000, 50000]);
        setReturnPriceRangeSlider([4000, 40000]);
        setDurationRangeSlider([15, 1440]);
        setReturnDurationRangeSlider([30, 1410]);
        setAirlinesCheckbox((prevCheckboxes) => prevCheckboxes.map((checkbox) => ({ ...checkbox, isChecked: false })));
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

    const handleChangeHidePriceSlider = (values) => {
        console.log('price change value===', values);
        handleFilterValues('price', values);
        setPriceRangeSlider(values);
    };
    const handleResetForPriceSlider = () => {
        setPriceRangeSlider([5000, 50000]);
    };
    const handleChangeHideReturnPriceSlider = (values) => {
        console.log('price change value===', values);
        handleFilterValues('price', values);
        setReturnPriceRangeSlider(values);
    };
    const handleResetForReturnPriceSlider = () => {
        setReturnPriceRangeSlider([4000, 40000]);
    };

    const handleChangeHideDurationSlider = (values) => {
        handleFilterValues('duration', values);
        setDurationRangeSlider(values);
    };
    const handleResetForDurationSlider = () => {
        setDurationRangeSlider([15, 1440]);
    };
    const handleChangeHideReturnDurationSlider = (values) => {
        handleFilterValues('duration', values);
        setReturnDurationRangeSlider(values);
    };
    const handleResetForReturnDurationSlider = () => {
        setReturnDurationRangeSlider([30, 1410]);
    };

    return (
        <Card className='filterCard'>
            <div>

                <div>
                    <div className='headerPadding'>
                        <div>
                            <div className='headingStyle'>Filters</div>
                            <div className='headingStyles'>showing 12 flights</div>
                        </div>
                        <span className='resetStyleShow' onClick={handleResetAll}>Reset All</span>
                    </div><br />

                    <div className='justifyBetweens'>
                        <span className='labelClass'>
                            <Checkbox className='checkBoxFHideLabel' onChange={handleChangeHide} checked={hideChecked}>Hide multi check-in flights</Checkbox>
                        </span>
                    </div>
                </div>

                <div className='borderBottom'></div>

                <FilterButton
                    btnHeading='Departure'
                    options={isButtonClickedForDeparture}
                    handleClick={(id) => handleButtonClickForDeparture(id)}
                />
                {selectedFlightOption === 'roundtrip' &&
                    <FilterButton
                        btnHeading='Return'
                        options={isButtonClickedForReturn}
                        handleClick={(id) => handleButtonClickForReturn(id)}
                    />
                }

                <div className='borderBottom'></div>

                <FilterButton
                    btnHeading={selectedFlightOption !== 'roundtrip' ? 'Stops' : 'Onward Stops'}
                    options={isButtonClickedForStops}
                    handleClick={(id) => handleButtonClickForStops(id)}
                />
                {selectedFlightOption === 'roundtrip' &&
                    <FilterButton
                        btnHeading='Return Stops'
                        options={isButtonClickedForReturnStops}
                        handleClick={(id) => handleButtonClickForReturnStops(id)}
                    />
                }

                <div className='borderBottom'></div>

                <div className='subDiv'>
                    <div>
                        <div className='flex-between'>
                            <div className='subHeadingStyle'>Price</div>
                            <span className='resetStyleShow' onClick={handleResetForPriceSlider}>Reset</span>
                        </div>
                        <Slider
                            range
                            marks={priceMarks}
                            min={5000}
                            max={50000}
                            defaultValue={priceRangeSlider}
                            value={priceRangeSlider}
                            onChange={handleChangeHidePriceSlider}
                            className='sliderStyle'
                            tooltip={{ formatter: null }}
                        />
                    </div>
                    {selectedFlightOption === 'roundtrip' &&
                        <div>
                            <div className='flex-between'>
                                <div className='subHeadingStyle'>Return Price</div>
                                <span className='resetStyleShow' onClick={handleResetForReturnPriceSlider}>Reset</span>
                            </div>
                            <Slider
                                range
                                marks={returnPriceMarks}
                                min={4000}
                                max={40000}
                                defaultValue={returnPriceRangeSlider}
                                value={returnPriceRangeSlider}
                                onChange={handleChangeHideReturnPriceSlider}
                                className='sliderStyle'
                                tooltip={{ formatter: null }}
                            />
                        </div>
                    }
                </div>

                <div className='borderBottom'></div>

                <div className='subDiv'>
                    <div>
                        <div className='flex-between'>
                            <div className='subHeadingStyle'>Onward Duration</div>
                            <span className='resetStyleShow' onClick={handleResetForDurationSlider}>Reset</span>
                        </div>
                        <Slider
                            range
                            marks={durationMarks}
                            min={15}
                            max={1440}
                            defaultValue={durationRangeSlider}
                            value={durationRangeSlider}
                            onChange={handleChangeHideDurationSlider}
                            className='sliderStyle'
                            tooltip={{ formatter: null }}
                        />
                    </div>
                    {selectedFlightOption === 'roundtrip' &&
                        <div>
                            <div className='flex-between'>
                                <div className='subHeadingStyle'>Return Duration</div>
                                <span className='resetStyleShow' onClick={handleResetForReturnDurationSlider}>Reset</span>
                            </div>
                            <Slider
                                range
                                marks={returnDurationMarks}
                                min={30}
                                max={1410}
                                defaultValue={returnDurationRangeSlider}
                                value={returnDurationRangeSlider}
                                onChange={handleChangeHideReturnDurationSlider}
                                className='sliderStyle'
                                tooltip={{ formatter: null }}
                            />
                        </div>
                    }
                </div>

                <div className='borderBottom'></div>

                <div className='subDiv'>
                    <div>
                        <div className='flex-between'>
                            <div className='subHeadingStyle'>Preferred Airlines</div>
                            <span className='resetStyleShow' onClick={handleResetForAirlines}>Reset</span>
                        </div>

                        <div className='subHeading'>
                            {airlinesCheckbox.map(o => (
                                <div className='checkList' key={o.id}>
                                    <div className='subCheckList'>
                                        <Checkbox onChange={() => handleChangeHideForAirlines(o.id)} checked={o.isChecked}>{o.airline}</Checkbox>
                                    </div>
                                    <div className='priceCheck'>
                                        <span className='subPriceCheck color'>{o.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default FilterCard;