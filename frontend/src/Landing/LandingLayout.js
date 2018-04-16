import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import Sidebar from './Sidebar/SidebarLayout'
import Topbar from './Topbar/TopbarLayout'
import MainArea from './MainArea/MainAreaLayout'
import history from '../history'
//import './LandingLayout.css';

class LandingLayout extends Component {
  constructor(props) {
    super(props)
    if (props.uid === '') {
      history.push('/')
    }
    this.state={
      currCar:'',
      carInfo:{},
      shouldRefresh:false,
    }
  }

  changeRefresh=()=>{
    this.setState({shouldRefresh:!this.state.shouldRefresh})
  }

  changeChat=(name, info)=>{
    this.setState({currCar:name, carInfo:info})
  }

  render() {
    let toSend={
      ...this.props,
      ...this.state,
      changeChat:this.changeChat,
    }
    return (
      <div>
        <Row>
          <Topbar {...toSend}/>
        </Row>
        <Row>
          <Sidebar {...toSend}/>
          <MainArea {...toSend} changeRefresh={this.changeRefresh}/>
        </Row>
      </div>
    );
  }
}

export default LandingLayout;
