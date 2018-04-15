import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import LandingDrawer from './LandingDrawer'
import SettingsDrawer from './SettingsDrawer'
//import './MobileTopbar.css';

class MobileTopbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      openSettings:false,
    };
  }

  render() {
    return (
      <div>
        <AppBar
          title='CarKeeper'
          onLeftIconButtonClick={() => this.setState({ openDrawer: true })}
          iconElementRight={<SettingsDrawer {...this.props} {...this.state} close={() => { this.setState({ openSettings: false }) }} />}
        />
        <LandingDrawer {...this.props} {...this.state} close={() => { this.setState({ openDrawer: false }) }} />
        {/* <SettingsDrawer {...this.props} {...this.state} close={() => { this.setState({ openSettings: false }) }} /> */}
      </div>
    );
  }
}

export default MobileTopbar;
