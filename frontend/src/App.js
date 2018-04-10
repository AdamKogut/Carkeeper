import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Grid } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingLayout from './Landing/LandingLayout'
import HomeLayout from './Home/HomeLayout'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:9090";

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    let height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    root.style.setProperty('--screen-x', width)
    root.style.setProperty('--screen-y', height)
    window.addEventListener("resize", () => {
      let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      let height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
      root.style.setProperty('--screen-x', width)
      root.style.setProperty('--screen-y', height)
      this.forceUpdate()
    })
  }

  muiTheme = getMuiTheme({
    palette: {
      primary: { main: '#73C2E7' },
      secondary: { main: '#9ECEF4' }
    }
  })

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <Grid className="App fluid">
          <Switch>
            <Route path='/home' render={() => <HomeLayout />} />
            <Route path='/landing' render={() => <LandingLayout />} />
            <Route path="/" render={() => <Redirect to='/home' />} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
