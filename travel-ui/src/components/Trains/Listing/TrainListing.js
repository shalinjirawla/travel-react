import React, { useContext } from 'react';
import Header from './Header';
import FilterCard from './FilterCard';
import DetailsCard from './DetailsCard';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const TrainListing = () => {

    const location = useLocation();
    const { selectedTrainOption, searchDetails } = location?.state??{};
    const { isTablet } = useContext(AuthContext)??{};

    return (
        <div>
            <Header searchDetails={searchDetails} /><br />
            <div className={isTablet ? '' : 'listMainTDiv'}>
                <FilterCard />
                <DetailsCard />
            </div>
        </div>
    );
}

export default TrainListing;