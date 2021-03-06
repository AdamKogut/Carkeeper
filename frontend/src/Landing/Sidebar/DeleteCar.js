import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import axios from 'axios'
//import './DeleteCar.css';

class DeleteCar extends Component {
  deleteCar = () => {
    // console.log(this.props.objectItem)
    axios.post('/REMOVE-CAR', {
      "uid": this.props.uid,
      carName: this.props.objectItem,
    }).then(function (response) {
    }).catch(function (error) {
    });
    alert(`${this.props.objectItem} has been successfully deleted`);
    this.props.shouldRefresh();
    this.props.changeRefresh();
    this.props.closeAll();
  }

  render() {
    return (
      <Dialog
        modal
        autoScrollBodyContent
        title={`Are you sure you want to delete ${this.props.objectItem}?`}
        open={this.props.deleteOpen}
        actions={[
          <RaisedButton
            label="No"
            onClick={this.props.closeAll}
            style={{ marginRight: '15px' }}
          />,
          <RaisedButton
            label="Yes"
            onClick={this.deleteCar}
          />
        ]}
      >
      </Dialog>
    );
  }
}

export default DeleteCar;
