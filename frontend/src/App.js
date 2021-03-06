import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Grid } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingLayout from './Landing/LandingLayout'
import HomeLayout from './Home/HomeLayout'
import axios from 'axios'

axios.defaults.baseURL = "https://carkeeper-server.herokuapp.com/";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: '',
    }
    try {
      const serializedState = localStorage.getItem('carkeeper-app')
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState)
        //console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem('carkeeper-app', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  changeUid = (uid) => {
    this.setState({ uid: uid }, this.saveState)
  }

  componentDidMount = () => {
    // window.addEventListener("resize", () => {
    //   if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent)))
    //     this.forceUpdate()
    // })
  }

  muiTheme = getMuiTheme({
    palette: {
      primary1Color: 'var(--color3)',
      accent1Color: 'var(--color4)',
      textColor: 'var(--color5)',
      alternateTextColor: 'var(--color1)',
      canvasColor: 'var(--color1)',
    }
  })

  render() {
    let toSend = {
      ...this.state,
      changeUid: this.changeUid,
    }
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <Grid className="App fluid">
          <Switch>
            <Route path='/home' render={() => <HomeLayout {...toSend} />} />
            <Route path='/landing' render={() => <LandingLayout uid={this.state.uid} />} />
            <Route path="/" render={() => <Redirect to='/home' />} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
