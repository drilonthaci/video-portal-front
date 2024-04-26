import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import RoutesContainer from './RoutesContainer';
import NavBar from './components/layout/navbar/NavBar';

function App() {
  return (
    <BrowserRouter>
    <div>
      <NavBar />
      <RoutesContainer />
    </div>
  </BrowserRouter>
  );
}

export default App;

