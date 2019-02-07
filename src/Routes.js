import AppliedRoute from './components/AppliedRoute'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Canvas from './components/canvas/canvas'
import Horizontal from './components/canvas/horizontal'
import Home from './components/home/home'
import Editor from './components/editor/editor'
import NotFound from './components/not-found/not-found'
import Login from './containers/Login'

export default ({ props }) => (
  <Switch>
    <AppliedRoute exact path="/" exact component={Home} />
    <AppliedRoute exact path="/login" component={Login} props={props} />
    <AppliedRoute exact path="/canvas" component={Canvas} props={props} />
    <AppliedRoute
      exact
      path="/horizontal"
      component={Horizontal}
      props={props}
    />
    <AppliedRoute
      exact
      path="/editor/:blockType"
      component={Editor}
      props={props}
    />
    <Route component={NotFound} />
  </Switch>
)
