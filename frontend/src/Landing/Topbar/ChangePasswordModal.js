import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField } from 'material-ui';
import { Row } from 'react-bootstrap'
import axios from 'axios'
import Password from '../../Shared/Password';
//import './DeleteProfileModal.css';

class DeleteProfileModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      old: '',
      new: '',
    }
    // console.log(props)
  }

  handleSubmit = () => {
    if (this.state.old == '')
      alert('Please enter your old password')
    else if (this.state.new == '')
      alert('Please enter your new password')
    else if (this.state.old.length < 8 || this.state.new.length < 8)
      alert('Both passwords must be at least 8 characters')
    else {
      // console.log(this.state)
      let that = this
      axios.post('/RESET-PASSWORD', {
        "uid": this.props.uid,
        oldPassword: this.state.old,
        newPassword: this.state.new,
      }).then(function (response) {
        // console.log(response)
        if (response.data.status) {
          alert('Password successfully reset')
          that.props.closeModal()
        } else {
          alert('Incorrect Password')
        }
      }).catch(function (error) {
        console.log(error);
      });

    }
  }

  render() {
    return (
      <Dialog
        autoScrollBodyContent
        modal
        title="Change Password"
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeModal}
            style={{ marginBottom: '15px' }}

          />,
          <RaisedButton
            label='Reset Password'
            onClick={this.handleSubmit}
          />
        ]}
        open={this.props.passwordModal}
      >
        <Row>
          <Password dv='Old Password' changePass={(item) => this.setState({ old: item })} />
        </Row>
        <Row>
          <Password dv='New Password' changePass={(item) => this.setState({ new: item })} />
        </Row>
      </Dialog>
    );
  }
}

export default DeleteProfileModal;