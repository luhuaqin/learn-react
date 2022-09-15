import React from 'react'
import News from './news'
import Message from './message'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  return (
    <div>
      <NavLink to='/home/news'>news</NavLink>
      <NavLink to='/home/message'>message</NavLink>
      <Switch>
        <Route path='/home/news' component={News} exact />
        <Route path='/home/message' component={Message} />
        <Redirect to='/home/news' />
      </Switch>
    </div>
  )
}
