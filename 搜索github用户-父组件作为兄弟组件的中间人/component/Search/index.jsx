import React, { useRef } from 'react';
import axios from 'axios';

export default function Search(props) {
  const { saveUserList, updateIsFirst, updateIsLoading, saveError } = props
  const inputValue = useRef()
  const handleSearch = () => {
    const keyWord = inputValue.current.value
    updateIsFirst(false)
    updateIsLoading(true)
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(res => {
      saveUserList(res.data.items)
      updateIsLoading(false)
    }).catch(err => {
      saveError(err.message)
    })
  }
  return (
    <section className='jumbotron'>
      <h3 className='jumbotron-heading'>Search Github Users</h3>
      <div>
        <input ref={inputValue} type="text" placeholder='enter the name you search' />&nbsp;
        <button onClick={handleSearch}>Search</button>
      </div>
    </section>
  )
}
