import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField, Toggle } from 'material-ui';
import { Row } from 'react-bootstrap'
import axios from 'axios'
//import './EditProfileModal.css';

class EditProfileModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailNotifications: false,
      firstname: '',
      lastname: '',
      phone: '',
      phoneNotifications: false,
    }
    // console.log(props)
  }

  componentWillReceiveProps = (nextProps) => {
    if(!nextProps.editModal)
      return;
    let that = this;
    axios.post('/GET-USER', {
      "uid": this.props.uid,
    }).then(function (response) {
      // console.log(response)
      let phone = response.data.phone
      if (phone == 'undefined')
        phone = ''
      that.setState({
        email: response.data.email,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        phone: phone,
        emailNotifications:response.data.notifEmail,
        phoneNotifications:response.data.notifPhone
      })
    }).catch(function (error) {
      console.log(error);
      alert('ERROR: Something happened, please try again')
    });
  }

  handleSubmit = () => {
    if (this.state.firstname == '')
      alert('Please enter your first name')
    else if (this.state.lastname == '')
      alert('Please enter your last name')
    else if (this.state.phone != '' && this.state.phone.length < 7)
      alert('Please enter a phone number with a correct format')
    else {
      let flag = true
      let phone = this.state.phone
      if (phone == '') {
        phone = 'undefined'
        this.setState({ phoneNotifications: false })
      }
      // console.log(this.state)
      axios.post('/UPDATE-USER', {
        "uid": this.props.uid,
        notifEmail: this.state.emailNotifications,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phone: phone,
        notifPhone: this.state.phoneNotifications,
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
        autoScrollBodyContent
        title="Edit Profile"
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeModal}
            style={{marginRight:'25px'}}
          />,
          <RaisedButton
            label='Save'
            onClick={this.handleSubmit}
          />
        ]}
        open={this.props.editModal}
      >
        <Row>
          <TextField
            value={this.state.email}
            fullWidth
            disabled
            floatingLabelText='Email'
          />
        </Row>
        <Row>
          <Toggle
            label='Recieve email notifications?'
            labelPosition='right'
            toggled={this.state.emailNotifications}
            onToggle={() => this.setState({ emailNotifications: !this.state.emailNotifications })}
          />
        </Row>
        <Row>
          <TextField
            value={this.state.firstname}
            fullWidth
            floatingLabelText='First name'
            onChange={(event, value) => this.setState({ firstname: value })}
          />
        </Row>
        <Row>
          <TextField
            value={this.state.lastname}
            fullWidth
            floatingLabelText='Last name'
            onChange={(event, value) => this.setState({ lastname: value })}
          />
        </Row>
        <Row>
          <TextField
            value={this.state.phone}
            fullWidth
            floatingLabelText='Phone number (optional)'
            onChange={(event, value) => this.setState({ phone: value })}
          />
        </Row>
        <Row>
          <Toggle
            label='Recieve phone notifications?'
            labelPosition='right'
            toggled={this.state.phoneNotifications}
            onToggle={() => this.setState({ phoneNotifications: !this.state.phoneNotifications })}
          />
        </Row>
      </Dialog>
    );
  }
}

export default EditProfileModal;