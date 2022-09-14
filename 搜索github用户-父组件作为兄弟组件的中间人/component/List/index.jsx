import React from 'react'

export default function List(props) {
  const { userList, isFirst, isLoading, err } = props
  console.log(err)
  return (
    <div className="row">
      {
        isFirst ? <p>欢迎使用~</p> : isLoading ? <h1>Loading....</h1> : err ? <p style={{ color: 'red' }}>{err}</p> :
          userList.map(item => (
            <div className="card" key={item.id}>
              <a href={item.html_url} target="_blank" rel="noreferrer">
                <img src={item.avatar_url} alt="avator" style={{ width: '100px' }} />
              </a>
              <p className='card-text'>{item.login}</p>
            </div>
          ))
      }
      
    </div>
  )
}
