
# react-hooks

## 1、useState()

>语法：const [state, setState] = useState(initValue)
>setState两种写法：
>> setState(newValue)
>> setState(value => newValue)

## 2、useEffect()

语法：useEffect(()=> {
  return () => {}
}, [])

>只写第一个参数，函数内类似于，只要任意state改变就会重新执行
>第一个参数的放回函数，该函数内部相当于componentWillUnmont
>第二个参数[]，起监测作用。为空数组时类似于componentDidMount；数组中有state时，state改变，会重新执行useEffect，类似于componentDidUpdate

## 3、useLayoutEffect()

>用于处理副作用，在所有的DOM元素在内存中加载完成后后同步调用，读取DOM布局并同步触发重新渲染，只有一次回流，重绘的代价

## 4、useContext()

>处理跨组件的数据传递，减少组件传值

## 5、useReducer((reducer,initState)

>管理全局状态， 返回数组，数组第一位为状态，第二位为改变这个状态的唯一函数

```javascript
// 状态函数
const reducer = (prevState, action) => {
// prevState: 初始状态
//   action：改变状态的函数
}
//状态对象
const initState = {
  count: 0,
  // list: []
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: 'sub-count'
        })
      }}>-1</button>

      {state.count}
      
      <button onClick={() => {
        dispatch({
          type: 'add-count'
        })
      }}>+1</button>
    </div>
  )
}
```

## 6、useCallback(()=>{},[])

>记忆函数，处理回调，缓存函数。传入第一个参数为需要回调的函数（第一个函数不会执行，而是直接返回），第二个参数为数组，数组内保存回调函数的依赖。性能优化函数

## 7、useMemo(()=>()=>{}, [])

>记忆函数，和useCallback函数使用基本一致，将回调函数作为第一个参数函数的返回值，在依赖没有改变时获取的是第一个回调函数返回值缓存时的结果

## 8、useRef()

>返回引用对象，引用对象在整个组件的生命周期中都会保持不变（存值）const refObject = useRef()
>取ref对象的值：refObj.current.value

## 9、useDebugValue()

>自定义hooks，需要以use开头，以便内部判断是否为hooks
