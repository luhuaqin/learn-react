import React, { useState } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import Detail from './detail'

export default function Message() {
  const [list] = useState([
    {id: 1, title: 'message1'},
    {id: 2, title: 'message2'},
    {id: 3, title: 'message3'}
  ])
  return (
    <div>
      <ul>
        {
          list.map(item => <li key={item.id}>
            {/* params方式 */}
            {/* <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link> */}
            {/* search(query)方式 */}
            {/* <Link to={`/home/message/detail?id=${item.id}&title=${item.title}`}>{item.title}</Link> */}
            {/* state方式 */}
            <Link to={{ pathname: '/home/message/detail', state: {id: item.id, title: item.title} }}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Switch>
        {/* params方式，声明接收params */}
        {/* <Route path='/home/message/detail/:detailId/:title' component={Detail} /> */}
        {/* search(query)方式，直接正常注册路由即可 */}
        {/* <Route path='/home/message/detail' component={Detail} /> */}
        {/* state方式，直接正常注册路由即可 */}
        <Route path='/home/message/detail' component={Detail} />
        <Redirect to='/home/message/detail?id=1&title=message1' />
      </Switch>
    </div>
  )
}
