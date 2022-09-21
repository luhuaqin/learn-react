import { Navigate } from "react-router-dom"
import Home from "../component/home"
import About from "../component/about"
import News from "../component/home/news"
import Message from "../component/home/message"
import Detail from "../component/home/message/detail"

const routes =  [
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />,
        children: [
          {
            path: `detail`,
            element: <Detail />
          }
        ]
      },
      {
        path: '',
        element: <Navigate to='news' />
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/',
    element: <Navigate to='/about' />
  }
]

export default routes
