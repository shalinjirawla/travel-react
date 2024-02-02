import React from 'react';
import Header from './Header';
import FilterCard from './FilterCard';
import DetailsCard from './DetailsCard';
import { useLocation } from 'react-router-dom';

const TrainListing = () => {

    const location = useLocation();
    const { selectedTrainOption, searchDetails } = location?.state??{};



    return (
        <div>
            <Header searchDetails={searchDetails} /><br />
            <div className='listMainTDiv'>
                <FilterCard />
                <DetailsCard />
            </div>
        </div>
    );
}

export default TrainListing;