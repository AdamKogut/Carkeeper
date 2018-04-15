import React, { Component } from 'react';
import MobileSidebar from './MobileSidebar'
import DesktopSidebar from './DesktopSidebar'
//import './SidebarLayout.css';

class SidebarLayout extends Component {
  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 765) {
      return (null);
    } else {
      return (<DesktopSidebar {...this.props}/>);
    }
  }
}

export default SidebarLayout;
