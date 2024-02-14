import React, { useContext, useState } from 'react';
import '../../../styles/train/FilterCard.css';
import { Card, Checkbox } from 'antd';
import { AuthContext } from '../../../context/AuthProvider';
import AppModal from '../../AppModal';
import { FilterOutlined } from '@ant-design/icons';

const FilterCard = () => {

    const FilterOption = ({ heading, options, handleReset, handleChange }) => {
        return (
            <div>
                <div className='filterTHead'>
                    <span className='filterTHeading'>{heading}</span>
                    <span className='filterClearAll' onClick={handleReset}>
                        CLEAR ALL
                    </span>
                </div>
                <div className='filterTOption'>
                    {options.map((o) => (
                        <div className='filterTItem' key={o.id}>
                            <Checkbox
                                className='checkBoxLabel'
                                onChange={() => handleChange(o.id)}
                                checked={o.isChecked}
                            >
                                {o.labelValue}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const filterData = {
        quickFilterCheckbox: [
            {
                labelValue: 'Show available only',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'Show AC only',
                id: 2,
                isChecked: false
            }
        ],
        quotaCheckbox: [
            {
                labelValue: 'General',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'Ladies',
                id: 2,
                isChecked: false
            }
        ],
        classCheckbox: [
            {
                labelValue: 'CC - AC Chair Car',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'EC - Executive Chair Car',
                id: 2,
                isChecked: false
            },
            {
                labelValue: 'EV - Express Vistadome',
                id: 3,
                isChecked: false
            },
            {
                labelValue: 'EA - Executive Anubhuti',
                id: 4,
                isChecked: false
            },
            {
                labelValue: '3A - AC 3 Tier Sleeper',
                id: 5,
                isChecked: false
            },
            {
                labelValue: 'SL - Sleeper Class',
                id: 6,
                isChecked: false
            },
            {
                labelValue: '2A - AC 2 Tier Sleeper',
                id: 7,
                isChecked: false
            },
            {
                labelValue: '1A - AC First Class',
                id: 8,
                isChecked: false
            },
            {
                labelValue: '3E - AC 3 Tier Economy',
                id: 9,
                isChecked: false
            },
            {
                labelValue: '2S - Second Sitting',
                id: 10,
                isChecked: false
            }
        ],
        departureStationCheckbox: [
            {
                labelValue: 'ADI - Ahmedabad',
                id: 1,
                isChecked: false
            }
        ],
        arrivalStationCheckbox: [
            {
                labelValue: 'MMCT - Mumbai Central',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'BDTS - Bandra Terminus',
                id: 2,
                isChecked: false
            },
            {
                labelValue: 'DDR - Dadar',
                id: 3,
                isChecked: false
            },
            {
                labelValue: 'BVI - Borivali',
                id: 4,
                isChecked: false
            },
            {
                labelValue: 'KYN - Kalyan',
                id: 5,
                isChecked: false
            },
            {
                labelValue: 'PNVL - Panvel',
                id: 6,
                isChecked: false
            },
            {
                labelValue: 'BIRD - Bhiwandi',
                id: 7,
                isChecked: false
            },
            {
                labelValue: 'BSR - Vasai',
                id: 8,
                isChecked: false
            }
        ],
        arrivalTimeCheckbox: [
            {
                labelValue: 'Morning 6 AM to 12 noon',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'Afternoon 12 noon to 6 PM',
                id: 2,
                isChecked: false
            },
            {
                labelValue: 'Evening 6 PM to 12 midnite',
                id: 3,
                isChecked: false
            },
            {
                labelValue: 'Night 12 midnite to 6 AM',
                id: 4,
                isChecked: false
            }
        ],
        departureTimeCheckbox: [
            {
                labelValue: 'Morning 6 AM to 12 noon',
                id: 1,
                isChecked: false
            },
            {
                labelValue: 'Afternoon 12 noon to 6 PM',
                id: 2,
                isChecked: false
            },
            {
                labelValue: 'Evening 6 PM to 12 midnite',
                id: 3,
                isChecked: false
            },
            {
                labelValue: 'Night 12 midnite to 6 AM',
                id: 4,
                isChecked: false
            }
        ],

    }
    const [filterOptions, setFilterOptions] = useState(filterData);

    const { isTablet } = useContext(AuthContext)??{};
	const [filterModalOpen, setFilterModalOpen] = useState(false);
   
    const handleChangeFilter = (filterName, id) => {
        const updatedOptions = filterOptions[filterName].map((o) =>
            o.id === id ? { ...o, isChecked: !o.isChecked } : o
        );
        setFilterOptions({ ...filterOptions, [filterName]: updatedOptions });
    };
    
    const handleResetFilter = (filterName) => {
        const updatedOptions = filterOptions[filterName].map((o) => ({ ...o, isChecked: false }));
        setFilterOptions({ ...filterOptions, [filterName]: updatedOptions });
    };

    const handleFilterModal = () => {
		setFilterModalOpen(!filterModalOpen);
	};

    const filterByData = <>
        <div className='filterFModal'>
            <div className='modal-Tbody'>
            {!isTablet && <h3 className='headingTStyle'>FILTER BY</h3>}
            <FilterOption
                heading='Quick filters'
                options={filterOptions.quickFilterCheckbox}
                handleReset={() => handleResetFilter('quickFilterCheckbox')}
                handleChange={(id) => handleChangeFilter('quickFilterCheckbox', id)}
            />
            <FilterOption
                heading='Quota'
                options={filterOptions.quotaCheckbox}
                handleReset={() => handleResetFilter('quotaCheckbox')}
                handleChange={(id) => handleChangeFilter('quotaCheckbox', id)}
            />
            <FilterOption
                heading='Class'
                options={filterOptions.classCheckbox}
                handleReset={() => handleResetFilter('classCheckbox')}
                handleChange={(id) => handleChangeFilter('classCheckbox', id)}
            />
            <FilterOption
                heading='Departure Station'
                options={filterOptions.departureStationCheckbox}
                handleReset={() => handleResetFilter('departureStationCheckbox')}
                handleChange={(id) => handleChangeFilter('departureStationCheckbox', id)}
            />
            <FilterOption
                heading='Arrival Station'
                options={filterOptions.arrivalStationCheckbox}
                handleReset={() => handleResetFilter('arrivalStationCheckbox')}
                handleChange={(id) => handleChangeFilter('arrivalStationCheckbox', id)}
            />
            <FilterOption
                heading='Arrival Time'
                options={filterOptions.arrivalTimeCheckbox}
                handleReset={() => handleResetFilter('arrivalTimeCheckbox')}
                handleChange={(id) => handleChangeFilter('arrivalTimeCheckbox', id)}
            />
            <FilterOption
                heading='Departure Time'
                options={filterOptions.departureTimeCheckbox}
                handleReset={() => handleResetFilter('departureTimeCheckbox')}
                handleChange={(id) => handleChangeFilter('departureTimeCheckbox', id)}
            />
            </div>
        </div>
    </>

    return (
        <div>
            {isTablet && 
                <div className='filterFTitle textAlignEnd'>
                    <div
                        onClick={() => {
                            setFilterModalOpen(true);
                        }}
                    >
                        <span className='moreFFilter cursorP'>More Filters <FilterOutlined /> </span>
                    </div>
                    <AppModal
                        title='Filter By'
                        className='modalFStyle'
                        open={filterModalOpen}
                        children={filterByData}
                        onOk={handleFilterModal}
                        onCancel={handleFilterModal}
                    />                 
                </div>
            }
            {!isTablet && 
                <Card className='filterTCard'>
                    {filterByData}    
                </Card>
            }
        </div>
    );
}

export default FilterCard;