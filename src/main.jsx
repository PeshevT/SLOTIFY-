import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './authContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 
    Here we wrap <App />  which means every component inside the app can now access user, login, and logout
    */}
    <AuthProvider>
       <App />
    </AuthProvider>
    {/* StrictMode says on the outside that it's a React dev tool that checks for bugs */}
  </StrictMode>,
)
