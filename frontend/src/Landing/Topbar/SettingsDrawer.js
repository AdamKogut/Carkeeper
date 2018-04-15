import React, { Component } from 'react';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import history from '../../history';
import ChangePasswordModal from './ChangePasswordModal'
import EditProfileModal from './EditProfileModal'
import DeleteProfileModal from './DeleteProfileModal'
import './Topbar.css';

class SettingsDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      deleteModal: false,
      passwordModal: false,
    }
  }

  signOut = () => {
    try {
      localStorage.removeItem('carkeeper-app')
    } catch (err) {
      //console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    history.go('/')
  }

  closeModal = () => {
    this.setState({
      editModal: false,
      deleteModal: false,
      passwordModal: false,
    })
  }
  render() {
    let toSend = {
      ...this.state,
      ...this.props,
      signOut: this.signOut,
      closeModal: this.closeModal,
    }
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><i className="material-icons md-light md-36">&#xE8B8;</i></IconButton>}
          onChange={this.handleMenu}
          style={{ marginLeft: '20px' }}
        >
          <MenuItem primaryText='Edit Profile' onClick={() => this.setState({ editModal: true })} />
          <MenuItem primaryText='Change Password' onClick={() => this.setState({ passwordModal: true })} />
          <MenuItem primaryText='Delete Account' onClick={() => this.setState({ deleteModal: true })} />
          <MenuItem onClick={this.signOut} primaryText='Sign Out' />
        </IconMenu>
        <ChangePasswordModal {...toSend} />
        <EditProfileModal {...toSend} />
        <DeleteProfileModal {...toSend} />
      </div>
    );
  }
}

export default SettingsDrawer;
