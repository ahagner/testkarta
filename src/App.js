import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { apiKey } from './config';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';




class App extends Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };

  componentDidMount(props) {
    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    console.log(this.state.userLocation)
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return <Map  google={google} initialCenter={userLocation}  zoom={15}>
      <Marker icon="https://www.robotwoods.com/dev/misc/bluecircle.png" position={userLocation}/>
      </Map>
    
  }
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(App)