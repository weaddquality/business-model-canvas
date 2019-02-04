import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import NavigationBar from './components/navigation-bar/navigation-bar'
import Canvas from './components/canvas/canvas'
import Horizontal from './components/canvas/horizontal'
import Editor from './components/editor/editor'
import NotFound from './components/not-found/not-found'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Canvas} />
          <Route exact path="/horizontal" component={Horizontal} />
          <Route path="/editor/:blockType" component={Editor} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
