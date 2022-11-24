import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import CPU from './components/pages/CPU';
import Memory from './components/pages/Memory';
import HDD from './components/pages/HDD';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cpu" element={<CPU />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/hdd" element={<HDD />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
