import React from 'react'
import Search from './component/Search'
import List from './component/List'
import './App.css'

export default function App() {

  return (
    <div className='container'>
      {/* <Search saveUserList={saveUserList} updateIsFirst={updateIsFirst} updateIsLoading={updateIsLoading} saveError={saveError} />
      <List userList={userList} isFirst={isFirst} isLoading={isLoading} err={err} /> */}
      <Search />
      <List />
    </div>
  )
}
