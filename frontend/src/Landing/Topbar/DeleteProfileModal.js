import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField } from 'material-ui';
import { Row } from 'react-bootstrap'
import Password from '../../Password'
import axios from 'axios'
//import './DeleteProfileModal.css';

class DeleteProfileModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
    // console.log(props)
  }

  handleSubmit = () => {
    if (this.state.password == '')
      alert('Please enter your password')
    else if(this.state.password.length<8)
      alert('Password must be at least 8 characters long')
    else {
      let flag = true
      // console.log(this.state)
      axios.post('/DELETE-ACCOUNT', {
        "uid": this.props.uid,
        password: this.state.password,
      }).then(function (response) {
        // console.log(response)
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
        <Row>
          <Password dv='Enter Password' changePass={(item) => this.setState({ old: item })} />
        </Row>
      </Dialog>
    );
  }
}

export default DeleteProfileModal;