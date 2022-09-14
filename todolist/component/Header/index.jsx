import React from 'react'

export default function Header(props) {
  const handleKeyUp = (event) => {
    const { keyCode, target } = event
    if(keyCode !== 13) return
    if(target.value === "") {
      alert("输入不能为空")
      return
    }
    props.addItem(target.value)
    target.value = ""
  }
  
  return (
    <div className="todo-header">
      <input onKeyUp={handleKeyUp} type="text" placeholder='请输入任务名称，按回车键确认' />
    </div>
  )
}
