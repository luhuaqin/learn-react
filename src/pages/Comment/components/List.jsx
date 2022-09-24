import React from 'react'
import { observer } from 'mobx-react-lite'

import useStore from '../../../store'

export default observer(function List() {
  const { commentStore } = useStore()

  const handleDelete = (id) => {
    commentStore.deleteItem(id)
  }
  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {
          commentStore.list.map(item => <li key={item.id}>
            <div>
              <img src={item.avatar} alt="" width='60px' />
              <span>评论人：{item.author}</span>
              <span>评论时间：{item.time}</span>
              <span>评论内容：{item.comment}</span>
              <button onClick={() => commentStore.likeItem(item.id, item.attitude === 1 ? 0 : 1)}>{item.attitude === 1 ? '取消点赞' : '点赞'}</button>
              <button onClick={() => commentStore.likeItem(item.id, item.attitude === -1 ? 0 : -1)}>{item.attitude === -1 ? '取消踩' : '踩'}</button>
              {/* {
                item.attitude === 1 && <button>{item.attitude === -1 ? '取消踩' : '踩'}</button>
              }
              {
                item.attitude === -1 && <button>{item.attitude === 1 ? '取消点赞' : '点赞'}</button>
              }
              {
                item.attitude === 0 && <span>
                  <button>点赞</button>
                  <button>踩</button>
                </span>
              } */}
              <button onClick={() => handleDelete(item.id)}>删除</button>
            </div>
          </li>)
        }
      </ul>
    </div>
  )
})
