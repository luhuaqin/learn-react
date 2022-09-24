import { Navigate } from "react-router-dom";
import Counter from "../pages/Counter";
import Comment from "../pages/Comment";

const routes = [
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/comment',
    element: <Comment />
  },
  {
    path: '/',
    element: <Navigate to='/comment' />
  }
]

export default routes
