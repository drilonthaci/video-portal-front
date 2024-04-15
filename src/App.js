import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import RoutesContainer from './Layout/Routes/RoutesContainer';
import NavBar from './Layout/Navbar/NavBar';

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

