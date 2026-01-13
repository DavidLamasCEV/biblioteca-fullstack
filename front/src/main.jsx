import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contents/themeContext.jsx'
import { AuthContextProvider } from './contents/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>,
)