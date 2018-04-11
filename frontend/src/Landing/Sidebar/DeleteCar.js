import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { Dialog, RaisedButton } from 'material-ui';
import axios from 'axios'
//import './DeleteCar.css';

class DeleteCar extends Component {
  constructor(props){
    super(props)
  }

  deleteCar=()=>{
    // console.log(this.props.objectItem)
    let that = this
    axios.post('/REMOVE-CAR', {
      "uid": this.props.uid,
      carName:this.props.objectItem,
    }).then(function (response) {
    }).catch(function (error) {
      console.log(error);
    });
    alert(`${this.props.objectItem} has been successfully deleted`)
    this.props.closeAll()
  }

  render() {
    return (
      <Dialog
        modal
        title={`Are you sure you want to delete ${this.props.objectItem}?`}
        open={this.props.deleteOpen}
        actions={[
          <RaisedButton
            label="Yes"
            onClick={this.deleteCar}
          />,
          <RaisedButton
            label="No"
            onClick={this.props.closeAll}
          />
        ]}
      >
      </Dialog>
    );
  }
}

export default DeleteCar;
