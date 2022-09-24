
# MobX

## 概念

使用简洁，数据是响应式的，可以直接修改数据，可以直接处理异步。
>makeObservable: 将类的属性和方法变成响应式
>makeAutoObservable: 加强版的Observable，默认情况下自动推断出所有的属性
>>所有的属性都推断为observable
>>所有的方法都推断为action
>>所有的get方法都推断为computed
>>通过overrides排除不需要被观察的方法和属性
>>通过autoBind可以绑定this
>observable：定义一个存储state的可跟踪字段(Proxy)，响应式
>> 需要makeObservable指定响应属性observable
>action：将一个方法标记为可以修改state的action
>> 需要用makeObservable方法指定action
>computed：标记一个可以由state派生出新值并且缓存其输出的计算属性
>> 计算值采用惰性求值，会缓存输出，只有当依赖的响应式对象被改变时才会重新计算
>> 计算属性方法前必须使用get进行修饰
>> 计算属性也需要makeObservable方法指定computed

工作流程：
![工作流程](./assets/img/mobx%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B.jpg 'mobx工作流程')

## 配置环境

>初始化项目：create-react-app mobx-project
>安装mobx: yarn add mobx mobx-react-lite
>>mobx-react-lite是将react和mobx连接的库，只支持函数式组件，不支持类组件
>>如要支持类组件使用mobx-react

## 基本使用

>1、创建store，mobx中每个store都只应该初始化一次
>>创建文件夹：store/index.js，通过class创建一个类
>>使用makeObservable将类的属性和方法变成响应式的
>>>/*
>>>>target: 目标响应式对象
>>>>object：指定哪些属性或者方法变成响应式的，observable为响应式属性，action为方法
>>>*/
>>>makeObservable(target, object)
>>>/*
>>>>target: 目标响应式对象
>>>>object：排除不需要指定响应式的属性或方法，直接在方法或属性定义为false即可
>>>>object: 默认绑定当前class实例为this，不会受组件的影响
>>>*/
>>>makeObservable(target, { increment: false }, { autoBind: true })
>>导出实例

## this指向问题

>默认class中的方法不会绑定this，this取决于调用方
>makeObserver中可以通过action.bound绑定this指向，绑定bound属性时候，类中的this直接就绑定在类中，不会受组件的影响

### makeObservable的例子

```javascript
store/counter.js

import { action, makeObservable, observable } from 'mobx'
 class Counter {
  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
      reset: action,
      countDouble: computed
    })
  }
  count = 1
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
  reset() {
    this.count = 0
  }
 }
export default new Counter()
```

```javascript
App.jsx

import React from 'react'
import counterStore from './store/counter'
// observer: 高阶函数，用其包裹组件，组件才会变成响应式
import { observer } from 'mobx-react-lite'
function App() {
  return (
    <div>
      <h3>计数器案例</h3>
      <div>
        <p>点击次数: {counterStore.count}</p>
        <p>点击次数×2: {counterStore.countDouble}</p>
        <button onClick={() => counterStore.increment()}>+1</button>
        <button onClick={() => counterStore.decrement()}>-1</button>
        <button onClick={() => counterStore.reset()}>重置</button>
      </div>
    </div>
  )
}
export default observer(App)
```

### makeAutoObservable的例子

```javascript
store/counter.js

import { makeAutoObservable } from 'mobx'
class Counter {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  count = 1
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
  get countDouble() {
    return this.count * 2
  }
  reset() {
    this.count = 0
  }
}
export default new Counter()
```

```javascript
App.jsx

import React from 'react'
import counterStore from './store/counter'
// observer: 高阶函数，用其包裹组件，组件才会变成响应式
import { observer } from 'mobx-react-lite'
function App() {
  return (
    <div>
      <h3>计数器案例</h3>
      <div>
        <p>点击次数: {counterStore.count}</p>
        <p>点击次数×2: {counterStore.countDouble}</p>
        <button onClick={counterStore.increment}>+1</button>
        <button onClick={counterStore.decrement}>-1</button>
        <button onClick={counterStore.reset}>重置</button>
      </div>
    </div>
  )
}
export default observer(App)
```

## MobX监听属性

### 监听属性的使用

>1、autorun(()=>{}): 函数接收一个函数作为参数，每次函数观察的值变化时都会执行一次。MobX会自动收集并订阅所有的响应式属性，一旦属性发生变化，autorun都会被触发一次。初始化时就执行

```javascript
autorun(() => {
  console.log('counterStore.count', counterStore.count)
})
autorun(() => {
  console.log('counterStore.countDouble', counterStore.countDouble)
})
```

>2、reaction(() => {}, () => {}): 准确监听属性变化，可以指定监听的属性，初始化时不会执行。第一个回调函数指定监听的属性，返回值为修改之后的值；第二个回调函数中接收连个参数，第一个参数为newValue，第二个参数为oldValue

```javascript
reaction(() => counterStore.count, (newValue, oldValue) => {
  console.log('count变化了', newValue, oldValue);
})
```

## MobX处理异步

1、runInAction(): 可以保证所有异步更新响应式对象的步骤都标识为action

```javascript
store/counter.js

import { makeAutoObservable, autorun, reaction, runInAction } from 'mobx'
class Counter {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  count = 1
  increment() {
    setTimeout(() => {
      runInAction(() => {
        this.count++
      })
    }, 1000)
  }
  decrement() {
    this.count--
  }
  get countDouble() {
    return this.count * 2
  }
  reset() {
    this.count = 0
  }
}
const counterStore = new Counter()
// autorun(() => {
//   console.log('counterStore.count', counterStore.count)
// })
// autorun(() => {
//   console.log('counterStore.countDouble', counterStore.countDouble)
// })
reaction(() => counterStore.count, (newValue, oldValue) => {
  console.log('count变化了', newValue, oldValue);
})
export default counterStore
```

## MobX模块化

使用根Store管理所有store模块

```javascript
store/index.js  // RootStore

import { useContext, createContext } from "react";
import counterStore from "./counter";
class RootStore {
  counterStore = counterStore
}
const rootStore = new RootStore()
// 创建一个上下文对象，用于跨级组件通信
// 如果createContext提供了默认值，不需要再提供一个Provider
const Context = createContext(rootStore)
// 自定义hooks
export default function useStore() {
  return useContext(Context)
}
```

```javascript
store/counter.js

import { makeAutoObservable, autorun, reaction, runInAction } from 'mobx'
class Counter {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  count = 1
  increment() {
    setTimeout(() => {
      runInAction(() => {
        this.count++
      })
    }, 1000)
  }
  decrement() {
    this.count--
  }
  get countDouble() {
    return this.count * 2
  }
  reset() {
    this.count = 0
  }
}
const counterStore = new Counter()
// autorun(() => {
//   console.log('counterStore.count', counterStore.count)
// })
// autorun(() => {
//   console.log('counterStore.countDouble', counterStore.countDouble)
// })
reaction(() => counterStore.count, (newValue, oldValue) => {
  console.log('count变化了', newValue, oldValue);
})
export default counterStore
```

```javascript
App.jsx

import React from 'react'
// observer: 高阶函数，用其包裹组件，组件才会变成响应式
import { observer } from 'mobx-react-lite'
import useStore from './store'
function App() {
  const { counterStore } = useStore()
  return (
    <div>
      <h3>计数器案例</h3>
      <div>
        <p>点击次数: {counterStore.count}</p>
        <p>点击次数×2: {counterStore.countDouble}</p>
        <button onClick={counterStore.increment}>+1</button>
        <button onClick={counterStore.decrement}>-1</button>
        <button onClick={counterStore.reset}>重置</button>
      </div>
    </div>
  )
}
export default observer(App)
```
