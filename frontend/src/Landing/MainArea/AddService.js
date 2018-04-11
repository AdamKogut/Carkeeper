import React, { Component } from 'react';
import { Dialog, RaisedButton, AutoComplete, DatePicker, DropDownMenu, MenuItem } from 'material-ui';
import axios from 'axios'
//import './AddService.css';

class AddService extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      serviceDate: 'undefined',
      serviceName: '',
      interval:'undefined'
    }
  }

  changeDate = (event, date) => {
    let stringDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    // console.log(stringDate)
    this.setState({ serviceDate: stringDate })
  }

  updateText = (searchText) => {
    this.setState({ serviceName: searchText })
  }

  addService = () => {
    if (this.state.serviceName == '') {
      alert('Please fill out the service name')
    } else {
      // console.log(this.state)
      axios.post('/ADD-SERVICE', {
        "uid": this.props.uid,
        carName: this.props.currCar,
        priorDate: this.state.serviceDate,
        serviceName: this.state.serviceName,
        interval:this.state.interval,
      }).then(function (response) {
      }).catch(function (error) {
        console.log(error);
      });
      this.props.closeAll()
    }
  }

  addMonths=()=>{
    let tempMonth=[]
    tempMonth.push(<MenuItem value='undefined' key={0} primaryText='Choose an interval'/>)
    for(let i=1;i<=12;i++){
      tempMonth.push(<MenuItem value={i} key={i} primaryText={(i==1)?`1 month`:`${i} months`}/>)
    }
    return tempMonth
  }

  handleInterval=(event,index,value)=>{
    this.setState({interval:value})
  }

  render() {
    return (
      <Dialog
        modal
        title={`Add service to ${this.props.currCar}`}
        open={this.props.addOpen}
        actions={[
          <RaisedButton
            label='Add Service'
            onClick={this.addService}
          />,
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeAll}
          />
        ]}
      >
        <AutoComplete
          hintText='Type your own service name or use one of the suggested'
          fullWidth
          searchText={this.state.serviceName}
          dataSource={this.state.dataSource}
          onUpdateInput={this.updateText}
        />
        <DatePicker
          hintText='Add date of service (optional)'
          mode='landscape'
          onChange={this.changeDate}
          maxDate={new Date()}
        />
        <h5>Optional custom service interval</h5>
        <h6>Will default to the general service schedule interval for the part or 3 months if not in the list</h6>
        <DropDownMenu
          maxHeight={300}
          value={this.state.interval}
          onChange={this.handleInterval}
        >
          {this.addMonths()}
        </DropDownMenu>
      </Dialog>
    );
  }
}

export default AddService;
