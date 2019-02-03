import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavigationBar from './components/navigation-bar/navigation-bar'
import Canvas from './components/canvas/canvas'
import Editor from './components/editor/editor'
import NotFound from './components/not-found/not-found'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Canvas} />
            <Route path="/editor/:blockType" component={Editor} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
