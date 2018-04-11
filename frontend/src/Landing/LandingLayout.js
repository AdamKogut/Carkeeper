import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import Sidebar from './Sidebar/SidebarLayout'
import Topbar from './Topbar/TopbarLayout'
import MainArea from './MainArea/MainAreaLayout'
//import './LandingLayout.css';

class LandingLayout extends Component {
  constructor(props) {
    super(props)
    this.state={
      currCar:'',
      carInfo:{},
    }
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
          <MainArea {...toSend}/>
        </Row>
      </div>
    );
  }
}

export default LandingLayout;
