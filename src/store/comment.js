import axios from "axios"
import { makeAutoObservable, runInAction } from "mobx"

const request = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 5000
})

const store = {
  list: [],

  async getList() {
    const res = await request.get('/list')
    runInAction(() => {
      this.list = res.data
    })
  },

  async addItem(content) {
    const newObj = {
      "author": "luhuaqin",
      "comment": content,
      "time": new Date().toLocaleString(),
      "attitude": 0,
      "avatar": "https://avatars.githubusercontent.com/u/87929523?v=4"
    }

    // 发送请求，添加评论
    const res = await request.post('/list', newObj)
    runInAction(() => {
      this.list = [...this.list, res.data]
    })
  },

  async deleteItem(id) {
    await request.delete(`/list/${id}`)
    runInAction(() => {
      this.list = this.list.filter(item => item.id !== id)
    })
  },

  async likeItem(id, attitude) {
    await request.patch(`/list/${id}`, {
      attitude
    })
    // 修改数据
    const obj = this.list.find(item => item.id === id)
    runInAction(() => {
      obj.attitude = attitude
    })
  },

  async hateItem(id, attitude) {
    await request.patch(`/list/${id}`, {
      attitude
    })
    const obj = this.list.find(item => item.id === id)
    // 修改mobx中的数据
    runInAction(() => {
      obj.attitude = attitude
    })
  }
}

const commentStore = makeAutoObservable(store, {}, { autoBind: true })

export default commentStore
