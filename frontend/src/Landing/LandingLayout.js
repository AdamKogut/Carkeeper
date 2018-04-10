import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import Sidebar from './Sidebar/SidebarLayout'
import Topbar from './Topbar/TopbarLayout'
import MainArea from './MainArea/MainAreaLayout'
//import './LandingLayout.css';

class LandingLayout extends Component {
  constructor(props){
    super(props)
    console.log('landing')
  }
  
  render() {
    return (
      <div>
        <Topbar />
        <Sidebar />
        <MainArea />
      </div>
    );
  }
}

export default LandingLayout;
