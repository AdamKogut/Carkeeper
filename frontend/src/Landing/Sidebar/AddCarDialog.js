import React, { Component } from 'react';
import { RaisedButton, Dialog, MenuItem, DropDownMenu, AutoComplete, TextField } from 'material-ui';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
//import './AddCarDialog.css';

class AddCarDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      make: '',
      model: '',
      year: '',
      trim: '',
      nickname: '',
    }
  }

  handleSubmit = () => {
    if (this.state.make == '')
      alert('Please add the make')
    else if (this.state.model == '')
      alert('Please add the model')
    else if (this.state.year == '')
      alert('Please add the model year')
    else if (this.state.trim == '')
      alert('Please add the trim')
    else if (this.state.nickname == '')
      alert('Please add nickname for the car')
    else {
      axios.post('/ADD-CAR', {
        "uid": this.props.uid,
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        level: this.state.level,
        nickname: this.state.nickname,
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <Dialog
        modal
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeModal}
          />,
          <RaisedButton
            label='Add Car'
            onClick={this.handleSubmit}
          />
        ]}
        open={this.props.carModal}
      >
        <Col xs={12} sm={6}>
          <TextField
            hintText='Enter Make'
            fullWidth
            onChange={(event, value) => this.setState({ make: value })}
          />
        </Col>
        <Col xs={12} sm={6}>
          <TextField
            hintText='Enter model year'
            fullWidth
            onChange={(event, value) => this.setState({ year: value })}
          />
        </Col>
        <Col xs={12} sm={6}>
          <TextField
            hintText='Enter Model'
            fullWidth
            onChange={(event, value) => this.setState({ model: value })}
          />
        </Col>
        <Col xs={12} sm={6}>
          <TextField
            hintText='Enter Trim'
            fullWidth
            onChange={(event, value) => this.setState({ trim: value })}
          />
        </Col>
        <Col xs={12}>
          <TextField
            hintText='Enter the nickname for the car'
            fullWidth
            onChange={(event, value) => this.setState({ nickname: value })}
          />
        </Col>
      </Dialog>
    );
  }
}

export default AddCarDialog;