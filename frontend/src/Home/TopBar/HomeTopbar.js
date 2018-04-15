import React, { Component } from 'react';
import MobileTopbar from './MobileTopbar'
import DesktopTopbar from './DesktopTopbar'
//import './HomeTopbar.css';

class HomeTopbar extends Component {
  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 400) {
      return (<MobileTopbar {...this.props}/>);
    } else {
      return (<DesktopTopbar {...this.props}/>);
    }
  }
}

export default HomeTopbar;
