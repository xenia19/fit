import React, {useEffect, useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './pages/main'
import List from './pages/list'
import Profile from './pages/profile'


// foodNutrients[8].amount

function App() {
  return (
    <div className='App'>
        <Router>
          <Switch>
            <Route exact path="/" component={List}/>
            <Route exact path="/profile" component={Profile}/>
        </Switch>
        </Router>
    </div>
  
  )
}

export default App;
