import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { baggageData } from '../../../JSON/seat';

const Baggage = () => {
    const [plusClicked, setPlusClicked] = useState(baggageData);
    const [activeIndex, setActiveIndex] = useState(null);

    const handlePlus = (id, index) => {
        const isAnyMealSelected = plusClicked.some(item => item.counter > 0);

        if (!isAnyMealSelected) {
            const dataIndex = plusClicked.findIndex(item => item.id === id);

            if (dataIndex !== -1) {
                const newData = [...plusClicked];
                newData[dataIndex].counter = (newData[dataIndex].counter || 0) + 1;
                setPlusClicked(newData);
                setActiveIndex(index);
            }
        }
    };

    const handleMinus = (id, index) => {
        const dataIndex = plusClicked.findIndex(item => item.id === id);

        if (dataIndex !== -1 && plusClicked[dataIndex].counter > 0) {
            const newData = [...plusClicked];
            newData[dataIndex].counter = (newData[dataIndex].counter || 0) - 1;
            setPlusClicked(newData);
            setActiveIndex(null);
        }
    };

    const totalBaggagesSelected = plusClicked.reduce((total, meal) => total + (meal.counter || 0), 0);

    return (
        <>
            <div className='meal-header-1'>
                <div className='meal-flight'>
                    <p className='meal-header'>AMD - BOM</p>
                    <p className='p-21'>{totalBaggagesSelected} of 1 baggage selected</p>
                </div>
            </div>
            <div className="container-with-scroll">
                {baggageData.map((data, index) => (
                    <Card key={index} className='card-20'>
                        <div className='main-20'>
                            <Row align='middle' justify='space-between'>
                                <Col xl={{ span: 16 }} lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                                    <div className='food'>
                                        <img className='food-image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadnNXkZTHXEms2TGW3NGUkgVW7tJg7iO1Cg&usqp=CAU' />
                                        <div style={{ marginBottom: '2%' }}>
                                            <p className='p-25'>{data?.amount}</p>
                                            <p className='title'>{data?.title}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                                    <div className='price-1'>
                                        <div className='wrapper-1'>
                                            <MinusOutlined
                                                className="minusIcon"
                                                onClick={() => handleMinus(data?.id, index)}
                                                style={{
                                                    fontSize: '18px',
                                                    cursor: (data?.counter === 1 || activeIndex !== index) ? 'not-allowed' : 'pointer',
                                                    color: (data?.counter === 1 || activeIndex !== index) ? 'grey' : '#003b95',
                                                    position: 'relative',
                                                    width: '30%',
                                                    left: '5%',
                                                    top: '24%'
                                                }}
                                            />
                                            <div className='num'>{data?.counter || 0}</div>
                                            <PlusOutlined
                                                className="plusIcon"
                                                onClick={() => handlePlus(data?.id, index)}
                                                style={{
                                                    fontSize: '18px',
                                                    color: (activeIndex !== null) ? 'grey' : '#003b95',
                                                    position: 'relative',
                                                    width: '30%',
                                                    left: '5%',
                                                    top: '24%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default Baggage;