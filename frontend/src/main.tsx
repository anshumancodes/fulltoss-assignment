import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {UsercontextProvider} from './context/UserContext';
createRoot(document.getElementById('root')!).render(
 
  <StrictMode>
     <UsercontextProvider>
    <App />
    </UsercontextProvider>
  </StrictMode>,
)
