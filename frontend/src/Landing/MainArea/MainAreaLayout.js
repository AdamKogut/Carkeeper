import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import DeleteCarButton from './DeleteCarButton'
import AddServiceButton from './AddServiceButton'
import AddDate from './AddDate'
import './MainArea.css';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

class MainAreaLayout extends Component {
  constructor(props) {
    super(props)
    let today = new Date()
    this.state = {
      cards: [],
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      objectItem: '',
      addOpen: false,
      warning: [
        { openIcon: <i className="material-icons warning">&#xE002;</i>, closeIcon: <i className="material-icons warning">&#xE002;</i> },
      ]
    }
    // console.log(props)
  }

  shouldRefresh = () => {
    this.getCards(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.currCar !== nextProps.currCar || this.props.carInfo !== nextProps.carInfo)
      this.getCards(nextProps)
  }

  componentDidMount = () => {
    if (this.props.uid !== '')
      this.getCards(this.props)
  }

  getCards = (props) => {
    if (props.currCar !== '') {
      let that = this
      // console.log(props.currCar)
      axios.post('/GET-CAR', {
        "uid": this.props.uid,
        carName: props.currCar,
      }).then(function (response) {
        // console.log(response.data)
        let tempCards = []
        for (let i in response.data) {
          let tempPrior = []
          for (let k in response.data[i].priorDates) {
            tempPrior.push(
              <h6 key={k}>{response.data[i].priorDates[k]}</h6>
            )
          }
          // console.log(tempPrior.length)
          tempCards.push(
            <Card key={i} style={{ textAlign: 'left' }}>
              <CardHeader
                title={<h3>{i}</h3>}
                subtitle={<h4>Next service due: {response.data[i].nextDate}</h4>}
                actAsExpander
                showExpandableButton
                {...that.state.warning[that.checkDate(response.data[i].nextDate)]}
              />
              <CardText expandable style={{ marginTop: '-40px' }}>
                {/* <h4>Next service due: {response.data[i].nextDate}</h4> */}
                {(tempPrior.length > 0) ? <h5>Previous services: </h5> : null}
                {tempPrior}
              </CardText>
              <CardActions expandable style={{ marginTop: '-20px' }}>
                <FlatButton
                  label='Add new date'
                  onClick={() => that.handleAdd(i)}
                />
                <FlatButton
                  label='Remove Service'
                  onClick={() => that.handleRemove(i)}
                />
              </CardActions>
            </Card>
          )
          // console.log(that.checkDate(response.data[i].nextDate))
        }
        that.setState({ cards: tempCards }, that.checkForServices)

      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  checkForServices = () => {
    if (this.state.cards.length === 0) {
      let tempCards = []
      tempCards.push(
        <Card key={0}>
          <CardHeader
            title="You don't have any services, please add one to get the full effect of the service"
          />
        </Card>
      )
      this.setState({ cards: tempCards })
    }
  }

  checkDate = (toCheck) => {
    let splitted = toCheck.split('-')
    if (splitted[0] > this.state.year) {
      return 1
    } else if (splitted[1] > this.state.month) {
      return 1
    } else if (splitted[2] > this.state.day) {
      return 1
    }
    return 0
  }

  handleAdd = (name) => {
    this.setState({ addOpen: true, objectItem: name })
  }

  closeAdd = () => {
    this.setState({ addOpen: false, objectItem: '' })
  }

  handleRemove = (name) => {
    let flag = true
    axios.post('/REMOVE-SERVICE', {
      "uid": this.props.uid,
      carName: this.props.currCar,
      serviceName: name,
    }).then(function (response) {
      // console.log(response.data)
    }).catch(function (error) {
      console.log(error);
      alert('Something happened, please try again')
      flag = false
    });
    if (flag) {
      alert('Service Removed')
      this.getCards(this.props)
    }
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    let ifMobile = 'main-desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 400) {
      ifMobile = 'main-mobile';
    }
    return (
      <Col sm={9} className={ifMobile}>
        {(this.props.carInfo.model !== undefined) ?
          <div>
            <Row style={{ marginLeft: '20px' }}>
              <h1>{this.props.currCar}&nbsp;</h1>
            </Row>

            <Row style={{ marginLeft: '20px', marginTop: '-20px' }}>
              <h3>{`${this.props.carInfo.year} ${this.props.carInfo.make} ${this.props.carInfo.model} ${this.props.carInfo.level}`}</h3>
            </Row>

            <Row>
              <DeleteCarButton {...this.props} shouldRefresh={this.shouldRefresh} />
              <AddServiceButton {...this.props} shouldRefresh={this.shouldRefresh} />
            </Row>
          </div>
          : null}
        {this.state.cards}

        <AddDate {...this.props} {...this.state} closeAdd={this.closeAdd} />
      </Col>
    );
  }
}

export default MainAreaLayout;
