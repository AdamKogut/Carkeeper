import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField } from 'material-ui';
import { Col } from 'react-bootstrap'
import axios from 'axios'
//import './AddCarDialog.css';

class AddCarDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password:''
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
      let flag = true
      // console.log(this.state)
      axios.post('/ADD-CAR', {
        "uid": this.props.uid,
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        level: this.state.trim,
        carName: this.state.nickname,
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error);
        flag = false
        alert('ERROR: Something happened, please try again')
      });
      if (flag)
        this.props.closeModal()
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
            label='Delete Account'
            onClick={this.handleSubmit}
          />
        ]}
        open={this.props.carModal}
      >
        <Col xs={12} sm={6}>
          <TextField
            hintText='Enter Password'
            fullWidth
            onChange={(event, value) => this.setState({ make: value })}
          />
        </Col>
      </Dialog>
    );
  }
}

export default AddCarDialog;