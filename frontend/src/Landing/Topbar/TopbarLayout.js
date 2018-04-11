import React, { Component } from 'react';
import MobileTopbar from './MobileTopbar'
import DesktopTopbar from './DesktopTopbar'
//import './TopbarLayout.css';

class TopbarLayout extends Component {
  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 765) {
      return (<MobileTopbar />);
    } else {
      return (<DesktopTopbar />);
    }
  }
}

export default TopbarLayout;
