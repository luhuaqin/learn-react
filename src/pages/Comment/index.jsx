import React from 'react'
import { observer } from 'mobx-react-lite'

import useStore from '../../store'
import Form from './components/Form'
import List from './components/List'
import { useEffect } from 'react'

function Comment() {
  const { commentStore } = useStore()

  useEffect(() => {
    commentStore.getList()
  }, [commentStore])

  return (
    <div>
      <div>
        <span>{commentStore.list.length}条评论</span>
      </div>

      {/* 添加评论 */}
      <Form />

      {/* 评论列表 */}
      <List />
    </div>
  )
}

export default observer(Comment)
