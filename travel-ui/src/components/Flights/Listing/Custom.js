import { Col, Row, Slider } from 'antd';
import React, { useState } from 'react'

const Custom = () => {

  const dynamicDates = ['2023-01-01', '2023-01-02', '2023-01-03']; // Replace with your actual date array
  const [selectedDate, setSelectedDate] = useState(null);

  // Replace with your actual logic to get price values for each date
  const getPriceValue = (date) => {
    // Replace with your logic to get the corresponding price value for the given date
    // For example, you might have a data structure like this:
    const priceValues = {
      '2023-01-01': 100,
      '2023-01-02': 150,
      '2023-01-03': 120,
      // ... Add more date-price pairs as needed
    };
    return priceValues[date];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

    return (
      <Row align='middle' justify='space-between'>
      {dynamicDates.map((date, index) => (
        <Col
          key={index}
          xl={{ span: 1.5 }}
          lg={{ span: 1.5 }}
          md={{ span: 1.5 }}
          sm={{ span: 1.5 }}
          xs={{ span: 1.5 }}
          style={{
            color: selectedDate === date ? 'rgb(45, 103, 178)' : '',
            backgroundColor: selectedDate === date ? 'rgb(235 235 235)' : 'transparent',
            cursor: 'pointer',
            padding: '6px 6px 6px 6px',
            fontSize: selectedDate === date ? '15px' : '',
            fontWeight: selectedDate === date ? '500' : ''
          }}
          onClick={() => handleDateClick(date)}
        >
          <label style={{ paddingLeft: '7%' }}>{date}</label><br />
          {/* Display the corresponding price value for the selected date */}
          <label>{getPriceValue(date)}</label>
        </Col>
      ))}
    </Row>
    );
}

export default Custom;