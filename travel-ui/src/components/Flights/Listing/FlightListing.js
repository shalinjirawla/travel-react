import React, { useContext, useEffect, useRef, useState } from 'react';
import FilghtCard from './FilghtCard';
import FilterCard from './FilterCard';
import FlightDetailsCard from './FlightDetailsCard';
import { oneWayTripData } from '../../../JSON/onewayTrip';
import { useLocation } from 'react-router-dom';
import RoundTripList from './RoundTripList';
import { roundTripData } from '../../../JSON/roundTrip';
import CustomLoader from '../../CustomLoader';
import { AuthContext } from '../../../context/AuthProvider';

const FlightListing = () => {

    const headerRef = useRef(null);
    const location = useLocation();
    const { isTablet, rsWidths: { is1100 } } = useContext(AuthContext)??{};
    const { selectedFlightOption, searchDetails, travellers } = location?.state??{};
    const [currSearchFlightList, setCurrSearchFlightList] = useState([]);
    const [loadingPercent, setLoadingPercent] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const [filterModalOpen, setFilterModalOpen] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const timer1 = setTimeout(() => {
                setLoadingPercent(70);
            }, 2000);
            const timer2 = setTimeout(() => {
                (selectedFlightOption === 'oneway') && setCurrSearchFlightList(oneWayTripData[1]);
                (selectedFlightOption === 'roundtrip') && setCurrSearchFlightList(roundTripData[1]);
                setLoadingPercent(100);
                setIsLoading(false);
            }, 3000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [isLoading]);

    const handleFilterValues = (type, values) => {
        console.log('type===', type, 'values===', values);
    };

    return (
        <div className='backColor'>
            <FilghtCard headerRef={headerRef} currSearchFlightList={currSearchFlightList} searchDetails={searchDetails} travellers={travellers} selectedFlightOption={selectedFlightOption} /><br />
            {isLoading &&
                <div className='listMainDiv1'>
                    <CustomLoader
                        progressPercent={loadingPercent}
                        headerRef={headerRef}
                        tipText="Hold on, We're fetching flights for you"
                    />
                </div>
            }
            {!isLoading &&
                <>
                    <div className={isTablet ? 'listMainDivTab' : (selectedFlightOption === 'roundtrip' && is1100 ? '' : 'listMainDiv')}>
                        <FilterCard selectedFlightOption={selectedFlightOption} handleFilterValues={handleFilterValues} filterModalOpen={filterModalOpen} setFilterModalOpen={setFilterModalOpen} />
                        {selectedFlightOption === 'oneway' && <FlightDetailsCard selectedFlightOption={selectedFlightOption} currSearchFlightList={currSearchFlightList} travellers={travellers} />}
                        {selectedFlightOption === 'roundtrip' && <RoundTripList selectedFlightOption={selectedFlightOption} currSearchFlightList={currSearchFlightList} travellers={travellers} setFilterModalOpen={setFilterModalOpen} />}
                    </div>
                </>
            }
        </div>
    );
}

export default FlightListing;