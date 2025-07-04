import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { login, logout } from './Slice/AuthSlice'
import authService from './Appwrite/Auth'
import { Header, Footer, Logo } from './Components'
import { Outlet } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import Particle from "./Components/Particals/Partical"


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) =>
        console.log('Error fetching user data:', error))
      .finally(() =>
        setLoading(false))

  }, [])

  return loading ?

    (<div className='flex justify-center pt-36 h-screen bg-[url("./Pages/bgImg/background-desktop-2500w.jpg")] bg-cover'> {/* The problem is ("") and ('')*/}
      <Logo className='w-[15rem]' />
    </div>) :

    (
        <div className="w-full min-h-screen text-center bg-[#bbbab8]">
          <ScrollToTop />
          <Header />
          <Outlet />
          <Footer />
        </div>
    )

}

export default App
