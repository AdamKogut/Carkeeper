import React, { Component } from 'react';
import HomeTopbar from './TopBar/HomeTopbar'
import HomeBody from './HomeBody'
//import './HomeLayout.css';

class HomeLayout extends Component {
  render() {
    return (
      <div>
        <HomeTopbar {...this.props} />
        <HomeBody />
      </div>
    );
  }
}

export default HomeLayout;
