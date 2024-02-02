import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { mealData } from '../../../JSON/seat';

const Meals = () => {
    const [mealItems, setMealItems] = useState(mealData);
    const [plusClicked, setPlusClicked] = useState(false);

    const handlePlus = (id) => {
        if (!plusClicked) {
            const dataIndex = mealItems.findIndex(item => item.id === id);

            if (dataIndex !== -1) {
                const newData = [...mealItems];
                newData[dataIndex].counter = (newData[dataIndex].counter || 0) + 1;
                setMealItems(newData);
                setPlusClicked(true);
            }
        }
    };

    const handleMinus = (id) => {
        const dataIndex = mealItems.findIndex(item => item.id === id);

        if (dataIndex !== -1 && mealItems[dataIndex].counter > 0) {
            const newData = [...mealItems];
            newData[dataIndex].counter = (newData[dataIndex].counter || 0) - 1;
            setMealItems(newData);
            setPlusClicked(false);
        }
    };

    const totalMealsSelected = mealItems.reduce((total, meal) => total + (meal.counter || 0), 0);

    return (
        <>
            <div className='meal-header-1'>
                <div className='meal-flight'>
                    <p className='meal-header'>AMD - BOM</p>
                    <p className='p-21'>{totalMealsSelected} of 1 meals selected</p>
                </div>
            </div>
            <div className="container-with-scroll">
                {mealItems.map((data, index) => (
                    <Card key={index} className='card-meal'>
                        <div className='main-meal'>
                            <Row align='middle' justify='space-between'>
                                <Col xl={{ span: 16 }} lg={{ span: 16 }} md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                                    <div className='food'>
                                        <img className='food-image' src={data?.iconUrl} alt={`Meal Icon ${index}`} />
                                        <div style={{ marginBottom: '2%' }}>
                                            <p className='meal-amount'>{data?.finalAmount}</p>
                                            <p className='title'>{data?.title}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 7 }} sm={{ span: 7 }} xs={{ span: 7 }}>
                                    <div className='price-1'>
                                        <div className='wrapper-1'>
                                            <MinusOutlined
                                                className="minusIcon"
                                                onClick={() => handleMinus(data?.id)}
                                                style={{ fontSize: '18px', cursor: (data?.counter === 1 || !mealItems) ? 'not-allowed' : 'pointer', color: (data?.counter === 1 || !mealItems) ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
                                            />
                                            <div className={`num ${data?.counter > 0 ? 'selected' : ''}`}>{data?.counter || 0}</div>
                                            <PlusOutlined
                                                className={`plusIcon ${plusClicked ? 'blurred' : ''}`}
                                                onClick={() => handlePlus(data?.id)}
                                                style={{ fontSize: '18px', color: plusClicked ? 'grey' : '#003b95', position: 'relative', width: '30%', left: '5%', top: '24%' }}
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
};

export default Meals;