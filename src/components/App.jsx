import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { auth } from 'fbase'
import { onAuthStateChanged } from '@firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (nextUser) => {
      if (nextUser) {
        setUser(nextUser)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} user={user} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
