import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('business-model-canvas')
)

serviceWorker.unregister()
