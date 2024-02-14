import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import AppButton from '../../AppButton';
import AppModal from '../../AppModal';
import TravellerDetails from './TravellerDetails';

const Details = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [travellerData, setTravellerData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedPassengers, setSelectedPassengers] = useState(0);

  const handleProceedClick = () => {
    setEditIndex(null);
    setConfirmModalOpen(true);
  };

  const handleSaveTraveller = (data) => {
    if (editIndex !== null) {
      const updatedTravellerData = [...travellerData];
      updatedTravellerData[editIndex] = data;
      setTravellerData(updatedTravellerData);
    } else {
      setTravellerData([...travellerData, data]);
    }
    setConfirmModalOpen(false);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setConfirmModalOpen(true);
  };

  const handleDeleteTraveller = (indexToDelete) => {
    const updatedTravellerData = travellerData.filter((_, index) => index !== indexToDelete);
    setTravellerData(updatedTravellerData);
    setSelectedPassengers(selectedPassengers - 1);
    setConfirmModalOpen(false);
  };

  const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
      setSelectedPassengers(selectedPassengers + 1);
    } else {
      setSelectedPassengers(selectedPassengers > 0 ? selectedPassengers - 1 : 0);
    }
  };

  return (
    <>
      <Card className='card15'>
        <div className='detail'>
          {travellerData.length === 0 ? (
            <Row align='middle' justify='space-between'>
              <Col xl={{ span: 14 }} lg={{ span: 14 }} md={{ span: 14 }} sm={{ span: 14 }} xs={{ span: 14 }}>
                <div className='datails'>
                  <div className='details-1'>
                    <div className='id'>
                      <p className='details-header'>Passenger Details</p><br />
                    </div>
                    <div>
                      <p className='details-no-traveller'>No travellers added, please add & select to continue</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 8 }}>
                <AppButton className='Id-btn appPrimaryButton' label='Add new Traveller' onClick={handleProceedClick} />
              </Col>
            </Row>
          ) : (
            <div className='datails'>
              <div className='details-1'>
                <div className='id'>
                  <p className='details-header'>Passenger Details</p><br />
                </div>
                <div>
                  <p className='small-1'>{selectedPassengers} selected | Max 6 passengers can be selected.</p>
                </div>
                <ul style={{ padding: '0' }}>
                  {travellerData.map((traveller, index) => (
                    <div className='passanger-detail' key={index}>
                      <Row align='middle' justify='space-around '>
                        <Col xl={22} lg={22} md={22} sm={22} xs={22}>
                          <div className='passanger-details'>
                            <input className='train-pass-check' type="checkbox" onChange={(e) => handleCheckboxChange(e.target.checked)} />
                            <p className='datails-name all all-padding'>{`${traveller.fullName},  ${traveller.age},  ${traveller.gender}`}<br /><h6>{`${traveller.birthPreference}`}</h6> </p>
                          </div>
                        </Col>
                        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                          <a className='pass-edit' href="#" onClick={() => handleEditClick(index)}>edit</a>
                        </Col>
                      </Row>
                      <hr className='all' />
                    </div>
                  ))}
                </ul>
                <p className='add-traveller' onClick={handleProceedClick}>+ Add New Traveller</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      <AppModal
        open={confirmModalOpen}
        className='confirmModal'
        onCancel={() => setConfirmModalOpen(false)}
        children={
          <TravellerDetails
            onFormSubmit={handleSaveTraveller}
            editIndex={editIndex}
            travellerData={editIndex !== null ? travellerData[editIndex] : null}
            onDelete={handleDeleteTraveller}
            setConfirmModalOpen={setConfirmModalOpen}
          />
        }
      />
    </>
  );
};

export default Details;