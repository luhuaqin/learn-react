import React from 'react'
import Item from '../Item'

export default function List(props) {
  const { list, handleUpdate, handleDelete } = props
  return (
    <ul className="todo-main">
      {
        list.map(item => <Item key={item.id} { ...item } handleUpdate={handleUpdate} handleDelete={handleDelete} />)
      }
    </ul>
  )
}
