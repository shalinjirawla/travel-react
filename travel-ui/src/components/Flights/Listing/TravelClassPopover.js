import { DownOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { Col, Popover, Radio, Row } from "antd";
import AppButton from "../../AppButton";
import { classOptions } from "../../../Constants";
import { AuthContext } from "../../../context/AuthProvider";

const TravelClassPopover = ({ flightForm, currTraveller, isVisible, setIsVisible, onDone }) => {

    const { isTablet } = useContext(AuthContext)??{};
    const [adultCounter, setAdultCounter] = useState(1);
    const [childCounter, setChildCounter] = useState(0);
    const [infantCounter, setInfantCounter] = useState(0);
    const [selectedClass, setSelectedClass] = useState('economy');

    useEffect(() => {
        if (currTraveller) {
            onReset();
        }
    }, [JSON.stringify(currTraveller)]);
    
    const onReset = () => {
        setAdultCounter(currTraveller?.adult??1);
        setChildCounter(currTraveller?.child??0);
        setInfantCounter(currTraveller?.infant??0);
        setSelectedClass(currTraveller?.currClass??'economy');
    };

    const getDisplayValue = (adult, child, infant, currClass) => {
        let text = `${adult} Adult, `;
        if (child > 0) text = text + `${child} Child, `;
        if (infant > 0) text = text + `${infant} Infant`;
        return `<h2>${text}</h2> \n<p>${classOptions.find(o => o.value === currClass)?.label}</p>`;
    };

    const handleChangeValues = (adult, child, infant, currClass) => {
        flightForm.setFieldValue("flightTraveller", { adult: adult, child: child, infant: infant, currClass: currClass });
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
                    <Col xl={8} lg={8} md={8} sm={8} xs={8}>
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
                    <Col xl={8} lg={8} md={8} sm={8} xs={8}>
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
                    <Col xl={8} lg={8} md={8} sm={8} xs={8}>
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
                    <Col xl={22} lg={22} md={22} sm={22} xs={22} className='dropdownBtn'>
                        <Row align='middle'>
                            <Col xl={5} lg={5} md={5} sm={5} xs={5}>
                                <h3>Travel Class </h3>
                            </Col>
                            <Col xl={19} lg={19} md={19} sm={19} xs={19}>
                                <Radio.Group className='classRadio' size='large' options={classOptions} onChange={onClassChangeOptions} value={selectedClass} optionType="button" />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row justify='end'>
                    <Col xl={(totalPassengers <= 9 && infantCounter <= adultCounter) ? 20 : 24} lg={(totalPassengers <= 9 && infantCounter <= adultCounter) ? 20 : 24} md={(totalPassengers <= 9 && infantCounter <= adultCounter) ? 20 : 24} sm={(totalPassengers <= 9 && infantCounter <= adultCounter) ? 20 : 24} xs={(totalPassengers <= 9 && infantCounter <= adultCounter) ? 20 : 24}>
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
                            <p className='totalFPassengers'><b>{totalPassengers <= 9 ? 'You must have atleast one adult per infant' : 'Looking to make a booking for more than 9 people?'}</b></p>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );

    return (
        <Popover
            trigger="click"
            onOpenChange={() => { setIsVisible(!isVisible); onReset(); }}
            open={isVisible}
            content={content}
            arrow={false}
            placement='bottomLeft'
        >
            {!isTablet && <h3 className="tcontentHeader">Travellers & Class</h3>}
            <div className="tcontent" dangerouslySetInnerHTML={{ __html: getDisplayValue(adultCounter, childCounter, infantCounter, selectedClass) }} />
            <DownOutlined style={{ position: 'absolute', fontSize: '18px', color: '#003b95', top: isTablet ? '18%' : '38%', right: isTablet ? '5%' : '4%' }} />
        </Popover>
    )

};

export default TravelClassPopover;