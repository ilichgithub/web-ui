import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Componentes/Home';
import ModBranch from './Componentes/Modules/ModBranch';
import ModPRs from './Componentes/Modules/ModPRs';

class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <div>
          <Routes>
          <Route exact={true} path='/' element={<Home />} />
          <Route exact={true} path='/Branches' element={<ModBranch />} />
          <Route exact={true} path='/PullRequests' element={<ModPRs />} />
          </Routes>
        </div>
      </BrowserRouter>
    

    );
  }
}

export default App;
