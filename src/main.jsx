import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { AdminProvider } from './Context/AdminContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <AdminProvider>
      <App />
      <ToastContainer/>
      </AdminProvider>
    
      
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
