import { makeAutoObservable, reaction, runInAction } from 'mobx'

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
