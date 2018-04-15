import React, { Component } from 'react';
import { Dialog, RaisedButton, TextField, Toggle } from 'material-ui';
import { grey800, black } from 'material-ui/styles/colors';
import Password from '../../Shared/Password'
import axios from 'axios'
import history from '../../history'
//import './SignupModal.css';

class SignupModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
      first: '',
      last: '',
      phone: '',
      notifPhone: false,
      notifEmail: false,
    }
    // console.log(props)
  }

  styles = {
    underlineStyle: {
      borderColor: black,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelShrinkStyle: {
      color: black,
    },
    hintStyle: {
      color: grey800,
      fontWeight: "bold",
      textAlign: 'left',
    },
  }

  signup = () => {
    let that = this;
    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(this.state.email)) {
      alert('Please enter a valid email')
    } else if (this.state.pass === '' || this.state.pass.length < 8) {
      alert('Please enter a valid password')
    } else if (this.state.first === '') {
      alert('Please enter a valid first name')
    } else if (this.state.last === '') {
      alert('Please enter a valid last name')
    } else {
      // console.log(this.state)
      let phone = this.state.phone
      let np = this.state.notifPhone
      if (phone === '') {
        phone = 'undefined'
        np = false
      }
      axios.post('/CREATE-USER', {
        email: this.state.email,
        password: this.state.pass,
        firstname: this.state.first,
        lastname: this.state.last,
        phone: phone,
        notifPhone: np,
        notifEmail: this.state.notifEmail,
      }).then(function (response) {
        // console.log(response.data)
        that.props.changeUid(response.data)
        history.push('/landing')
      }).catch(function (error) {
        console.log(error);
        alert('Something went wrong, please try again');
      });
    }
  }

  render() {
    return (
      <Dialog
        title='Sign up for CarKeeper'
        modal
        open={this.props.signupModal}
        autoScrollBodyContent
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeAll}
            style={{marginRight:'15px'}}
          />,
          <RaisedButton
            label='Sign up'
            onClick={this.signup}
          />
        ]}
      >
        <TextField
          floatingLabelText='Email'
          fullWidth
          floatingLabelStyle={this.styles.floatingLabelStyle}
          floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
          underlineStyle={this.styles.underlineStyle}
          hintStyle={this.styles.hintStyle}
          onChange={(event, value) => this.setState({ email: value })}
        />
        <Toggle
          label='Recieve email notifications?'
          labelPosition='right'
          toggled={this.state.notifEmail}
          onToggle={() => this.setState({ notifEmail: !this.state.notifEmail })}
        />
        <Password changePass={(value) => this.setState({ pass: value })} />
        <TextField
          floatingLabelText='Firstname'
          fullWidth
          floatingLabelStyle={this.styles.floatingLabelStyle}
          floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
          underlineStyle={this.styles.underlineStyle}
          hintStyle={this.styles.hintStyle}
          onChange={(event, value) => this.setState({ first: value })}
        />
        <TextField
          floatingLabelText='Lastname'
          fullWidth
          floatingLabelStyle={this.styles.floatingLabelStyle}
          floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
          underlineStyle={this.styles.underlineStyle}
          hintStyle={this.styles.hintStyle}
          onChange={(event, value) => this.setState({ last: value })}
        />
        <TextField
          floatingLabelText='Phone'
          fullWidth
          floatingLabelStyle={this.styles.floatingLabelStyle}
          floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
          underlineStyle={this.styles.underlineStyle}
          hintStyle={this.styles.hintStyle}
          onChange={(event, value) => this.setState({ phone: value })}
        />
        <Toggle
          label='Recieve phone notifications?'
          labelPosition='right'
          toggled={this.state.notifPhone}
          onToggle={() => this.setState({ notifPhone: !this.state.notifPhone })}
        />
      </Dialog>
    );
  }
}

export default SignupModal;
