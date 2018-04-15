import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
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
          style={{ backgroundColor: '#50C2C4', color: '#F8FBF5' }}
          className='desktop-bar'
        >
          <ToolbarGroup>
            <h1 className='desktop-topbar-title'>CarKeeper</h1>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <FlatButton
              label='Log in'
              labelStyle={{color:'#F8FBF5'}}
              style={{marginRight:'-25px'}}
              onClick={()=>this.setState({loginModal:true})}
            />
            <ToolbarSeparator style={{marginRight:'-25px', backgroundColor:'#F8FBF5'}} />
            <FlatButton
              label='Sign up'
              labelStyle={{color:'#F8FBF5'}}
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
