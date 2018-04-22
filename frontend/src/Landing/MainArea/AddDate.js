import React, { Component } from 'react';
import { Dialog, RaisedButton, DatePicker, TextField } from 'material-ui';
import { PlacesWithStandaloneSearchBox } from './Standalone'
import axios from 'axios'
//import './AddDate.css';

class AddDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceDate: '',
      price: '',
      place: '',
      location: {},
    }
  }

  handleSubmit = () => {
    if (this.state.serviceDate === '') {
      alert('Please choose a date')
    } else {
      let that = this
      if (this.state.price === '')
        this.setState({ price: 'null' })
      // console.log(this.props)
      // console.log(this.state)
      axios.post('/ADD-PRIOR-DATE', {
        "uid": this.props.uid,
        carName: this.props.currCar,
        serviceName: this.props.objectItem,
        priorDate: this.state.serviceDate,
        price: this.state.price,
        location:this.state.location,
      }).then(function (response) {
        if (response.data.status === true)
          alert('Success!');
        that.props.shouldRefresh()
      }).catch(function (error) {
        console.log(error);
      });
      this.props.closeAdd()
    }
  }

  changePlace = (address, lat, long) => {
    this.setState({ location: { address: address, latitude: lat, long: long } });
  }

  changeDate = (event, date) => {
    let stringDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    // console.log(stringDate)
    this.setState({ serviceDate: stringDate });
  }

  changeAddress=(ev,addr)=>{
    let loc=this.state.location;
    loc.address=addr;
    this.setState({location:loc},()=>console.log(this.state.location));
  }

  render() {
    return (
      <Dialog
        modal
        autoScrollBodyContent
        style={{ zIndex: '1000' }}
        title={`Add new service date to ${this.props.objectItem}`}
        open={this.props.addOpen}
        actions={[
          <RaisedButton
            label='Add Service Date'
            onClick={this.handleSubmit}
          />,
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeAdd}
          />
        ]}
      >
        <DatePicker
          hintText='Add date of service'
          onChange={this.changeDate}
        />
        <TextField
          floatingLabelText='Price (Optional)'
          onChange={(event, value) => this.setState({ price: value })}
          fullWidth
        />
        <div style={{ marginTop: '25px' }}>
          <PlacesWithStandaloneSearchBox changePlace={this.changePlace} changeAddress={this.changeAddress}/>
        </div>
      </Dialog>
    );
  }
}

export default AddDate;
