import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import About from './component/about'
import Home from './component/home'

export default function App() {
  return (
    <div>
      <h3>title</h3>
        <Link to='/about'>about</Link>
        <Link to='/home'>home</Link>
      <div>
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    </div>
  )
}
