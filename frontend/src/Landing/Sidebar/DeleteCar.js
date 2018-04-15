import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import axios from 'axios'
//import './DeleteCar.css';

class DeleteCar extends Component {
  deleteCar = () => {
    // console.log(this.props.objectItem)
    let flag = true;
    axios.post('/REMOVE-CAR', {
      "uid": this.props.uid,
      carName: this.props.objectItem,
    }).then(function (response) {
    }).catch(function (error) {
      console.log(error);
      flag = false;
      alert('Something went wrong, please try again');
    });
    if (flag) {
      alert(`${this.props.objectItem} has been successfully deleted`);
      this.props.shouldRefresh();
      this.props.changeRefresh();
      this.props.closeAll();
    }
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
