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
      if (user?.uid) {
        setUser(user)
        window.localStorage.setItem('accessToken', user.accessToken)
        return
      }

      setUser(null)
      window.localStorage.clear()
      navigate('/home')
    })

    return () => {
      unsubscribe()
    }
  }, [auth])

  return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
}

export default Provider
