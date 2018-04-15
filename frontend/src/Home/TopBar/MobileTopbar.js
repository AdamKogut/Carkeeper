import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import MobileHomeInteraction from './MobileHomeInteraction'
// import './HomeTopbar.css';

class MobileTopbar extends Component {
  render() {
    return (
      <div style={{position:'absolute',top:'0px',left:'0px', width:'100%'}}>
        <AppBar
          title='CarKeeper'
          showMenuIconButton={false}
          iconElementRight={<MobileHomeInteraction {...this.props}/>}
          
        />
      </div>
    );
  }
}

export default MobileTopbar;
