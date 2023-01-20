import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    eventCount: 32
  }

  // to make the API call and save the initial data to state
  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.eventCount);
        this.setState({
          events, locations : extractLocations(events)
        });
      }
    });
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
    return (
      <div className='App'>
       <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
       <EventList events={this.state.events}/>
       <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;