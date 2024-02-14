import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const FareSummary = ({ travellers }) => {
    const location = useLocation();
    const { flightData, travellerData } = location?.state ?? {};
    const [show, setShow] = useState(true);
    const [fareSummary, setFareSummary] = useState({
        baseFareAdult: 0,
        baseFareChildren: 0,
        baseFareInfant: 0,
        taxesAndSurcharges: 1068,
        addOnZeroCancellation: 1044,
        grandTotal: 0,
    });

    useEffect(() => {
        const baseFareAdult = flightData?.fareDetails?.price?.amount || 0;
        const baseFareChildren = 0;
        const baseFareInfant = 0;
        const totalBaseFare = baseFareAdult + baseFareChildren + baseFareInfant;
        const grandTotal = totalBaseFare + fareSummary.taxesAndSurcharges;

        setFareSummary({
            baseFareAdult,
            baseFareChildren,
            baseFareInfant,
            taxesAndSurcharges: fareSummary.taxesAndSurcharges,
            addOnZeroCancellation: fareSummary.addOnZeroCancellation,
            grandTotal,
        });
    }, [flightData?.fareDetails?.price?.amount, fareSummary.taxesAndSurcharges]);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <Card className='card-fare all'>
            <div className=''>
                <div>
                    <h2 className='h2-header-fare'>FARE SUMMARY</h2>
                    <p className='fare all'>
                        {fareSummary.baseFareAdult > 0 && <p className='all'>1 Adult</p>}
                        {fareSummary.baseFareChildren > 0 && <p>{fareSummary.baseFareChildren} Children</p>}
                        {fareSummary.baseFareInfant > 0 && <p>{fareSummary.baseFareInfant} Infant</p>}
                    </p>
                </div>
                <hr />
                {show ? (
                    <>
                        <div className='minus-logo'>
                            <MinusCircleOutlined onClick={handleToggle} />
                        </div>
                        <div className='base-fair d-flex-between'>
                            <p className='txt all'>Base fare</p>
                            <p className='num121 all'>₹{fareSummary.baseFareAdult}</p>
                        </div>
                        <div className='middle-fair d-flex-between'>
                            <div>
                                <p className='fare-adult all'>{fareSummary.baseFareAdult > 0 && <p>Adult (1 x ₹{flightData?.fareDetails?.price?.amount})</p>}</p>
                                {fareSummary.baseFareChildren > 0 && flightData?.fareDetails?.price?.amountPerChild > 0 && <p>Children (1 x ₹{flightData?.fareDetails?.price?.amountPerChild})</p>}
                                {fareSummary.baseFareInfant > 0 && flightData?.fareDetails?.price?.amountPerInfant > 0 && <p>Infant (1 x ₹{flightData?.fareDetails?.price?.amountPerInfant})</p>}
                            </div>
                            <div>
                                <p className='num1'>₹{fareSummary.baseFareAdult}</p>
                                {fareSummary.baseFareChildren > 0 && flightData?.fareDetails?.price?.amountPerChild > 0 && <p className='num1'>₹{fareSummary.baseFareChildren}</p>}
                                {fareSummary.baseFareInfant > 0 && flightData?.fareDetails?.price?.amountPerInfant > 0 && <p className='num1'>₹{fareSummary.baseFareInfant}</p>}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='plus-logo'>
                            <PlusCircleOutlined onClick={handleToggle} />
                        </div>
                        <div className='base-fair d-flex-between'>
                            <p className='txt all'>Base fare</p>
                            <p className='num121 all'>₹{fareSummary.baseFareAdult}</p>
                        </div>
                    </>
                )}
                <hr />
                <div className='logo '>
                    <p className='txt all'>Taxes and Surcharges</p>
                    <p className='num12 all'>₹{fareSummary.taxesAndSurcharges}</p>
                </div>
                <hr />
                <div className='logo '>
                    <p className='txt all'>AddOns(1)</p>
                    <p className='num12 all'>₹{fareSummary.taxesAndSurcharges}</p>
                </div>
                <hr />
                <div className='logo'>
                    <p className='total'>Grand Total</p>
                    <p className='total1'>₹{fareSummary.grandTotal}</p>
                </div>
            </div>
        </Card>
    );
};

export default FareSummary;