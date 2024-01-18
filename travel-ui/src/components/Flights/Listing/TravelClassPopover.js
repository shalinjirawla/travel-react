import { DownOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Popover, Radio, Row } from "antd";
import TextInput from "../../TextInput";
import AppButton from "../../AppButton";
import { classOptions } from "../../../Constants";

const TravelClassPopover = ({ flightForm, currTraveller, isVisible, setIsVisible, onDone }) => {

    const [adultCounter, setAdultCounter] = useState(1);
    const [childCounter, setChildCounter] = useState(0);
    const [infantCounter, setInfantCounter] = useState(0);
    const [selectedClass, setSelectedClass] = useState('economy');
    // const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currTraveller) {
            setAdultCounter(currTraveller?.adult??1);
            setChildCounter(currTraveller?.child??0);
            setInfantCounter(currTraveller?.infant??0);
            setSelectedClass(currTraveller?.currClass??'economy');
        }
    }, [JSON.stringify(currTraveller)]);

    const getDisplayValue = (adult, child, infant, currClass) => {
        let text = `${adult} Adult, `;
        if (child > 0) text = text + `${child} Child, `;
        if (infant > 0) text = text + `${infant} Infant`;
        // text = text + `${currClass}`
        // return text;
        return `<h2>${text}</h2> \n<p>${classOptions.find(o => o.value === currClass)?.label}</p>`;
    };

    const handleChangeValues = (adult, child, infant, currClass) => {
        flightForm.setFieldValue("flightTraveller", getDisplayValue(adult, child, infant, currClass));
        // setCurrTraveller({ adult: adult, child: child, infant: infant, class: currClass });
    };

    const onClassChangeOptions = ({ target: { value } }) => {
        setSelectedClass(value);
        handleChangeValues(adultCounter, childCounter, infantCounter, value);
    };

    const handlePlus = (type) => {
        if (type === 'adult' && adultCounter <= 8) setAdultCounter(adultCounter + 1);
        if (type === 'child' && childCounter <= 8) setChildCounter(childCounter + 1);
        if (type === 'infant' && infantCounter <= 8) setInfantCounter(infantCounter + 1);
        handleChangeValues(
            (type === 'adult' && adultCounter <= 8) ? adultCounter + 1 : adultCounter,
            (type === 'child' && childCounter <= 8) ? childCounter + 1 : childCounter,
            (type === 'infant' && infantCounter <= 8) ? infantCounter + 1 : infantCounter,
            selectedClass
        );

    };
    const totalPassengers = adultCounter + childCounter + infantCounter;
    const handleMinus = (type) => {
        if (type === 'adult' && adultCounter > 1) setAdultCounter(adultCounter - 1);
        if (type === 'child' && childCounter > 0) setChildCounter(childCounter - 1);
        if (type === 'infant' && infantCounter > 0) setInfantCounter(infantCounter - 1);
        handleChangeValues(
            (type === 'adult' && adultCounter > 1) ? adultCounter - 1 : adultCounter,
            (type === 'child' && childCounter > 0) ? childCounter - 1 : childCounter,
            (type === 'infant' && infantCounter > 0) ? infantCounter - 1 : infantCounter,
            selectedClass
        );
    };

    const content = (
        <div>
            <div className='travelBoxCard'>
                <Row>
                <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                        <Row justify='center'><h3 style={{ color: ((totalPassengers <= 9 || adultCounter === 1) && infantCounter <= adultCounter) ? '' : 'red' }}>Adult</h3></Row>
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
                                // style={{ fontSize: '18px', color: '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                                style={{ fontSize: '18px', cursor: (adultCounter >= 9) ? 'not-allowed' : 'pointer', color: (adultCounter >= 9) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                            />
                        </div>
                    </Col>
                    <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                        <Row justify='center'><h3 style={{ color: (totalPassengers <= 9 || childCounter === 0) ? '' : 'red' }}>Children</h3></Row>
                        <Row justify='center' className="pLabel"><p>(Aged 2-12 yrs)</p></Row>
                        <div className='wrapper'>
                            <MinusOutlined
                                class="minusIcon"
                                onClick={() => handleMinus('child')}
                                style={{ fontSize: '18px', cursor: (childCounter === 0) ? 'not-allowed' : 'pointer', color: (childCounter === 0) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                            />
                            <div className='num'>{childCounter}</div>
                            <PlusOutlined
                                class="plusIcon"
                                onClick={() => handlePlus('child')}
                                // style={{ fontSize: '18px', color: '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                                style={{ fontSize: '18px', cursor: (childCounter >= 9) ? 'not-allowed' : 'pointer', color: (childCounter >= 9) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                            />
                        </div>
                    </Col>
                    <Col xl={8} lg={6} md={6} sm={6} xs={6}>
                        <Row justify='center'><h3 style={{ color: ((totalPassengers <= 9 || infantCounter === 0) && infantCounter <= adultCounter) ? '' : 'red' }}>Infants</h3></Row>
                        <Row justify='center' className="pLabel"><p>(Below 2 yrs)</p></Row>
                        <div className='wrapper'>
                            <MinusOutlined 
                                class="minusIcon" 
                                onClick={() => handleMinus('infant')} 
                                style={{ fontSize: '18px', cursor: (infantCounter === 0) ? 'not-allowed' : 'pointer', color: (infantCounter === 0) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }} 
                            />
                            <div className='num'>{infantCounter}</div>
                            <PlusOutlined 
                                class="plusIcon" 
                                onClick={() => handlePlus('infant')} 
                                // style={{ fontSize: '18px', color: '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }} 
                                style={{ fontSize: '18px', cursor: (infantCounter >= 9) ? 'not-allowed' : 'pointer', color: (infantCounter >= 9) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }} 
                            />
                        </div>
                    </Col>
                </Row>
                {/* <Divider /> */}
                <Row align='middle' justify='center'>
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
                </Row>
                <Row justify='end'>
                    <Col xl={(totalPassengers <= 9 && infantCounter <= adultCounter) ? 20 : 24} lg={20} md={20} sm={20} xs={20}>
                        {/* <AppButton onClick={() => setIsVisible(false)} className='travelDoneBtn appPrimaryButton' label='Done' /> */}
                        {(totalPassengers <= 9 && infantCounter <= adultCounter) ? (
                            <AppButton
                                onClick={() => {
                                    setIsVisible(false);
                                    onDone(adultCounter, childCounter, infantCounter, selectedClass);
                                }}
                                className='travelDoneBtn appPrimaryButton'
                                label='Done'
                            />
                        ) : (
                            <p style={{ textAlign: 'center', fontSize: '14px' }}><b>{totalPassengers <= 9 ? 'You must have atleast one adult per infant' : 'Looking to make a booking for more than 9 people?'}</b></p>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );

    return (
        <Popover
            trigger="click"
            onOpenChange={() => setIsVisible(!isVisible)}
            open={isVisible}
            content={content}
            arrow={false}
            placement='bottomLeft'
        >
            {/* <Button size='large'>1 Traveller(s), Economy</Button> */}
            {/* <TextInput
                name="flightTraveller"
                type='text'
                size='large'
                defaultVal={getDisplayValue(adultCounter, childCounter, infantCounter, selectedClass)}
                typeMsg='The input is not valid Name!'
                required={false}
                // placeholder='To :'
                label='Travellers & Class'
            /> */}
            <h3 className="tcontentHeader">Travellers & Class</h3>
            <div className="tcontent" dangerouslySetInnerHTML={{ __html: getDisplayValue(adultCounter, childCounter, infantCounter, selectedClass) }} />
            <DownOutlined style={{ position: 'absolute', fontSize: '18px', color: '#003b95', top: '40%', right: '4%' }} />
            {/* <Form.Item
                name="flightTraveller"
                className="createUserTextInput"
                // initialValue={getDisplayValue(adultCounter, childCounter, infantCounter, selectedClass)}
                initialValue={`Helloooo \n<p>New Line</p><p>asas</p>`}
                type='text'
                label="Travellers & Class"
            >
                <TextArea
                    size='large'
                    autoSize={{ minRows: 2, maxRows: 2 }}
                    // dangerouslySetInnerHTML={{ __html: '<h2>1 Adult \n <p>Premium Economy</p></h2>' }}

                    // autoSize={true}
                    // maxLength={20}
                    // rows={2}
                />
            </Form.Item> */}
        </Popover>
    )

};

export default TravelClassPopover;