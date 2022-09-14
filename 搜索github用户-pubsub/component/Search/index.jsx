import React, { useRef } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

export default function Search(props) {
  const inputValue = useRef()
  const handleSearch = () => {
    const keyWord = inputValue.current.value
    PubSub.publish('pageData', false, true)
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(res => {
      PubSub.publish('pageData', res.data.items, false)
    }).catch(err => {
      PubSub.publish('pageData', err.message)
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
