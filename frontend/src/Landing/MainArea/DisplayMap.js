import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { GoogleMap } from './GoogleMap';
//import './DisplayMap.css';

class DisplayMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceDate: '',
      price: '',
      place: '',
      location: {},
    }
  }

  render() {
    return (
      <Dialog
        modal
        autoScrollBodyContent
        open={this.props.displayMap}
        actions={[
          <RaisedButton
            label='Close'
            onClick={this.props.close}
          />
        ]}
      >
        <GoogleMap {...this.props} />
      </Dialog>
    );
  }
}

export default DisplayMap;
