import React from 'react'

export default function Footer(props) {
  const { list, handleCheckedAll, handleClearDone } = props
  const doneCount = list.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
  const total = list.length

  const checkedAll = (event) => {
    handleCheckedAll(event.target.checked)
  }

  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" onChange={checkedAll} checked={doneCount === total && total !== 0 ? true : false} />
      </label>
      <span>
        <span>已完成{doneCount}</span>  / 全部{total}
      </span>
      <button className='btn btn-danger' onClick={handleClearDone}>清除已完成任务</button>
    </div>
  )
}
