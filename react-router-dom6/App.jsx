import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'

import routes from './routes'

export default function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <h3>title</h3>
        <NavLink to='/about'>about</NavLink>
        <NavLink to='/home'>home</NavLink>
      <div>
        {/* 注册路由 */}
        { element }
      </div>
    </div>
  )
}
