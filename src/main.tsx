import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './ErrorPage.tsx'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import { SocketContextProvider } from './Context/SocketContext.tsx'
import About from './About.tsx'
import PrivacyPolicy from './Privacy.tsx'
import Onboarding from './onboarding/Onboarding.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "onboarding",
    element: <Onboarding onComplete={() => {
      redirect("/")
      alert("Onboarding complete! Local storage is now set to know that the onboarding is complete, so use this browser next time to skip the onboarding.")
    }} />,
  },
  {
    path: "privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "about",
    element: <About />,
  }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketContextProvider>
      <RouterProvider router={router} />
    </SocketContextProvider>
  </React.StrictMode>
)