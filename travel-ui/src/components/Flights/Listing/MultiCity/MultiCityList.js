import React, { useState } from 'react'
import Header from './Header';
import OwnFlightList from './OwnFlightList';
import MultiCityCombination from './MultiCityCombination';
import TicketCard from './TicketCard';

const MultiCityList = () => {

    const [selectedSegment, setSelectedSegment] = useState('combo');

    const onSegmentChange = (val) => { setSelectedSegment(val); };

    return (
        <div>
            <Header selectedSegment={selectedSegment} onSegmentChange={onSegmentChange} />
            {selectedSegment === 'own' && 
                <div className='multiCityListMainDiv'>
                    <OwnFlightList />
                    {/* <TicketCard /> */}
                </div>
            }
            {selectedSegment === 'combo' && 
                <div className='multiCityCombListMainDiv'>
                    <MultiCityCombination /> 
                </div>
            }
        </div>
    );
}

export default MultiCityList;