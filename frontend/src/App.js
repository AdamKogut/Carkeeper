import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Grid } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingLayout from './Landing/LandingLayout'
import HomeLayout from './Home/HomeLayout'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('App')
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
        <Grid style={{ backgroundColor:'#F4EBEC' }}>
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
