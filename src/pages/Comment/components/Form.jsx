import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import useStore from '../../../store'

export default observer(function Form() {
  const [value, setValue] = useState('')
  const { commentStore } = useStore()

  const handleAdd = () => {
    commentStore.addItem(value)
    setValue('')
  }
  return (
    <div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder='发条友善的评论' cols="80" rows="5"></textarea>
      <button onClick={handleAdd}>发表评论</button>
    </div>
  )
})
