import React, { Component } from 'react';
import { Dialog, RaisedButton, AutoComplete, DropDownMenu, MenuItem } from 'material-ui';
import axios from 'axios'
//import './AddService.css';

class AddService extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      checkItems: [],
      serviceName: '',
      interval: 'undefined'
    }
  }

  componentDidMount = () => {
    let that = this
    axios.post('/GET-ALL-SERVICES', {
    }).then(function (response) {
      // console.log(response.data)
      let tds = [];
      let tci = [];
      for (let i in response.data) {
        tds.push({ text: response.data[i], value: response.data[i] });
        tci.push(response.data[i]);
      }
      that.setState({ dataSource: tds, checkItems: tci });
    }).catch(function (error) {
      console.log(error);
    });
  }

  updateText = (searchText) => {
    this.setState({ serviceName: searchText });
  }

  nameRequest = (chosen, index) => {
    if (index === -1) {
      this.setState({ serviceName: chosen });
    } else {
      this.setState({ serviceName: chosen.value });
    }
  }

  addService = () => {
    let that=this;
    let timeout=window.setTimeout(that.forceUpdate,1000);
    // console.log(this.state)
    if (this.state.serviceName === '') {
      alert('Please fill out the service name');
    } else {
      let sn = "";
      let that = this
      if (this.checkIfIncludes(this.state.checkItems, this.state.serviceName) !== -1) {
        sn = this.checkIfIncludes(this.state.checkItems, this.state.serviceName);
        // console.log(sn)
        axios.post('/ADD-SERVICE', {
          "uid": this.props.uid,
          carName: this.props.currCar,
          serviceName: sn,
          incrementInt: this.state.interval,
        }).then(function (response) {
          console.log(response.data)
          if (response.data.status) {
            console.log("1")
            window.clearTimeout(timeout)
            alert('Successfully Added')
            that.props.shouldRefresh()
            that.setState({ serviceDate: '', serviceName: '', interval: 'undefined' })
          } else {
            alert('Something went wrong, please try again')
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        sn = this.state.serviceName;
        // console.log("hi"+sn)
        axios.post('/ADD-CUSTOM-SERVICE', {
          "uid": this.props.uid,
          carName: this.props.currCar,
          serviceName: sn,
          incrementInt: this.state.interval,
        }).then(function (response) {
          if (response.data.status) {
            console.log('2')
            window.clearTimeout(timeout)
            alert('Successfully Added')
            that.props.shouldRefresh()
            that.setState({ serviceName: '', interval: 'undefined' })
          } else {
            alert('Something went wrong, please try again')
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
      this.props.shouldRefresh();
      this.props.closeAll();
    }
  }

  checkIfIncludes = (arr, toCheck) => {
    toCheck = toCheck.toLowerCase();
    // console.log(toCheck)
    for (let i in arr) {
      // console.log(arr[i].toLowerCase())
      if (arr[i].toLowerCase() === toCheck)
        return arr[i];
    }
    return -1;
  }

  addMonths = () => {
    let tempMonth = [];
    tempMonth.push(<MenuItem value='undefined' key={0} primaryText='Optional Interval' />);
    for (let i = 1; i <= 12; i++) {
      tempMonth.push(<MenuItem value={i} key={i} primaryText={(i === 1) ? `1 month` : `${i} months`} />);
    }
    return tempMonth;
  }

  handleInterval = (event, index, value) => {
    this.setState({ interval: value });
  }

  render() {
    return (
      <Dialog
        modal
        autoScrollBodyContent
        title={`Add service to ${this.props.currCar}`}
        open={this.props.addOpen}
        actions={[
          <RaisedButton
            label='Cancel'
            onClick={this.props.closeAll}
            style={{marginRight:'15px'}}
          />,
          <RaisedButton
            label='Add Service'
            onClick={this.addService}
          />
        ]}
      >
        <AutoComplete
          hintText='Type your own service name or use one of the suggested'
          fullWidth
          style={{marginTop:'20px'}}
          searchText={this.state.serviceName}
          dataSource={this.state.dataSource}
          onUpdateInput={this.updateText}
          filter={(searchText, key) => searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1}
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
