import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField } from 'material-ui';
import { Row } from 'react-bootstrap'
import Password from '../../Shared/Password'
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
    else if (this.state.password.length < 8)
      alert('Password must be at least 8 characters long')
    else {
      // console.log(this.state)
      let that=this
      axios.post('/REMOVE-USER', {
        "uid": this.props.uid,
        password: this.state.password,
      }).then(function (response) {
        // console.log(response)
        if (response.data.status) {
          alert('Success')
          that.props.signOut()
          that.props.closeModal()
        } else {
          alert('Incorrect password')
        }
      }).catch(function (error) {
        console.log(error);
        alert('ERROR: Something happened, please try again')
      });

    }
  }

  render() {
    return (
      <Dialog
        modal
        autoScrollBodyContent
        title="Are you sure you want to delete your account? This cannot be undone"
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeModal}
            style={{marginBottom:'15px'}}
          />,
          <RaisedButton
            label='Delete Account'
            onClick={this.handleSubmit}
          />
        ]}
        open={this.props.deleteModal}
      >
        <Row>
          <Password dv='Enter Password' changePass={(item) => this.setState({ password: item })} />
        </Row>
      </Dialog>
    );
  }
}

export default DeleteProfileModal;