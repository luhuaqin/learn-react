import React, { useState } from 'react'
import Header from './component/Header'
import List from './component/List'
import Footer from './component/Footer'
import './App.css'

export default function App() {
  const [ list, setList ] = useState([
    { id: 1, name: '吃饭', done: true },
    { id: 2, name: '睡觉', done: true },
    { id: 3, name: '打代码', done: false }
  ])

  const addItem = (data) => {
    setList([{ id: Math.random(), name: data, done: false },...list])
  }

  const updateItem = (id, done) => {
    const changeList = [ ...list ]
    const newList =  changeList.map(item => {
      if(item.id === id) return { ...item, done }
      else return item
    })
    setList(newList)
    console.log(newList);
  }

  const deleteItem = (id) => {
    const changeList = [ ...list ]
    const newList =  changeList.filter(item => item.id !== id)
    setList(newList)
  }

  const checkedAll = (done) => {
    const changeList = [ ...list ]
    const newList = changeList.map(item => {
      return {...item, done}
    })
    setList(newList)
  }

  const handleClearDone = () => {
    const changeList = [ ...list ]
    const newList = changeList.filter(item => !item.done)
    setList(newList)
  }

  return (
    <div className='todo-container'>
      <div className="todo-wrap">
        <Header addItem={addItem} />
        <List list={list} handleUpdate={updateItem} handleDelete={deleteItem} />
        <Footer list={list} handleCheckedAll={checkedAll} handleClearDone={handleClearDone} />
      </div>
    </div>
  )
}
