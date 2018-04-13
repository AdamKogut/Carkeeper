import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import { Row, Col } from 'react-bootstrap'
import AddCarDialog from './AddCarDialog'
//import './AddCarButton.css';

class AddCarButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carModal: false,
    }
  }

  closeModal = () => {
    this.setState({ carModal: false })
  }

  render() {
    let toSend={
      ...this.props,
      ...this.state,
      closeModal:this.closeModal,
    }
    return (
      <Row style={{ textAlign: 'center' }}>
        <RaisedButton
          label='Add Car'
          onClick={() => this.setState({ carModal: true })}
        />
        <AddCarDialog {...toSend} />
      </Row>
    );
  }
}

export default AddCarButton;
