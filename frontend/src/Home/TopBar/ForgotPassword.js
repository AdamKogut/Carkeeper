import React, { Component } from 'react';
import { FlatButton, Dialog, TextField, RaisedButton } from 'material-ui';
import { grey800, black } from 'material-ui/styles/colors';
import Loading from '../../Shared/Loading';
import axios from 'axios';
//import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: '',
      loading:false,
    };
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

  handleSubmit=()=>{
    if(!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(this.state.email))
      alert('Please enter a valid email');
    else {
      this.setState({loading:true});
      let that=this;
      axios.post('/FORGOT-PASSWORD', {
        email: this.state.email.toLowerCase(),
      }).then(function (response) {
        that.state({loading:false})
        if (response.data.status) {
          alert('Success!')
          that.setState({open:false, email:''})
        } else {
          alert('There is no account with this email');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  openModal = () => {
    this.setState({ open: true });
  }

  render() {
    return (
      <div>
        <FlatButton
          label='Forgot Password'
          onClick={this.openModal}
        />
        <Loading loading={this.state.loading}/>
        <Dialog
          title='Forgot Password'
          open={this.state.open}
          modal
          actions={[
            <RaisedButton
              label='Cancel'
              onClick={() => this.setState({ open: false })}
            />,
            <RaisedButton
              label='Submit'
              onClick={this.handleSubmit}
            />
          ]}
        >
          <TextField
            floatingLabelText='Enter Email'
            fullWidth
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            hintStyle={this.styles.hintStyle}
            onChange={(event, value) => this.setState({ email: value })}
          />
        </Dialog>
      </div>
    );
  }
}

export default ForgotPassword;
