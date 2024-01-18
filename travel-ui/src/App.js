import React from 'react';
import './App.css';
import Layouts from './Layout';
import AuthProvider from './context/AuthProvider';
// import '@coreui/coreui/dist/css/coreui.min.css'
import 'react-multi-carousel/lib/styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Layouts />
    </AuthProvider>
  );
}

export default App;
