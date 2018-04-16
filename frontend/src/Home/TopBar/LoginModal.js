import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Dialog, RaisedButton, TextField } from 'material-ui';
import { grey800, black } from 'material-ui/styles/colors';
import Password from '../../Shared/Password'
import axios from 'axios'
import history from '../../history'
//import './LoginModal.css';

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
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

  login = () => {
    let that = this;
    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(this.state.email)) {
      alert('Please enter a valid email')
    } else if (this.state.pass === '' || this.state.pass.length < 8) {
      alert('Please enter a valid password')
    } else {
      // console.log(this.state)
      axios.post('/LOGIN', {
        username: this.state.email.toLowerCase(),
        password: this.state.pass,
      }).then(function (response) {
        if (response.data.status) {
          that.props.changeUid(response.data.uid)
          history.push('/landing')
        } else {
          alert('Incorrect username or password')
        }
      }).catch(function (error) {
        console.log(error);
        alert('Something went wrong, please try again');
      });
    }
  }

  render() {
    return (
      <Dialog
        title='Log in to CarKeeper'
        modal
        open={this.props.loginModal}
        autoScrollBodyContent
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeAll}
            style={{marginRight:'15px'}}
          />,
          <RaisedButton
            label='Log in'
            onClick={this.login}
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
        <Password changePass={(value) => this.setState({ pass: value })} />
      </Dialog>
    );
  }
}

export default LoginModal;
