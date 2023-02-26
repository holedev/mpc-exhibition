import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './components/GlobalStyle'
import './config/firebase'
import './config/axios'

const rootElement = document.getElementById('root')
rootElement.style.minHeight = '100vh'

ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  // </React.StrictMode>
)
