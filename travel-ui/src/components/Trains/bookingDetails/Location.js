import React from 'react';
import { Card } from 'antd';
import './train.css';

const Location = () => {
    return (
        <>
            <Card className='card15'>
                <div className='main-1'>
                    <div className='main-2'>
                        <div className='main-3'>
                            <div className='left'>
                                <div className='left-1'>
                                    <p className='train-boarding all'>Boarding from</p>
                                </div>
                                <div className='d-flex-between'>
                                    <div>
                                        <p className='dark all'>4:40 PM</p>
                                        <p className='light all'>19 Jan</p>
                                    </div>
                                    {/* <div className='vertical-line all'></div> */}
                                    <div className='left-r'>
                                        <p className='dark all'>ADI</p>
                                        <p className='light all'>Ahmedabad</p>
                                    </div>
                                </div>
                            </div>
                            <div className='logo11 all'>
                                <img src="https://gos3.ibcdn.com/JrnyTime-1676032787.svg" alt="logo" />
                                <p className='time-train all'>1h 10m</p>
                            </div>
                            <div className='right'>
                                <div className='left-1'>
                                    <p className='train-boarding all'>Destination to</p>
                                </div>
                                <div className='d-flex-between'>
                                    <div>
                                        <p className='dark all'>5:58 PM</p>
                                        <p className='light all'>19 Jan</p>
                                    </div>
                                    <div className='vertical-line'></div>
                                    <div className='left-r'>
                                        <p className='dark all'>MSH</p>
                                        <p className='light all'>Mahesana</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Location;