import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import AddService from './AddService';
//import './AddServiceButton.css';

class AddServiceButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addOpen: false,
    }
  }

  closeAll = () => {
    this.setState({ addOpen: false })
  }

  render() {
    let toSend = {
      ...this.props,
      ...this.state,
      closeAll: this.closeAll,
    }
    return (
      <div className='item-button-main'>
        <RaisedButton
          label='Add Service'
          icon={<i className="material-icons">&#xE145;</i>}
          onClick={() => this.setState({ addOpen: true })}
        />
        <AddService {...toSend} />
      </div >
    );
  }
}

export default AddServiceButton;
