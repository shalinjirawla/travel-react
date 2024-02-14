import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthProvider';
import { Result } from 'antd';
import AppButton from './components/AppButton';
import Flights from './pages/Flights';
import FlightListing from './components/Flights/Listing/FlightListing';
import Main from './components/Flights/bookingDetails/Main';
import OfferDetailPage from './components/Flights/OfferDetailPage';
import AppFooter from './pages/Footer';
import Trains from './pages/Trains';
import TrainListing from './components/Trains/Listing/TrainListing';
import Bill from './components/Trains/bookingDetails/Bill';
import MultiCityList from './components/Flights/Listing/MultiCity/MultiCityList';
import BookingHistory from './components/Flights/bookingHistory/BookingHistory';

const MainRoutes = () => {
  const { user, currentRole, setIsMobile, setIsTablet, setIsDesktop, rsWidths, setRsWidths } = useContext(AuthContext) ?? {};
  const navigate = useNavigate();

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 481);
    setIsTablet(window.innerWidth <= 768);
    setIsDesktop(window.innerWidth >= 769);
    setRsWidths({
      ...rsWidths,
      is1300: window.innerWidth <= 1300,
      is1200: window.innerWidth <= 1200,
      is1100: window.innerWidth <= 1100,
      is930: window.innerWidth <= 930,
      is620: window.innerWidth <= 620,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (
    <>
      <div className='mainRouteDiv'>
        <Routes>
          {/* <Route path='/' element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} /> */}
          <Route
            path="*"
            element={<Navigate to="/flights" replace={true} />}
          />
          <Route path='/flights' element={<Flights />} />
          <Route path='/flights-booking-history' element={<BookingHistory />} />
          <Route path='/home' element={<Dashboard />} />
          {/* <Route path='*' element={<Flights />} /> */}
          <Route path='/flight-listing' element={<FlightListing />} />
          <Route path='/flight-listing-multicity' element={<MultiCityList />} />
          <Route path='/flight-booking-details' element={<Main />} />
          <Route path='/offer-detail/:id' element={<OfferDetailPage />} />
          {/* <Route path='/login' element={user ? <Dashboard /> : <Login />} /> */}

          <Route path='/trains' element={<Trains />} />
          <Route path='/train-listing' element={<TrainListing />} />
          <Route path='/train-booking-details' element={<Bill />} />

          <Route path='/unauthorized' element={
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<AppButton type="dashed" onClick={() => navigate('/')} label='Back Home' />}
            />
          } />
        </Routes>
      </div>
      <div>
        <AppFooter />
      </div>
    </>
  )
}

export default MainRoutes;