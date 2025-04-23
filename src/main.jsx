import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import Home from './Pages/Home.jsx'
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import Post from './Pages/Post.jsx'
import EditPost from './Pages/EditPost.jsx'

const router = createBrowserRouter([
  {path: '/' , element: <App/> , children: [
    {path: '/', element: <Home/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/signup', element: <SignupPage/>},
    {path: '/allPost', element: <AllPost/>},
    {path: '/addPost', element: <AddPost/>},
    {path: '/post/:slug', element: <Post/>},
    {path: '/edit-post/:slug', element: <EditPost/>}
  ]}
])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>
)
