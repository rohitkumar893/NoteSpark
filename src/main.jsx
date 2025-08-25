import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ContextProvider from './context/ContextProvider.jsx'
import Modal from './components/Modal.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ContextProvider>
    <Routes> 
      <Route path = '/' element={<App />} />
      <Route path = '/signup' element={<Signup />} />
      <Route path = '/login' element={<Login />} />
      <Route path = '/modal' element={<Modal />} />
    </Routes>
    </ContextProvider>
  </BrowserRouter>,
)
