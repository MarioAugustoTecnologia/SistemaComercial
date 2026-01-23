import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' //1 => Declaração do módulo bootstrap (template)
import 'react-toastify/ReactToastify.css'//2 => Declaração de toastify

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />   
  </StrictMode>,
)
