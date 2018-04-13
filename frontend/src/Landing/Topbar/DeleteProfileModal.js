import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField } from 'material-ui';
import { Col } from 'react-bootstrap'
import axios from 'axios'
//import './DeleteProfileModal.css';

class DeleteProfileModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password:''
    }
    // console.log(props)
  }

  handleSubmit = () => {
    if (this.state.password == '')
      alert('Please enter your password')
    else {
      let flag = true
      // console.log(this.state)
      axios.post('/DELETE-ACCOUNT', {
        "uid": this.props.uid,
        password: this.state.password,
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error);
        flag = false
        alert('ERROR: Something happened, please try again')
      });
      if (flag)
        this.props.signOut()
        this.props.closeModal()
    }
  }

  render() {
    return (
      <Dialog
        modal
        title="Are you sure you want to delete your account? This cannot be undone"
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
        open={this.props.deleteModal}
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

export default DeleteProfileModal;