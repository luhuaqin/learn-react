import React, { useState } from 'react'
import PubSub from 'pubsub-js'

export default function List(props) {
  const [userList, setUserList] = useState([])
  const [isFirst, setIsFirst] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [err, setError] = useState('')

  // const updateAppState = (setStateFn, state) => {
  //   setStateFn(state)
  // }

  // const saveUserList = (userList) => {
  //   setUserList(userList)
  // }

  // const updateIsFirst = (isFirst) => {
  //   setIsFirst(isFirst)
  // }

  // const updateIsLoading = (isLoading) => {
  //   setIsLoading(isLoading)
  // }

  // const saveError = (error) => {
  //   setError(error)
  // }

  const result = PubSub.subscribe('pageData', (_, data) => {
    console.log(data);
  })

  return (
    <div className="row">
      {
        // isFirst ? <p>欢迎使用~</p> : isLoading ? <h1>Loading....</h1> : err ? <p style={{ color: 'red' }}>{err}</p> :
        //   userList.map(item => (
        //     <div className="card" key={item.id}>
        //       <a href={item.html_url} target="_blank" rel="noreferrer">
        //         <img src={item.avatar_url} alt="avator" style={{ width: '100px' }} />
        //       </a>
        //       <p className='card-text'>{item.login}</p>
        //     </div>
        //   ))
      }
      
    </div>
  )
}
