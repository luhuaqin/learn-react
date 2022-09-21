import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  return (
    <div>
      <NavLink to='news'>news</NavLink>
      <NavLink to='message'>message</NavLink>
      {/* 指定路由呈现的位置 */}
      <Outlet />
    </div>
  )
}
