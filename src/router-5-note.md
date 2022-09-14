
# react-router-dom@5

## 安装

npm i react-router-dom@5  /  yarn add react-router-dom@5

## BrowserRouter/HashRouter

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
