import React, { Component } from 'react';
import { Drawer } from 'material-ui';
import MobileSidebar from '../Sidebar/MobileSidebar';
//import './LandingDrawer.css';

class LandingDrawer extends Component {
  render() {
    return (
      <Drawer
        open={this.props.openDrawer}
        onRequestChange={this.props.close}
        disableSwipeToOpen
        docked={false}
      >
        <div className='drawer-title'>
          <h2 className='mobile-title'>CarKeeper</h2>
        </div>
        <MobileSidebar {...this.props} />
      </Drawer>
    );
  }
}

export default LandingDrawer;
