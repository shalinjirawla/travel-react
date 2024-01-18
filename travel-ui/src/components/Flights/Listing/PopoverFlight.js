import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Popover, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import Selectable from '../../Selectable';
import { classOptions } from '../../../Constants';
import AppButton from '../../AppButton';

const PopoverFlight = ({ currentSearchData, searchDetails }) => {

    const [adultCounter, setAdultCounter] = useState(1);
    const [childCounter, setChildCounter] = useState(0);
    const [infantCounter, setInfantCounter] = useState(0);
    const [selectedClass, setSelectedClass] = useState('economy');
    const [popoverButtonText, setPopoverButtonText] = useState('');
    const [visiblePopover, setVisiblePopover] = useState(false);

    useEffect(() => {
        if (currentSearchData && currentSearchData?.search) {
            setAdultCounter(Number(currentSearchData?.search?.adultsCount));
            setChildCounter(Number(currentSearchData?.search?.childrenCount));
            setInfantCounter(Number(currentSearchData?.search?.infantsCount));
            setSelectedClass(currentSearchData?.search?.cabin);
        }
    }, [JSON.stringify(currentSearchData)]);

    const getDisplayValue = (adult, child, infant, currClass) => {
        let text = `${adult} Adult, `;
        if (child > 0) text = text + `${child} Child, `;
        if (infant > 0) text = text + `${infant} Infant`;
        // text = text + `${currClass}`
        // return text;
        return `<h2>${text}</h2> \n<p>${classOptions.find(o => o.value === currClass)?.label}</p>`;
    };

    // const handleChangeValues = (adult, child, infant, currClass) => {
    //     flightForm.setFieldValue("flightTraveller", getDisplayValue(adult, child, infant, currClass));
    // };

    const onClassChangeOptions = ({ target: { value } }) => {
        setSelectedClass(value);
        // handleChangeValues(adultCounter, childCounter, infantCounter, value);
    };

    const handlePlus = (type) => {
        if (type === 'adult') setAdultCounter(adultCounter + 1);
        if (type === 'child') setChildCounter(childCounter + 1);
        if (type === 'infant') setInfantCounter(infantCounter + 1);
        // handleChangeValues(
        //     (type === 'adult') ? adultCounter + 1 : adultCounter,
        //     (type === 'child') ? childCounter + 1 : childCounter,
        //     (type === 'infant') ? infantCounter + 1 : infantCounter,
        //     selectedClass
        // );
    };
    const handleMinus = (type) => {
        if (type === 'adult' && adultCounter > 1) setAdultCounter(adultCounter - 1);
        if (type === 'child' && childCounter > 0) setChildCounter(childCounter - 1);
        if (type === 'infant' && infantCounter > 0) setInfantCounter(infantCounter - 1);
        // handleChangeValues(
        //     (type === 'adult' && adultCounter > 1) ? adultCounter - 1 : adultCounter,
        //     (type === 'child' && childCounter > 0) ? childCounter - 1 : childCounter,
        //     (type === 'infant' && infantCounter > 0) ? infantCounter - 1 : infantCounter,
        //     selectedClass
        // );
    };

    const handleDoneClick = () => {
        const travelClassValue = classOptions.find(o => o?.value === selectedClass)?.label;
        const buttonText = `${adultCounter + childCounter + infantCounter} Traveller(s), ${travelClassValue}`;
        setPopoverButtonText(buttonText);
        setVisiblePopover(false);
    };

    const content = (
        <div>
            <div className='boxCard'>
                <Row>
                    <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                        <Row justify='center'><h3>Adult</h3></Row>
                        <Row justify='center' className="pLabel"><p>(Aged 12+ yrs)</p></Row>
                        <div className='wrapper'>
                            <MinusOutlined
                                class="minusIcon"
                                onClick={() => handleMinus('adult')}
                                style={{ fontSize: '18px', cursor: (adultCounter === 1) ? 'not-allowed' : 'pointer', color: (adultCounter === 1) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                            />
                            <div className='num'>{adultCounter}</div>
                            <PlusOutlined
                                class="plusIcon"
                                onClick={() => handlePlus('adult')}
                                style={{ fontSize: '18px', color: '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                            />
                        </div>
                    </Col>
                    <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                        <Row justify='center'><h3>Children</h3></Row>
                        <Row justify='center' className="pLabel"><p>(Aged 2-12 yrs)</p></Row>
                        <div className='wrapper'>
                            <MinusOutlined
                                class="minusIcon"
                                onClick={() => handleMinus('child')}
                                style={{ fontSize: '16px', cursor: (childCounter === 0) ? 'not-allowed' : 'pointer', color: (childCounter === 0) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '0%', top: '24%' }}
                            />
                            <div className='num'>{childCounter}</div>
                            <PlusOutlined
                                class="plusIcon"
                                onClick={() => handlePlus('child')}
                                style={{ fontSize: '16px', color: '#003b95', position: 'relative', width: '30%', left: '0%', top: '24%' }}
                            />
                        </div>
                    </Col>
                    <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                        <Row justify='center'><h3>Infants</h3></Row>
                        <Row justify='center' className="pLabel"><p>(Below 2 yrs)</p></Row>
                        <div className='wrapper'>
                            <MinusOutlined class="minusIcon" onClick={() => handleMinus('infant')} style={{ fontSize: '18px', cursor: (infantCounter === 0) ? 'not-allowed' : 'pointer', color: (infantCounter === 0) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }} />
                            <div className='num'>{infantCounter}</div>
                            <PlusOutlined class="plusIcon" onClick={() => handlePlus('infant')} style={{ fontSize: '18px', color: '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }} />
                        </div>
                    </Col>
                </Row>
                {/* <Divider /> */}
                {/* <Row align='middle' justify='center'>
                    <Col xl={22} lg={{ span: 15 }} md={{ span: 15 }} sm={{ span: 15 }} xs={{ span: 15 }} className='dropdownBtn'>
                        <Row align='middle'>
                            <Col xl={5} lg={4} md={4} sm={4} xs={4}>
                                <h3>Travel Class </h3>
                            </Col>
                            <Col xl={19} lg={20} md={20} sm={20} xs={20}>
                                <Radio.Group className='classRadio' size='large' options={classOptions} onChange={onClassChangeOptions} value={selectedClass} optionType="button" />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row> */}
                <Divider />
                <Row align='middle' justify='space-between'>
                    <Col xl={{ span: 15 }} lg={{ span: 15 }} md={{ span: 15 }} sm={{ span: 15 }} xs={{ span: 15 }} className='dropdownBtn'>
                        <Selectable
                            label='Travel Class'
                            name="travelClass"
                            // required={true}
                            // requiredMsg='Status is required'
                            defaultValue={selectedClass}
                            firstName='label'
                            data={classOptions}
                            width={400}
                            showSearch={false}
                            handleSelectChange={(val) => { setSelectedClass(val); }}
                        />
                    </Col>
                    <Col xl={7} lg={20} md={20} sm={20} xs={20}>
                        <AppButton className='doneBtn appPrimaryButton' onClick={handleDoneClick} label='Done' />
                    </Col>
                </Row>
            </div>
        </div>
    );

    return (
        <div>
            <Popover content={content} trigger="click" open={visiblePopover} onOpenChange={setVisiblePopover}>
                <AppButton size='large' className='backgroundStyle overflowH' label={popoverButtonText || `${adultCounter} Traveller(s), Economy`} />
            </Popover>
        </div>
    );
}

export default PopoverFlight;