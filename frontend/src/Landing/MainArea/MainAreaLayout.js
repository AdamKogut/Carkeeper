import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import './MainArea.css';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

class MainAreaLayout extends Component {
  constructor(props) {
    super(props)
    this.state={
      cards:[],
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.currCar != nextProps.currCar)
      this.getCards(nextProps)
  }

  componentDidMount = () => {
    this.getCards(this.props)
  }

  getCards = (props) => {
    if (props.currCar != '') {
      let that=this
      axios.post('/GET-CAR', {
        "uid": '1111',
        carName: props.currCar,
      }).then(function (response) {
        console.log(response.data);
        if(response.data.status!=false){
          let tempCards=[]
          for(let i in response.data){
            tempCards.push(
              <Card key={i}>
                <CardHeader
                  title={response.data[i].title}
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                </CardText>
                <CardActions expandable>
                  <FlatButton
                    label='Add new date'
                    onClick={()=> that.handleAdd(i)}
                  />
                  <FlatButton
                    label='Remove Service'
                    onClick={()=>that.handleRemove(i)}
                  />
                </CardActions>
              </Card>
            )
          }
          that.setState({cards:tempCards})
        }

      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    let height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    return (
      <Col sm={9} className='main-desktop'>

      </Col>
    );
  }
}

export default MainAreaLayout;
