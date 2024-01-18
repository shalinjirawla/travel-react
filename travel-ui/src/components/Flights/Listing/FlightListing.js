import React, { useEffect, useState } from 'react';
import FilghtCard from './FilghtCard';
import FilterCard from './FilterCard';
import FlightDetailsCard from './FlightDetailsCard';
import { oneWayTripData } from '../../../JSON/onewayTrip';
import { useLocation } from 'react-router-dom';
import RoundTripList from './RoundTripList';
import { roundTripData } from '../../../JSON/roundTrip';
import CustomLoader from '../../CustomLoader';
import { Progress } from 'antd';

const FlightListing = () => {

    const location = useLocation();
    const { selectedFlightOption, searchDetails } = location?.state??{};
    const [currSearchFlightList, setCurrSearchFlightList] = useState([]);
    const [loadingPercent, setLoadingPercent] = useState(70);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const timer1 = setTimeout(() => {
                (selectedFlightOption === 'oneway') && setCurrSearchFlightList(oneWayTripData[1]);
                (selectedFlightOption === 'roundtrip') && setCurrSearchFlightList(roundTripData[1]);
                setLoadingPercent(100);
                setIsLoading(false);
            }, 3000);
    
            return () => {
                clearTimeout(timer1);
            };
        }
    }, [isLoading]);

    const handleFilterValues = (type, values) => {
        console.log('type===', type, 'values===', values);
    };

    return (
        <div className='backColor'>
            <FilghtCard currSearchFlightList={currSearchFlightList} searchDetails={searchDetails} selectedFlightOption={selectedFlightOption} /><br />
            {isLoading &&
                <div className='listMainDiv1'>
                    {/* <Progress
                        percent={70}
                        // size={[900, 15]}
                        showInfo={false}
                        strokeColor={'lightgreen'}
                        // strokeWidth={'100%'}
                        // type='line'
                        strokeLinecap='square'
                        style={{
                            position: "fixed",
                            top: '24%',
                            zIndex: '1122',
                            width: '100%',
                            height: '2rem'
                        }}
                    /> */}
                    <CustomLoader
                        progressPercent={loadingPercent}
                        tipText="Hold on, We're fetching flights for you"
                    />
                </div>
            }
            {!isLoading &&
                <div className='listMainDiv'>
                    <FilterCard selectedFlightOption={selectedFlightOption} handleFilterValues={handleFilterValues} />
                    {selectedFlightOption === 'oneway' && <FlightDetailsCard selectedFlightOption={selectedFlightOption} currSearchFlightList={currSearchFlightList} />}
                    {selectedFlightOption === 'roundtrip' && <RoundTripList selectedFlightOption={selectedFlightOption} currSearchFlightList={currSearchFlightList} />}
                </div>
            }
        </div>
    );
}

export default FlightListing;