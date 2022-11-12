import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Login from './pages/Login/index';
import Calculate from './pages/Calculate';

import Sidebar from './components/Sidebar';

import './index.css';
import Footer from './components/Footer';
import AccessDenied from './pages/AccessDenied';
import ChoiceKits from './pages/ChoiceKits';
import RegisterSeller from './pages/RegisterSeller';

const PrivateRoute = ({ element: Element }, props) => {
  return (
    <>
      <Sidebar>
        <Element {...props} />
        <Footer />
      </Sidebar>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/calculate",
    element: <PrivateRoute element={Calculate} />
  },
  {
    path: "/access-denied",
    element: <AccessDenied />
  },
  {
    path: "/choice-kits",
    element: <PrivateRoute element={ChoiceKits} />
  },
  {
    path: "/register-seller",
    element: <PrivateRoute element={RegisterSeller} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);