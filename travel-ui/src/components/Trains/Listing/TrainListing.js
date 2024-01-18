import React from 'react';
import Header from './Header';
import FilterCard from './FilterCard';
import DetailsCard from './DetailsCard';

const TrainListing = () => {
    return (
        <div>
            <Header /><br />
            <div className='listMainTDiv'>
                <FilterCard />
                <DetailsCard />
            </div>
        </div>
    );
}

export default TrainListing;