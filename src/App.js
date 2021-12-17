import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidbar from './components/Sidbar';
import {
  BrowserRouter as Router,Switch, Route,Link} from "react-router-dom";
import Login from './components/Login';
import { useStateValue } from './StateProvider';


function App() {
const [{ user }, dispatch] =useStateValue();
   return (   // BEM name convetion
    <div className="app">


     {user ? (
         <div className="app__body"><Router>
          <Sidbar />
        <Switch>

        
          <Route path="/room/:roomId">
            <Chat />
          </Route>

          <Route path="/">
           <Chat />
          </Route>

         

        </Switch>
      </Router>
    </div>) :
      (
        <Login />
      )}
      
      </div>
  );
}

export default App;

