import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import PSettings from 'PSettings.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
/**
 * React Router Setup
 */ 
const router = createBrowserRouter(
  [
    {
      "path": "/",
      "element": <App />,
    },
    {
      "path": "/settings",
      "element": <PSettings />,
    }
  ]
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider 
      router={router}
    />
  </React.StrictMode>
)
