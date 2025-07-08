import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MainLayout from './MainLayouut/MainLayout.jsx'
import { RouterProvider } from 'react-router'
import Route from './Route/Route.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Route}>
      <MainLayout />
    </RouterProvider>
  </StrictMode>,
)
