import { useEffect, useState } from 'react'
import { Context } from './Context'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Provider({ children }) {
  const navigate = useNavigate()
  const auth = getAuth()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (!user?.uid) {
        setUser(null)
        window.localStorage.clear()
      }

      setUser(user)
      window.localStorage.setItem('token', user?.accessToken)
      window.localStorage.setItem('userID', user?.email.slice(0, 10))
    })

    return () => {
      unsubscribe()
    }
  }, [auth])

  return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
}

export default Provider
