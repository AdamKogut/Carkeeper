import React, { Component } from 'react';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import SignupModal from './SignupModal'
import LoginModal from './LoginModal'
// import './Topbar.css';

class MobileHomeInteraction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginModal:false,
      signupModal:false,
    }
  }

  closeAll=()=>{
    this.setState({loginModal:false, signupModal:false})
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><i className="material-icons md-light md-36">&#xE8FE;</i></IconButton>}
          onChange={this.handleMenu}
          style={{ marginLeft: '20px' }}
        >
          <MenuItem primaryText='Log In' onClick={() => this.setState({ loginModal: true })} />
          <MenuItem primaryText='Sign Up' onClick={() => this.setState({ signupModal: true })} />
        </IconMenu>
        <SignupModal {...this.props} {...this.state} closeAll={this.closeAll}/>
        <LoginModal {...this.props} {...this.state} closeAll={this.closeAll}/>
      </div>
    );
  }
}

export default MobileHomeInteraction;
