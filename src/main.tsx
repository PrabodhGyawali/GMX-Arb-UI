import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import PSettings from './PSettings.tsx'
import ErrorPage from './ErrorPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SocketContextProvider } from './Context/SocketContext.tsx'
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
      "path": "/settings",
      "element": <PSettings />,
    }
  ]
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketContextProvider>
    <RouterProvider 
        router={router}
      />
    </SocketContextProvider>
  </React.StrictMode>
)
