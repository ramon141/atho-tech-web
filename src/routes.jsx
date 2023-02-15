import { createBrowserRouter } from "react-router-dom";

import AccessDenied from "./pages/AccessDenied";
import ChoiceKits from "./pages/ChoiceKits";
import RegisterSeller from "./pages/RegisterSeller";
import Login from "./pages/Login/index";
import Calculate from "./pages/Calculate";
import Sidebar from "./components/Sidebar/index";
import Footer from "./components/Footer";
import ProductsPricing from "./pages/ProductsPricing";
import RegisterProduct from "./pages/RegisterProduct";

const PrivateRoute = ({ element: Element }, props) => {
  return (
    <>
      <Sidebar>
        <Element {...props} />
        <Footer />
      </Sidebar>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/calculate",
    element: <PrivateRoute element={Calculate} />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "/choice-kits",
    element: <PrivateRoute element={ChoiceKits} />,
  },
  {
    path: "/register-seller",
    element: <PrivateRoute element={RegisterSeller} />,
  },
  {
    path: "/products-pricing",
    element: <PrivateRoute element={ProductsPricing} />,
  },
  {
    path: "/register-product",
    element: <PrivateRoute element={RegisterProduct} />,
  },
]);
