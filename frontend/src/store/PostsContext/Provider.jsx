import { useState } from 'react'
import { Context } from './Context'

function Provider({ children }) {
  const [data, setData] = useState([])

  return <Context.Provider value={[data, setData]}>{children}</Context.Provider>
}

export default Provider
