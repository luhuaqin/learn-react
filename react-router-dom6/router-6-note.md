
# react-router-dom@6

与router 5 的区别
![图解](../assets/img/区别.png '路由5和6的区别')

## 安装

npm i react-router-dom  /  yarn add react-router-dom

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

在路由切换组件`<Link>aa</Link>`, `<Route />`, `<NavLink>aa</NavLink>`外层需要其中一种路由类型包裹
`<Route caseSensitive>` caseSensitive属性用于指定匹配时是否区分大小写，默认为false
BrowserRouter/HashRouter，在react-router-dom库中引入

```javascript
import React from 'react'
// 通常BrowserRouter也放到index.js中，直接包裹App组件
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <h3>title</h3>
        {/*编写路由链接 */}
        <Link to='/about'>about</Link>
        <Link to='/home'>home</Link>
        {/*注册路由 */}
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
```

## Link和NavLink的区别

NavLink在选中状态不会自动添加类名active，也不能使用activeClassName来改变选中状态的样式，要使用函数处理，每点击一次都会调用这个函数，函数传入的参数为{isActive: true/false}，使用如下：

```javascript
<NavLink className={(event)=> event.isActive ? 'class1 active' : 'class1'}></NavLink>
```

## useRoutes路由表

将路由中的element和path提取到useRoutes中，在jsx中直接使用useRoutes的返回值，代码如下：

```javascript
import React from 'react'
import { NavLink, useRoutes, Navigate } from 'react-router-dom'

import About from './component/about'
import Home from './component/home'

export default function App() {
  const routes = useRoutes([
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/',
      element: <Navigate to='/home' />
    }
  ])
  return (
    <div>
      <h3>title</h3>
        <NavLink to='/about'>about</NavLink>
        <NavLink to='/home'>home</NavLink>
      <div>
        {/* 注册路由 */}
        { routes }
      </div>
    </div>
  )
}
```

## Routes的使用

提高路由匹配效率，使用Routes包裹之后，如果存在多个相同路由，匹配到第一个路径后，后面的路径将不再重复匹配
Route必须由Routes包裹

```javascript
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import About from './component/about'
import Home from './component/home'

export default function App() {
  return (
    <div>
      <h3>title</h3>
        <Link to='/about'>about</Link>
        <Link to='/home'>home</Link>
      <div>
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
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
<Route exact path='/about' element={<About />} />
```

## Navigate重定向

Navigate可以在其他需要跳转页面的地方使用，Navigate只要渲染就会引起视图的切换
放在路由注册的最下方，如果前面的路径都没有匹配到。就会匹配最后一个Route，跳转到Navigate中to的路经

```javascript
import React from 'react'
import News from './news'
import Message from './message'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  return (
    <div>
      <NavLink to='/home/news'>news</NavLink>
      <NavLink to='/home/message'>message</NavLink>
      <Routes>
        <Route path='/home/news' element={<News />} exact />
        <Route path='/home/message' element={<Message />} />
        <Route path='/' element={<Navigate to='/about' />} />
      </Routes>
    </div>
  )
}
```

## 嵌套路由

在路由表中需要配置子路由的对象中加入children属性，children中放入路由对象，嵌套路径path直接写路由名即可，不需要加上'/'，嵌套路由中子路由点击跳转时to路径也不需要添加'/'，例子如下：
>routes文件

```javascript
import { Navigate } from "react-router-dom"
import Home from "../component/home"
import About from "../component/about"
import News from "../component/home/news"
import Message from "../component/home/message"
const routes =  [
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />
      },
      {
        path: '',
        element: <Navigate to='news' />
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/',
    element: <Navigate to='/about' />
  }
]
export default routes
```

>路由触发文件--一级路由

```javascript
import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'

import routes from './routes'

export default function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <h3>title</h3>
        <NavLink to='/about'>about</NavLink>
        <NavLink to='/home'>home</NavLink>
      <div>
        {/* 注册路由 */}
        { element }
      </div>
    </div>
  )
}
```

>路由触发文件--二级路由

```javascript
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  return (
    <div>
      <NavLink to='news'>news</NavLink>
      <NavLink to='message'>message</NavLink>
      {/* 指定路由呈现的位置 */}
      <Outlet />
    </div>
  )
}
```

## end

在有子路由的父级路由中，当点击子路由需要父级路由不高亮时，在点击父极路由NavLink时加上end属性即可

```javascript
<NavLink end to='/home'>home</NavLink>
```

## 路由携带参数

### 路由携带参数之params => useParams()

>路由链接携带参数，`<Link to={`detail/${id}/${title}`}>详情</Link>`
>注册路由接收参数，useRoutes路由表中：`{ path: 'detail/:id/:title', element: <Detail />}`
>Detail组件接收参数：const { id, title } = useParams()

```javascript
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
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
            <Link to={`detail/${item.id}/${item.title}`}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Outlet />
    </div>
  )
}
```

===

```javascript
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Detail(props) {
  const { id, title } = useParams()
  return (
    <div>
      <p>ID: {id}</p>
      <p>title: {title}</p>
      <p>content: {}</p>
    </div>
  )
}
```

### 路由携带参数之search(query) => useSearchParams()/useLocation()

>路由链接携带参数，`<Link to={`detail?id=${item.id}&title=${item.title}`}>详情</Link>`
>注册路由接收参数，useRoutes路由表中：`{ path: 'detail', element: <Detail />}`
>Detail组件接收参数：const [search, setSearch] = useSearchParams()
>const id = search.get('id')
>const title = search.get('title')
>const result = useLocation()
>clg(result.search)

```javascript
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

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
            <Link to={`detail?id=${item.id}&title=${item.title}`}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Outlet />
    </div>
  )
}
```

===

```javascript
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  const [search, setSearch] = useSearchParams()
  const id = search.get('id')
  const title = search.get('title')
  return (
    <div>
      <p>ID: {id}</p>
      <p>title: {title}</p>
      <p>content: {}</p>
    </div>
  )
}
```

### 路由携带参数之state => useLocation()

>路由链接携带参数，`<Link to='detail' state={{id: item.id, title: item.title}}>详情</Link>`
>注册路由接收参数，useRoutes路由表中：`{ path: 'detail', element: <Detail />}`
>Detail组件接收参数：const {state:{id, title}} = useLocation()

```javascript
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

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
            <Link to='detail' state={{
                id: item.id,
                title: item.title
            }}>{item.title}</Link>
          </li>)
        }
      </ul>
      <Outlet />
    </div>
  )
}
```

===

```javascript
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
```

## 路由跳转的两种模式

1. push：push模式相当于将每个路径都压入栈中，有history
2. replace： replace是用目标路径替换原来路径，没有history

>默认使用push模式，如果要开启replace模式，在Link中使用replace属性即可 `<Link replace to='/home'>首页</Link>`

## 编程式导航 => useNavigate()

>const navigate = useNavigate()
>navigate('path', {
>>replace: true,  // 默认值false
>>state:{
>>>>id,
>>>>title,
>>}
>})
>navigate(-1) // 后退
>navigate(1)  // 前进

## useRouterContext() 判断当前是否处于路由上下文环境中，返回true/false
