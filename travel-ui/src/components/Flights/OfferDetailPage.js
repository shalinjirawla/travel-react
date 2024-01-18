import { Card, Collapse, Descriptions } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const OfferDetailPage = () => {

    const offersItems = [
        {
            key: '1',
            label: 'Coupon Code',
            children: 'DOMESTIC30',
        },
        {
            key: '2',
            label: 'Validity Till',
            children: dayjs(new Date()).format('DD/MM/YYYY'),
        },
        {
            key: '3',
            label: 'Applicable On',
            children: 'Domestic Flights',
        },
    ];

    const item1 = [
        {
            key: '1',
            label: 'Offer Details:',
            children: <p>
                1. Akasa Air offers Up-to 30% discount on base fare.<br />
2. Offer Valid on Entire domestic network of Akasa Air.<br />
3. The Offer is valid only on non-stop/through flights on various sectors across Akasa Air’s network.
            </p>,
        },
    ];

    const item2 = [
        {
            key: '2',
            label: 'Terms & Conditions:',
            children: <p>
                1. Products and services are subject to availability.<br/>
2. The customer cannot club any other offers along with this Offer on the same booking ID. The Offer cannot get transferred/ assigned to any other person or customer.<br/>
3. For any card related claims/issues, the customer shall approach their respective "Issuing Bank." Goibibo shall not entertain any such claims where the card wasn't accepted, or the card was showing invalid.
            </p>,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className='offerDetailPage'>
            <Descriptions style={{ margin: '0 6%' }} title="" layout="vertical" bordered items={offersItems} />
            {/* <Collapse onChange={onChange} items={items} /> */}
            <Card style={{ borderRadius: '7px', margin: '2% 6%' }} title="Terms and Conditions:" headStyle={{ backgroundColor: '#2276e3', color: '#fff', fontSize: '20px', borderRadius: '5px' }} >
                <Collapse bordered={false} size='large' expandIconPosition='end' accordion style={{ borderRadius: '7px', margin: '1% 0' }} defaultActiveKey="1" items={item1} />
                <Collapse bordered={false} size='large' expandIconPosition='end' defaultActiveKey="2" items={item2} />
                {/* <Collapse bordered={false} size='large' expandIconPosition='end' defaultActiveKey="3" items={item3} /> */}
            </Card>
        </div>
    )
}

export default OfferDetailPage;