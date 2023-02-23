import Login from '../pages/Login'
import Home from '../pages/Home'

export const publicRoute = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  },
]

export const privateRoute = []
