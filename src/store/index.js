import { useContext, createContext } from "react";
import counterStore from "./counter";
import commentStore from "./comment"

class RootStore {
  counterStore = counterStore
  commentStore = commentStore
}

const rootStore = new RootStore()

// 创建一个上下文对象，用于跨级组件通信
const Context = createContext(rootStore)

// 自定义hooks
export default function useStore() {
  return useContext(Context)
}
