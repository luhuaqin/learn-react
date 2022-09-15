import React from 'react'

export default function Detail(props) {
  console.log(props);
  // params接收方式
  // const { match:{params:{detailId, title}} } = props
  // search(query)接收方式，search是字符串需要转换
  // const result = props.location.search
  // state接收方式
  const { id, title } = props.location.state || {}

  return (
    <div>
      <p>ID: {id}</p>
      <p>title: {title}</p>
      <p>content: {}</p>
    </div>
  )
}
