import React, { useState } from 'react'

export default function Item(props) {
  const { name, done, id } = props
  const [ mouseOver, setMouseOver ] = useState(false)

  const handleMouse = (flag) => {
    return () => {
      setMouseOver(flag)
    }
  }

  const handleUpdate = (id) => {
    return (event) => {
      props.handleUpdate(id, event.target.checked)
    }
  }

  const handleDelete = (id) => {
    if(window.confirm('您确定删除该项吗？')){
      props.handleDelete(id)
    }
  }

  return (
    <li style={{ 
          backgroundColor: mouseOver ? '#ddd' : "#fff",
          display: 'flex',
          justifyContent:'space-between' 
        }} 
        onMouseEnter={handleMouse(true)} 
        onMouseLeave={handleMouse(false)}>
      <label htmlFor="item">
        <input type="checkbox" checked={done} name='item' onChange={handleUpdate(id)} />
        <span>{name}</span>
      </label>
      <button className='btn btn-danger'
              style={{ display: mouseOver ? 'inline-block' : 'none' }}
              onClick={() => handleDelete(id)}>删除</button>
    </li>
  )
}
