import React from 'react'
// observer: 高阶函数，用其包裹组件，组件才会变成响应式
import { observer } from 'mobx-react-lite'
import useStore from '../../store'

function Counter() {
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

export default observer(Counter)
