import { useState } from 'react'
import { Context } from './Context'

function Provider({ children }) {
  const [user, setUser] = useState(null)

  return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
}

export default Provider
