import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui';
import './Topbar.css';

class DesktopTopbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Toolbar 
        style={{backgroundColor:'#CA437E', color:'#F8FBF5'}}
        className='desktop-bar'
      >
        <ToolbarGroup>
          <h1 className='desktop-topbar-title'>CarKeeper</h1>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default DesktopTopbar;
