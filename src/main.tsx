import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorPage from './ErrorPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SocketContextProvider } from './Context/SocketContext.tsx'
import { DevDialog } from './DevComponent.tsx'
import About from './About.tsx'
import PrivacyPolicy from './Privacy.tsx'
/**
 * React Router Setup
 */ 
const router = createBrowserRouter(
  [
    {
      "path": "/",
      "element": <App />,
      "errorElement": <ErrorPage />,
    },
    {
      "path": "/privacy",
      "element": <PrivacyPolicy />,
    },
    {
      "path": "/about",
      "element": <About />,
    }
  ]
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketContextProvider>
    <RouterProvider 
        router={router}
      />
    <DevDialog />
    </SocketContextProvider>
    
  </React.StrictMode>
)
