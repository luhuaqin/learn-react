import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
  const {state:{id,title}} = useLocation()
  
  return (
    <div>
      <p>ID: {id}</p>
      <p>title: {title}</p>
      <p>content: {}</p>
    </div>
  )
}
