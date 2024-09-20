
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Profile from './Pages/Profile.jsx'
import Notfind from './Pages/Notfind.jsx'
import Singleuser from './Pages/Singleuser.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path : "",
        element : <Home/>,
      },
      {
        path : "dashboard",
        element : <Dashboard/>,
      },
      {
        path : "login",
        element : <Login/>,
      },
      {
        path : "register",
        element : <Register/>
      },
      {
        path : "profile",
        element :  <Profile/>
      },
      {
        path : "singleuser",
        element : <Singleuser/>,
      },
      {
        path : '*',
        element : <Notfind/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
