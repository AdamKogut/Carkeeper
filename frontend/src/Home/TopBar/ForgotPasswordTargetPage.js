import React, { Component } from 'react';
import { Dialog, TextField, RaisedButton } from 'material-ui';
import Loading from '../../Shared/Loading';
import axios from 'axios';
import history from '../../history';
import Password from '../../Shared/Password';
//import './ForgotPassword.css';

class ForgotPasswordTargetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      pass: '',
      uid:'',
    };
  }

  componentDidMount = () => {
    if (history.location.pathname.indexOf('/home/forgot/') === 0) {
      let uid = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);
      if(isNaN(uid)){
        history.push('/');
      }
      let that = this;
      axios.post('/GET-EMAIL-ID', {
        uid: uid,
      }).then(function (response) {
        // console.log(response.data)
        that.setState({ email: response.data, uid:uid })
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  handleSubmit = () => {
    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(this.state.email)) {
      alert('Please enter a valid email');
    } else if (this.state.pass === '' || this.state.pass.length < 8) {
      alert('Please enter a valid password');
    } else {
      this.setState({ loading: true });
      let that = this;
      axios.post('/CHANGE-PASSWORD', {
        email: this.state.email.toLowerCase(),
        password:this.state.pass,
        uid:this.state.uid,
      }).then(function (response) {
        // console.log(response.data);
        that.setState({ loading: false });
        if (response.data.status) {
          alert('Success!')
          history.push('/')
        } else {
          alert('Error: something went wrong');
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
    if (history.location.pathname.indexOf('/home/forgot/') === 0) {
      return (
        <div>
          <Loading loading={this.state.loading} />
          <Dialog
            title='Forgot Password'
            open={true}
            modal
            actions={[
              <RaisedButton
                label='Cancel'
                onClick={() => history.push('/')}
              />,
              <RaisedButton
                label='Submit'
                onClick={this.handleSubmit}
              />
            ]}
          >
            <TextField
              floatingLabelText='Enter Email'
              value={this.state.email}
              fullWidth
              disabled
            />
            <Password dv='New Password' changePass={(value) => this.setState({ pass: value })} />
          </Dialog>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ForgotPasswordTargetPage;
