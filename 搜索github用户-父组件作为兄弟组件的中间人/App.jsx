import React, { useState } from 'react'
import Search from './component/Search'
import List from './component/List'
import './App.css'

export default function App() {
  const [userList, setUserList] = useState([])
  const [isFirst, setIsFirst] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [err, setError] = useState('')

  // const updateAppState = (setStateFn, state) => {
  //   setStateFn(state)
  // }

  const saveUserList = (userList) => {
    setUserList(userList)
  }

  const updateIsFirst = (isFirst) => {
    setIsFirst(isFirst)
  }

  const updateIsLoading = (isLoading) => {
    setIsLoading(isLoading)
  }

  const saveError = (error) => {
    setError(error)
  }

  return (
    <div className='container'>
      {/* <Search saveUserList={saveUserList} updateIsFirst={updateIsFirst} updateIsLoading={updateIsLoading} saveError={saveError} />
      <List userList={userList} isFirst={isFirst} isLoading={isLoading} err={err} /> */}
      <Search saveUserList={saveUserList} updateIsFirst={updateIsFirst} updateIsLoading={updateIsLoading} saveError={saveError} />
      <List userList={userList} isFirst={isFirst} isLoading={isLoading} err={err} />
    </div>
  )
}
