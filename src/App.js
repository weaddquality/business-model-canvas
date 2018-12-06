import React, { Component } from 'react';
import './App.css';
import Nav from './components/navigation-bar/nav';
import Grid from './components/grid/grid';
import Detail from './components/detail/detail';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Grid} />
            <Route path="/detail/:blockType" component={Detail} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
