
# react-router-dom@5

## 安装

npm i react-router-dom@5  /  yarn add react-router-dom@5

## BrowserRouter/HashRouter

区别：
  1、底层原理不一样
    BrowserRouter使用H5的history API，不兼容IE9以下版本
    HashRouter使用的是URL的哈希值
  2、url表现形式不一致
    BrowserRouter URL中不带#
    HashRouter URL中带#
  3、刷新后对路由state参数影响
    BrowserRouter 没有任何影响，因为state存在history中
    HashRouter 会导致路由参数state丢失
  4、路由传递不同
    BrowserRouter 会传给服务器
    HashRouter 只存在localhost中

在路由切换组件<Link>aa</Link>, <Route />, <NavLink>aa</NavLink>外层需要其中一种路由类型包裹BrowserRouter/HashRouter，在react-router-dom库中引入

```javascript
import React from 'react'
// 通常BrowserRouter也放到index.js中，直接包裹App组件
import { Link, BrowserRouter, Route } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <h3>title</h3>
        {/*编写路由链接 */}
        <Link to='/about'>about</Link>
        <Link to='/home'>home</Link>
        {/*注册路由 */}
        <Route path='/home' component={Home}/>
        <Route path='/about' component={About}/>
      </BrowserRouter>
    </div>
  )
}
```

## Link和NavLink的区别

NavLink在活跃状态时会自动添加active类，如果需要切换类名，可以使用activeClassName='类名'进行设置
<NavLink activeClassName="active-style">aa</NavLink>

## Switch的使用

提高路由匹配效率，使用Switch包裹之后，如果存在多个相同路由，匹配到第一个路径后，后面的路径将不再重复匹配

```javascript
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import About from './component/about'
import Home from './component/home'

export default function App() {
  return (
    <div>
      <h3>title</h3>
        <Link to='/about'>about</Link>
        <Link to='/home'>home</Link>
      <div>
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    </div>
  )
}
```

## 多极路由路径刷新页面样式丢失的问题

1. public/index.html 中引入css文件不写 ./相对路径，直接写 / (常用)
2. public/index.html 中引入css文件不写 ./ 写 %PUBLIC_URL%/
3. 将BrowserRouter换成HashRouter

## 路由模糊匹配及精准匹配exact

Route中默认使用模糊匹配，输入路径包含匹配的路径且顺序一致，相关路径都会匹配。
如需精准匹配则在Route中加上exact属性即可。开启精准匹配后二级路由将不再匹配，所以不轻易使用

```javascript
<Route exact path='/about' component={About} />
```

## Redirect重定向

放在路由注册的最下方，如果前面的路径都没有匹配到。就会匹配Redirect

```javascript
<Route path='/about' component={About} />
<Route path='/home' component={Home} />
<Redirect to='/about' />
```

## 嵌套路由

在已配置路由的组件内使用路由，成为子路由，子路由path需要包含上一级路由的名称，否自匹配不到
>如在home组件中嵌套子路由

```javascript
import React from 'react'
import News from './news'
import Message from './message'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  return (
    <div>
      <NavLink to='/home/news'>news</NavLink>
      <NavLink to='/home/message'>message</NavLink>
      <Switch>
        <Route path='/home/news' component={News} exact />
        <Route path='/home/message' component={Message} />
        <Redirect to='/home/news' />
      </Switch>
    </div>
  )
}
```

## 路由携带参数

### 路由携带参数之params

>路由链接携带参数，`<Link to={`/home/message/detail/${id}/${title}`}>详情</Link>`
>注册路由接收参数，`<Route path='/home/message/detail/:detailId/:title' component={Detail} />`
>Detail组件接收参数：const { detailId, title } = props.match.params

```javascript
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
            <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Switch>
        <Route path='/home/message/detail/:detailId/:title' component={Detail} />
        <Redirect to='/home/message/detail/1/message1' />
      </Switch>
    </div>
  )
}
```

### 路由携带参数之search(query)

>路由链接携带参数，`<Link to={`/home/message/detail?id=${item.id}&title=${item.title}`}>详情</Link>`
>注册路由接收参数，`<Route path='/home/message/detail' component={Detail} />`
>Detail组件接收参数：const result = props.location.search  接收到的search是字符串，需要借助querystring解析为对象

```javascript
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
            <Link to={`/home/message/detail?id=${item.id}&title=${item.title}`}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Switch>
        <Route path='/home/message/detail' component={Detail} />
        <Redirect to='/home/message/detail?id=1&title=message1' />
      </Switch>
    </div>
  )
}
```

### 路由携带参数之state(body)

>路由链接携带参数，`<Link to={{ pathname: '/home/message/detail', state: {id: item.id, title: item.title} }}}>详情</Link>`
>注册路由接收参数，`<Route path='/home/message/detail' component={Detail} />`
>Detail组件接收参数：const {id, title} = props.location.state

```javascript
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
            <Link to={{ pathname: '/home/message/detail', state: {id: item.id, title: item.title} }}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Switch>
        <Route path='/home/message/detail' component={Detail} />
        <Redirect to='/home/message/detail?id=1&title=message1' />
      </Switch>
    </div>
  )
}

```

## 路由跳转的两种模式

1. push：push模式相当于将每个路径都压入栈中，有history
2. replace： replace是用目标路径替换原来路径，没有history

>默认使用push模式，如果要开启replace模式，在Link中使用replace属性即可 <Link replace to='/home'>首页</Link>

## 编程式导航

>触发事件的组件内使用props.history.push('路径')或者props.history.replace('路径')进行跳转
>携带参数跳转：

1. params:
    >>props.history.push(`/home/message/detail/${id}/${title}`)
    >>props.history.replace(`/home/message/detail/${id}/${title}`)
2. search(query)
    >>props.history.push(`/home/message/detail?id=${id}&title=${title}`)
    >>props.history.replace(`/home/message/detail?id=${id}&title=${title}`)
3. state(body)
    >>props.history.push(`/home/message/detail`, { id: id, title: title })
    >>props.history.replace(`/home/message/detail`, { id: id, title: title })

## withRouter的使用

>在非路由组件中需要使用路由跳转的api时，需要借助withRouter完成
>使用方法：将组件用withRouter()包裹即可

```javascript
import React from 'react'
import { withRouter } from 'react-router-dom'

function Header() {
  return (
    <div>News</div>
  )
}

export default withRouter(Header)
```
