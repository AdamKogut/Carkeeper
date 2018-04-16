import React, { Component } from 'react';
import HomeTopbar from './TopBar/HomeTopbar'
import HomeBody from './HomeBody'
import ForgotPasswordTargetPage from './TopBar/ForgotPasswordTargetPage';
//import './HomeLayout.css';

class HomeLayout extends Component {
  render() {
    return (
      <div>
        <ForgotPasswordTargetPage {...this.props} />
        <HomeTopbar {...this.props} />
        <HomeBody />
      </div>
    );
  }
}

export default HomeLayout;
