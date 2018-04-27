import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { Paper, ListItem } from 'material-ui';
import AddCarButton from './AddCarButton'
import './Sidebar.css';

class DesktopSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      colors: [],
      deleteOpen: false,
      editOpen: false,
      objectItem: '',
      temp: false,
    }
  }

  handleClick = (name, info) => {
    let tempColor = []
    tempColor[name] = { style: { backgroundColor: 'var(--color2)' } }
    // console.log(tempColor)
    this.props.changeChat(name, info)
    this.setState({ colors: tempColor }, this.changeColor)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.shouldRefresh !== this.props.shouldRefresh)
      this.componentDidMount()
  }

  changeColor = () => {
    let tempCars = []
    for (let i in this.state.cars) {
      // console.log(i)
      tempCars.push(
        <Paper zDepth={2} key={this.state.cars[i].key}>
          <ListItem
            primaryText={this.state.cars[i].props.children.props.primaryText}
            secondaryText={this.state.cars[i].props.children.props.secondaryText}
            className={this.state.cars[i].props.children.props.className}
            onClick={this.state.cars[i].props.children.props.onClick}
            rightIcon={this.state.cars[i].props.children.props.rightIcon}
            // hoverColor='var(--color4)'
            {...this.state.colors[this.state.cars[i].key]}
          />
        </Paper>
      )
    }
    this.setState({ cars: tempCars })
  }

  componentDidMount = () => {
    let that = this
    if (this.props.uid === '')
      return;
    axios.post('/GET-GARAGE', {
      "uid": this.props.uid,
    }).then(function (response) {
      // console.log(response.data);
      let tempCars = []
      for (let i in response.data) {
        // console.log(i)
        tempCars.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              onClick={() => that.handleClick(i, response.data[i])}
              primaryText={i}
              secondaryText={`${response.data[i].year} ${response.data[i].make} ${response.data[i].model} ${response.data[i].level}`}
              // hoverColor='var(--color4)'
              {...that.state.colors[i]}
            />
          </Paper>
        )
      }
      that.setState({ cars: tempCars }, that.checkGarage);

    }).catch(function (error) {
      console.log(error);
    });
  }

  checkGarage = () => {
    if (this.state.cars.length === 0) {
      let tempCars = []
      tempCars.push(
        <Paper zDepth={2} key={0}>
          <ListItem
            primaryText="You don't have any cars, please add one to get the full experience of the app"
            disabled
          />
        </Paper>
      )
      this.setState({ cars: tempCars })
    } else {
      this.state.cars[0].props.children.props.onClick()
    }
  }

  render() {
    return (
      <Col xsHidden sm={3} className='desktop-sidebar'>
        <Row className='car-area-sidebar'>
          {this.state.cars}
        </Row>
        <AddCarButton {...this.props} updatePage={this.componentDidMount} />
      </Col>
    );
  }
}

export default DesktopSidebar;
