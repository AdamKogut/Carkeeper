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
    this.state={
      uid:'2222',
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

  changeUid=(uid)=>{
    this.setState({uid:uid},this.saveState)
  }

  componentDidMount = () => {
    window.addEventListener("resize", () => {
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
    let toSend={
      ...this.state,
      changeUid:this.changeUid,
    }
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <Grid className="App fluid">
          <Switch>
            <Route path='/home' render={() => <HomeLayout {...toSend}/>} />
            <Route path='/landing' render={() => <LandingLayout uid={this.state.uid}/>} />
            <Route path="/" render={() => <Redirect to='/home' />} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
