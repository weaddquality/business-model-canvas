import React, { Component } from 'react';
import './App.css';
import Grid from './components/grid/grid.js';
import Nav from './components/navigation-bar/nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Grid />
      </div>
    );
  }
}

export default App;
