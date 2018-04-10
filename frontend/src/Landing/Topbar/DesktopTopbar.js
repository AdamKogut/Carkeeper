import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Toolbar, ToolbarGroup } from 'material-ui';
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props)
    console.log('hi')
  }

  render() {
    return (
      <Toolbar 
        style={{backgroundColor:'#946AB4', color:'#F6F5F5'}}
      >
        <ToolbarGroup>
          <h1>CarKeeper</h1>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default LandingScreen;
