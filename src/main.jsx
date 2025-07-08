import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MainLayout from './MainLayouut/MainLayout.jsx'
import { RouterProvider } from 'react-router'
import Route from './Route/Route.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={Route}>
      <MainLayout />
    </RouterProvider>
    </CartProvider>
    <Toaster/>
  </StrictMode>,
)
