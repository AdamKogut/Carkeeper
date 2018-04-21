import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, FlatButton, ToolbarSeparator } from 'material-ui';
import { Row } from 'react-bootstrap'
import SignupModal from './SignupModal'
import LoginModal from './LoginModal'
import '../../Landing/Topbar/Topbar.css';

class DesktopTopbar extends Component {
  constructor(props){
    super(props)
    this.state={
      loginModal:false,
      signupModal:false,
    }
  }

  closeAll=()=>{
    this.setState({loginModal:false, signupModal:false})
  }

  render() {
    return (
      <Row>
        <Toolbar
          style={{ backgroundColor: 'var(--color3)', color: 'var(--color1)' }}
          className='desktop-bar'
        >
          <ToolbarGroup>
            <h1 className='desktop-topbar-title'>CarKeeper</h1>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <FlatButton
              label='Log in'
              labelStyle={{color:'var(--color1)'}}
              style={{marginRight:'-25px'}}
              onClick={()=>this.setState({loginModal:true})}
            />
            <ToolbarSeparator style={{marginRight:'-25px', backgroundColor:'var(--color1)'}} />
            <FlatButton
              label='Sign up'
              labelStyle={{color:'var(--color1)'}}
              onClick={()=>this.setState({signupModal:true})}
            />
          </ToolbarGroup>
        </Toolbar>
        <SignupModal {...this.props} {...this.state} closeAll={this.closeAll}/>
        <LoginModal {...this.props} {...this.state} closeAll={this.closeAll}/>
      </Row>
    );
  }
}

export default DesktopTopbar;
