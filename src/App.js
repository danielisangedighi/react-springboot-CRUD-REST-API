import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeListComponent from './components/EmployeeListComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://react.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<EmployeeListComponent />} />
              <Route path="/employees" element={<EmployeeListComponent />} />
              <Route path="/add-employee" element={<CreateEmployeeComponent />} />
              <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
