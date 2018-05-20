import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contentform from './components/Contentform';
import ListView from './components/ListView';
import DetailsView from './components/Detailsview';
import PropTypes from 'prop-types';
import './styles/App.css';
import './styles/styles.css';
import './styles/index.css';



class App extends Component {
 
  render() {
    return (
      
       <div className="App">
        
        
    
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SharingPoint</h1>
        </header>
        
        <Route exact path="/detailsview/:id" component={()=>(<div></div>)} />
       
               <ListView/>,
       


      
       
      
        
      
 
      </div>
    );
  }
 }
 
 export default App;