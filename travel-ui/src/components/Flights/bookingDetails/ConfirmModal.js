import React from 'react';
import { Card, Divider } from 'antd';
import { Descriptions } from 'antd';
import AppButton from '../../AppButton';

const ConfirmModal = ({ onConfirm, travelerDetails, setConfirmModalOpen }) => {

    return (
        <>
            <h2 className='popup-header'>Review Traveller’s Details</h2>
            <Divider />
            <div className='pop-main'>
                <div>
                    {travelerDetails.map((e, index) => {
                        return (<>
                            <div className='pop-card'>
                                <h3>{e.key}</h3>
                                <Descriptions className='pop-description' key={index} title={e.fields.key} items={e.fields} />
                            </div>
                        </>
                        )
                    })}
                </div>
            </div>
            <div className='popup-button'>
                <AppButton
                    className='appButton pop-btn'
                    label='No I will Edit This'
                    onClick={() => {
                        setConfirmModalOpen(false);
                    }}
                />
                <AppButton
                    label='Thats Correct'
                    className='appPrimaryButton pop-btn'
                    onClick={() => {
                        setConfirmModalOpen(false);
                        onConfirm();
                    }}
                />
            </div>
        </>
    );
};

export default ConfirmModal;