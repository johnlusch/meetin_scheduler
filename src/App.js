import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    eventCount: 32,
    showWelcomeScreen: undefined
  }

  // to make the API call and save the initial data to state
  // async componentDidMount() {
  //   this.mounted = true;
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       events = events.slice(0, this.state.eventCount);
  //       this.setState({
  //         events, locations : extractLocations(events)
  //       });
  //     }
  //   });
  // }
  // async componentDidMount() {
  //   this.mounted = true;

  //   const accessToken = localStorage.getItem('access_token');
  //   const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const code = searchParams.get('code');
  //   const isLocal = window.location.href.startsWith('http://localhost')
  //     ? true
  //     : code || isTokenValid;
  //   this.setState({ showWelcomeScreen: !isLocal });
  //   if (isLocal && this.mounted) {
  //     getEvents().then((events) => {
  //       if (this.mounted) {
  //         this.setState({ events, locations: extractLocations(events) });
  //       }
  //     });
  //   }
  // }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
      }
    });
    }
  }
    

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, inputNumber) => {
    const {eventCount, selectedLocation} = this.state;

    if(location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventCount);
        this.setState({
          events: eventsToShow,
          selectedLocation: location
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
        events :
        events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          eventCount: inputNumber
        });
      })
    }
  }
  
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className='App'>
        <h1>Meet App</h1>
        <h4>Choose your nearest City</h4>
        <div className='OfflineAlert'>
          {!navigator.online && (
            <OfflineAlert 
            text = {
              'You are currently offline.The list of events may not be up to date '
            }
            />
          ) }
        </div>
       <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
       <EventList events={this.state.events}/>
       <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />

       <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />

      </div>
    );
  }
}

export default App;