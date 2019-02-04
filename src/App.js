import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom'
import NavigationBar from './components/navigation-bar/navigation-bar'
import Canvas from './components/canvas/canvas'
import Horizontal from './components/canvas/horizontal'
import Editor from './components/editor/editor'
import NotFound from './components/not-found/not-found'
import { Nav, Navbar, NavItem, ButtonGroup, Button } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <div className="view">
          <ButtonGroup>
            <Link to="/">
              <Button>Grid</Button>
            </Link>
            <Link to="/horizontal">
              <Button>Horizontal</Button>
            </Link>
          </ButtonGroup>
        </div>
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
