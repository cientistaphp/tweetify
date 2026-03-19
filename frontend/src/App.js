//import logo from './logo.svg';
//import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import TimeLine from  "./pages/Timeline"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}  />
      <Route path="/timeline" element={<TimeLine />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
