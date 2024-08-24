import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import PSettings from './PSettings.tsx'
import ErrorPage from './ErrorPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext } from 'react'
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
const socketContext = createContext(null)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider 
      router={router}
    />
  </React.StrictMode>
)
