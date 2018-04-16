import React, { Component } from 'react';
import { CircularProgress } from 'material-ui'
//import './Loading.css';

class Loading extends Component {
  render() {
    if (this.props.loading) {
      return (
        <CircularProgress
          size={60}
          thickness={7}
        />
      );
    } else {
      return null;
    }
  }
}

export default Loading;
