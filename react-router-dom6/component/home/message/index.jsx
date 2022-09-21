import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Message() {
  const navigate = useNavigate()
  const [list] = useState([
    {id: 1, title: 'message1'},
    {id: 2, title: 'message2'},
    {id: 3, title: 'message3'}
  ])

  const handleClick = () => {
    navigate('detail')
  }
  return (
    <div>
      <ul>
        {
          list.map(item => <li key={item.id}>
            <Link to='detail' state={{
              id: item.id,
              title: item.title
            }}>{item.title}</Link>
            <button onClick={handleClick}></button>
          </li>)
        }
      </ul>
      <Outlet />
    </div>
  )
}
