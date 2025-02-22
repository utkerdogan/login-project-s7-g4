import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/success';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/success" element={<Success />} />
    </Routes>
    </>
  );
}

export default App;