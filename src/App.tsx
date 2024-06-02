import React, { useRef, FC, useState } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import Page01Home from './Page01Home';
import Page02Access from './Page02Access';

import Page03Read from './Page03Read';

import PageSC01HelloWorld from "./PageSC01HelloWorld";
import PageSC02HelloWorld from "./PageSC02HelloWorld";

import PageSC03CouterDep from "./PageSC03CouterDep";
import PageSC04CounterInc from "./PageSC04CounterInc"
import PageSC05CounterDec from "./PageSC05CounterDec"
import PageSC06CounterFinish from "./PageSC06CounterFinish"

function App() {

  const [currentPage, setCurrentPage] = useState<string>('Page01Home');
  const [showHomeDropdown, setShowHomeDropdown] = useState<boolean>(false);
  const [showHWDropdown, setShowHWDropdown] = useState<boolean>(false);
  const [showSCDropdown, setShowSCDropdown] = useState<boolean>(false);
  const [showContDropdown, setShowContDropdown] = useState<boolean>(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setShowHomeDropdown(false);
    setShowHWDropdown(false);
    setShowSCDropdown(false);
    setShowContDropdown(false);
  };

  return (

        <div className="App">

            <nav className="navbar">
              <div className="dropdown">
                <button className="button" 
                    onClick={() => {setShowHWDropdown(false); setShowHomeDropdown(!showHomeDropdown); 
                                    setShowSCDropdown(false);}}>
                  Home
                </button>
                {showHomeDropdown && (
                  <div className="dropdown-content">

                    <button className="dropdown-button" onClick={() => handlePageChange('Page02Access')}>
                      Access
                    </button>

                    <button className="dropdown-button" onClick={() => handlePageChange('Page01Home')}>
                      Reception
                    </button>

                  </div>
                )}
              </div>

              <div className="dropdown">
                <button className="button" 
                    onClick={() => {setShowHWDropdown(false); setShowSCDropdown(!showSCDropdown); setShowHomeDropdown(false); 
                                   }}>
                  Smart Contracts
                </button>
                {showSCDropdown && (
                  <div className="dropdown-content">

                    <button className="dropdown-button" 
                          onClick={() => {setShowHWDropdown(!showHWDropdown); setShowContDropdown(false); }}>
                        Hello World
                    </button>
                    {showHWDropdown && (
                        <div className="button">
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('helloworld01')}>
                            Deploy
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('helloworld02')}>
                            Interact
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('helloworld03')}>
                            Details
                          </button>
                        </div>
                    )}

                    <button className="dropdown-button" 
                          onClick={() => {setShowContDropdown(!showContDropdown); setShowHWDropdown(false);}}>
                        Counter
                    </button>
                    {showContDropdown && (
                        <div className="button">
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto',  marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('Counter01')}>
                            Deploy
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('Counter02')}>
                            Increment
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('Counter03')}>
                            Decrement
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('Counter04')}>
                            Finish
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '50%'}} onClick={() => handlePageChange('Counter05')}>
                            Details
                          </button>
                          
                        </div>
                    )}

                  </div>
                )}  
              </div>
            </nav>

            {currentPage === 'Page01Home' && <Page01Home />}
            {currentPage === 'Page02Access' && <Page02Access passedData={''}/>}            

            {currentPage === 'helloworld01' && <PageSC01HelloWorld />}
            {currentPage === 'helloworld02' && <PageSC02HelloWorld />}
            {currentPage === 'helloworld03' && <Page03Read passedData={'HelloWorld'}/>}
            
            {currentPage === 'Counter01' && <PageSC03CouterDep />}
            {currentPage === 'Counter02' && <PageSC04CounterInc />}
            {currentPage === 'Counter03' && <PageSC05CounterDec />}
            {currentPage === 'Counter04' && <PageSC06CounterFinish />}
            {currentPage === 'Counter05' && <Page03Read passedData={'Counter'}/>}

        </div>
  );
}

export default App;
