import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import DeleteCar from '../Sidebar/DeleteCar';
//import './DeleteCarButton.css';

class DeleteCarButton extends Component {
  constructor(props) {
    super(props)
    this.state={
      deleteOpen:false,
    }
  }

  closeAll=()=>{
    this.setState({deleteOpen:false})
  }

  render() {
    let toSend={
      ...this.props,
      ...this.state,
      objectItem:this.props.currCar,
      closeAll:this.closeAll,
    }
    return (
      <div className='item-button-main'>
        <RaisedButton
          label='Delete Car'
          icon={<i className="material-icons">&#xE872;</i>}
          onClick={() => this.setState({ deleteOpen: true })}
        />
        <DeleteCar {...toSend} />
      </div>
    );
  }
}

export default DeleteCarButton;
