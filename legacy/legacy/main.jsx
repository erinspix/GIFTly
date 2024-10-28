import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import Login from './pages/Login.jsx'
import ItemDetail from './pages/ItemDetail.jsx'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  //  errorElement: <Error />
    children: [
      { 
        index: true,
        element: <Home />
      },
      { 
        path: '/collection',
        element: <Collection />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/item/:id',
        element: <ItemDetail />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
