import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import { AuthContextProvider } from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
